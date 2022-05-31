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
        alignItems: "center"
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
        height: 38,
        flex: 1,
        borderWidth: 1,
        borderRadius: 45,
        padding: 10,
        marginRight: 5,
    },
    sendButton: {
        alignItems: "center",
        justifyContent: "center",
        padding: 7
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
    customOrderContainer: {
        width: "85%",
        padding: 15,
        borderRadius: 15,
        alignItems: "center",
        marginBottom: 2,
    },
    customOrderTitleWrapper:{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    customOrderTitle: {
        fontSize: 18,
        textAlign: "center",
        paddingVertical: 5,
        fontWeight: "bold",
        maxWidth: "70%",
    },
    customOrderDescription:{
        paddingVertical: 20,
        fontSize: 16,
        width: "100%",
    },
    customOrderPrice: {
        fontSize: 16,
        padding: 5,
        maxWidth: "30%",
        textAlign: "center",
    },
    customOrderDate: {
        width: "100%",
        textAlign: "left",
        fontSize: 16,
        fontStyle: "italic",
        fontWeight: "bold",
    },
    serviceContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    serviceImage: {
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: 5
    },
    serviceTitle: {
        fontSize: 16,
    },
    customOrderButton: {
        padding: 12,
        borderRadius: 5,
        marginTop: 10,
        marginHorizontal: 10,
    },
    customOrderButtonsGroup: {
        width:"100%", 
        flexDirection: 'row', 
        justifyContent: "center",
        alignItems: "center",
    }
})