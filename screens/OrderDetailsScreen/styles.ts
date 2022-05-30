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
    footer: { flex: 2, justifyContent: 'center', paddingLeft: 10, paddingRight: 10 },
    amountDetails: {
       // display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: 20
    },
    btn: {
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        backgroundColor: 'orange',
        marginHorizontal: 20,
        borderRadius: 10,
    },
})

export default styles;