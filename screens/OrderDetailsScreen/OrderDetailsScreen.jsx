import React, { useState, useContext, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { GlobalContext } from '../../context/Provider';
import { ScrollView, Text, View } from '../../components/Themed';
import styles from '../OrderDetailsScreen/styles';
import useColorScheme from '../../hooks/useColorScheme';
import BottomPopup from '../../components/BottomPopup';
import Image from '../../components/ImageWithFallback';
import { useIsFocused } from '@react-navigation/native';

const OrderDetailsScreen = ({ navigation, route }) => {
    const isFocused = useIsFocused();
    const [order, setOrder] = useState(route.params);

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

    useEffect(() => {
        if (!isFocused) return;
        setOrder(route.params);
    }, [isFocused])

    return (
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
                                {order.title}
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
                                    {order.price} TND
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
                            fontWeight: 'bold',
                            letterSpacing: 1,
                            marginBottom: 20,
                        }}>
                        Service
                    </Text>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 20,
                        }}
                        onPress={() => navigation.navigate('ServiceDetails', { service: order.service })}
                    >
                        <Image
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 5,
                            }}
                        />
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: '600',
                                marginLeft: 16,
                                letterSpacing: 1,
                            }}
                        >
                            {order.service.title}
                        </Text>
                    </TouchableOpacity>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            letterSpacing: 1,
                            marginBottom: 20,
                        }}>
                        Description
                    </Text>
                    <Text
                        style={{
                            fontSize: 14,
                            color: Colors[colorScheme].tint,
                            letterSpacing: 1,
                            marginBottom: 20,
                        }}
                    >
                        {order.description}
                    </Text>
                    <Text
                        style={{
                            fontSize: 20,
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
                            {parseFloat(order.price).toFixed(2)} TND
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
                            Fees
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: Colors[colorScheme].tint,
                                opacity: 0.8,
                            }}>
                            {parseFloat(order.total - order.price).toFixed(2)} TND
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
                            {parseFloat(order.total).toFixed(2)} TND
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={{
                    backgroundColor: Colors[colorScheme].btn,
                    height: 55,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 20,
                    borderRadius: 10,
                }} onPress={onShowPopup} >
                    <Text darkColor='black' style={{ fontSize: 18, fontWeight: 'bold' }}>
                        Order Now
                    </Text>
                </TouchableOpacity>
            </View>
            <BottomPopup
                onTouchOutside={onClosePopup}
                visible={isVisible}
                navigation={navigation}
                order={order}
            />
        </ScrollView>

    );
};

export default OrderDetailsScreen;