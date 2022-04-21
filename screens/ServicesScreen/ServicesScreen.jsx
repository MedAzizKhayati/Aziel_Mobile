import { useEffect, useState } from 'react';
import { FlatList, ToastAndroid } from 'react-native';
import SmallServiceCard from '../../components/SmallServiceCard';
import { TextInput, View } from '../../components/Themed';
import { getServicesByCategory } from '../../services/services.service';

import styles from './styles';

const ServicesScreen = ({ route, navigation }) => {
  const [services, setServices] = useState([]);
  const category = route.params?.category;

  useEffect(() => {
    getServicesByCategory(category?.id)
      .then(services => setServices(services))
      .catch(err => ToastAndroid.show(err.response.data.message, ToastAndroid.SHORT));
  }, [category]);

  return (
    <View style={styles?.container}>
      <View style={styles?.searchView}>
        <TextInput style={styles?.searchInput} placeholder="Tap to search..." />
      </View>
      <View style={styles?.servicesContainer}>
        <FlatList
          nestedScrollEnabled
          data={services}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>
            <SmallServiceCard service={item} onPress={() => null} />
          }
        />
      </View>
    </View>
  );
}



export default ServicesScreen;