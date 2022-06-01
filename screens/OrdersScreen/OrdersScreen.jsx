import { useIsFocused } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ToastAndroid } from 'react-native';
import OrderCard from '../../components/OrderCard';
import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { GlobalContext } from '../../context/Provider';
import useColorScheme from '../../hooks/useColorScheme';
import { getOrdersAsSeller, getOrdersBeforeOrderAsBuyer, getOrdersBeforeOrderAsSeller, getOrdersByUser } from '../../services/orders.service';
import Toast from 'react-native-toast-message';
import styles from './styles';


const OrdersScreen = ({ navigation }) => {
  const take = 10;
  const [orders, setOrders] = useState([]);
  const [ordersLoader, setOrdersLoader] = useState(() => async () => null);
  const isFocused = useIsFocused();
  const { authState: { buyerMode } } = useContext(GlobalContext);
  const [onEndReached, setOnEndReached] = useState(false);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const ordersLoader = buyerMode ?
      getOrdersBeforeOrderAsBuyer :
      getOrdersBeforeOrderAsSeller;

    setOrdersLoader(() => ordersLoader);
  }, [buyerMode]);

  useEffect(async () => {
    const ordersGetter = buyerMode ? getOrdersByUser : getOrdersAsSeller;
    try {
      const orders = await ordersGetter(take);
      setOrders(orders);
      if (orders.length < take)
        setOnEndReached(true);
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Unexepected error',
        text2: err?.response?.data?.message,
      });
    }
  }, [isFocused]);


  const loadMoreOrders = async () => {
    try {
      const newOrders = await ordersLoader(orders[orders.length - 1].id);
      if (newOrders.length < take)
        setOnEndReached(true);
      setOrders([...orders, ...newOrders]);
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Unexepected error',
        text2: err?.response?.data?.message,
      });
    }
  }

  const FooterComponent = () => {
    return (
      <View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          {
            onEndReached ?
              (orders.length ? 'No more orders' : 'No orders yet.') :
              <ActivityIndicator size="large" color={Colors[colorScheme].text} />
          }
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <FlatList
          style={{ width: '100%' }}
          showsVerticalScrollIndicator={false}
          data={orders}
          renderItem={
            ({ item }) =>
              <OrderCard
                order={item}
                onPay={() => navigation.navigate(buyerMode ? 'DeliveryScreen' : 'SellerOrderScreen', item)}
              />
          }
          onEndReachedThreshold={0.5}
          onEndReached={loadMoreOrders}
          keyExtractor={item => item.id}
          ListFooterComponent={FooterComponent}
        />
      </View>
    </View>
  );

}

export default OrdersScreen;