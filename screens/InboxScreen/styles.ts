import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    userButton: {
        padding: 15,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: "center"
    },
    userInfo: {
        fontSize: 15,
        fontWeight: "bold",
    },
    userPhoto: {
        width: 55,
        height: 55,
        borderRadius: 150,
        marginRight: 15,
    },
    messageBox: {
        flex: 1,
        paddingLeft: 10
    },
    lastMessage: {
        fontSize: 14,
    },
    lastMessageDate:{
        fontSize: 12,
    }
})