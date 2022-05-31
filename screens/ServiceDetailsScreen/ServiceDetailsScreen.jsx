import useColorScheme from '../../hooks/useColorScheme';
import { ScrollView, Text, View } from '../../components/Themed';
import { TouchableOpacity, ImageBackground } from 'react-native';
import Colors from '../../constants/Colors';
import styles from './styles';
import { default as Image } from '../../components/ImageWithFallback';
import { BASE_URL } from '../../services/api.service';
import RatingStars from '../../components/RatingStars';


const ServiceDetailsScreen = ({ navigation, route }) => {
    const service = route.params.service;
    const colorScheme = useColorScheme();
     const formatURI = (uri) => {
        return BASE_URL + (uri?.split('\\').join('/') || '');
    }
    console.log(service);
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                backgroundColor: Colors[colorScheme].background,
                paddingBottom: 20,
            }}>
            <Image
                style={styles.headerImage}
                source={{ uri: BASE_URL + service.imagePath }}
            />
            <View>
                <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                    <View style={[styles.userInfo]}>
                        <Image style={styles.userPicture} source={{ uri: formatURI(service.user.profileImage) }} />
                        <Text style={styles.userName}>{`${service.user.firstName} ${service.user.lastName}`}</Text>
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{service.title}</Text>
                    <Text
                        style={{
                            fontSize: 12,
                            fontWeight: '400',
                            color: Colors[colorScheme].tint,
                            marginTop: 5,
                        }}>
                        {service?.category?.title}
                    </Text>
                    <View
                        style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignservices: 'center'
                        }}>
                        <View style={{ flexDirection: 'row', alignservices: 'center' }}>
                            <RatingStars
                                rating={service.rating}
                                size={20}
                            />
                            <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 5 }}>
                                {service.rating}
                            </Text>
                        </View>
                        <Text style={{ fontSize: 13,fontWeight:'bold', color: Colors[colorScheme].tint }}>{service.reviewsCount} Reviews</Text>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ lineHeight: 20, color: Colors[colorScheme].tint }}>
                            {service.description}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        marginTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingLeft: 20,
                        alignservices: 'center',
                    }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                        From
                    </Text>
                    <View style={styles.priceTag}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: "black",
                                marginLeft: 5,
                            }}>
                            {service.price} TND
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.btn}
                    onPress={() => navigation.navigate('OrderDetails', service)
                    }
                >
                    <Text style={{ color: "black", fontSize: 18, fontWeight: 'bold' }}
                    >
                        Book Now
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
export default ServiceDetailsScreen;