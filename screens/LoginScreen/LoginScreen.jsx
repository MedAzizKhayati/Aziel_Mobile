import { Image, TouchableOpacity } from 'react-native';
import { Text, View } from '../../components/Themed';

import { Field, Formik } from 'formik';
import * as yup from 'yup';

import styles from './styles';
import CustomInput from '../../components/CustomInput';
import { loginUser } from '../../services/user.service';
import { useContext } from 'react';
import { GlobalContext } from '../../context/Provider';
import Toast from 'react-native-toast-message';

const loginValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter valid email")
        .required('Email Address is Required'),
    password: yup
        .string()
        .min(4, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
})

const LoginScreen = ({ navigation }) => {
    const { authDispatch } = useContext(GlobalContext);

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/images/aziel_logo.png')}
            />
            <Formik
                validationSchema={loginValidationSchema}
                initialValues={{ email: 'test@test.test', password: 'test' }}
                onSubmit={values => {
                    loginUser(values)
                        .then(user => {
                            authDispatch({ type: 'LOGIN', payload: user });
                        })
                        .catch(err => {
                            console.log(err?.response?.data);
                            Toast.show({
                                type: 'error',
                                text1: 'Login Failed',
                                text1: err?.response?.data?.message,
                            });
                        });
                }}
            >
                {({
                    handleSubmit,
                    isValid,
                }) => (
                    <>
                        <Field
                            component={CustomInput}
                            name="email"
                            placeholder="Email Address"
                            keyboardType="email-address"
                        />
                        <Field
                            component={CustomInput}
                            name="password"
                            placeholder="Password"
                            secureTextEntry
                        />
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                style={[
                                    {
                                        backgroundColor: isValid ? '#009900' : '#999'
                                    },
                                    styles.loginButton
                                ]}
                                onPress={handleSubmit}
                                disabled={!isValid}
                            >
                                <Text>Log in</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate("SignUp")}>
                                <Text>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    );
}

export default LoginScreen;