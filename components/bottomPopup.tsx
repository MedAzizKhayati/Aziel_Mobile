import React, { useContext } from 'react';
import { Modal, TouchableWithoutFeedback, StyleSheet, ScrollView, TouchableOpacity, } from 'react-native';
import Colors from '../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useColorScheme from '../hooks/useColorScheme';
import { GlobalContext } from '../context/Provider';
import { Text, View } from './Themed';
interface BottomPopupProps {
    onTouchOutside: () => void;
    visible: boolean;
    amount: Float32Array;
    navigation: any
}

const BottomPopup = ({ onTouchOutside, visible, amount, navigation }: BottomPopupProps) => {
    const colorScheme = useColorScheme();

    const RenderOutsideTouchable = ({ onTouch }: { onTouch: () => void }) => {
        return (
            <TouchableWithoutFeedback
                onPress={() => onTouch && onTouch()}
                style={{ flex: 1, width: '100%' }}
            >
                <View
                    style={{ flex: 6, width: '100%', backgroundColor: 'none' }}
                >
                </View>
            </TouchableWithoutFeedback>
        )
    }

    const onSuccess = () => {
        onTouchOutside && onTouchOutside();
        navigation.navigate('SuccessScreen');
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <View
                style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'none' }}>
                <RenderOutsideTouchable onTouch={onTouchOutside} />
                <View style={{
                    display: 'flex',
                    backgroundColor: Colors[colorScheme].secondaryBackground,
                    width: '100%',
                    justifyContent: 'space-around',
                    flexDirection: 'column',
                    paddingTop: 20,
                    borderTopEndRadius: 5,
                    borderTopStartRadius: 5,
                }}>
                    <View style={styles.paymentView}>
                        <Text darkColor='black' style={{ fontSize: 20, fontWeight: 'bold' }}> Payable Amount</Text>
                        <Text darkColor='black' style={{ fontSize: 20, fontWeight: 'bold' }}> {amount} TND </Text>
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            height: 100,
                            padding: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                        }}
                        backgroundColor={Colors[colorScheme].secondaryBackground}
                    >
                        <MaterialCommunityIcons
                            name="truck-delivery-outline"
                            size={50}
                            color={Colors[colorScheme].text}
                            style={{ width: 50, height: 50 }}
                        />
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>Address Used To Delivery</Text>
                    </View>
                    <ScrollView horizontal>
                        <View
                            style={[styles.paymentOptions]}
                        >
                            <TouchableOpacity
                                onPress={onSuccess}
                                style={[styles.options]}
                            >
                                <MaterialCommunityIcons
                                    name="cash"
                                    size={70}
                                    color={Colors[colorScheme].text}
                                />
                                <Text style={styles.optionText}>Pay With Balance</Text>
                            </TouchableOpacity>

                        </View>
                        <View
                            style={styles.paymentOptions}
                        >
                            <TouchableOpacity
                                onPress={onSuccess}
                                style={styles.options}
                            >
                                <MaterialCommunityIcons
                                    name="credit-card"
                                    size={70}
                                    color={Colors[colorScheme].text}
                                />
                                <Text style={styles.optionText}>Card Payment</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    paymentView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: 'orange',
        borderRadius: 4,
    },
    paymentOptions: {
        flex: 1,
        margin: 10,
        borderRadius: 10,
        borderWidth: 2,
        height: 125,
        width: 175,
    },
    options: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    optionText: {
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default BottomPopup;

