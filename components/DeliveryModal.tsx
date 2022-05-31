import { Modal, TouchableWithoutFeedback, StyleSheet, View, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import * as yup from 'yup';
import { Field, Formik } from 'formik';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from './Themed';
import { useContext, useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { GlobalContext } from '../context/Provider';
import { getServicesByUser } from '../services/services.service';
import Toast from 'react-native-toast-message';
import CustomInput from './AdvancedCustomInput';

interface BottomPopupProps {
    onSubmit: (values: any) => void;
    onTouchOutside: () => void;
    visible: boolean;
    order: any
}
const ONE_DAY = 24 * 60 * 60 * 1000;
const DeliveryModal = ({ order, onTouchOutside, visible, onSubmit }: BottomPopupProps) => {
    const colorScheme = useColorScheme();
    const isFocused = useIsFocused();
    const { authState: { user } } = useContext(GlobalContext);
    const [keyboardShown, setKeyboardShown] = useState(false);

    const [services, setServices] = useState([]);

    useEffect(() => {
        if (!isFocused) return;
        getServicesByUser(user.id)
            .then(setServices)
            .catch((err) => {
                Toast.show({
                    type: 'error',
                    text1: 'Unexpected error, please try again later',
                    text2: err.response.data.message
                })
                console.error(err);
            });
    }, [isFocused]);

    const handleSubmit = (values: {}) => {
        onTouchOutside && onTouchOutside();
        setKeyboardShown(false);
        onSubmit && onSubmit(values);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onTouchOutside}
        >
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={() => onTouchOutside && onTouchOutside()}
                >
                    <View style={[styles.blurredView, {flex: keyboardShown ? 3 : 5}]} />
                </TouchableWithoutFeedback>
                <View
                    style={styles.mainContainer}
                    backgroundColor={Colors[colorScheme].secondaryBackground}
                >
                    <Text style={styles.title}>
                        Your Delivery
                    </Text>
                    <ScrollView>
                        <Formik
                            validationSchema={orderValidationSchema}
                            initialValues={{
                                deliveryDescription: "I'm going to design your Logo.",
                            }}
                            onSubmit={handleSubmit}
                        >
                            {({
                                handleSubmit,
                                isValid,
                            }) => (
                                <>
                                    <Field
                                        component={CustomInput}
                                        onFocus={() => setKeyboardShown(true)}
                                        onBlur={() => setKeyboardShown(false)}
                                        name="deliveryDescription"
                                        title="Descritpion"
                                        placeholder={
                                            `Ex. \nHey ${order?.buyer?.firstName},\n\n` +
                                            "It was such a great experience being at your service" +
                                            ". I'm looking forward to working with you again.\n\n" +
                                            "Best regards,\n" +
                                            user.firstName + ' ' + user.lastName
                                        }
                                        multiline={true}
                                        numberOfLines={4}
                                        backgroundColor={Colors[colorScheme].secondaryBackground}
                                    />
                                    <View style={[
                                        styles.fieldView,
                                    ]}>
                                        <TouchableOpacity
                                            style={[
                                                styles.submitButton,
                                                {
                                                    backgroundColor: isValid ? '#e2574c' : '#999',
                                                    opacity: isValid ? 1 : 0.5,
                                                }
                                            ]}
                                            onPress={handleSubmit}
                                            disabled={!isValid}
                                        >
                                            <Text>Submit Delivery</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )}
                        </Formik>
                    </ScrollView>
                </View>
            </View>

        </Modal >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    blurredView: {
        flex: 3,
        width: '100%',
    },
    mainContainer: {
        flex: 8,
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 10,
    },
    title: {
        paddingVertical: 15,
        textAlign: 'center',
        fontSize: 25,
    },
    fieldView: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: "center",
    },
    submitButton: {
        paddingVertical: 10,
        paddingHorizontal: 25,
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 10,
    },
});


const orderValidationSchema = yup.object().shape({
    deliveryDescription: yup
        .string()
        .min(3, ({ min }) => `The description must be at least ${min} characters`)
        .max(200, ({ max }) => `The description must be at most ${max} characters`)
        .required('The description is required'),
});

export default DeliveryModal;

