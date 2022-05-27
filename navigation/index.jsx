import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { GlobalContext } from '../context/Provider';
import { LoadingScreen } from '../screens';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import AuthNavigator from './AuthNavigator';
import BuyerNavigator from './BuyerNavigator';
import SellerNavigator from './SellerNavigator';

export default function Navigation({ colorScheme }) {
  return (
    <NavigationContainer
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
      loading,
      buyerMode
    }
  } = React.useContext(GlobalContext);
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right'
      }}
    >
      <Stack.Screen
        name="Root"
        children={
          () => {
            if (loading)
              return <LoadingScreen />;
            if (!isAuthenticated)
              return <AuthNavigator />;
            if (buyerMode)
              return <BuyerNavigator />
            // else if (!buyerMode))  -- Not Needed
            return <SellerNavigator />;
          }
        }
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}