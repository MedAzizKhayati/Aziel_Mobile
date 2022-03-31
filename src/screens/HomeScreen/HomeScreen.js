import React ,{Header,Body,Content,Container} from 'react'
import { Text, View } from 'react-native'
//import { useTranslation } from 'react-i18next';
//import SwitchSelector from 'react-native-switch-selector';

/*const options = [
    { label: 'English', value: 'en' },
    { label: 'French', value: 'fr' },];
const {t,i18n}=useTranslation();*/

export default function HomeScreen(props) {
    return (
         <View>
             <Text>Home Screen</Text>
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