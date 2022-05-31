import React, { useContext } from 'react';
import { Modal, TouchableWithoutFeedback, StyleSheet, ScrollView, TouchableOpacity, Alert, } from 'react-native';
import Colors from '../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useColorScheme from '../hooks/useColorScheme';
import { GlobalContext } from '../context/Provider';
import { Text, View } from './Themed';
import { changeOrderStatus } from '../services/chat.service';
import { getOrderById } from '../services/orders.service';
import Toast from 'react-native-toast-message';


interface BottomPopupProps {
    onTouchOutside: () => void;
    visible: boolean;
    amount: Float32Array;
    navigation: any,
    order: any
}

const BottomPopup = ({ onTouchOutside, visible, navigation, order }: BottomPopupProps) => {
    const colorScheme = useColorScheme();
    const { authState: {
        user
    } } = useContext(GlobalContext);

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

    const onPayForOrder = () => {
        onTouchOutside && onTouchOutside();
        Alert.alert(
            'Payment',
            'Are you sure you want to pay for this order ?\n' +
            'Your available balance is ' + user.balance + ' TND.\n' +
            'You will be left with ' + (user.balance - order.total) + ' TND after this transaction.',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'OK', onPress: async () => {
                        onTouchOutside && onTouchOutside();
                        changeOrderStatus(order.id, 'IN_PROGRESS', '');
                        setTimeout(
                            async () => {
                                order = await getOrderById(order.id);
                                if (order.status === 'IN_PROGRESS')
                                    navigation.navigate('SuccessScreen', order );
                                else
                                    Toast.show({
                                        type: 'error',
                                        text1: 'Unexpected error occured, please try again later!',
                                    });
                            }
                            , 1000);

                    }
                },
            ],
        )
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
                        <Text darkColor='black' style={{ fontSize: 20, fontWeight: 'bold' }}> {order.price} TND </Text>
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
                                onPress={onPayForOrder}
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
                                onPress={onPayForOrder}
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
    },
    
});

export default BottomPopup;

