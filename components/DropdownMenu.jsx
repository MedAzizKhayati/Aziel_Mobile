import { Dropdown } from "react-native-element-dropdown";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { Text, View } from "./Themed";

const DropdownMenu = (props) => {
    const colorScheme = useColorScheme();
    const {
        field: { name, onBlur, onChange, value },
        form: { errors, touched, setFieldTouched },
        backgroundColor,
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
        <View
            style={styles.fieldView}
            backgroundColor={backgroundColor}
        >
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


const styles = {
    dropdown: {
        flex: 1,
        width: "100%",
        height: 50,
        borderRadius: 7,
        padding: 12,
    },
    dropdownContainer: {
        borderRadius: 7,
        borderWidth: 0,
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
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    errorText: {
        width: "100%",
        color: 'red',
    },
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
}

export default DropdownMenu;
