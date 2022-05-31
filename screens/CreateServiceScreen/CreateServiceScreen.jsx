import { useEffect, useState } from "react";
import { View, Text, ScrollView, TextInput } from "../../components/Themed";
import useColorScheme from "../../hooks/useColorScheme";
import * as yup from 'yup';
import { Field, Formik } from 'formik';
import Toast from 'react-native-toast-message';
import styles from "./styles";
import { TouchableOpacity } from "react-native";
import { getAllServiceCategories } from "../../services/service_cateogries.service";
import { createService } from "../../services/services.service";
import DropdownMenu from "../../components/DropdownMenu";
import CustomInput from "../../components/AdvancedCustomInput";


const serviceValidationSchema = yup.object().shape({
    title: yup
        .string()
        .matches(/^[a-zA-Z ]*$/, "Only letters are allowed")
        .min(10, ({ min }) => `Service Title must be at least ${min} characters`)
        .max(30, ({ max }) => `Service Title must be at most ${max} characters`)
        .required('The Title is required'),
    description: yup
        .string()
        .min(50, ({ min }) => `The description must be at least ${min} characters`)
        .max(200, ({ max }) => `The description must be at most ${max} characters`)
        .required('The description is required'),
    price: yup
        .number()
        .min(5, ({ min }) => `The price must be at least ${min}`)
        .max(10000, ({ max }) => `The price must be at most ${max}`)
        .required('Price is required'),
    categoryId: yup
        .string()
        .required('Category is required'),
});

const CreateServiceScreen = ({ navigation }) => {
    const colorScheme = useColorScheme();
    const [categories, setCategories] = useState([]);

    const createService_ = (values) => {
        console.log(values);
        createService(values)
            .then(res => {
                Toast.show({
                    type: 'success',
                    text1: "Your Service Has Been Successfully Created!",
                })
                navigation.navigate('Home');
            })
            .catch(err => {
                console.log(err);
                Toast.show({
                    type: 'error',
                    text1: err?.response.data?.message || "Something went wrong",
                })
            })
    };

    useEffect(() => {
        getAllServiceCategories()
            .then(res => {
                setCategories([...res, { id: "_", title: "Other" }]);
            });
    }, [])

    return (
        <ScrollView style={styles.container}>
            <Formik
                validationSchema={serviceValidationSchema}
                initialValues={{
                    title: '',
                    description: '',
                    price: '',
                    categoryId: false,
                }}
                onSubmit={values => createService_(values)}
            >
                {({
                    handleSubmit,
                    isValid,
                }) => (
                    <>
                        <Field
                            component={CustomInput}
                            name="title"
                            placeholder="Ex. Personal Math Teacher"
                            title="Title"
                        />
                        <Field
                            component={CustomInput}
                            name="description"
                            title="Descritpion"
                            placeholder="Ex. I am a math teacher and I teach kids from 1st to 5th grade."
                            multiline={true}
                            numberOfLines={3}
                        />
                        <Field
                            component={CustomInput}
                            name="price"
                            title="Starting Price"
                            placeholder="Ex. 150"
                            keyboardType="numeric"
                        />
                        <Field
                            component={DropdownMenu}
                            label='Category'
                            name='categoryId'
                            data={categories}
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
                                <Text>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>
        </ScrollView>
    );
}

export default CreateServiceScreen;