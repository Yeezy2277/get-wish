import React from 'react';
import {ScrollView, StyleSheet, Dimensions, View, Text} from "react-native";
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import {
    ImageViewBottom,
    ImageViewCancel,
    ImageViewContainer,
    ImageViewHeader,
    ImageViewSource, ImageViewSourceContainer,
    ImageViewTitle
} from "../../styles/profile";
import MaskedView from '@react-native-community/masked-view';
import * as FileSystem from "expo-file-system/build/FileSystem";
import {useSelector} from "react-redux";
import {updateAvatar} from "../../redux/actions/userActions";
import * as ImagePicker from "expo-image-picker";
import useLoader from "../../hooks/useLoader";
import {HStack, Spinner} from "native-base";
import {useI18n} from "../../i18n/i18n";

const { width } = Dimensions.get('window')

function roundOff(v) {
    return Math.round(v)
}

function dimensions() {
    const _borderRadius = roundOff((375 + width) / 2)
    return { _borderRadius }
}

function ImageView(props) {
    const {start, stop, loading} = useLoader(false);
    const {userInfo} = useSelector((state) => state.user);
    const params = props.route?.params
    const [url, setUrl] = React.useState(null)

    const manipulateImage = async (image) => {
        const manipResult = await manipulateAsync(
            image.localUri || image.uri,
            [],
            { compress: 0.5, format: SaveFormat.JPEG }
        );
        setUrl(manipResult)
    }

    React.useEffect(() => {
        const parent = props.navigation.getParent()
        parent.setOptions({tabBarStyle: {display: 'none'}})
        return () => {
            parent.setOptions({tabBarStyle: {display: 'flex'}});
        }
    }, [])


    React.useEffect(() => {
        (async function () {
            await manipulateImage(params?.image)
        }())
    }, [params?.image]);

    const handleBack = () => {
        props.navigation.push('MainProfile')
    }

    const handleSubmit = async () => {
        start()
        const base64 = await FileSystem.readAsStringAsync(url?.uri, { encoding: 'base64' });
        await updateAvatar(base64, userInfo?.id).then(handleBack)
        stop()
    }

    const handleChangeLibrary = async () => {
        let image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });
        await manipulateImage(image)
    }

    const t = useI18n();

    const handleChangeCamera = async () => {
        const {status} = ImagePicker.requestCameraPermissionsAsync()
        if (status !== "granted") {
            let image = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: false,
                aspect: [4, 3],
                quality: 1,
            });
            if (!image.cancelled) {
                await manipulateImage(image)
            }
        } else {
            alert(t('accessDenied'))
        }
    }

    if (loading) {
        return <HStack backgroundColor="#fff" height="100%" width="100%" justifyContent="center" alignItems="center">
            <Spinner color="indigo.500" size="lg" />
        </HStack>;
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.container}>
            <ImageViewContainer>
                <ImageViewHeader>
                    <ImageViewCancel onPress={handleBack}>{t('cancel')}</ImageViewCancel>
                    <ImageViewTitle>{t('profile_photo')}</ImageViewTitle>
                </ImageViewHeader>
                <ImageViewSourceContainer>
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
                    {params?.camera ? <ImageViewCancel onPress={handleChangeCamera}>Переснять</ImageViewCancel> : <ImageViewCancel onPress={handleChangeLibrary}>{t('profile_selectAnotherPhoto')}</ImageViewCancel>}
                    <ImageViewCancel onPress={handleSubmit} bold>{t('use')}</ImageViewCancel>
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
