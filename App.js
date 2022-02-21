import React from 'react';
import * as Font from 'expo-font';
import { TextInput } from 'react-native'
import {Provider} from "react-redux";
import store from "./redux";
import {AppRouter} from "./components";
import { NativeBaseProvider, Box } from "native-base";
TextInput.defaultProps.selectionColor = '#8424FF'


let customFonts = {
    'Nunito': require('./assets/fonts/NunitoRegular.ttf')
};

export default props => {

    const [fontsLoaded, setFontsLoaded] = React.useState(false)

    console.disableYellowBox = true;

    async function _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        setFontsLoaded(true);
    }

    React.useEffect(() => {
        (async function () {
            await _loadFontsAsync()
        }())
    }, [])

    return (
        <Provider store={store}>
            <NativeBaseProvider>
                <AppRouter/>
            </NativeBaseProvider>
        </Provider>
    )
}
