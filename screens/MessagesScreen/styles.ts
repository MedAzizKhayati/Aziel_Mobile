import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    messagseContainer: {
        flex: 1,
    },
    messageBox: {
        flexDirection: "row",
        height: 65,
        padding: 10,

    },
    messageBoxText: {
        flex: 1,
        width: "100%",
        alignItems: "flex-start",
    },
    textMessage: {
        margin: 5,
        fontSize: 20,
        padding: 7,
        borderRadius: 25,
        maxWidth: "80%",
        paddingHorizontal: 20
    },
    messageInput: {
        height: 40,
        flex: 1,
        borderWidth: 1,
        borderRadius: 45,
        padding: 10,
        marginRight: 5,
    },
    sendButton: {
        width: 70,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 45,
        borderBottomRightRadius: 5,
    },
    headerComponent: {
        alignItems: "center",
        justifyContent: "center",
    },
    userPhoto: {
        width: 135,
        height: 135,
        borderRadius: 150
    },
    userName: {
        fontSize: 20,
        fontWeight: "bold",
        margin: 5,
        marginBottom: 50
    },
    textMessageRight: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 20,
    },
    textMessageLeft: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 20,
    },
})