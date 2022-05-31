import React, { useState, useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { GlobalContext } from '../../context/Provider';
import { ScrollView, Text, View, TextInput } from '../../components/Themed';
import styles from '../OrderDetailsScreen/styles';
import useColorScheme from '../../hooks/useColorScheme';
import BottomPopup from '../../components/BottomPopup';
import Image from '../../components/ImageWithFallback';

const OrderDetailsScreen = ({ navigation, route }) => {
    const item = route.params;
    const {
        authState: {
            user
        }
    } = useContext(GlobalContext);
    const colorScheme = useColorScheme();
    const [isVisible, setIsVisible] = useState(false);

    const onShowPopup = () => {
        setIsVisible(true);
    }
    const onClosePopup = () => {
        setIsVisible(false);
    }

    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
            }}>
            <ScrollView>
                <View style={{ paddingHorizontal: 16 }}>
                    <TouchableOpacity
                        style={styles.serviceContainer}>
                        <View
                            style={styles.imageContainer}>
                            <Image
                                style={styles.image}
                            />
                        </View>
                        <View
                            style={{
                                flex: 1,
                                height: '100%',
                                justifyContent: 'space-around',
                            }}>
                            <View >
                                <Text
                                    style={{
                                        fontSize: 18,
                                        maxWidth: '100%',
                                        color: Colors[colorScheme].tint,
                                        fontWeight: '600',
                                        letterSpacing: 1,
                                    }}>
                                    {item.title}
                                </Text>
                                <View
                                    style={{
                                        marginTop: 4,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        opacity: 0.6,
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: '400',
                                            maxWidth: '85%',
                                            marginRight: 4,
                                        }}>
                                        {item.price} TND
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>

                    <View
                        style={{
                            paddingHorizontal: 16,
                            marginTop: 40,
                            marginBottom: 80,
                        }}>
                        <Text
                            style={{
                                fontSize: 20,
                                color: Colors[colorScheme].tint,
                                fontWeight: 'bold',
                                letterSpacing: 1,
                                marginBottom: 20,
                            }}>
                            Order Info
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 8,
                            }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    maxWidth: '80%',
                                    color: Colors[colorScheme].tint,
                                    opacity: 0.5,
                                }}>
                                Subtotal
                            </Text>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: Colors[colorScheme].tint,
                                    opacity: 0.8,
                                }}>
                                {item.price} TND
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 22,
                            }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    maxWidth: '80%',
                                    color: Colors[colorScheme].tint,
                                    opacity: 0.5,
                                }}>
                                Shipping Tax
                            </Text>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: Colors[colorScheme].tint,
                                    opacity: 0.8,
                                }}>
                                10 TND
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    maxWidth: '80%',
                                    color: Colors[colorScheme].tint,
                                    opacity: 0.5,
                                }}>
                                Total
                            </Text>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    color: Colors[colorScheme].tint,
                                }}>
                                {parseFloat(item.price) + 10} TND
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={{
                    backgroundColor: Colors[colorScheme].btn,
                    height: 55,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 40,
                    marginHorizontal: 20,
                    borderRadius: 10,
                }} onPress={onShowPopup} >
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                        Order Now
                    </Text>
                </TouchableOpacity>
            </View>
            <BottomPopup
                onTouchOutside={onClosePopup}
                visible={isVisible}
                amount={parseFloat(item.price) + 10}
                navigation={navigation}
            />
        </View>
    );
};

export default OrderDetailsScreen;