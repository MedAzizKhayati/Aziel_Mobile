import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

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
    categoriesContainer: {
        width: '100%',
    },
    categoriesText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        marginHorizontal: 25,
    },
    categoryView: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 10, 
            height: 3,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 5,
        overflow: 'hidden',
        margin: 10,
    },
    categoryImage: {
        width: 175,
        height: 175,
    },
    categoriesTitle: {
        margin: 10,
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    popularContainer: {
        width: '100%',
    },
    popularText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        marginHorizontal: 25,
    },
})

export default styles;
