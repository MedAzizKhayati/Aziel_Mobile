import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#282c34',
    },
    title:{
        fontSize: 50,
        textAlign: 'center',
        marginVertical: 20,
        backgroundColor: '#21252b',
        padding: 12,
        borderRadius: 7,
        fontWeight: '600',
    },
    usersContainer:{
        flex: 1,
        borderRadius: 7,
        backgroundColor: '#21252b',
        padding: 20
    },
    text: {
        paddingTop: 10,
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        backgroundColor: '#282c34',
        marginVertical: 10,
        borderRadius: 7,
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    }
})