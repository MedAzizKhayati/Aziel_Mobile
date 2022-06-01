import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { formatDate, formatURI } from "../utils/helpers";
import { default as Image } from "./ImageWithFallback";
import { Text, View } from "./Themed";


interface ServiceProps {
    review: any;
    user: {};
}

const SmallReviewCard = ({ review, user }: ServiceProps) => {
    const colorScheme = useColorScheme();

    return (
        <TouchableOpacity
            style={[styles.cardView, { backgroundColor: Colors[colorScheme].secondaryBackground }]}
        >
            <View style={[styles.container, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
                <View style={[styles.userInfo, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
                    <Image style={styles.userPicture} source={{ uri: formatURI(user.profileImage) }} />
                    <Text style={styles.userName}>{`${user.firstName} ${user.lastName}`}</Text>
                </View>
                <Text darkColor='black' style={{ paddingHorizontal: 30, fontSize: 15, paddingLeft: 25, marginTop: 20 }}>
                    {review.comment}
                </Text>
                <View
                    style={styles.rating}
                    backgroundColor={Colors[colorScheme].secondaryBackground}
                >
                    <View style={{ flexDirection: 'row', backgroundColor: Colors[colorScheme].secondaryBackground }}>
                        <Ionicons
                            size={18}
                            name="star"
                            color="orange"
                        />
                        <Text style={[styles.reviewRating, { color: Colors[colorScheme].btn }]}>{review.rating} </Text>
                    </View>
                    <Text darkColor='black' style={{ backgroundColor: Colors[colorScheme].secondaryBackground, fontSize: 15, fontWeight: 'bold' }}>
                        {formatDate(review.createdAt)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default SmallReviewCard;
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
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    userName: {
        fontSize: 12,
    },
    userPicture: {
        width: 27,
        height: 27,
        borderRadius: 30,
        marginRight: 15,
    },
    reviewRating: {
        paddingLeft: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    rating: {
        width: '100%',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
})