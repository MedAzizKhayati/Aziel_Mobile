import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, ToastAndroid, TouchableOpacity } from 'react-native';
import { default as Image } from '../../components/ImageWithFallback';
import { Text, TextInput, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { GlobalContext } from '../../context/Provider';
import useColorScheme from '../../hooks/useColorScheme';
import { findByChatId, markMessagesAsSeen, sendMessageToChat, subscribeToChat } from '../../services/chat.service';

import styles from './styles';

const MessagesScreen = ({ route, navigation }) => {
    const { authState: { user } } = useContext(GlobalContext);
    const colorScheme = useColorScheme();
    const [target, setTarget] = useState(route.params.target);
    const messageListRef = useRef()
    const isFocused = useIsFocused();

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [chatId, setChatId] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [firstMessageReached, setFirstMessageReached] = useState(false);

    const init = () => {
        setMessage('');
        setChatId('');
        setPage(1);
        setFirstMessageReached(false);
    }

    useFocusEffect(
        useCallback(() => {
            // Do something when the screen is focused
            if (!target) return;
            init();
            navigation.setOptions({
                title: target?.firstName + ' ' + target?.lastName,
            });
            const chatId =
                user.id < target.id
                    ? user.id + '-' + target.id
                    : target.id + '-' + user.id;
            setChatId(chatId);
            return init;
        }, [target])
    )

    useEffect(() => {
        if (route.params?.target)
            setTarget(route.params.target);
    }, [route.params?.target]);

    useEffect(() => {
        if (!chatId || !isFocused) return;
        subscribeToChat(chatId, (data) => {
            if(data.targetId == user.id)
                markMessagesAsSeen([data.id]);
            setMessages(messages => [data, ...messages]);
            setLimit(limit => limit + 1);
        });
        findByChatId(chatId, limit, page)
            .then((data) => {
                setMessages(data);
                markMessagesAsSeen(
                    data.filter(
                        m => !m.seen || !m.targetId != user.id
                    ).map(m => m.id));
                if (data.length < limit)
                    setFirstMessageReached(true);
            })
            .catch(err => console.log(err));
    }, [isFocused, chatId]);

    const sendMessage = () => {
        if (!message) return;
        sendMessageToChat(message, user.id, target.id);
        setMessage('');
    }

    const loadMoreMessages = () => {
        if (firstMessageReached || !chatId) return;
        setPage(page => page + 1);
        findByChatId(chatId, limit, page + 1)
            .then((data) => {
                const newMessages = data.filter(message => !messages.find(m => m.id === message.id));
                setMessages(messages => [...messages, ...newMessages]);
                if (data.length < limit)
                    setFirstMessageReached(true);
            })
            .catch(err => console.log(err));
    }

    const Header = () => {
        if (!firstMessageReached)
            return <ActivityIndicator size="large" color={Colors[colorScheme].text} />
        return (
            <View style={styles.headerComponent}>
                <Image style={styles.userPhoto} />
                <Text style={styles.userName}>
                    {target?.firstName + ' ' + target?.lastName}
                </Text>
            </View >
        );
    }

    return (
        <View style={styles?.container}>
            <View style={styles?.messagseContainer}>
                <FlatList
                    ref={messageListRef}
                    data={messages}
                    inverted
                    keyExtractor={item => item.id}
                    ListFooterComponent={Header}
                    onEndReachedThreshold={1}
                    onEndReached={loadMoreMessages}
                    renderItem={({ item }) =>
                        <View style={
                            [
                                styles.messageBoxText,
                                { alignItems: item.ownerId == user.id ? "flex-end" : "flex-start", }
                            ]
                        }>
                            <Text
                                style={
                                    [
                                        styles.textMessage,
                                        {
                                            backgroundColor: Colors[colorScheme].secondaryBackground
                                        },
                                        item.ownerId == user.id ? styles.textMessageRight : styles.textMessageLeft
                                    ]
                                }
                            >
                                {item.message}
                            </Text>
                        </View>
                    }
                />
            </View>
            <View style={[styles.messageBox, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
                <TextInput
                    style={[styles.messageInput, { borderColor: Colors[colorScheme].tint }]}
                    onChange={(e) => setMessage(e.nativeEvent.text)}
                    value={message}
                />
                <TouchableOpacity
                    style={[styles.sendButton, { borderColor: Colors[colorScheme].tint }]}
                    onPress={sendMessage}
                >
                    <Text>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}



export default MessagesScreen;