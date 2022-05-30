import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import SwipeButton from '../../components/SwipeButton';
import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { GlobalContext } from '../../context/Provider';
import useColorScheme from '../../hooks/useColorScheme';

import styles from './styles';

export default function SettingsScreen() {
  const { authDispatch } = useContext(GlobalContext);
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: Colors[colorScheme].secondaryBackground }]}
        onPress={() => authDispatch({ type: 'LOGOUT' })}
      >
        <View style={styles.optionsContainer}>
          <View style={[styles.optionButton, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
            
          </View>
        </View>
        <Text>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}


