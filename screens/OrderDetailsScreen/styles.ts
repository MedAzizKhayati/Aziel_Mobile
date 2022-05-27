import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    firstView: {
        width: '100%',
        flexDirection: 'row',
        paddingTop: 16,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    serviceContainer: {
        width: '100%',
        height: 100,
        marginVertical: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },footer: { flex: 2, justifyContent: 'center', paddingLeft: 10, paddingRight: 10 },
    amountDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        margin: 5,
      },
      btn: { 
        flex: 1,
        display: 'flex',  
        maxHeight: 50,
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#f15b5d',
        borderRadius:30,
        alignSelf: 'center',
        marginTop: 20,
    },
})

export default styles;