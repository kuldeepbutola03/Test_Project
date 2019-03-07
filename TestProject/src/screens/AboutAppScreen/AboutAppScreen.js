import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    Image,
    SafeAreaView,
    TouchableOpacity

} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import { Navigation } from 'react-native-navigation';
import { PropTypes } from 'prop-types';
import ButtonMod from '../../components/UI/ButtonMod/ButtonMod';
import PhoneInput from 'react-native-phone-input';
import HeaderText from '../../components/UI/HeaderText/HeaderText';
import { SEND_OTP, DEBUG } from '../../../Apis';
import { authHeaders, normalize } from '../../../Constant';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from 'axios';

import { APP_GLOBAL_COLOR } from '../../../Constant';
export default class AboutAppScreen extends Component {
    static propTypes = {
        componentId: PropTypes.string,
    };



    constructor(props) {
        super(props);
        // this.pushScreen = this.pushScreen.bind (this);
    }

    componentDidMount() {

        // SplashScreen.hide()


    }



    handleTap = () => {
        Navigation.push(this.props.componentId, {
            component: {
              name: 'TutorialScreen',
              options: {
                topBar: {
                  visible: false,
                  drawBehind: true,
                  animate: false,
                },
              },
              passProps: {
                
              }
            },
          });
    }



    render() {
        var { height, width } = Dimensions.get('window');
        const options = {
            behavior: Platform.OS === "ios" ? "padding" : "null"
        }
        return (
            <View
                style={styles.container} backgroundColor='white'>



                <View style={{ flex: 1, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: APP_GLOBAL_COLOR }}>

                    
                {/* 161 × 174 */}
                    <Image style={{ marginBottom: 10, height: normalize(161) * 1.5, width: normalize(174) * 1.5, resizeMode: 'cover' }} source={require('../../assets/Tutorial/mainBg.png')} />
                   
                    <TouchableOpacity onPress={this.handleTap} style = {{height : 40 , width : '40%' , marginTop : 10 }} >
                        <View style={{flex : 1, backgroundColor : 'white', justifyContent: 'center', alignItems:'center'}}>
                            <Text style={{ fontWeight: 'bold', color:  APP_GLOBAL_COLOR  }}>GET STARTED</Text>
                        </View>
                    </TouchableOpacity>

                </View>






            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    phoneInput: {
        width: '70%',
        height: 50,
        margin: 10,
        padding: 5,
    },
});
