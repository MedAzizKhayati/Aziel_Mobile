import { useEffect, useState } from "react";
import { View, Text, ScrollView, TextInput } from "../../components/Themed";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import * as yup from 'yup';
import { Field, Formik } from 'formik';
import Toast from 'react-native-toast-message';

import styles from "./styles";
import { ToastAndroid, TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { getAllServiceCategories } from "../../services/service_cateogries.service";
import { createService } from "../../services/services.service";


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

const DropdownMenu = (props) => {
    const colorScheme = useColorScheme();
    const {
        field: { name, onBlur, onChange, value },
        form: { errors, touched, setFieldTouched },
        ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    const renderItem = (item) => {
        return (
            <View style={{ ...styles.item, backgroundColor: Colors[colorScheme].secondaryBackground }}>
                <Text style={styles.textItem}>{item.title}</Text>
            </View>
        );
    };

    return (
        <View style={styles.fieldView}>
            <Text style={{ ...styles.fieldTitle, color: Colors[colorScheme].tint }}>{props.label}</Text>
            <Dropdown
                style={[styles.dropdown, { backgroundColor: Colors[colorScheme].secondaryBackground }]}
                placeholderStyle={[styles.placeholderStyle, { color: Colors[colorScheme].tint }]}
                selectedTextStyle={[styles.selectedTextStyle, { color: Colors[colorScheme].text }]}
                containerStyle={[styles.dropdownContainer, { backgroundColor: Colors[colorScheme].secondaryBackground }]}
                maxHeight={300}
                labelField="title"
                valueField="id"
                placeholder={"Select A " + props.label}
                searchPlaceholder="Search..."
                value={value}
                onChange={item => {
                    onChange(name)(item.id);
                }}
                dropdownPosition="top"
                renderItem={renderItem}
                {...inputProps}
            />
            {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
        </View>
    )
}

const CustomInput = (props) => {
    const colorScheme = useColorScheme();
    const [focused, setFocused] = useState(false);

    const {
        field: { name, onBlur, onChange, value },
        form: { errors, touched, setFieldTouched },
        ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    return (
        <View style={styles.fieldView}>
            <Text style={{ ...styles.fieldTitle, color: Colors[colorScheme].tint }}>{props.title}</Text>
            <TextInput
                {...inputProps}
                placeholderTextColor="#666666"
                onFocus={() => setFocused(true)}
                onBlur={() => {
                    setFocused(false);
                    setFieldTouched(name)
                }}
                onChangeText={(text) => onChange(name)(text)}
                style={[
                    styles.fieldInput,
                    {
                        color: Colors[colorScheme].text,
                    },
                    focused && styles.focused
                ]}
            />
            {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
        </View>
    );
}


export default CreateServiceScreen;