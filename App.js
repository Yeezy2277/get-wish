import React, {useState} from 'react';
import AppRouter from "./components/AppRouter/AppRouter";
import * as Font from 'expo-font';
import {Text} from "react-native";
import useFonts from './hooks/useFonts';
import AppLoading from 'expo-app-loading';

export default props => {
    const [fontsLoaded, setFontsLoaded] = useState(false)

    const LoadFonts = async () => {
        await useFonts();
    };

    if (!fontsLoaded) {
        return (
            <AppLoading
                startAsync={LoadFonts}
                onFinish={() => setFontsLoaded(true)}
                onError={() => {}}
            />
        );
    }

    return (
        <AppRouter/>
    )
}
