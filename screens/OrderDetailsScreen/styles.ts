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
    }
})

export default styles;