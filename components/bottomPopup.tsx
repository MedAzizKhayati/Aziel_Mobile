import React, { useContext } from 'react';
import { Modal, TouchableWithoutFeedback, StyleSheet, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import Colors from '../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useColorScheme from '../hooks/useColorScheme';
import { GlobalContext } from '../context/Provider';
interface BottomPopupProps {
    onTouchOutside: () => void;
    visible: boolean;
    amount: Float32Array;
    navigation:any
}

const BottomPopup = ({ onTouchOutside, visible, amount, navigation }: BottomPopupProps) => {
    const colorScheme = useColorScheme();

    const RenderOutsideTouchable = ({ onTouch }: { onTouch: () => void }) => {
        return (
            <TouchableWithoutFeedback onPress={() => onTouch && onTouch()} style={{ flex: 1, width: '100%' }}>
                <View style={{ flex: 6, width: '100%' }}>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    const onTapPlaceOrder = () => {
        console.log("CashOnDelivery");
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <RenderOutsideTouchable onTouch={onTouchOutside} />
                <View style={{
                    display: 'flex',
                    backgroundColor: Colors[colorScheme].secondaryBackground,
                    width: '100%',
                    justifyContent: 'space-around',
                    flexDirection: 'column'
                }}>
                    <View style={styles.paymentView}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}> Payable Amount</Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}> {amount} TND </Text>
                    </View>
                    <View style={{ display: 'flex', height: 100, padding: 20, flexDirection: 'row' }}>
                        <MaterialCommunityIcons
                            name="truck-delivery-outline"
                            size={50}
                            color="black"
                            style={{ width: 50, height: 50 }}
                        />
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>Address Used To Delivery</Text>
                        </View>
                    </View>
                    <ScrollView horizontal={true}>
                        <View style={styles.paymentOptions}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("SuccessScreen" )}
                                style={styles.options}
                            >
                                <MaterialCommunityIcons
                                    name="cash"
                                    size={70}
                                    color="black"
                                    style={styles.icon}
                                />

                                <Text style={styles.optionText}>Cash On Delivery</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("SuccessScreen")}
                                style={styles.options}
                            >
                                <MaterialCommunityIcons
                                    name="credit-card"
                                    size={70}
                                    color="black"
                                    style={styles.icon}
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
        margin: 5,
        backgroundColor: 'orange'
    },
    paymentOptions: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        margin: 20,
    },
    options: {
        display: 'flex',
        height: 120,
        width: 160,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,
        margin: 2
    },
    icon: {
        width: 100,
        height: 80,
    },
    optionText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    }
});

export default BottomPopup;

