import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, Dimensions } from 'react-native';

class FullPicture extends Component {

    render() {
        
        return (
            <View style={{ flex: 1, width: '100%' }}>
                <Image resizeMode='contain' source={{ uri: this.props.data }} style={{ height: null, width: null, flex:1,backgroundColor:'black'}} />
            </View>
        )
    }
}

export default FullPicture;