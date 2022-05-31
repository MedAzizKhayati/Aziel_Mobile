import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList, ToastAndroid } from 'react-native';
import OrderCard from '../../components/OrderCard';
import { Text, View } from '../../components/Themed';
import { getOrdersByUser } from '../../services/orders.service';
import styles from './styles';

const OrdersScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getOrdersByUser()
      .then(orders => setOrders(orders))
      .catch(err => ToastAndroid.show(err.response.data.message, ToastAndroid.SHORT));
  }, [isFocused]);

  if (orders.length > 0) {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <FlatList
            style={{ width: '100%' }}
            showsVerticalScrollIndicator={false}
            data={orders}
            renderItem={({ item }) =>
              <OrderCard
                order={item}
                onPay={() => navigation.navigate('DeliveryScreen', item)}
              />
            }
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    )
  } else {
    return (
      <View style={{ fles: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 25, fontWeight: '700' }} > No orders Yet !</Text>
      </View>
    );
  }

}

export default OrdersScreen;