import { FontAwesome } from '@expo/vector-icons';
import { useContext, useEffect, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { ScrollView, Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { GlobalContext } from '../../context/Provider';
import useColorScheme from '../../hooks/useColorScheme';

import styles from './styles';

const getRandomImageURI = () => "https://picsum.photos/" + (Math.random() * (100) + 200).toFixed(0);

const ProfileScreen = ({ navigation }) => {
    const { authState, authDispatch } = useContext(GlobalContext);
    const colorScheme = useColorScheme();
    const [options, setOptions] = useState([]);
    useEffect(() => {
        const newOptions = [
            {
                title: "Dashboard",
                icon: "sliders"
            },
            {
                title: "Payment History",
                icon: "credit-card"
            },
            {
                title: "Statistics",
                icon: "chart-line"
            },
            {
                title: "Become An Affiliate",
                icon: "handshake"
            },
            {
                title: "Rewards",
                icon: "gift"
            },
            {
                title: "Logout",
                icon: "power-off",
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
                <FontAwesome
                    size={20}
                    style={{ position: "absolute", top: 15, right: 15 }}
                    name="sliders"
                    color={Colors[colorScheme].tint}
                />
                <Text style={styles.user}>
                    {authState.user?.firstName + " " + authState.user?.lastName}
                </Text>
            </View>
            <View style={[styles.optionsContainer]}>
                <ScrollView style={[styles.optionsScrollView, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
                    {
                        options.map((option, index) =>
                            <TouchableOpacity
                                key={index}
                                style={styles.optionButton}
                                onPress={option.onPress}
                            >
                                <FontAwesome
                                    size={20}
                                    style={{ flex: 1, marginTop: 7 }}
                                    name={option.icon}
                                    color={Colors[colorScheme].tint}
                                />
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