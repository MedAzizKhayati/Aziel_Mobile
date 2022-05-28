import { AntDesign, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useContext, useEffect, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import SwipeButton from '../../components/SwipeButton';
import { ScrollView, Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { GlobalContext } from '../../context/Provider';
import useColorScheme from '../../hooks/useColorScheme';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getRandomImageURI = () => "https://picsum.photos/" + (Math.random() * (100) + 200).toFixed(0);

const ProfileScreen = ({ navigation }) => {
    const { authState, authDispatch } = useContext(GlobalContext);
    const colorScheme = useColorScheme();
    const [options, setOptions] = useState([]);
    const changeMode = async (mode) => {
        authDispatch({ type: mode });
        await AsyncStorage.setItem('mode', mode);
    }
    useEffect(async () => {
        const newOptions = [
            {
                title: "Dashboard",
                icon: "sliders",
                component: FontAwesome
            },
            {
                title: "Payment History",
                icon: "credit-card",
                component: FontAwesome
            },
            {
                title: "Statistics",
                icon: "areachart",
                component: AntDesign
            },
            {
                title: "Become An Affiliate",
                icon: "hands-helping",
                component: FontAwesome5
            },
            {
                title: "Rewards",
                icon: "gift",
                component: FontAwesome
            },
            {
                title: "Logout",
                icon: "logout",
                component: AntDesign,
                onPress: () => authDispatch({ type: 'LOGOUT' })
            },
        ];
        setOptions(newOptions);
    }, []);
    return (
        <View style={styles.container}>
            <View style={[styles.titleContainer, { backgroundColor: Colors[colorScheme].background }]}>
                <Text style={styles.title}>Profile</Text>
            </View>
            <View style={[styles.photoContainer, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
                <Image
                    style={styles.photo}
                    source={{ uri: getRandomImageURI() }}
                />
                <MaterialCommunityIcons
                    name="account-edit"
                    size={20}
                    style={{ position: "absolute", top: 15, right: 15 }}
                    color={Colors[colorScheme].tint}
                    onPress={() => navigation.navigate('EditProfile')}
                />

                <Text style={styles.user}>
                    {authState.user?.firstName + " " + authState.user?.lastName}
                </Text>
            </View>
            <View style={[styles.optionsContainer, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
                <ScrollView style={[styles.optionsScrollView, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
                    <View style={[styles.optionButton, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
                        <Text style={styles.textOption}>Seller Mode</Text>
                        <SwipeButton
                            onToggle={isToggled => {
                                isToggled ? changeMode('SELLER_MODE') : changeMode('BUYER_MODE');
                            }}
                            isToggled={!authState.buyerMode}
                            size={55}
                        />
                    </View>
                    {
                        options.map((option, index) =>
                            <TouchableOpacity
                                key={index}
                                style={[styles.optionButton]}
                                onPress={option.onPress}
                            >
                                {
                                    <option.component
                                        color={Colors[colorScheme].tint}
                                        size={20}
                                        style={{ flex: 1, marginTop: 7 }}
                                        name={option.icon}
                                    />
                                }
                                <Text style={styles.textOption}>{option.title}</Text>
                            </TouchableOpacity>
                        )
                    }

                </ScrollView>
            </View>
        </View>
    );
}

export default ProfileScreen;