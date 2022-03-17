// Dependencies
import React, { useEffect, useState } from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// Screens
import HelloWorld from './src/screens/HelloWorld';
import WelcomePage from './src/screens/WelcomePage';
import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens';


const Stack = createNativeStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Welcome Page" options={{ headerShown: false }} component={WelcomePage} />
            <Stack.Screen name="Hello World" options={{ headerShown: false }} component={HelloWorld} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}