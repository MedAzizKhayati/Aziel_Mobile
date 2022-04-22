import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchView: {
        width: '100%',
        padding: 25,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    searchInput: {
        width: '100%',
        height: 45,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    servicesContainer: {
        width: '100%',
        paddingBottom: 100,
    },
    emptyText: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
    }
})

export default styles;
