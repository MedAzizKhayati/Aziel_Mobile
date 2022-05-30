import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, useColorScheme } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
            <View style={styles.details_container}>
                <View style={styles.infos}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Order ID # {order.id}</Text>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#1C1C1C' }}>{new Date(order.createdAt).toLocaleDateString("en-US")}</Text>
                    <Text style={{ fontSize: 24, fontWeight: '700', color: 'orange' }}>{order.total} TND</Text>
                </View>
                <View style={styles.image_container}>
                    <MaterialCommunityIcons
                        name={statusIcon}
                        size={40}
                        color="black"
                    />
                    <Text style={{ fontSize: 12, color: '#1C1C1C' }}>{statusMessage}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    image_container: {
        display: "flex",
        flex: 3,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        display: 'flex',
        flex: 1,
        width: Dimensions.get('screen').width - 20,
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#DCDCDC',
        height: 100,
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: 'grey',
        flexDirection: 'row'
    },
    details_container: {
        display: "flex",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    infos: {
        display: "flex",
        flex: 8,
        padding: 5,
        marginTop: 5,
        paddingLeft: 20,
        justifyContent: "space-around",
    }
})

export { OrderCard }