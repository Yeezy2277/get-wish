import React from 'react';
import * as Font from 'expo-font';
import { TextInput, View } from 'react-native';
import { Provider } from 'react-redux';
import { extendTheme, NativeBaseProvider } from 'native-base';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import * as SplashScreen from 'expo-splash-screen';
import { AppRouter } from './src/components';
import store from './src/redux';

TextInput.defaultProps.selectionColor = '#8424FF';

const customFonts = {
  Nunito: require('./src/assets/fonts/NunitoRegular.ttf')
};

SplashScreen.preventAutoHideAsync()
  .then((result) => console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`))
  .catch(console.warn);

export default function App() {
  const [loadingApp, setLoadingApp] = React.useState(false);

  console.disableYellowBox = true;

  React.useEffect(() => {
    (async function Start() {
      setLoadingApp(true);
      await Font.loadAsync(customFonts);
      setTimeout(async () => {
        await SplashScreen.hideAsync();
        setLoadingApp(false);
      }, 2000);
    }());
  }, []);

  if (loadingApp) {
    return (
      <View />
    );
  }

  const theme = extendTheme({
    fonts: {
      heading: 'Nunito',
      body: 'Nunito',
      mono: 'Nunito',
    },
  });

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <ActionSheetProvider>
          <AppRouter />
        </ActionSheetProvider>
      </NativeBaseProvider>
    </Provider>
  );
}
