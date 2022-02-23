import React from 'react';
import {ScrollView, StyleSheet, Dimensions, View} from "react-native";
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import {
    ImageViewBottom,
    ImageViewCancel,
    ImageViewContainer,
    ImageViewHeader,
    ImageViewSource, ImageViewSourceContainer, ImageViewSourceCrop,
    ImageViewTitle
} from "../../styles/profile";
import MaskedView from '@react-native-community/masked-view';
import {changeUserInfo} from "../../redux/actions/authActions";

const {  width } = Dimensions.get('window')

function roundOff(v) {
    return Math.round(v)
}

function dimensions() {
    const _borderRadius = roundOff((375 + width) / 2)
    return { _borderRadius }
}

function ImageView(props) {
    const params = props.route?.params
    const [url, setUrl] = React.useState(null)

    React.useEffect(() => {
        const parent = props.navigation.getParent()
        parent.setOptions({tabBarStyle: {display: 'none'}})
        return () => {
            parent.setOptions({tabBarStyle: {display: 'flex'}});
        }
    }, [])

    React.useEffect(() => {
        (async function () {
            const manipResult = await manipulateAsync(
                params?.image.localUri || params?.image.uri,
                [
                        { crop: {
                                originX: ((params?.image.width) / 5),
                                originY: ((params?.image.height) / 5),
                                width: ((params?.image.width) / 1.5),
                                height: ((params?.image.height) / 1.5)
                            } },
                ],
                { compress: 1, format: SaveFormat.PNG }
            );
            setUrl(manipResult)
        }())
    }, [params?.image]);

    const handleBack = () => {
        props.navigation.push('MainProfile')
    }

    const handleSubmit = async () => {
        changeUserInfo('avatar', url)
        handleBack()
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.container}>
            <ImageViewContainer>
                <ImageViewHeader>
                    <ImageViewCancel onPress={handleBack}>Отмена</ImageViewCancel>
                    <ImageViewTitle>Фото профиля</ImageViewTitle>
                </ImageViewHeader>
                {/*<Image style={styles.image} source={{uri: params?.image.uri}}/>*/}
                <ImageViewSourceContainer >
                    <MaskedView
                        style={{ flex: 1, backgroundColor: 'transparent' }}
                        maskElement={
                            <View
                                style={{
                                    backgroundColor: '#00000077',
                                    flex: 1,
                                }}
                            >
                                <View
                                    style={{
                                        backgroundColor: '#ff00ff',
                                        borderRadius: dimensions()._borderRadius,
                                        flex: 1,
                                    }}
                                />
                            </View>
                        }>
                        <ImageViewSource resizeMode="cover" source={{uri: url?.uri}}/>
                    </MaskedView>

                </ImageViewSourceContainer>
                <ImageViewBottom>
                    <ImageViewCancel>Выбрать другое</ImageViewCancel>
                    <ImageViewCancel onPress={handleSubmit} bold>Использовать</ImageViewCancel>
                </ImageViewBottom>
            </ImageViewContainer>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A'
    },
    circle: {
        borderRadius: dimensions()._borderRadius
    }
});


export default ImageView;
