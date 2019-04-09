import Video from 'react-native-video';
 
// Within your render function, assuming you have a file called
// "background.mp4" in your project. You can include multiple videos
// on a single screen if you like.
 



import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Button,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import { Navigation } from 'react-native-navigation';
import { PropTypes } from 'prop-types';
import ButtonMod from '../../components/UI/ButtonMod/ButtonMod';
import HeaderText from '../../components/UI/HeaderText/HeaderText'
import { EMAIL_REGISTRATION, DEBUG } from '../../../Apis';
import { validateEmail, saveUserID, authHeaders } from '../../../Constant';

export default class VideoScreen extends Component {
    static propTypes = {
        componentId: PropTypes.string,
    };

    render() {
        var { height, width } = Dimensions.get('window');

        const options = {
            behavior: Platform.OS === "ios" ? "padding" : "null"
        }

        return (
            <View style={styles.container}>
                <KeyboardAvoidingView style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'clear',
                    margin: 0
                    
                }} enabled {...options}>

                    
                </KeyboardAvoidingView>
            </View>
        );
    }
}

