import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    serviceContainer: {
        width: '100%',
        height: 100,
        marginVertical: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    footer: {
        flex: 2,
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    amountDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: 20
    },
    imageContainer: {
        width: '30%',
        height: 100,
        padding: 14,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        borderRadius: 10,
        marginRight: 22,
    },
    image: {
        width: '150%',
        height: '150%',
        resizeMode: 'contain',
        borderRadius: 10,
    }
});

export default styles;