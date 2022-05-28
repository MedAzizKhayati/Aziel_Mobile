import { StyleSheet } from "react-native";

export default StyleSheet.create({
    statisticsTitle: {
        fontSize: 25,
        fontWeight: "500",
        marginBottom: 10,
        marginHorizontal: 10,
    },
    statisticsCont: {
        paddingTop: 25,
        marginBottom: 20,
        paddingBottom: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
    },
    chartsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1
    },
    statisticsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    statisticsText: {
        fontSize: 17,
    },
    statisticsView2: {
        flexDirection: 'column-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 5,
        width: "33%",
    },
    statisticsText2: {
        fontSize: 17,
        textAlign: "center"
    },
    seperator: {
        height: 2,
        backgroundColor: '#E0E0E0',
        marginVertical: 25,
        marginHorizontal: 45,
        borderRadius: 50
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
});