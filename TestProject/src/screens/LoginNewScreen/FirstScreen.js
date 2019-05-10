import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Button,
    KeyboardAvoidingView,
    Platform,
    Image,
    SafeAreaView,
    ScrollView

} from 'react-native';
import {
    LoginButton,
    AccessToken,
    LoginManager,
    GraphRequest,
    GraphRequestManager,
} from 'react-native-fbsdk';

import { Navigation } from 'react-native-navigation';
import { PropTypes } from 'prop-types';
import ButtonMod from '../../components/UI/ButtonMod/ButtonMod';
import PhoneInput from 'react-native-phone-input';
import HeaderText from '../../components/UI/HeaderText/HeaderText';
import { SEND_OTP, DEBUG } from '../../../Apis';
import { authHeaders, normalize } from '../../../Constant';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from 'axios';
import { CheckBox } from 'react-native-elements'

import Geolocation from 'react-native-geolocation-service';
import { APP_GLOBAL_COLOR } from '../../../Constant';

import firebase from 'react-native-firebase';

import KochavaTracker from 'react-native-kochava-tracker';

import Circle from '../../components/UI/ResultPoll/Circle';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default class FirstScreen extends Component {
    static propTypes = {
        componentId: PropTypes.string,
    };

    state = {
        loading: false,
        success: false,
        checkBocSelected: false,

        loadingFb: false
        // disabled: true
    }

    constructor(props) {
        super(props);
        // this.pushScreen = this.pushScreen.bind (this);
    }

    componentDidMount() {
        this.phone.selectCountry('in')


        // this.getDataFromServer(true)
        firebase.analytics().setCurrentScreen("Screen", "Login_FB_Mobile_Screen");
        //firebase.analytics().logEvent("Trends_Screen");
        firebase.analytics().setUserProperty("Screen", "Login_FB_Mobile_Screen");
        firebase.analytics().logEvent("Content", { "Screen": "Login_FB_Mobile_Screen" });



        var eventMapObject = {};
        eventMapObject["screen_name"] = "Login_FB_Mobile_Screen";
        KochavaTracker.sendEventMapObject(KochavaTracker.EVENT_TYPE_LEVEL_COMPLETE_STRING_KEY, eventMapObject);

    }

    goOtp = (code, phoneN, responseData) => {
        // alert(responseData);
        Navigation.push(this.props.componentId, {
            component: {
                name: 'OtpScreen',
                passProps: {
                    code: code,
                    mobileNumber: phoneN,
                    pushNotificationToken: this.props.pushNotificationToken,
                },
            },
        });
    }

    mobileNumberSubmit = () => {
        // console.log(e);



        if (DEBUG == 0) {
            Navigation.push(this.props.componentId, {
                component: {
                    name: 'OtpScreen',
                    passProps: {
                        pushNotificationToken: this.props.pushNotificationToken,
                        code: this.phone.getCountryCode(),
                        mobileNumber: this.phone.getValue(),
                    },
                },
            });
            return;
        }
        if (!this.state.checkBocSelected) {
            alert('Please agree to Terms and Conditions');
            return;
        }

        if (!this.phone.isValidNumber()) {
            // this.setState({ loading: false })
            alert('Please enter a valid number');
            return;
        }
        this.setState({ loading: true })

        // var header = new Headers();

        let code = "+" + this.phone.getCountryCode();
        let phone = this.phone.getValue();
        var phoneN = phone.replace(code, "");

        axios.post(SEND_OTP, {
            userMobile: phoneN,
            userCountryCode: code
        })
            .then(response => {
                let responseData = response.data.response;
                this.setState({ loading: false, success: true })
                this.goOtp(code, phoneN, responseData);
            })
            .catch(error => {
                console.error(error)
            })

    };

    renderButton = () => {
        const { loading } = this.state;

        if (loading) {
            return (
                <Spinner />
            )
        } else if (!loading) {
            return (
                <ButtonMod
                    style={{ marginTop: 20 }}
                    onPress={this.mobileNumberSubmit}
                    color="#a01414"
                // disabled={this.state.disabled}
                > Get OTP </ButtonMod>
            )
        }
    }

    renderFbButton = () => {
        const { loadingFb } = this.state;

        if (loadingFb) {
            return (
                <Spinner />
            )
        } else {
            return (
                <ButtonMod
                    style={{ marginTop: 20 }}
                    onPress={this.fbHandler}
                    color="#2980b9"
                // disabled={this.state.disabled}
                > FACEBOOK </ButtonMod>
            )
        }
    }

    showTC() {
        // if(this.state.)
        Navigation.push(this.props.componentId, {
            component: {
                name: 'TcScreen',
                // options: {
                //   topBar: {
                //     visible: false,
                //     animate: false,
                //     drawBehind: true
                //   }
                // }
            },
        });

    }

    fbHandler = () => {
        this.setState({ loadingFb: true });
        LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
            (LoginManager.onLoginFinished = result => {
                console.log('onLoginFinished.');
                if (result.isCancelled) {
                    console.log('login is cancelled.');
                    this.setState({ loadingFb: false });
                } else {
                    AccessToken.getCurrentAccessToken().then(data => {
                        console.log(data.accessToken.toString());
                        this.initUser(data.accessToken.toString());
                    });
                }
            })
            ,
            (LoginManager.onLogoutFinished = () => {
                console.log('logout.');
                alert('Error :Facebook login');
                this.setState({ loadingFb: false });
            })
        );
    };
    initUser = token => {
        fetch(
            'https://graph.facebook.com/v2.5/me?fields=email,picture.type(normal),about,id,name&access_token=' +
            token
        )
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({ loadingFb: false });
                this.toProfile(json);
            })
            .catch(error => {
                reject('ERROR GETTING DATA FROM FACEBOOK');
                this.setState({ loadingFb: false });
                throw error;
            });
    };

    toProfile(json) {


        //   "userFirstName": "Jackson",
        // "userLastName": "Jackson",
        // "userEmail": "j@j.com",
        // "userFb": 123123123424353453,
        // "userMobile": "447817799083",
        // "userCountryCode": "44",
        // "userImageName": "user_image.jpg",
        // "userImageData": “DATA IN FORM OF BASE64 STRING”

    }


    render() {
        var { height, width } = Dimensions.get('window');
        const options = {
            behavior: Platform.OS === "ios" ? "padding" : "null"
        }
        return (
            <SafeAreaView
                forceInset={{ bottom: 'always' }} style={styles.container}>
                {/* <ScrollView style={{ flex: 1 ,margin : 0, width : '100%' , height : '100%', backgroundColor : 'green' }}> */}
                <KeyboardAvoidingView
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'clear',
                        // margin: 30,
                        width: '100%',
                    }}
                    {...options}
                    enabled>
                    <Circle style={{ flex: 1, height: 300 }} />
                    
                    <View style={{ flex: 1 }} justifyContent='center' alignItems='center' backgroundColor='transparent'>

                        <Image style={{ marginBottom: 10, height: normalize(100), width: normalize(100), resizeMode: 'cover' }} source={require('../../assets/icon1.png')} />
                        <View>
                            <HeaderText
                                style={{
                                    marginBottom: 20,
                                }}>
                                Mobile Number Verification
          </HeaderText>
                        </View>

                        <PhoneInput
                            initial
                            ref={(ref) => { this.phone = ref }}
                            style={styles.phoneInput}
                            textProps={{ placeholder: 'Mobile Number', height: 25 }}
                            textStyle={{ borderBottomWidth: 1, borderColor: '#BFBFBF' }}
                        // onChangePhoneNumber={(e) => this.mobileNumberChanged(e)}
                        />

                        {this.renderButton()}

                        {/* <CheckBox containerStyle={{ marginTop: 20 }}
                            leftIcon={null}
                            size={wp('5%')}
                            title='Agree to Terms and Conditions'
                            checked={this.state.checkBocSelected}
                            onPress={() => {
                                this.showTC();
                            }}
                            onIconPress={() => { this.setState({ checkBocSelected: !this.state.checkBocSelected }) }}
                        /> */}
                        {this.renderFbButton()}

                        {/* <HeaderText
                                style={{
                                    marginTop: 20,
                                }}>
                                Mobile Number Verification
          </HeaderText> */}
                    </View>




                </KeyboardAvoidingView>
                {/* </ScrollView> */}
            </SafeAreaView>
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
