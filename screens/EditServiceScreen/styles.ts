import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        paddingBottom: 20,
    },
    headerImage: {
        height: 300,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        overflow: 'hidden',
    },
    serviceDetailsContainer: {
        marginTop: 20,
        paddingHorizontal: 20
    },
    serviceTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    categoryTitle: {
        fontSize: 12,
        fontWeight: '400',
        marginTop: 5,
    },
    serviceRatingContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    initialPriceContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        alignItems: 'center',
    },
    priceText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "black",
        marginLeft: 5,
    },
    submitButton: {
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        backgroundColor: 'orange',
        marginHorizontal: 20,
        borderRadius: 10,
    },
    submitText: {
        color: "black",
        fontSize: 18,
        fontWeight: 'bold'
    },
    priceTag: {
        height: 40,
        alignItems: 'center',
        marginLeft: 40,
        paddingLeft: 20,
        flex: 1,
        backgroundColor: 'orange',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        flexDirection: 'row',
    },
    errorText: {
        color: 'red',
        fontSize: 15,
        padding: 10,
        paddingHorizontal: 20,
    },
    editPhotoIcon: {
        position: "absolute",
        right: 10,
        bottom: 10,
    }
})

export default styles;