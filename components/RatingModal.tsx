import { Ionicons } from "@expo/vector-icons";
import { Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Modal, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { formatDate, formatURI } from "../utils/helpers";
import CustomInput from "./CustomInput";
import { default as Image } from "./ImageWithFallback";
import { Text, View } from "./Themed";
import * as yup from 'yup';

interface RatingModalProps {
    onSubmit: (values: any) => void;
    onTouchOutside: () => void;
    visible: boolean;
}

const RatingModal = ({ onTouchOutside, visible, onSubmit }: RatingModalProps) => {
    const colorScheme = useColorScheme();
    const [defaultRating, setdefaultRating] = useState(0);
    const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5])
    const [keyboardShown, setKeyboardShown] = useState(false);

    const handleSubmit = (values: {}) => {
        onTouchOutside && onTouchOutside();
        setKeyboardShown(false);
        onSubmit && onSubmit(values);
    }
    const CustomRatingBar = () => {
        return (
            <View style={styles.customRatingBarStyle} backgroundColor={Colors[colorScheme].secondaryBackground}
            >
                {
                    maxRating.map((item, key) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                key={item}
                                onPress={() => setdefaultRating(item)}
                            >
                                {item <= defaultRating
                                    &&
                                    <View style={styles.starImgStyle} backgroundColor={Colors[colorScheme].secondaryBackground}
                                    >
                                        <Ionicons
                                            size={40}
                                            name="star-sharp"
                                            color="orange"
                                        />
                                    </View>}
                                {item > defaultRating &&
                                    <View style={styles.starImgStyle} backgroundColor={Colors[colorScheme].secondaryBackground}
                                    >
                                        <Ionicons
                                            size={40}
                                            name="star-outline"
                                            color="orange"
                                        />
                                    </View>
                                }
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
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
                    <View style={styles.blurredView} />
                </TouchableWithoutFeedback>
                <View
                    style={styles.mainContainer}
                    backgroundColor={Colors[colorScheme].secondaryBackground}
                >
                    <ScrollView>

                        <Text style={styles.textStyle}>Please Rate me</Text>
                        <CustomRatingBar />
                        {/* <Text style={styles.textStyle} >
                            {defaultRating + ' / ' + maxRating.length}
                        </Text> */}
                        <View
                            backgroundColor={Colors[colorScheme].secondaryBackground}
                            marginTop={20}
                        >

                            <Formik
                                validationSchema={ratingValidationSchema}
                                initialValues={{
                                    RatingComment: "",
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
                                            name="ratingComment"
                                            title="Comment"
                                            placeholder={""
                                            }
                                            multiline={true}
                                            numberOfLines={4}
                                            backgroundColor={Colors[colorScheme].secondaryBackground}
                                        />
                                    </>
                                )}
                            </Formik>
                        </View>
                        <TouchableOpacity style={styles.btn}
                        // onPress={() => navigation.navigate('OrderDetails')}

                        >
                            <Text style={{ color: "black", fontSize: 18, fontWeight: 'bold' }}>
                                Submit
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>

        </Modal >
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%',
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
        alignItems: 'center',
    },
    starImgStyle: {
        width: 40,
        height: 40,
        resizeMode: 'cover'
    },
    customRatingBarStyle: {
        textAlign: 'center',
        flexDirection: 'row',
        marginTop: 60,
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 25,
        marginTop: 20,
        fontWeight: 'bold'
    },
    btn: {
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70,
        backgroundColor: 'orange',
        marginHorizontal: 20,
        borderRadius: 10,
    },
})

const ratingValidationSchema = yup.object().shape({
    deliveryDescription: yup
        .string()
        .min(3, ({ min }) => `The comment must be at least ${min} characters`)
        .max(200, ({ max }) => `The comment must be at most ${max} characters`)
        .required('The comment is required'),
});



export default RatingModal;
