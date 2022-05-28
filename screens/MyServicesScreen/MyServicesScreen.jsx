import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ToastAndroid, TouchableOpacity } from 'react-native';
import SmallServiceCard from '../../components/SmallServiceCard';
import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { GlobalContext } from '../../context/Provider';
import useColorScheme from '../../hooks/useColorScheme';
import {  getServicesByUser } from '../../services/services.service';

import styles from './styles';

const MyServicesScreen = ({ route, navigation }) => {
  const limit = 10;
  const colorScheme = useColorScheme();

  const [services, setServices] = useState([]);
  const [page, setPage] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);
  const [apiCall, setApiCall] = useState(() => getServicesByUser);
  const [apiParam, setApiParam] = useState("");
  const { authState: { user } } = useContext(GlobalContext);

  const init = () => {
    setPage(1);
    setIsListEnd(false);
    setServices([]);
  };

  useEffect(() => {
    init();
    if (!apiParam) return setApiParam(user.id);
    apiCall(apiParam, limit, page)
      .then(services => {
        setServices(services);
        if (services.length < limit) setIsListEnd(true);
      })
      .catch(err => ToastAndroid.show(err.response.data.message, ToastAndroid.SHORT));
  }, [apiCall, apiParam]);

  const loadMoreServices = async () => {
    if (isListEnd) return;
    try {
      const newServices = await apiCall(apiParam, limit, page + 1);
      setServices([...services, ...newServices]);
      setPage(page + 1);
      if (newServices.length < limit)
        setIsListEnd(true);
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Error while loading data...", ToastAndroid.SHORT);
    }
  };


  return (
    <View style={styles?.container}>
      <View style={styles.header}>
        <Text style={styles?.headerTitle}>My Services List</Text>
        <TouchableOpacity
          style={[styles.newService]}
          onPress={() => navigation.navigate('CreateServiceScreen')}
        >
          <Text style={[styles.newServiceTitle]}>
            New Service
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles?.servicesContainer}>
        <FlatList
          nestedScrollEnabled
          data={services}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>
            <SmallServiceCard service={item} onPress={() => navigation.navigate("ServiceDetails", { service: item })} />
          }
          ListEmptyComponent={() =>
            isListEnd
            && <Text style={styles?.emptyText}>You don't have any services...</Text>
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

export default MyServicesScreen;