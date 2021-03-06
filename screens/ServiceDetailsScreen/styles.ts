import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerImage: {
        height: 400,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        overflow: 'hidden',
    },
    userInfo: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: -5,
        paddingBottom: 20,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    userPicture: {
        width: 50,
        height: 50,
        borderRadius: 30,
        marginRight: 15,
    },
    firstView: {
        width: '100%',
        paddingTop: 16,
        paddingHorizontal: 16,
    },
    header: {
        marginTop: 40,
        marginHorizontal: 20,
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
    reviewsContainer: {
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