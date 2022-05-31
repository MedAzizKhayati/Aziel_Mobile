import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { GlobalContext } from '../../context/Provider';
import useColorScheme from '../../hooks/useColorScheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import { formatDate } from '../../utils/helpers';

const track_order_status = [
    { title: 'Order Confirmed', sub_title: 'Your order has been received' },
    { title: 'Order in Progress', sub_title: 'Your order is on the way.' },
    { title: 'Order Delivered', sub_title: 'Your order has been delivered.' },
    { title: 'Rate me', sub_title: 'Help me improve my service.' }
];

const statusToStep = {
    'WAITING': 0,
    'IN_PROGRESS': 2,
    'COMPLETED': 3,
    'CANCELLED': 0,
    'REJECTED': 0,
}

export default function DeliveryScreen({ navigation, route }) {
    const { authDispatch } = useContext(GlobalContext);
    const colorScheme = useColorScheme();
    const isFocused = useIsFocused();
    const [currentStep, setCurrentStep] = useState(2);
    const [order, setOrder] = useState(route.params);


    useEffect(() => {
        if (!isFocused) return;
        setOrder(route.params);
        setCurrentStep(statusToStep[route.params.status]);
    }, [isFocused]);

    return (
        <View style={{ flex: 1, paddingHorizontal: 5 }}>
            <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: Colors[colorScheme].tertiaryBackground }}>Estimated Delivery </Text>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 25 }}>{formatDate(order.deliveryDate)}</Text>
            </View>
            <View style={{
                marginTop: 30,
                paddingHorizontal: 5,
                borderRadius: 2,
            }}>
                <View style={{
                    justifyContent: 'space-between',
                    marginBottom: 20,
                    paddingHorizontal: 10,
                }}>
                    <Text style={{ fontWeight: 'bold', paddingBottom: 5, fontSize: 20, marginLeft: 5 }}>
                        Track Order #
                    </Text>
                    <Text
                        style={{ color: Colors[colorScheme].tint, fontWeight: 'bold', fontSize: 15 }}
                    >
                        {order.id}
                    </Text>

                </View>
            </View>
            <ScrollView>

                <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
                    {track_order_status.map((item, index) => (
                        <View
                            key={item.title}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: -5 }}>
                                <MaterialCommunityIcons
                                    name="check-circle"
                                    size={40}
                                    style={{ color: index < currentStep ? Colors[colorScheme].btn : Colors[colorScheme].tertiaryBackground }}
                                />
                                <View style={{ marginLeft: 5 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.title}</Text>
                                    <Text style={{ fontSize: 18, height: 30, color: Colors[colorScheme].tertiaryBackground }}>{item.sub_title}</Text>
                                </View>
                            </View>
                            {index < track_order_status.length - 1
                                &&
                                <View>
                                    {index < currentStep &&
                                        <View style={{
                                            height: 50,
                                            width: 3,
                                            marginLeft: 18,
                                            backgroundColor: Colors[colorScheme].btn,
                                            zIndex: -1
                                        }}
                                        />
                                    }
                                    {index >= currentStep &&
                                        <MaterialCommunityIcons
                                            name="dots-vertical"
                                            size={50}
                                            resizeMode="cover"
                                            style={{
                                                width: 30,
                                                height: 50,
                                                marginLeft: -3,
                                                color: Colors[colorScheme].tertiaryBackground
                                            }}
                                        />
                                    }
                                </View>
                            }
                        </View>
                    ))}
                </View>
            </ScrollView>
            <View style={{
                flex: 5,
                justifyContent: 'center',
                paddingLeft: 10,
                paddingRight: 10
            }}>
                <TouchableOpacity style={{
                    backgroundColor: Colors[colorScheme].btn,
                    height: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    marginHorizontal: 50,
                    borderRadius: 10,
                }} onPress={() => navigation.navigate("Orders")}>

                    <Text
                        style={{ fontSize: 18, fontWeight: 'bold' }}
                        darkColor='black'
                    >
                        Go Back
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}