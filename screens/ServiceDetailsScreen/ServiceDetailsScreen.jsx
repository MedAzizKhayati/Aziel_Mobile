import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/Provider';
import useColorScheme from '../../hooks/useColorScheme';
import { ScrollView, Text, View, TextInput } from '../../components/Themed';
import { Image, TouchableOpacity, ImageBackground, StatusBar } from 'react-native';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

const ServiceDetailsScreen = ({ navigation, route }) => {
    const item = route.params;
    const { authState, authDispatch } = useContext(GlobalContext);
    const colorScheme = useColorScheme();
    const getRandomImageURI = () => "https://picsum.photos/" + (Math.random() * (100) + 200).toFixed(0);

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                backgroundColor: "rgba(0,0,0,0)",
                paddingBottom: 20,
            }}>
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="rgba(0,0,0,0)"
            />
            <ImageBackground style={styles.headerImage}
                source={{ uri: getRandomImageURI() }}
            >
                 {/* <View style={styles.header}>  */}
                <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons
                            name="chevron-left"
                            style={{
                                fontSize: 18,
                                color: 'grey',
                                padding: 12,
                                backgroundColor: 'white',
                                //borderRadius: 12,
                            }}
                        />
                    </TouchableOpacity>
                 {/* </View>  */}
            </ImageBackground>
            <View>
                <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.title}</Text>
                    <Text
                        style={{
                            fontSize: 12,
                            fontWeight: '400',
                            color: Colors[colorScheme].tint,
                            marginTop: 5,
                        }}>
                        IT Domain
                    </Text>
                    <View
                        style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name="star" size={20} color="#FFA500" />
                                <Icon name="star" size={20} color="#FFA500" />
                                <Icon name="star" size={20} color="#FFA500" />
                                <Icon name="star" size={20} color="#FFA500" />
                                <Icon name="star" size={20} color="#808080" />
                            </View>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 5 }}>
                                {item.rating}
                            </Text>
                        </View>
                        <Text style={{ fontSize: 13, color: Colors[colorScheme].tint }}>{item.reviews} Reviews</Text>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ lineHeight: 20, color: Colors[colorScheme].tint }}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        marginTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingLeft: 20,
                        alignItems: 'center',
                    }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                        From
                    </Text>
                    <View style={styles.priceTag}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: Colors[colorScheme].tint,
                                marginLeft: 5,
                            }}>
                            {item.price} TND
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.btn}
                    onPress={() => navigation.navigate('OrderDetails', item)
                }
                >
                    <Text style={{ color: Colors[colorScheme].tint, fontSize: 18, fontWeight: 'bold' }}
                    >
                        Book Now
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
export default ServiceDetailsScreen;