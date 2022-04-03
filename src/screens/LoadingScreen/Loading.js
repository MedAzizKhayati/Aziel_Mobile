import React from 'react';
import { Text, View } from "react-native";
import styles from './styles';

export default Loading = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Loading...</Text>
        </View>
    );
}