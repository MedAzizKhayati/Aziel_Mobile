// Dependencies
import React, { useEffect, useState } from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import WelcomePage from './src/screens/WelcomePage';
import { LoginScreen, HomeScreen, RegistrationScreen, Loading } from './src/screens';
import { getUserMe } from './src/services/user.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
export default App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const getUser = () => {
    AsyncStorage.getItem('user')
      .then(user => setUser(JSON.parse(user)))
      .catch(err => setUser(null))
      .finally(() => setLoading(false));

    getUserMe()
      .then(data => setUser(data))
      .catch(err => setUser(null))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getUser();
  }, []);

  if (loading)
    return (<Loading />);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
        }}
      >
        {user ? (
          <Stack.Screen name="Home" options={{ headerShown: false }}>
            {props => <HomeScreen user={user} setUser={setUser} {...props} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login" >
              {props => <LoginScreen user={user} setUser={setUser} {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Registration" component={RegistrationScreen} />
            <Stack.Screen name="Welcome Page" options={{ headerShown: false }} component={WelcomePage} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}