import React from 'react';
import {Image, ScrollView, StyleSheet} from "react-native";
import {MainContainer} from "../../styles/main";
import {Text} from "native-base";
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

function ImageView(props) {
    const {image} = props.route?.params
    const [url, setUrl] = React.useState(null)
    console.log(url)
    React.useEffect(() => {
        (async function () {
            const manipResult = await manipulateAsync(
                image.localUri || image.uri,
                [
                        { crop: {
                                originX: ((image.width) / 5),
                                originY: ((image.height) / 5),
                                width: ((image.width) / 1.5),
                                height: ((image.height) / 1.5)
                            } },
                ],
                { compress: 1, format: SaveFormat.PNG }
            );
            setUrl(manipResult)
        }())
    }, [image]);

    return (
        <ScrollView style={styles.container}>
            <MainContainer>
                <Text>trsatas</Text>
                <Image style={styles.image} source={{uri: image.uri}}/>
                <Image style={styles.image} source={{uri: url?.uri}}/>
            </MainContainer>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain'
    }
});


export default ImageView;
