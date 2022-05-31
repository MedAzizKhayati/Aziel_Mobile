import { Modal, TouchableWithoutFeedback, StyleSheet, View, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from './Themed';
import { useContext, useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { GlobalContext } from '../context/Provider';
import Image from '../components/ImageWithFallback'
import { formatURI } from '../utils/helpers';
import { Ionicons } from "@expo/vector-icons";

interface BottomPopupProps {
    onSubmit: (values: any) => void;
    onTouchOutside: () => void;
    visible: boolean;
    navigation: any,
    User: any
}
const userInformations = ({ onTouchOutside, visible, onSubmit, navigation, User }: BottomPopupProps) => {
    const colorScheme = useColorScheme();
    const isFocused = useIsFocused();
    const { authState: { user } } = useContext(GlobalContext);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onTouchOutside}
        >
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={() => onTouchOutside && onTouchOutside()}
                >
                    <View style={styles.blurredView} />
                </TouchableWithoutFeedback>
                <View
                    style={styles.mainContainer}
                    backgroundColor={Colors[colorScheme].secondaryBackground}
                >
                    <TouchableOpacity style={[styles.userInfo]} >
                        <Image style={styles.userPicture} source={{ uri: formatURI(User.profileImage) }} />
                        <View style={styles.infosContainer}>
                            <Text style={styles.userName}>{`${User.firstName} ${User.lastName}`}</Text>
                            <View style={{ flexDirection: 'row', backgroundColor: Colors[colorScheme].secondaryBackground }}>
                                <Ionicons
                                    size={18}
                                    name="star"
                                    color="orange"
                                />
                                <Text style={[styles.serviceRating, { color: Colors[colorScheme].btn }]}>{User.ratingAsSeller} ({User.reviewsCountAsSeller}) </Text>
                            </View>
                        </View>
                    </TouchableOpacity >
                    <ScrollView>
                        <Text darkColor='black' style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 20 }}> User information</Text>
                        <Text darkColor='black' style={{paddingHorizontal: 30, fontSize: 15, paddingLeft: 25, marginTop: 20 }}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </Text>
                        <View style={styles.overallRating}>
                            <Text darkColor='black' style={{ flex: 8, fontSize: 20, fontWeight: 'bold', paddingLeft: 20, marginTop: 20 }}> Overall Rating </Text>
                            <View style={{ marginTop: 28, flex: 2, flexDirection: 'row', backgroundColor: Colors[colorScheme].secondaryBackground }}>
                                <Ionicons
                                    size={18}
                                    name="star"
                                    color="orange"
                                />
                                <Text style={[styles.serviceRating, { color: Colors[colorScheme].btn }]}>{User.ratingAsSeller} </Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.btn}
                            onPress={() => navigation.navigate('OrderDetails')
                            }
                        >
                            <Text style={{ color: "black", fontSize: 18, fontWeight: 'bold' }}
                            >
                                Contact Seller
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>

        </Modal >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    blurredView: {
        flex: 3,
        width: '100%',
    },
    mainContainer: {
        flex: 8,
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 10,
    },
    title: {
        paddingVertical: 15,
        textAlign: 'center',
        fontSize: 25,
    },
    userInfo: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 20,
        marginTop: 20,
    },
    infosContainer: {
        marginTop: -5

    },
    userName: {
        fontSize: 18,
    },
    userPicture: {
        width: 50,
        height: 50,
        borderRadius: 30,
        marginRight: 15,
    },
    serviceRating: {
        paddingLeft: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    overallRating: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btn: {
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        backgroundColor: 'orange',
        marginHorizontal: 20,
        borderRadius: 10,
      },
});




export default userInformations;

