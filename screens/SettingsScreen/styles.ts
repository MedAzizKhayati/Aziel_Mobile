import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    optionsContainer: {
        flex: 1,
        
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    logoutButton: {
        margin: 10,
        padding: 15,
        paddingHorizontal: 25,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        backgroundColor: '#999',
        width: '80%',
        alignItems: 'center',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});

export default styles;