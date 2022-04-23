import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { GlobalContext } from '../context/Provider';
import { LoadingScreen } from '../screens';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import AuthNavigator from './AuthNavigator';
import BuyerNavigator from './BuyerNavigator';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const {
    authState: {
      isAuthenticated,
      loading
    }
  } = React.useContext(GlobalContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={loading ? LoadingScreen : isAuthenticated ? BuyerNavigator : AuthNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}