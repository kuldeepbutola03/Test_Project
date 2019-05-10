import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, Dimensions, SafeAreaView } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

class FullPicture extends Component {
    render() {
        return (
            // <SafeAreaView
            //     forceInset={{ bottom: 'always' }}
            //     style={{ flex: 1, backgroundColor: 'rgba(210,210,208,1)' }}
            // >
            <SafeAreaView forceInset={{ bottom: 'always' }} style={{ flex: 1, width: '100%', backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
                <ImageZoom
                    cropWidth={Dimensions.get('window').width}
                    cropHeight={Dimensions.get('window').height}
                    imageWidth={Dimensions.get('window').width}
                    imageHeight={Dimensions.get('window').height}
                >
                    <Image
                        resizeMode='contain'
                        source={{ uri: this.props.data }}
                        style={{ height: null, width: null, flex: 1, backgroundColor: 'black' }} />
                </ImageZoom>
                {/* </View> */}
            </SafeAreaView>
        )
    }
}

export default FullPicture;