import React, {useEffect, useState} from 'react';
import AppRouter from "./components/AppRouter/AppRouter";
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

let customFonts = {
    'Nunito': require('./assets/fonts/NunitoRegular.otf')
};

export default props => {
    const [fontsLoaded, setFontsLoaded] = React.useState(false)

    async function _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        setFontsLoaded(true);
    }

    useEffect(() => {
        (async function () {
            await _loadFontsAsync()
        }())
    }, [])

    return (
        <AppRouter/>)
}
