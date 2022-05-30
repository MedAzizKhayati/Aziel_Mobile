import { chatSocket, axiosInstance } from './api.service';

export const subscribeToChat = (chatId: string, callback: (data: {}) => void) => {
    chatSocket.removeListener(chatId);
    chatSocket.on(chatId, (data) => {
        callback(data);
    });
}

export const subscribeToIncomingMessages = (userId: string, callback: (data: {}) => void) => {
    chatSocket.offAny();
    chatSocket.onAny((ev, data) => {
        if(data?.targetId === userId)
            callback && callback(data);
    });
}

export const sendMessageToChat = (message: string, ownerId: string, targetId: string) => {
    chatSocket.emit('send', {
        message,
        targetId,
        ownerId
    });
}

export const findByChatId = async (chatId: string, take: number = 10, page: number = 1) => {
    const response = await axiosInstance.get(`/messages/${chatId}/${take}/${page}`);
    return response.data;
}

export const markMessagesAsSeen = async (messageIds: string[]) => {
    const response = await axiosInstance.post(`/messages/mark-as-seen`, {
        messageIds
    });
    return response.data;
}

export const getUnreadMessagesCount = async () => {
    const response = await axiosInstance.get(`/messages/unread-count/`);
    return response.data.count;
}