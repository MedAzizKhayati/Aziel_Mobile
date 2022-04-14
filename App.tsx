import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import GlobalProvider from './context/Provider';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete)
    return null
  else
    return (
      <SafeAreaProvider>
        <GlobalProvider>
          <Navigation colorScheme={colorScheme} />
        </GlobalProvider>
      </SafeAreaProvider>
    );
}