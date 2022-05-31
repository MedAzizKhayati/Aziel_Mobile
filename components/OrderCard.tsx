import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import { Text, View } from './Themed';
interface OrderProps {
    order: any;
}
const OrderCard = ({ order }: OrderProps) => {
    const colorScheme = useColorScheme();
    const [status, setStatus] = useState(order.status);
    const [statusIcon, setStatusIcon] = useState("progress-clock");
    const [statusMessage, setStatusMessage] = useState('IN PROGRESS')

    useEffect(() => {
        if (status === 'IN_PROGRESS') {
            setStatusMessage("IN PROGRESS");
            setStatusIcon("progress-clock");
        } else if (status === "COMPLETED") {
            setStatusMessage("DELIVERED");
            setStatusIcon("done-all");
        } else if (status === "CANCELLED") {
            setStatusMessage("CANCELLED");
            setStatusIcon("cancel");
        }
    }, [status]);

    return (
        <TouchableOpacity style={styles.container}>
            <View
                style={styles.details_container}
                lightColor={Colors[colorScheme].secondaryBackground}
                darkColor={Colors[colorScheme].secondaryBackground}
            >
                <View
                    style={styles.infos}
                    lightColor={Colors[colorScheme].secondaryBackground}
                    darkColor={Colors[colorScheme].secondaryBackground}
                >
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Order ID # </Text>
                    <Text style={{ fontSize: 12 }}>{order.id}</Text>
                    <Text style={{ fontSize: 24, fontWeight: '700', color: 'yellow' }}>{order.total} TND</Text>
                </View>
                <View
                    style={styles.image_container}
                    lightColor={Colors[colorScheme].secondaryBackground}
                    darkColor={Colors[colorScheme].secondaryBackground}
                >
                    <MaterialCommunityIcons
                        name={statusIcon}
                        size={40}
                        color= {Colors[colorScheme].text}
                    />
                    <Text style={{paddingTop: 5, fontSize: 12, color: Colors[colorScheme].tint }}>{statusMessage}</Text>
                    <Text
                        style={{
                            paddingVertical: 5,
                            fontSize: 14,
                            fontWeight: '600',
                            color: Colors[colorScheme].tint,
                            textAlign: 'center',
                        }}>
                        Due to {new Date(order.createdAt).toLocaleDateString("en-US")}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    image_container: {
        flex: 1,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        margin: 10,
        borderRadius: 20,
        justifyContent: 'flex-start',
        borderWidth: 1,
        flexDirection: 'row',
        overflow: 'hidden'
    },
    details_container: {
        width: "100%",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    infos: {
        flex: 3,
        padding: 5,
        marginTop: 5,
        paddingLeft: 20,
        justifyContent: "space-around",
    }
});

export { OrderCard }