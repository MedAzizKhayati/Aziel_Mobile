import { TouchableOpacity } from 'react-native';
import { Text, View } from '../../components/Themed';
import CustomInput from '../../components/CustomInput';
import { registerUser } from '../../services/user.service';

import { Field, Formik } from 'formik';
import * as yup from 'yup';

import styles from './styles';


const signUpValidationSchema = yup.object().shape({
    firstName: yup
        .string()
        .min(3, ({ min }) => `First name must be at least ${min} characters`)
        .required('First name is required'),
    lastName: yup
        .string()
        .min(3, ({ min }) => `Last name must be at least ${min} characters`)
        .required('Last name is required'),
    email: yup
        .string()
        .email("Please enter valid email")
        .required('Email is required'),
    password: yup
        .string()
        .matches(/\w*[a-z]\w*/, "Password must have a small letter")
        .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
        .matches(/\d/, "Password must have a number")
        .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords do not match')
        .required('Confirm password is required'),
})

const SignUpScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Formik
                validationSchema={signUpValidationSchema}
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                }}
                onSubmit={values => {
                    delete values?.confirmPassword; 
                    registerUser(values)}
                }
                >
                {({
                    handleSubmit,
                    isValid,
                }) => (
                    <>
                        <Field
                            component={CustomInput}
                            name="firstName"
                            placeholder="First Name"
                        />
                        <Field
                            component={CustomInput}
                            name="lastName"
                            placeholder="Last Name"
                        />
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
                        <Field
                            component={CustomInput}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            secureTextEntry
                        />
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                style={[
                                    {
                                        backgroundColor: isValid ? '#009900' : '#999'
                                    },
                                    styles.signUpButton
                                ]}
                                onPress={handleSubmit}
                                disabled={!isValid}
                            >
                                <Text>Sign Up</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Login")}>
                                <Text>Log in</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    );
}

export default SignUpScreen;