import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ToastAndroid } from 'react-native';
import SmallServiceCard from '../../components/SmallServiceCard';
import { Text, TextInput, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { getServicesByCategory, getServicesByQuery } from '../../services/services.service';

import styles from './styles';

const ServicesScreen = ({ route, navigation }) => {
  const limit = 10;
  const colorScheme = useColorScheme();

  const [services, setServices] = useState([]);
  const [page, setPage] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);
  const [apiCall, setApiCall] = useState(() => async () => []);
  const [apiParam, setApiParam] = useState("");

  const init = () => {
    setPage(1);
    setIsListEnd(false);
    setServices([]);
  };

  useEffect(() => {
    init();
    if (!apiParam) return;
    apiCall(apiParam, limit, page)
      .then(services => {
        setServices(services);
        if (services.length < limit) setIsListEnd(true);
      })
      .catch(err => ToastAndroid.show(err.response.data.message, ToastAndroid.SHORT));
  }, [apiCall, apiParam]);

  useEffect(() => {
    const query = route.params?.query;
    if (!query) return;
    setApiCall(() => getServicesByQuery);
    setApiParam(query);
  }, [route.params?.query]);

  useEffect(() => {
    const category = route.params?.category;
    if (!category?.id) return;
    setApiCall(() => getServicesByCategory);
    setApiParam(category?.id);
  }, [route.params?.category]);


  const loadMoreServices = async () => {
    if (isListEnd) return;
    try {
      const newServices = await apiCall(apiParam, limit, page + 1);
      setServices([...services, ...newServices]);
      setPage(page + 1);
      if (newServices.length < limit)
        setIsListEnd(true);
    } catch (error) {
      ToastAndroid.show("Error while loading data...", ToastAndroid.SHORT);
    }
  };

  const onSearchSubmit = event => {
    init();
    setApiCall(() => getServicesByQuery);
    setApiParam(event.nativeEvent.text); 
  }

  return (
    <View style={styles?.container}>
      <View style={styles?.searchView}>
        <TextInput 
          style={styles?.searchInput} 
          placeholder="Tap to search..."
          onSubmitEditing={onSearchSubmit}
          defaultValue={route.params?.query}
        />
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
          ListEmptyComponent={() =>
            isListEnd
            && <Text style={styles?.emptyText}>No services found...</Text>
          }
          ListFooterComponent={() =>
            !isListEnd
            && <ActivityIndicator size="large" color={Colors[colorScheme].text} />
          }
          onEndReachedThreshold={1}
          onEndReached={loadMoreServices}
        />
      </View>
    </View>
  );
}



export default ServicesScreen;