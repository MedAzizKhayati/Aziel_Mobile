import { useState } from "react";
import { View, Text, ScrollView, TextInput } from "../../components/Themed";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import * as yup from 'yup';
import { Field, Formik } from 'formik';

import styles from "./styles";
import { TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const serviceValidationSchema = yup.object().shape({
    title: yup
        .string()
        .matches(/^[A-Za-z]+$/, "Only letters are allowed")
        .min(10, ({ min }) => `Service Title must be at least ${min} characters`)
        .max(30, ({ max }) => `Service Title must be at most ${max} characters`)
        .required('The Title is required'),
    description: yup
        .string()
        .matches(/^[A-Za-z]+$/, "Only letters are allowed")
        .min(50, ({ min }) => `The description must be at least ${min} characters`)
        .max(200, ({ max }) => `The description must be at most ${max} characters`)
        .required('The description is required'),
    price: yup
        .number()
        .min(5, ({ min }) => `The price must be at least ${min}`)
        .max(10000, ({ max }) => `The price must be at most ${max}`)
        .required('Price is required'),
    category: yup
        .string()
        .required('Category is required'),
})

const CreateServiceScreen = ({ navigation }) => {
    const colorScheme = useColorScheme();

    const createService = (values) => {
        console.log(values);
    };

    return (
        <ScrollView style={styles.container}>
            <Formik
                validationSchema={serviceValidationSchema}
                initialValues={{
                    title: '',
                    description: '',
                    price: '',
                    category: '',
                }}
                onSubmit={values => createService(values)}
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
                            name='category'
                            data={[{ value: "banana" }]}
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

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Banana', value: 'banana' },
        { label: 'Apple', value: 'apple' },{ label: 'Banana', value: 'banana' },
        { label: 'Apple', value: 'apple' },{ label: 'Banana', value: 'banana' },
        { label: 'Apple', value: 'apple' },{ label: 'Banana', value: 'banana' },
        { label: 'Apple', value: 'apple' },
        
    ]);

    const renderItem = (item) => {
        return (
          <View style={styles.item}>
            <Text style={styles.textItem}>{item.label}</Text>
            {/* {item.value === value && (
              <AntDesign
                style={styles.icon}
                color="black"
                name="Safety"
                size={20}
              />
            )} */}
          </View>
        );
      };

    return (
        <View style={styles.fieldView}>
            <Text style={{ ...styles.fieldTitle, color: Colors[colorScheme].tint }}>{props.label}</Text>
            <Dropdown
                style={[styles.dropdown, {backgroundColor: Colors[colorScheme].secondaryBackground}]}
                placeholderStyle={[styles.placeholderStyle, { color: Colors[colorScheme].text }]}
                selectedTextStyle={[styles.selectedTextStyle, { color: Colors[colorScheme].text }]}
                inputSearchStyle={styles.inputSearchStyle}
                data={items}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={"Select A " + props.label}
                searchPlaceholder="Search..."
                value={value}
                onChange={item => {
                  onChange(name)(item.value);
                }}
                renderItem={renderItem}
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