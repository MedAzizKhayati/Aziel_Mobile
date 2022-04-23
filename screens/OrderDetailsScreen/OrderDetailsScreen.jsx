import React, { useState, useEffect, useContext } from 'react';
import {
    TouchableOpacity,
    Image,
    ToastAndroid,
} from 'react-native';
import Colors from '../../constants/Colors';
import { GlobalContext } from '../../context/Provider';
import { ScrollView, Text, View, TextInput } from '../../components/Themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../OrderDetailsScreen/styles';
import useColorScheme from '../../hooks/useColorScheme';

const OrderDetailsScreen = ({ navigation, route }) => {

    const item = route.params;
    const { authState, authDispatch } = useContext(GlobalContext);
    const colorScheme = useColorScheme();
    const getRandomImageURI = () => "https://picsum.photos/" + (Math.random() * (100) + 200).toFixed(0);

    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
                position: 'relative',
            }}>
            <ScrollView>
                <View
                    style={styles.firstView}
                >
                    {/* <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons
                            name="chevron-left"
                            style={{
                                fontSize: 14,
                                color: 'grey',
                                padding: 12,
                                backgroundColor: 'white',
                                borderRadius: 12,
                            }}
                        />
                    </TouchableOpacity> */}
                    <Text
                        style={{
                            fontSize: 18,
                            color: Colors[colorScheme].tint,
                            fontWeight: 'bold',
                        }}>
                        Order Details
                    </Text>
                    <View></View>
                </View>
                <View style={{ paddingHorizontal: 16 }}>
                    <TouchableOpacity
                        style={styles.serviceContainer}>
                        <View
                            style={{
                                width: '30%',
                                height: 100,
                                padding: 14,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor:'grey',
                                borderRadius: 10,
                                marginRight: 22,
                            }}>
                            <Image
                                                source={{ uri: getRandomImageURI() }}
                                style={{
                                    width: '150%',
                                    height: '150%',
                                    resizeMode: 'contain',
                                    borderRadius:10,
                                }}
                            />
                        </View>
                        <View
                            style={{
                                flex: 1,
                                height: '100%',
                                justifyContent: 'space-around',
                            }}>
                            <View style={{}}>
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
                            marginVertical: 10,
                        }}>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: Colors[colorScheme].tint,
                                //fontWeight: '600',
                                fontWeight: 'bold',
                                letterSpacing: 1,
                                marginBottom: 20,
                            }}>
                            Delivery Location
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    width: '80%',
                                    alignItems: 'center',
                                }}>
                                <View
                                    style={{
                                        color: 'blue',
                                        backgroundColor: 'grey',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 12,
                                        borderRadius: 10,
                                        marginRight: 18,
                                    }}>
                                    <MaterialCommunityIcons
                                        name="truck-delivery-outline"
                                        style={{
                                            fontSize: 20,
                                            color: 'blue',
                                        }}
                                    />
                                </View>
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            color: Colors[colorScheme].tint,
                                            fontWeight: '500',
                                        }}>
                                        La Soukra.
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            color: Colors[colorScheme].tint,
                                            fontWeight: '400',
                                            lineHeight: 20,
                                            opacity: 0.5,
                                        }}>
                                        0162 fgsgf
                                    </Text>
                                </View>
                            </View>
                            <MaterialCommunityIcons
                                name="chevron-right"
                                style={{ fontSize: 22, color: Colors[colorScheme].tint }}
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            paddingHorizontal: 16,
                            marginVertical: 10,
                        }}>
                        <Text
                            style={{
                                fontSize: 18,
                                color: Colors[colorScheme].tint,
                                //fontWeight: '600',
                                fontWeight: 'bold',
                                letterSpacing: 1,
                                marginBottom: 20,
                            }}>
                            Payment Method
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    width: '80%',
                                    alignItems: 'center',
                                }}>
                                <View
                                    style={{
                                        color: 'blue',
                                        backgroundColor:'grey',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 12,
                                        borderRadius: 10,
                                        marginRight: 18,
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: '900',
                                            color:'blue',
                                            letterSpacing: 1,
                                        }}>
                                        VISA
                                    </Text>
                                </View>
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            color: Colors[colorScheme].tint,
                                            fontWeight: '500',
                                        }}>
                                        Visa Classic
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            color: Colors[colorScheme].tint,
                                            fontWeight: '400',
                                            lineHeight: 20,
                                            opacity: 0.5,
                                        }}>
                                        ****-9092
                                    </Text>
                                </View>
                            </View>
                            <MaterialCommunityIcons
                                name="chevron-right"
                                style={{ fontSize: 22, color: Colors[colorScheme].tint }}
                            />
                        </View>
                    </View>
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
                                //fontWeight: '500',
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
                                   // fontWeight: '400',
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
                                    //fontWeight: '400',
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
                                    //fontWeight: '400',
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
                                    //fontWeight: '400',
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
                                    //fontWeight: '400',
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
                                    //fontWeight: '500',
                                    fontWeight: 'bold',
                                    color: Colors[colorScheme].tint,
                                }}>
                            {parseFloat(item.price) + 10} TND
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View
                style={{
                    position: 'absolute',
                    bottom: 10,
                    height: '8%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>

            </View>
        </View>
    );
};

export default OrderDetailsScreen;