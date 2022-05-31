import { useContext, useEffect, useState } from 'react';
import { FlatList, ToastAndroid } from 'react-native';
import { OrderCard } from '../../components/OrderCard';
import { Text, View } from '../../components/Themed';
import { GlobalContext } from '../../context/Provider';
import useColorScheme from '../../hooks/useColorScheme';
import { getAllOrders } from '../../services/orders.service';
import styles from './styles';

const OrdersScreen = ({ navigation }) => {
  const { authState, authDispatch } = useContext(GlobalContext);
  const colorScheme = useColorScheme();
  const [orders, setOrders] = useState([]);
  const OrderView = () => {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <FlatList
            style={{ width: '100%' }}
            showsVerticalScrollIndicator={false}
            data={orders}
            renderItem={({ item }) => <OrderCard order={item} />}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    )
  }
  useEffect(() => {
    getAllOrders()
      .then(orders => setOrders(orders))
      .catch(err => ToastAndroid.show(err.response.data.message, ToastAndroid.SHORT));
  }, []);
  if (orders.length > 0) {
    return <OrderView />
  } else {
    return (
      <View style={{ fles: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 25, fontWeight: '700' }} > No orders Yet !</Text>
      </View>
    );
  }

}

export default OrdersScreen;