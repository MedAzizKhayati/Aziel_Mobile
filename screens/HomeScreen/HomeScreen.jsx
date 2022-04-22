import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity } from 'react-native';
import { ScrollView, Text, TextInput, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { GlobalContext } from '../../context/Provider';
import useColorScheme from '../../hooks/useColorScheme';

import styles from './styles';

const getRandomImageURI = () => "https://picsum.photos/" + (Math.random() * (100) + 200).toFixed(0);

const DATA = [
  {
    title: "Design",
    image: "https://picsum.photos/200"
  },
  {
    title: "Art",
    image: "https://picsum.photos/201"
  },
  {
    title: "Photography",
    image: "https://picsum.photos/202"
  },
  {
    title: "Illustration",
    image: "https://picsum.photos/203"
  },
  {
    title: "Web Design",
    image: "https://picsum.photos/204"
  },
]

const DATA2 = [
  {
    title: "Make a fullstack app",
    image: "https://picsum.photos/405",
    rating: 4.9,
    reviews: 18,
    price: "50",
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
    price: "100 ",
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
    price: "30 ",
    user: {
      name: "Micheal Jordan",
      image: "https://picsum.photos/410"
    }
  },
  {
    title: "Make a decor for your house",
    image: "https://picsum.photos/411",
    rating: 4.5,
    reviews: 77,
    price: "150 ",
    user: {
      name: "Malek Ben Abdallah",
      image: "https://picsum.photos/412"
    }
  },
]

const HomeScreen = ({ navigation }) => {
  const { authState, authDispatch } = useContext(GlobalContext);
  const colorScheme = useColorScheme();
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
          data={DATA}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.title}
          renderItem={({ item }) => (
            <TouchableOpacity style={[styles?.categoryView, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
              <Image style={styles?.categoryImage} source={{ uri: getRandomImageURI() }} />
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
          data={DATA2}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.title}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ServiceDetails', item)}
              style={[styles?.popularView, { backgroundColor: Colors[colorScheme].secondaryBackground }]}
            >
              <Image style={styles?.popularImage} source={{ uri: getRandomImageURI() }} />
              <View style={[styles?.userInfo, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
                <Image style={styles?.userPicture} source={{ uri: item.user.image }} />
                <Text>{item.user.name}</Text>
              </View>
              <Text style={styles?.popularTitle}>{item.title}</Text>
              <View style={[styles?.serviceInfo, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
                <Ionicons
                  size={20}
                  name="star"
                  color="orange"
                />
                <Text style={[styles?.serviceRating, { color: Colors[colorScheme].tint }]}>{item.rating} ({item.reviews})</Text>
                <Text style={[styles?.servicePrice, { color: Colors[colorScheme].tint }]}>FROM {item.price} TND</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles?.popularContainer}>
        <Text style={styles?.popularText}>Recently Viewed & More</Text>
        <FlatList
          horizontal
          nestedScrollEnabled
          data={DATA2}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.title}
          renderItem={({ item }) => (
            <TouchableOpacity style={[styles?.popularView, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
              <Image style={styles?.popularImage} source={{ uri: getRandomImageURI() }} />
              <View style={[styles?.userInfo, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
                <Image style={styles?.userPicture} source={{ uri: item.user.image + 1 }} />
                <Text>{item.user.name}</Text>
              </View>
              <Text style={styles?.popularTitle}>{item.title}</Text>
              <View style={[styles?.serviceInfo, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
                <Ionicons
                  size={20}
                  name="star"
                  color="orange"
                />
                <Text style={[styles?.serviceRating, { color: Colors[colorScheme].tint }]}>{item.rating} ({item.reviews})</Text>
                <Text style={[styles?.servicePrice, { color: Colors[colorScheme].tint }]}>FROM {item.price} TND</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
}



export default HomeScreen;