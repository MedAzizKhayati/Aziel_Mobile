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
    dropdown: {
        flex: 1,
        width: "100%",
        height: 50,
        borderRadius: 7,
        padding: 12,
    },
    dropdownContainer: {
        borderRadius: 7,
        borderWidth: 0,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 0,
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});