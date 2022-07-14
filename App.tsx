import React, { useState, useReducer, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'react-native-elements';
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import RootNavigator from './src/navigation/RootNavigator';
import Navigation from './src/navigation';
import {
  ThemeReducer,
  initialState,
  ThemeReducerContext,
} from './src/helpers/ThemeReducer';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [ThemeState, dispatch] = useReducer(ThemeReducer, initialState);

  useEffect(() => {
    if (colorScheme === 'dark') {
      dispatch({ type: 'set-theme', payload: 'dark' });
    }
  }, [colorScheme]);

  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
  }

  if (!isLoadingComplete) {
    return (
      <></>
    );
  } else {
    //    <Navigation colorScheme={colorScheme} />
    //    <RootNavigator />
    return (
      <SafeAreaProvider>
        <ThemeReducerContext.Provider value={{ ThemeState, dispatch }}>
          <ThemeProvider useDark={ThemeState.themeMode === 'dark' ? true : false}>
            <Navigation colorScheme={colorScheme} />
          </ThemeProvider>
        </ThemeReducerContext.Provider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
