import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: "10%",
    },
    textInput: {
        height: 40,
        width: '100%',
        margin: 10,
        paddingHorizontal: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    signUpButton: {
        margin: 10,
        padding: 10,
        paddingHorizontal: 25,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        backgroundColor: '#009900',
    },
    loginButton: {
        margin: 10,
        padding: 10,
        paddingHorizontal: 25,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
    }
})

export default styles;
