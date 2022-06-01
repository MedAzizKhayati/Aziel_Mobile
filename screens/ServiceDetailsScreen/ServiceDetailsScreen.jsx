import useColorScheme from '../../hooks/useColorScheme';
import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, Text, View } from '../../components/Themed';
import { TouchableOpacity, ActivityIndicator, ImageBackground, FlatList, ToastAndroid } from 'react-native';
import Colors from '../../constants/Colors';
import styles from './styles';
import { default as Image } from '../../components/ImageWithFallback';
import { BASE_URL } from '../../services/api.service';
import RatingStars from '../../components/RatingStars';
import UserInformations from '../../components/UserInformations';
import { getReviewsByService } from '../../services/reviews.service';
import { getUserById } from '../../services/user.service';
import SmallReviewCard from '../../components/SmallReviewCard';


const ServiceDetailsScreen = ({ navigation, route }) => {
    const service = route.params.service;
    const colorScheme = useColorScheme();
    const [isVisible, setIsVisible] = useState(false);
    const [reviews, setReviews] = useState([]);
    const limit = 10;
    const [page, setPage] = useState(1);
    const [isListEnd, setIsListEnd] = useState(false);
    const [userList, setUserList] = useState({});

    const formatURI = (uri) => {
        return BASE_URL + (uri?.split('\\').join('/') || '');
    }

    const onShowPopup = () => {
        setIsVisible(true);
    }

    const onClosePopup = () => {
        setIsVisible(false);
    }

    const loadMoreReviews = async () => {
        if (isListEnd) return;
        try {
            const newReviews = await getReviewsByService(service.id, limit, page + 1);
            setReviews([...reviews, ...newReviews]);
            setPage(page + 1);
            if (newReviews.length < limit)
                setIsListEnd(true);
        } catch (error) {
            ToastAndroid.show("Error while loading data...", ToastAndroid.SHORT);
        }
    };

    const getUser = async (id) => {
        if(userList[id]) return;
        try {
            const user = await getUserById(id);
            setUserList(list => ({...list, [id]: user}));
        } catch (error) {
            ToastAndroid.show("Error while loading data...", ToastAndroid.SHORT);
        }
    };

    useEffect(() => {
        getReviewsByService(service.id, limit, page + 1)
            .then(reviews => {
                setReviews(reviews);
                if (reviews.length < limit) setIsListEnd(true);
            })
            .catch(err => {
                ToastAndroid.show(err.response.data.message, ToastAndroid.SHORT);
                console.log(err.response.data.message);
            }
            );
    }, [service.reviewsCount], []);

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
                    <TouchableOpacity style={[styles.userInfo]} onPress={onShowPopup}>
                        <Image style={styles.userPicture} source={{ uri: formatURI(service.user.profileImage) }} />
                        <Text style={styles.userName}>{`${service.user.firstName} ${service.user.lastName}`}</Text>
                    </TouchableOpacity>
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
                        <Text style={{ fontSize: 13, fontWeight: 'bold', color: Colors[colorScheme].tint }}>{service.reviewsCount} Reviews</Text>
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
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: Colors[colorScheme].tint,
                        marginTop: 15,
                        padding: 20
                    }}>
                    {service.reviewsCount} Reviews
                </Text>
                <View style={styles?.reviewsContainer}>
                    <FlatList
                        nestedScrollEnabled
                        data={reviews}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                            getUser(item.owner.id);
                            return (
                                <SmallReviewCard review={item} user={userList[item.owner.id] || {}} />
                            )
                        }

                        }
                        ListEmptyComponent={() =>
                            isListEnd
                            && <Text style={styles?.emptyText}>No Reviews found...</Text>
                        }
                        ListFooterComponent={() =>
                            !isListEnd
                            && <ActivityIndicator size="large" color={Colors[colorScheme].text} />
                        }
                        onEndReachedThreshold={1}
                        onEndReached={loadMoreReviews}
                    />
                </View>
                {/* <TouchableOpacity style={styles.btn}
                    onPress={() => navigation.navigate('OrderDetails', service)
                    }
                >
                    <Text style={{ color: "black", fontSize: 18, fontWeight: 'bold' }}
                    >
                        Book Now
                    </Text>
                </TouchableOpacity> */}

                <UserInformations
                    onTouchOutside={onClosePopup}
                    visible={isVisible}
                    navigation={navigation}
                    User={service.user}
                />
            </View>
        </ScrollView>
    )
}
export default ServiceDetailsScreen;