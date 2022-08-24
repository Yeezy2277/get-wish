import React from 'react';
import {Image} from 'react-native';
import {Video} from "expo-av";

function RenderVideo({video}) {
    const [error, setError] = React.useState(false)
    return (
        <>
            {error ? <Image resizeMode="cover" style={{ maxWidth: '100%', height: 125 }}
                            source={{uri: 'https://png.pngitem.com/pimgs/s/287-2875217_cloud-error-cloud-error-icon-svg-hd-png.png'}}

            /> : <Video
                source={{
                    uri: video,
                }}
                onError={() => {
                    setError(true);
                }}
                style={{ maxWidth: '100%', height: 125 }}
                resizeMode="cover"
                isLooping={false}
            />}
        </>
    );
}

export default RenderVideo;
