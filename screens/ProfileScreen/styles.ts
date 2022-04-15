import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleContainer: {
        padding: "15%",
        alignItems: 'center',
        flex: 1,
        width: "100%",
    },
    photoContainer: {
        position: "absolute",
        top: "15%",
        height: "25%",
        width: '85%',
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    photo: {
        height: 100,
        width: 100,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "#aaa",
    },
    user: {
        marginTop: 15,
        fontSize: 20,
    },
    title: {
        fontSize: 30,
    },
    optionsContainer: {
        flex: 5,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',    
    },
    optionsScrollView: {
        paddingTop: "25%",
        padding: 20,
        width: "100%",
    },
    optionButton: {
        margin: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    textOption: {
        flex: 5,
        fontSize: 20,
    }
})

export default styles;
