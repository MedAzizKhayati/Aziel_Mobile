import React, { useEffect, useState } from 'react'
import { isEmail } from 'validator';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getOneByEmail, registerUser } from '../../services/user.service';
import styles from './styles';

export default RegistrationScreen = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phonenumber, setPhonenumber] = useState('25991047');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isError, setIsError] = useState(true);
    const [message, setMessage] = useState('');

    const onFooterLinkPress = () => {
        navigation.navigate('Login');
    }

    const getPayload = () => {
        return {
            email,
            password,
            firstName,
            lastName,
            phonenumber
        };
    }

    const validatePayload = async () => {
        const payload = getPayload();
        if (!isEmail(email)) {
            setMessage("Make sure that your email is valid.");
            setIsError(true);
            return false;
        }
        try {
            const user = await getOneByEmail(email);
            setMessage("This email is already in use.");
            setIsError(true);
            return false;
        } catch (e) {
            console.log(e.response.data);
            console.log('Email is valid.')
        }

        for (const key in payload) {
            if (!payload[key]) {
                setIsError(true);
                setMessage("Make sure your " + key + " is not empty.")
                return false;
            }
        }

        if (password != confirmPassword) {
            setMessage("Make sure that your passwords match.");
            setIsError(true);
            return false;
        }

        setMessage("");
        setIsError(false);
        return true;
    }

    useEffect(() => {
        validatePayload();
    }, [email, password, confirmPassword, firstName, lastName, phonenumber]);

    const onRegisterPress = () => {
        const payload = getPayload();
        registerUser(payload)
            .then(res => {
                console.log(res.data);
                navigation.navigate('Home');
            }).catch(err => {
                console.log(err.response.data);
            })
    }
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/aziel_logo.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='First name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFirstName(text)}
                    value={firstName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Last name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setLastName(text)}
                    value={lastName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <Text style={styles.infoMessage}>{message}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}