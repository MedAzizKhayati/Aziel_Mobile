import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View } from '../../components/Themed';
import { GlobalContext } from '../../context/Provider';

import styles from './styles';

export default function SettingsScreen() {
  const {authDispatch} = useContext(GlobalContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={() => authDispatch({type: 'LOGOUT'})}
      >
        <Text>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}


