import React, { Header, Body, Content, Container, useState, useEffect } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { getAllUsers, logout } from '../../services/user.service';
import styles from './styles';

//import { useTranslation } from 'react-i18next';
//import SwitchSelector from 'react-native-switch-selector';

/*const options = [
    { label: 'English', value: 'en' },
    { label: 'French', value: 'fr' },];
const {t,i18n}=useTranslation();*/

export default HomeScreen = ({ navigation, user, setUser }) => {
    const [users, setUsers] = useState([]);

    const onLogout = () => {
        logout();
        setUser(null);
    }

    useEffect(() => {
        getAllUsers()
            .then(users => setUsers(users))
            .catch(err => console.error(err));
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Welcome {user?.firstName}
            </Text>
            <View style={styles.usersContainer}>
                <FlatList
                    data={users}
                    renderItem={({ item }) =>
                        <Text style={styles.text} key={item.id}>
                            {item.firstName + ' ' + item.lastName}
                            {'\n' + item.email + '\n'}
                        </Text>
                    }
                    keyExtractor={item => item.id}
                />
            </View>
            <Button title="Logout" onPress={() => onLogout()}>
                Logout
            </Button>
        </View>
        /* <Container>
             <Header>
                 <Body>
                     <SwitchSelector> options={options} hasPadding initial ={0} onPress={(language) => i18n.changeLanguage(language)}</SwitchSelector>
                 </Body>
             </Header>
             <Content padder contentContaineStyle={{
                 flex: 1,
                 alignItems: 'center',
                 justifyContent: 'center'
             }}>
                 <Text style={{ fontSize: 26, textAlign: 'center' }}>{t('WelcomeText')}</Text>
             </Content>
         </Container>*/
    )
}