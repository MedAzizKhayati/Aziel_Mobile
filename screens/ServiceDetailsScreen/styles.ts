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
        //borderTopLeftRadius: 20,
        //borderTopRightRadius: 20,
        overflow: 'hidden',
    },
    firstView: {
        width: '100%',
        //flexDirection: 'row',
        paddingTop: 16,
        paddingHorizontal: 16,
       // justifyContent: 'space-between',
       // alignItems: 'center',
    },
    header: {
        marginTop: 40,
        marginHorizontal: 20,
        //flexDirection: 'row',
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
      
})

export default styles;