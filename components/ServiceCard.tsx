import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { BASE_URL } from "../services/api.service";
import { default as Image } from "./ImageWithFallback";
import { Text, View } from "./Themed";

interface ServiceProps {
    service: any;
    onPress: () => void;
}

const ServiceCard = ({ service, onPress }: ServiceProps) => {
    const colorScheme = useColorScheme();
    return (
        <TouchableOpacity
            style={[styles.cardView, { backgroundColor: Colors[colorScheme].secondaryBackground }]}
            onPress={onPress}
        >
            <Image source={{ uri: BASE_URL + (service.imagePath || '') }} style={styles.serviceImage} />
            <View style={[styles.userInfo, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
                <Image style={styles.userPicture} source={{ uri: BASE_URL + (service.user.image || '') }} />
                <Text>{`${service.user.firstName} ${service.user.lastName}`}</Text>
            </View>
            <Text style={styles.serviceTitle}>{service.title}</Text>
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
                        : <Text style={[styles.serviceRating, { color: Colors[colorScheme].tint }]}>NOT RATED YET</Text>

                }
                <Text style={[styles.servicePrice, { color: Colors[colorScheme].tint }]}>FROM {service.price} TND</Text>
            </View>
        </TouchableOpacity>
    );
}

export default ServiceCard;
const styles = StyleSheet.create({
    cardView: {
        justifyContent: 'space-between',
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
        maxWidth: 300,
    },
    serviceImage: {
        width: 300,
        height: 200,
    },
    userInfo: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingBottom: 20
    },
    userPicture: {
        width: 30,
        height: 30,
        borderRadius: 30,
        marginRight: 15,
    },
    serviceTitle: {
        marginHorizontal: 10,
        marginBottom: 10,
        fontSize: 15,
        maxWidth: "100%",
    },
    serviceInfo: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingBottom: 20,
        justifyContent: 'space-between',
    },
    servicePrice: {
        flex: 10,
        textAlign: 'right',
    },
    serviceRating: {
        paddingLeft: 5
    }
})