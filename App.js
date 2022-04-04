import React from 'react';
import * as Font from 'expo-font';
import { TextInput } from 'react-native'
import {Provider} from "react-redux";
import store from "./redux";
import {AppRouter} from "./components";
import {HStack, NativeBaseProvider, Spinner} from "native-base";
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import * as SplashScreen from 'expo-splash-screen';
import {View} from "react-native";
import './i18n/i18n';
TextInput.defaultProps.selectionColor = '#8424FF'


let customFonts = {
    'Nunito': require('./assets/fonts/NunitoRegular.ttf')
};

SplashScreen.preventAutoHideAsync()
    .then(result => console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`))
    .catch(console.warn); // it's good to explicitly catch and inspect any error

export default props => {
    const [fontsLoaded, setFontsLoaded] = React.useState(false)
    const [loadingApp, setLoadingApp] = React.useState(false)

    console.disableYellowBox = true;

    async function _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        setFontsLoaded(true);
    }

    React.useEffect(async () => {
        setLoadingApp(true)
        await _loadFontsAsync()
        setTimeout(async () => {
            await SplashScreen.hideAsync();
            setLoadingApp(false)
        }, 2000);
    }, []);

    if (loadingApp) {
        return <View>

        </View>;
    }

    return (
            <Provider store={store}>
                <NativeBaseProvider>
                    <ActionSheetProvider>
                        <AppRouter/>
                    </ActionSheetProvider>
                </NativeBaseProvider>
            </Provider>
    )
}
