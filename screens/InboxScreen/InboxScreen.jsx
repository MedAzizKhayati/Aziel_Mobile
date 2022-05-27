import { useContext, useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { default as Image } from '../../components/ImageWithFallback';
import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { GlobalContext } from '../../context/Provider';
import useColorScheme from '../../hooks/useColorScheme';
import { findByChatId, subscribeToChat } from '../../services/chat.service';
import { getAllUsers } from '../../services/user.service';
import { CommonActions, useIsFocused } from "@react-navigation/native";

import styles from './styles';

const WEEKDAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
]

const InboxScreen = ({ navigation }) => {
    const { authState: { user } } = useContext(GlobalContext);
    const colorScheme = useColorScheme();
    const [users, setUsers] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (!isFocused) return;
        getAllUsers().then(async data => {
            for (const target of data) {
                const chatId =
                    user.id < target.id
                        ? user.id + '-' + target.id
                        : target.id + '-' + user.id;
                const message = await findByChatId(chatId, 1, 1);
                target.lastMessage = message[0] || {
                    message: '',
                    createdAt: new Date(0).toISOString(),
                };
                // This code to not show the users whom I didn't talk to.
                // if(!message[0])
                //     data = data.filter(user => user.id != target.id);
                subscribeToChat(chatId, (data) => {
                    target.lastMessage = data;
                    const newUsers = [target, ...users.filter(u => u.id !== target.id)];
                    setUsers(newUsers);
                });
            }
            data.sort((a, b) => a.lastMessage.createdAt < b.lastMessage.createdAt);
            setUsers(data);
        })
    }, [isFocused]);

    const chatWithUser = (user) => {
        const action = CommonActions.navigate({
            name: 'Root',
            params: {
                screen: 'MessagesScreen',
                params: {
                    target: user,
                },
            },
            key: user.id,
        })
        navigation.dispatch(action);
    }

    return (
        <View style={styles?.container}>
            <FlatList
                data={users}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <TouchableOpacity
                        style={styles.userButton}
                        onPress={() => chatWithUser(item)}
                    >
                        <Image style={styles.userPhoto} />
                        <View style={styles.messageBox}>
                            <Text style={styles.userInfo}>
                                {item.firstName}  {item.lastName}
                            </Text>
                            <Text style={[
                                    styles.lastMessage, 
                                    (item?.lastMessage?.targetId != user.id || item?.lastMessage?.seen)
                                    ? { color: Colors[colorScheme].tint } 
                                    : { color: Colors[colorScheme].text, fontWeight: "bold" }
                                ]}>
                                {item?.lastMessage?.message.slice(0, 50)}
                            </Text>
                        </View>
                        <Text style={[styles.lastMessageDate, { color: Colors[colorScheme].tint }]}>
                            {
                                new Date() - new Date(item.lastMessage.createdAt) < 24 * 60 * 60 * 1000 
                                ? new Date(item.lastMessage.createdAt).toLocaleTimeString().slice(0, 5)
                                : new Date() - new Date(item.lastMessage.createdAt) < 24 * 60 * 60 * 1000 * 7 
                                ? WEEKDAYS[new Date(item.lastMessage.createdAt).getDay()]
                                : new Date(item.lastMessage.createdAt).toLocaleDateString() 
                            }
                        </Text>
                    </TouchableOpacity>
                }
            />
        </View>
    );
}

export default InboxScreen;