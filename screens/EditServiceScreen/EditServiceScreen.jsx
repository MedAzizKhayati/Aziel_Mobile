import useColorScheme from '../../hooks/useColorScheme';
import { ScrollView, Text, View } from '../../components/Themed';
import { ToastAndroid, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import styles from './styles';
import { default as Image } from '../../components/ImageWithFallback';
import { BASE_URL } from '../../services/api.service';
import RatingStars from '../../components/RatingStars';
import { TextInput } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { getServiceById, updateService, updateServicePicture } from '../../services/services.service';
import { MaterialIcons } from '@expo/vector-icons';

const serviceValidationSchema = yup.object().shape({
    title: yup
        .string()
        .matches(/^[a-zA-Z ]*$/, "Only letters are allowed")
        .min(10, ({ min }) => `Service Title must be at least ${min} characters`)
        .max(30, ({ max }) => `Service Title must be at most ${max} characters`)
        .required('The Title is required'),
    description: yup
        .string()
        .min(50, ({ min }) => `The description must be at least ${min} characters`)
        .max(200, ({ max }) => `The description must be at most ${max} characters`)
        .required('The description is required'),
    price: yup
        .number()
        //.min(5, ({ min }) => `The price must be at least ${min}`)
        .max(10000, ({ max }) => `The price must be at most ${max}`)
        .required('Price is required'),
    categoryId: yup
        .string()
        .required('Category is required'),
});


const EditServiceScreen = ({ navigation, route }) => {
    const [service, setService] = useState(route.params.service);
    const [touched, setTouched] = useState(false);
    const [image, setImage] = useState(null);
    const [oldImage, setOldImage] = useState(null);
    const [serviceValues, setServiceValues] = useState({
        title: service?.title,
        description: service?.description,
        price: service?.price,
        categoryId: service?.category.id
    });
    const [errors, setErrors] = useState([]);
    const colorScheme = useColorScheme();

    useEffect(() => {
        setService(route.params.service);
    }, [route.params.service]);

    const submitChanges = async () => {
        setTouched(false);
        try {
            await serviceValidationSchema.validate(serviceValues, { abortEarly: false });
            setErrors([]);
        } catch ({ errors }) {
            setErrors(errors);
            Toast.show({
                type: 'error',
                text1: 'Please check all the fields',
            });
            return;
        }
        try {
            const updatedService = await updateService(service.id, serviceValues);
            Toast.show({
                type: 'success',
                text1: 'Your service has been updated successfully',
                topOffset: 80,
            });
        } catch (err) {
            Toast.show({
                type: 'error',
                text1: err.response.data.message,
            });
        }
    }

    useEffect(async () => {
        if (!image || image === oldImage) return;
        const formData = new FormData();
        formData.append('file', { ...image, name: image.uri.split('/').pop(), type: 'multipart/form-data' });
        try {
            await updateServicePicture(service.id, formData);
            Toast.show({
                type: 'success',
                text1: 'Your service picture has been updated successfully',
                topOffset: 80,
            });
            setOldImage(image);
            setService(await getServiceById(service.id));
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
            aspect: [4, 3],
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

    const onTextChange = (name) => (value) => {
        setServiceValues({ ...serviceValues, [name]: value });
        if (!touched) setTouched(true);
    };

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                ...styles.container,
                backgroundColor: Colors[colorScheme].background,
            }}>
            <TouchableOpacity
                onPress={handleChoosePhoto}
            >
                <Image
                    style={styles.headerImage}
                    source={{ uri: BASE_URL + service.imagePath }}
                />
                <MaterialIcons
                    name="add-a-photo"
                    size={30}
                    color={Colors[colorScheme].tint}
                    style={styles.editPhotoIcon}
                />
            </TouchableOpacity>
            <View>
                <View style={styles.serviceDetailsContainer}>
                    <TextInput
                        style={{
                            ...styles.serviceTitle,
                            color: Colors[colorScheme].text,
                        }}
                        onChangeText={onTextChange('title')}
                    >
                        {service.title}
                    </TextInput>
                    <Text
                        style={{
                            ...styles.categoryTitle,
                            color: Colors[colorScheme].tint,
                        }}>
                        {service.category.title}
                    </Text>
                    <View style={styles.serviceRatingContainer}>
                        <View style={{ flexDirection: 'row', alignservices: 'center' }}>
                            <RatingStars
                                rating={service.rating}
                                size={20}
                            />
                            <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 5 }}>
                                {service.rating}
                            </Text>
                        </View>
                        <Text style={{ fontSize: 13, color: Colors[colorScheme].tint }}>{service.reviewsCount} Reviews</Text>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <TextInput
                            multiline
                            style={{ lineHeight: 20, color: Colors[colorScheme].tint }}
                            onChangeText={onTextChange('description')}
                        >
                            {service.description}
                        </TextInput>
                    </View>
                </View>
                <View style={styles.initialPriceContainer}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                        From
                    </Text>
                    <View style={styles.priceTag}>
                        <TextInput
                            style={styles.priceText}
                            onChangeText={onTextChange('price')}
                            keyboardType='numeric'
                        >
                            {service.price}
                        </TextInput>
                        <Text style={styles.priceText}>
                            TND
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        ...styles.submitButton,
                        opacity: touched ? 1 : 0.5
                    }}
                    onPress={() => submitChanges()}
                    disabled={!touched}

                >
                    <Text style={styles.submitText}>
                        Apply Changes
                    </Text>
                </TouchableOpacity>
                {
                    errors &&
                    errors.map(
                        (err, i) =>
                            <Text key={i} style={styles.errorText}>
                                {err}
                            </Text>
                    )
                }
            </View>
        </ScrollView>
    )
}
export default EditServiceScreen;