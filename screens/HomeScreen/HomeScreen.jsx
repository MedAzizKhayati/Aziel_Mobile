import { Ionicons } from '@expo/vector-icons';
import { useContext, useEffect, useState } from 'react';
import { FlatList, ToastAndroid, TouchableOpacity } from 'react-native';
import { default as Image } from '../../components/ImageWithFallback';
import ServiceCard from '../../components/ServiceCard';
import { ScrollView, Text, TextInput, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { GlobalContext } from '../../context/Provider';
import useColorScheme from '../../hooks/useColorScheme';
import { BASE_URL } from '../../services/api.service';
import { getAllServices, getPopularServices } from '../../services/services.service';
import { getAllServiceCategories } from '../../services/service_cateogries.service';

import styles from './styles';


const DATA2 = [
  {
    title: "Make a fullstack app",
    image: "https://picsum.photos/405",
    rating: 4.9,
    reviewsCount: 18,
    price: "50 TND",
    user: {
      name: "John Doe",
      image: "https://picsum.photos/406"
    }
  },
  {
    title: "Make you a logo for your start up company",
    image: "https://picsum.photos/407",
    rating: 5,
    reviews: 77,
    price: "100 TND",
    user: {
      name: "Junk Doctor",
      image: "https://picsum.photos/408"
    }
  },
  {
    title: "Fix your tap water",
    image: "https://picsum.photos/409",
    rating: 4.5,
    reviews: 12,
    price: "30 TND",
    user: {
      name: "Micheal Jordan",
      image: "https://picsum.photos/410"
    }
  },
  {
    title: "Make a decor for your house",
    image: "https://picsum.photos/411",
    rating: 4.5,
    reviewsCount: 77,
    price: "150 TND",
    user: {
      name: "Malek Ben Abdallah",
      image: "https://picsum.photos/412"
    }
  },
]

const HomeScreen = ({ navigation }) => {
  const { authState, authDispatch } = useContext(GlobalContext);
  const colorScheme = useColorScheme();
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    getAllServiceCategories()
      .then(categories => setCategories(categories))
      .catch(err => ToastAndroid.show(err.response.data.message, ToastAndroid.SHORT));
    getPopularServices()
      .then(services => setServices(services))
      .catch(err => ToastAndroid.show(err.response.data.message, ToastAndroid.SHORT));
  }, []);

  return (
    <ScrollView style={styles?.container}>
      <View style={styles?.searchView}>
        <TextInput style={styles?.searchInput} placeholder="Tap to search..." />
      </View>
      <View style={styles?.categoriesContainer}>
        <Text style={styles?.categoriesText}>Categories</Text>
        <FlatList
          horizontal
          nestedScrollEnabled
          data={categories}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.title}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles?.categoryView, { backgroundColor: Colors[colorScheme].secondaryBackground }]}
              onPress={() => navigation.navigate('ServicesScreen', { category: item })}
            >
              <Image style={styles?.categoryImage} source={{ uri: BASE_URL + item.imagePath?.split('\\').join('/') }} />
              <Text style={styles?.categoriesTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles?.popularContainer}>
        <Text style={styles?.popularText}>Popular Services</Text>
        <FlatList
          horizontal
          nestedScrollEnabled
          data={services}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.title}
          renderItem={({ item }) =>
            <ServiceCard service={item} onPress={() => null} />
          }
        />
      </View>
      <View style={styles?.popularContainer}>
        <Text style={styles?.popularText}>Recently Viewed & More</Text>
        <FlatList
          horizontal
          nestedScrollEnabled
          data={services}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.title}
          renderItem={({ item }) =>
            <ServiceCard service={item} onPress={() => null} />
          }
        />
      </View>
    </ScrollView>
  );
}



export default HomeScreen;