import { isEmail } from 'class-validator';
import React, { useEffect, useRef, useState } from 'react';
import { Image, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { loginUser } from '../../services/user.service';
import styles from './styles';


export default LoginScreen = ({ navigation, user, setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(true);
    const [message, setMessage] = useState('');

    const onFooterLinkPress = () => {
        navigation.navigate('Registration');
    };
    const getPayload = () => {
        return {
            email,
            password,
        };
    };
    const validatePayload = async () => {
        const payload = getPayload();
        if (!isEmail(email)) {
            setMessage('Make sure that your email is valid.');
            setIsError(true);
            return false;
        }
        for (const key in payload) {
            if (!payload[key]) {
                setIsError(true);
                setMessage('Make sure your ' + key + ' is not empty.');
                return false;
            }
        }
        setMessage('');
        setIsError(false);
        return true;
    };

    useEffect(() => {
        validatePayload();
    }, [email, password]);

    const onLoginPress = () => {
        const payload = getPayload();
        if (!isError)
            loginUser(payload)
                .then(res => {
                    setUser(res);
                })
                .catch(err => {
                    console.log(err?.response?.data);
                });
    };

    return (
        <>
            <StatusBar translucent/>
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
                        placeholder="E-mail"
                        placeholderTextColor="#aaaaaa"
                        onChangeText={text => setEmail(text)}
                        value={email}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        secureTextEntry
                        placeholder="Password"
                        onChangeText={text => setPassword(text)}
                        value={password}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <Text style={styles.infoMessage}>{message}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => onLoginPress()}>
                        <Text style={styles.buttonTitle}>Log in</Text>
                    </TouchableOpacity>
                    <View style={styles.footerView}>
                        <Text style={styles.footerText}>
                            Don't have an account?{' '}
                            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                                Sign up
                            </Text>
                        </Text>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </>

    );
}
