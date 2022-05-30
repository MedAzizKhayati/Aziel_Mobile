import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { BASE_URL } from "../services/api.service";
import { formatURI } from "../utils/helpers";
import { default as Image } from "./ImageWithFallback";
import { Text, View } from "./Themed";

interface ServiceProps {
    service: any;
    onPress: () => void;
}

const SmallServiceCard = ({ service, onPress }: ServiceProps) => {
    const colorScheme = useColorScheme();
    return (
        <TouchableOpacity
            style={[styles.cardView, { backgroundColor: Colors[colorScheme].secondaryBackground }]}
            onPress={onPress}
        >
            <Image source={{ uri: formatURI(service.imagePath) }} style={styles.serviceImage} />
            <View style={[styles.container, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
                <View style={[styles.userInfo, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
                    <Image style={styles.userPicture} source={{ uri: formatURI(service.user.profileImage) }} />
                    <Text style={styles.userName}>{`${service.user.firstName} ${service.user.lastName}`}</Text>
                </View>
                <Text style={styles.serviceTitle}>{service?.title.length <= 80 ? service?.title : service?.title.slice(0, 80) + '...'} </Text>
                <View style={[styles.serviceInfo, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
                    {
                        service.reviewsCount ?
                            <>
                                <Ionicons
                                    size={20}
                                    name="star"
                                    color="orange"
                                />
                                <Text style={[styles.serviceRating, { color: Colors[colorScheme].tint }]}>{service.rating} ({service.reviewsCount})</Text>

                            </>
                            : <Text style={[styles.serviceRating, { color: Colors[colorScheme].tint }]}>NOT RATED</Text>

                    }
                    <Text style={[styles.servicePrice, { color: Colors[colorScheme].tint }]}>FROM {service.price} TND</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default SmallServiceCard;
const styles = StyleSheet.create({
    cardView: {
        justifyContent: 'space-between',
        flexDirection: "row",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 3,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 5,
        overflow: 'hidden',
        margin: 10,
        maxWidth: "100%",
    },
    serviceImage: {
        width: 175,
        height: 140,
    },
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    userInfo: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingBottom: 20
    },
    userName:{
        fontSize: 12,
    },
    userPicture: {
        width: 27,
        height: 27,
        borderRadius: 30,
        marginRight: 15,
    },
    serviceTitle: {
        marginHorizontal: 10,
        marginBottom: 10,
        fontSize: 13,
        maxWidth: "100%",
    },
    serviceInfo: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingBottom: 5,
        justifyContent: 'space-around',
    },
    servicePrice: {
        flex: 10,
        textAlign: 'right',
        fontSize: 13
    },
    serviceRating: {
        paddingLeft: 5,
        fontSize: 13
    }
})