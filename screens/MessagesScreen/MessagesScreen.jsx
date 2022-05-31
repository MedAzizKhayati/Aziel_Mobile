import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import CreateCustomOrder from '../../components/CreateCustomOrder';
import { default as Image } from '../../components/ImageWithFallback';
import { Text, TextInput, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { GlobalContext } from '../../context/Provider';
import useColorScheme from '../../hooks/useColorScheme';
import { changeOrderStatus, findByChatId, getUnreadMessagesCount, markMessagesAsSeen, sendCustomOrder, sendMessageToChat, subscribeToChat } from '../../services/chat.service';
import { formatURI, timeFromNow } from '../../utils/helpers';
import Toast from 'react-native-toast-message';

import styles from './styles';

const MessagesScreen = ({ route, navigation }) => {
    const { authState: { user, buyerMode }, authDispatch } = useContext(GlobalContext);
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
    const [visible, setVisible] = useState(false);

    const init = () => {
        setMessage('');
        setChatId('');
        setPage(1);
        setFirstMessageReached(false);
        setVisible(false);
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
            return async () => {
                init();
                const notRead = await getUnreadMessagesCount();
                authDispatch({ type: 'SET_UNREAD_MESSAGES_COUNT', payload: notRead });
            };
        }, [target])
    )

    useEffect(() => {
        if (route.params?.target)
            setTarget(route.params.target);
    }, [route.params?.target]);

    useEffect(() => {
        if (!chatId || !isFocused) return;
        subscribeToChat(chatId, (data) => {
            if (data.targetId == user.id)
                markMessagesAsSeen([data.id]);
            setMessages(messages => {
                const index = messages.findIndex((message) => message.id == data.id);
                if (index == -1) {
                    setLimit(limit => limit + 1);
                    return [data, ...messages];
                }
                const newMessages = [...messages];
                newMessages[index] = data;
                return newMessages;
            });
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

    const handleCustomOrderSubmit = (order) => {
        sendCustomOrder(order, user.id, target.id);
        setVisible(false);
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
                <Image source={{ uri: formatURI(target?.profileImage) }} style={styles.userPhoto} />
                <Text style={styles.userName}>
                    {target?.firstName + ' ' + target?.lastName}
                </Text>
            </View >
        );
    }

    const updateOrder = async (status, message) => {
        changeOrderStatus(message.customOrder?.id, status, message.id);
    }

    const OrderButton = ({ onPress, text, backgroundColor, disabled, color }) => (
        <TouchableOpacity
            style={[
                styles.customOrderButton,
                {
                    backgroundColor: backgroundColor || Colors[colorScheme].background,
                    opacity: disabled ? 0.5 : 1
                }
            ]}
            onPress={onPress}
            disabled={disabled}

        >
            <Text
                style={styles.customOrderButtonText}
                lightColor={color}
                darkColor={color}
            >
                {text}
            </Text>
        </TouchableOpacity>
    )

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
                            {
                                item.customOrder &&
                                <View
                                    backgroundColor={Colors[colorScheme].secondaryBackground}
                                    style={styles.customOrderContainer}
                                >
                                    <View
                                        style={styles.customOrderTitleWrapper}
                                        backgroundColor={Colors[colorScheme].secondaryBackground}
                                    >
                                        <Text style={styles.customOrderTitle}>
                                            {item.customOrder.title}
                                        </Text>
                                        <Text style={[styles.customOrderPrice]}>
                                            {item.customOrder.price} TND
                                        </Text>
                                    </View>

                                    <Text
                                        style={styles.customOrderDescription}
                                        lightColor={Colors.light.tint}
                                        darkColor={Colors.dark.tint}
                                    >
                                        {item.customOrder.description}
                                    </Text>
                                    {
                                        !['CANCELLED', 'REJECTED'].includes(item.customOrder.status) &&

                                        <Text style={styles.customOrderDate}>
                                            Due in {timeFromNow(item.customOrder.deliveryDate)}
                                        </Text>
                                    }

                                    {
                                        item.customOrder.status == 'WAITING' && item.customOrder.buyer.id != user.id &&
                                        <OrderButton
                                            onPress={() => updateOrder('CANCELLED', item)}
                                            text="Withdraw Offer"
                                            backgroundColor="red"
                                        />
                                    }
                                    {
                                        item.customOrder.status == 'WAITING' && item.customOrder.buyer.id == user.id &&
                                        <View
                                            style={styles.customOrderButtonsGroup}
                                            backgroundColor={Colors[colorScheme].secondaryBackground}
                                        >
                                            <OrderButton
                                                onPress={() => updateOrder('IN_PROGRESS', item)}
                                                text="Accept Offer"
                                                backgroundColor="lightgreen"
                                                color='black'
                                            />
                                            <OrderButton
                                                onPress={() => updateOrder('REJECTED', item)}
                                                text="Reject Offer"
                                                backgroundColor="red"
                                            />
                                        </View>
                                    }
                                    {
                                        item.customOrder.status == 'IN_PROGRESS' &&
                                        <OrderButton
                                            text="Offer Accepted"
                                            backgroundColor="green"
                                            disabled={true}
                                        />
                                    }
                                    {
                                        item.customOrder.status == 'REJECTED' &&
                                        <OrderButton
                                            text="Offer Rejected"
                                            backgroundColor={Colors[colorScheme].tint}
                                            disabled={true}
                                        />
                                    }
                                    {
                                        item.customOrder.status == 'COMPLETED' &&
                                        <OrderButton
                                            text="Offer Delivered"
                                            backgroundColor="green"
                                            disabled={true}
                                        />
                                    }
                                    {
                                        item.customOrder.status == 'CANCELLED' &&
                                        <OrderButton
                                            text="Offer Withdrawn"
                                            backgroundColor={Colors[colorScheme].tint}
                                            disabled={true}
                                        />
                                    }
                                </View>
                            }
                        </View>
                    }
                />
            </View>
            <View style={[styles.messageBox, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
                {
                    !buyerMode &&
                    <TouchableOpacity
                        style={{ paddingRight: 5 }}
                        onPress={() => setVisible(true)}
                    >
                        <AntDesign
                            name='plus'
                            size={30}
                            color={Colors[colorScheme].text}
                        />
                    </TouchableOpacity>
                }
                <TextInput
                    style={[styles.messageInput, { borderColor: Colors[colorScheme].tint }]}
                    onChange={(e) => setMessage(e.nativeEvent.text)}
                    value={message}
                />
                <TouchableOpacity
                    style={[styles.sendButton, { borderColor: Colors[colorScheme].tint }]}
                    onPress={sendMessage}
                >
                    <FontAwesome
                        name='send'
                        color={Colors[colorScheme].text}
                        size={28}
                    />
                </TouchableOpacity>
            </View>
            <CreateCustomOrder
                onSubmit={handleCustomOrderSubmit}
                onTouchOutside={() => setVisible(false)}
                visible={visible}
            />
        </View>
    );
}



export default MessagesScreen;