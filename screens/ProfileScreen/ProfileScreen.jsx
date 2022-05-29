import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useContext, useEffect, useState } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import SwipeButton from '../../components/SwipeButton';
import { ScrollView, Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { GlobalContext } from '../../context/Provider';
import useColorScheme from '../../hooks/useColorScheme';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { updateProfilePicture } from '../../services/user.service';
import Toast from 'react-native-toast-message';
import { default as Image } from '../../components/ImageWithFallback';
import { BASE_URL } from '../../services/api.service';
import { setUserContext } from '../../context/reducers/auth';
import { BlurView } from 'expo-blur';
import BUYER_OPTIONS from './BUYER_OPTIONS';
import SELLER_OPTIONS from './SELLER_OPTIONS';


const ProfileScreen = ({ navigation }) => {
    const { authState: { user, buyerMode }, authDispatch } = useContext(GlobalContext);
    const colorScheme = useColorScheme();
    const [options, setOptions] = useState([]);
    const [image, setImage] = useState(null);
    const [oldImage, setOldImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const changeMode = async (mode) => {
        authDispatch({ type: mode });
        await AsyncStorage.setItem('mode', mode);
    }

    useEffect(async () => {
        setOptions(buyerMode ? BUYER_OPTIONS : SELLER_OPTIONS);
    }, []);

    useEffect(async () => {
        if (!image || image === oldImage) return;
        const formData = new FormData();
        formData.append('file', { ...image, name: image.uri.split('/').pop(), type: 'multipart/form-data' });
        try {
            await updateProfilePicture(formData);
            Toast.show({
                type: 'success',
                text1: 'Your profile picture has been updated successfully',
                topOffset: 80,
            });
            setOldImage(image);
            setUserContext(authDispatch);
        } catch (error) {
            if (error?.response?.data)
                Toast.show({
                    type: 'error',
                    text1: error.response.data.message,
                });
            else
                Toast.show({
                    type: 'error',
                    text1: 'Something went wrong, please try again.',
                });
        }
    }, [image]);

    const handleChoosePhoto = () => {
        const options = {
            noData: true,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
        };
        ImagePicker.launchImageLibraryAsync(options)
            .then(response => {
                if (response.uri) {
                    setImage(response);
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <View style={styles.container} >
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >
                <BlurView
                    style={styles.modalContainer}
                    intensity={100}
                    tint="dark"
                >
                    <Image
                        style={styles.photoModal}
                        source={{ uri: BASE_URL + (user?.profileImage?.split('\\').join('/') || '') }}
                    />
                </BlurView >
            </Modal>
            <View style={[styles.titleContainer, { backgroundColor: Colors[colorScheme].background }]}>
                <Text style={styles.title}>Profile</Text>
            </View>
            <View style={[styles.photoContainer, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
                <TouchableOpacity
                    style={{ backgroundColor: Colors[colorScheme].secondaryBackground }}
                    onPress={handleChoosePhoto}
                    onLongPress={() => setModalVisible(true)}
                    onPressOut={() => setModalVisible(false)}
                >
                    <Image
                        style={styles.photo}
                        source={{ uri: BASE_URL + (user?.profileImage?.split('\\').join('/') || '') }}
                    />
                    <MaterialIcons
                        name="add-a-photo"
                        size={30}
                        color={Colors[colorScheme].tint}
                        style={styles.editPhotoIcon}
                    />
                </TouchableOpacity>
                <MaterialCommunityIcons
                    name="account-edit"
                    size={30}
                    style={{ position: "absolute", top: 15, right: 15 }}
                    color={Colors[colorScheme].tint}
                    onPress={() => navigation.navigate('EditProfile')}
                />
                <Text style={styles.user}>
                    {user?.firstName + " " + user?.lastName}
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
                            isToggled={!buyerMode}
                            size={55}
                        />
                    </View>
                    {
                        options.map((option, index) =>
                            <TouchableOpacity
                                key={index}
                                style={[styles.optionButton]}
                                onPress={() => option.onPress({ navigation, authDispatch })}
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