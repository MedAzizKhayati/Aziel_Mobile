import { useState } from "react";
import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { Text, TextInput, View } from "./Themed";

const AdvancedCustomInput = (props) => {
    const colorScheme = useColorScheme();
    const [focused, setFocused] = useState(false);

    const {
        field: { name, onBlur, onChange, value },
        form: { errors, touched, setFieldTouched },
        backgroundColor,
        ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    return (
        <View
            style={[styles.fieldView]}
            backgroundColor={backgroundColor}
        >
            <Text style={{ ...styles.fieldTitle, color: Colors[colorScheme].tint }}>
                {props.title}
            </Text>
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

const styles = StyleSheet.create({
    fieldView: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: "center",
    },
    fieldTitle: {
        width: "100%",
        fontSize: 16,
        paddingHorizontal: 5,
    },
    fieldInput: {
        width: "100%",
        fontSize: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        textAlignVertical: 'top'
    },
    focused: {
        borderColor: '#00a680',
        borderWidth: 1,
    },
    errorText: {
        width: "100%",
        color: 'red',
    },
    submitButton: {
        paddingVertical: 10,
        paddingHorizontal: 25,
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 10,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 0,
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
});

export default AdvancedCustomInput;