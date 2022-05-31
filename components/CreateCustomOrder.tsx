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
import DropdownMenu from './DropdownMenu';
import CustomInput from './AdvancedCustomInput';

interface BottomPopupProps {
    onSubmit: (values: any) => void;
    onTouchOutside: () => void;
    visible: boolean;
}
const ONE_DAY = 24 * 60 * 60 * 1000;
const CreateCustomOrder = ({ onTouchOutside, visible, onSubmit }: BottomPopupProps) => {
    const colorScheme = useColorScheme();
    const isFocused = useIsFocused();
    const { authState: { user } } = useContext(GlobalContext);

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
                    <View style={styles.blurredView} />
                </TouchableWithoutFeedback>
                <View
                    style={styles.mainContainer}
                    backgroundColor={Colors[colorScheme].secondaryBackground}
                >
                    <Text style={styles.title}>
                        Create Custom Order
                    </Text>
                    <ScrollView>
                        <Formik
                            validationSchema={orderValidationSchema}
                            initialValues={{
                                title: 'Logo Design',
                                description: "I'm going to design your Logo.",
                                price: 150,
                                serviceId: '',
                                deliveryDate: 0,
                            }}
                            onSubmit={(values) => {
                                const days = values.deliveryDate;
                                values.deliveryDate = new Date(+new Date() + days * ONE_DAY);
                                onSubmit(values);
                            }}
                        >
                            {({
                                handleSubmit,
                                isValid,
                            }) => (
                                <>
                                    <Field
                                        component={CustomInput}
                                        name="title"
                                        placeholder="Ex. Logo Design"
                                        title="Title"
                                        backgroundColor={Colors[colorScheme].secondaryBackground}
                                    />
                                    <Field
                                        component={CustomInput}
                                        name="description"
                                        title="Descritpion"
                                        placeholder="Ex. I'm going to design your Logo."
                                        multiline={true}
                                        numberOfLines={2}
                                        backgroundColor={Colors[colorScheme].secondaryBackground}
                                    />
                                    <Field
                                        component={CustomInput}
                                        name="price"
                                        title="Price"
                                        placeholder="Ex. 150"
                                        keyboardType="numeric"
                                        backgroundColor={Colors[colorScheme].secondaryBackground}
                                    />
                                    <Field
                                        component={CustomInput}
                                        name="deliveryDate"
                                        title="Deliver After (days)"
                                        placeholder="Ex. 1 day"
                                        keyboardType="numeric"
                                        backgroundColor={Colors[colorScheme].secondaryBackground}
                                    />
                                    <Field
                                        component={DropdownMenu}
                                        label='Service'
                                        name='serviceId'
                                        data={services}
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
                                            <Text>Send Custom Offer</Text>
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
    title: yup
        .string()
        .matches(/^[a-zA-Z ]*$/, "Only letters are allowed")
        .min(10, ({ min }) => `Service Title must be at least ${min} characters`)
        .max(30, ({ max }) => `Service Title must be at most ${max} characters`)
        .required('The Title is required'),
    description: yup
        .string()
        .min(20, ({ min }) => `The description must be at least ${min} characters`)
        .max(200, ({ max }) => `The description must be at most ${max} characters`)
        .required('The description is required'),
    price: yup
        .number()
        .min(5, ({ min }) => `The price must be at least ${min}`)
        .max(10000, ({ max }) => `The price must be at most ${max}`)
        .required('Price is required'),
    deliveryDate: yup
        .number()
        .min(1, ({ min }) => `The price must be at least ${min} day`)
        .max(60, ({ max }) => `The delivery date must be less than ${max} 60 days`)
        .required('Price is required'),
    serviceId: yup
        .string()
        .required('Category is required'),
});

export default CreateCustomOrder;

