import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {

    },
    fieldView: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: "center",
    },
    fieldTitle: {
        width: "100%",
        fontSize: 16,
        paddingHorizontal: 5,
    },
    fieldInput: {
        width: "100%",
        fontSize: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        textAlignVertical: 'top'
    },
    focused: {
        borderColor: '#00a680',
        borderWidth: 1,
    },
    errorText: {
        width: "100%",
        color: 'red',
    },
    submitButton: {
        paddingVertical: 10,
        paddingHorizontal: 25,
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 10,
    },
});