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
import { CheckBox } from 'react-native-elements'

import Geolocation from 'react-native-geolocation-service';
import { APP_GLOBAL_COLOR } from '../../../Constant';

import firebase from 'react-native-firebase';

export default class MobileNumber extends Component {
  static propTypes = {
    componentId: PropTypes.string,
  };

  state = {
    loading: false,
    success: false,
    checkBocSelected: false,

    // disabled: true
  }

  constructor(props) {
    super(props);
    // this.pushScreen = this.pushScreen.bind (this);
  }

  componentDidMount() {
    this.phone.selectCountry('in')


    // this.getDataFromServer(true)
    firebase.analytics().setCurrentScreen("Screen", "Mobile_Number_Screen");
    //firebase.analytics().logEvent("Trends_Screen");
    firebase.analytics().setUserProperty("Screen", "Mobile_Number_Screen");
    firebase.analytics().logEvent("Content", { "Screen": "Mobile_Number_Screen" });


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
    let data = [
      { title: 'Title1', data: ['item1', 'item2'] },
      { title: 'Title2', data: ['item3', 'item4'] },
      { title: 'Title3', data: ['item5', 'item6'] },
    ]



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
        >
          Get OTP
        </ButtonMod>
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
          enabled
        >




          {/* <View style = {{flex : 1 , margin : 5 , backgroundColor : 'green'}}/>  */}
          {/* <View style={{ marginBottom: 20 }} alignItems='center' backgroundColor='transparent'> */}



          {/* <Text style={{ position: 'absolute', bottom: 10, fontWeight: "600", fontSize: 14, color: "#a01414" }}>AGENCY NAME</Text> */}


          <View style={{ flex: 1 }} justifyContent='center' alignItems='center' backgroundColor='transparent'>

            <Image style={{ marginBottom: 10, height: normalize(100), width: normalize(100), resizeMode: 'cover' }} source={require('../../assets/icon1.png')} />

            <View>
              <HeaderText
                style={{
                  marginBottom: 20,
                }}
              >
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

            <CheckBox containerStyle={{ marginTop: 20 }}
              title='Agree to Terms and Conditions'
              checked={this.state.checkBocSelected}
              onPress={() => {
                this.showTC();
              }}
              onIconPress={() => { this.setState({ checkBocSelected: !this.state.checkBocSelected }) }}
            />
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
