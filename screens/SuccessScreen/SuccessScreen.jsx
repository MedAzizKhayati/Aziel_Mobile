import React, { useContext } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { GlobalContext } from '../../context/Provider';
import useColorScheme from '../../hooks/useColorScheme';

import styles from './styles';

export default function SuccessScreen({ navigation,route }) {
  const { authDispatch } = useContext(GlobalContext);
  const colorScheme = useColorScheme();
  const order = route.params.order;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/success.png')}
          resizeMode="contain"
          style={{
            width: 150,
            height: 150
          }}
        />
        <Text style={{ marginTop: 100, fontWeight: 'bold', fontSize: 35 }}>Congratulations!</Text>
        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Payment was successfully made!</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={{
          height: 55,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 40,
          backgroundColor: Colors[colorScheme].btn,
          marginHorizontal: 20,
          borderRadius: 10,
          width: 350
        }}  >
          <Text style={{ fontSize: 18, fontWeight: 'bold' }} onPress={() => navigation.navigate("DeliveryScreen", {order: order})}>
            Done
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}