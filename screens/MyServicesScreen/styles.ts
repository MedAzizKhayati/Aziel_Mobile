import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        alignItems: "center",
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
        paddingBottom: 0,
    },
    emptyText: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '500',
    },
    newService: {
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#e2574c',
    },
    newServiceTitle: {
        fontSize: 15,
        color: "black"
    }
})

export default styles;
