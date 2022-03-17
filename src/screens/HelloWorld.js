import React from 'react';
import { Button, Text, View } from 'react-native';

const HelloWorld = ({navigation}) => { 
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Button title={"Welcome Page"} onPress={()=>{navigation.navigate("Welcome Page")}}/>
      <Text style={{
        fontSize: 24,
        fontWeight: '600',
      }}>
        Hello world!
      </Text>
    </View>
  )
}
export default HelloWorld;