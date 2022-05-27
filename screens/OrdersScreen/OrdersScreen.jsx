import { useContext, useEffect, useState } from 'react';
import { FlatList, ToastAndroid } from 'react-native';
import { OrderCard } from '../../components/OrderCard';
import {  Text, View } from '../../components/Themed';
import { GlobalContext } from '../../context/Provider';
import useColorScheme from '../../hooks/useColorScheme';
import { getOrdersByUser } from '../../services/orders.service';
import styles from './styles';

const OrdersScreen = ({ navigation }) => {
  const { authState, authDispatch } = useContext(GlobalContext);
  const colorScheme = useColorScheme();
  const [orders, setOrders] = useState([]);
  const orderView = () => {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={orders}
            renderItem={({ item }) => <OrderCard item={item} />
            }
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    )
  }
  useEffect(() => {
    getOrdersByUser()
      .then(orders => setOrders(orders))
      .catch(err => ToastAndroid.show(err.response.data.message, ToastAndroid.SHORT));
  }, []);
  if (orders.length > 0) {
  return orderView
  }else{
   return(
  <View>
    <Text>No orders Yet</Text>
  </View>
   );
  }

}

export default OrdersScreen;