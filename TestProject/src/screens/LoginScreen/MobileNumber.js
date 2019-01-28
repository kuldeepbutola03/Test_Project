import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Button,
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import { Navigation } from 'react-native-navigation';
import { PropTypes } from 'prop-types';
import ButtonMod from '../../components/UI/ButtonMod/ButtonMod';
import PhoneInput from 'react-native-phone-input';
import HeaderText from '../../components/UI/HeaderText/HeaderText';
import { SEND_OTP, DEBUG } from '../../../Apis';
import { authHeaders, normalize } from '../../../Constant';

export default class MobileNumber extends Component {
  static propTypes = {
    componentId: PropTypes.string,
  };

  // state={
  //   // number : null,
  //   // countryCode : null
  // }

  constructor(props) {
    super(props);

    
    // this.pushScreen = this.pushScreen.bind (this);
  }




  mobileNumberSubmit = () => {
    // console.log(e);

    // let data = [
    //   { title: 'Title1', data: ['item1', 'item2'] },
    //   { title: 'Title2', data: ['item3', 'item4'] },
    //   { title: 'Title3', data: ['item5', 'item6'] },
    // ]

    //   let data = [
    //     { title: 'Title1', data: 'item1'},
    //     { title: 'Title2', data: 'item3' },
    //     { title: 'Title3', data: 'item5'},
    // ]

    // Navigation.push(this.props.componentId, {
    //   component: {
    //     name: 'AreaScreen',
    //     passProps: {

    //       code: this.phone.getCountryCode(),
    //       mobileNumber: this.phone.getValue(),
    //       data : data
    //     },
    //   },
    // });
    // return

    if (DEBUG == 0) {
      Navigation.push(this.props.componentId, {
        component: {
          name: 'OtpScreen',
          passProps: {

            code: this.phone.getCountryCode(),
            mobileNumber: this.phone.getValue(),
          },
        },
      });
      return;
    }

    console.log(this.phone.getCountryCode());
    console.log(this.phone.getValue());

    if (!this.phone.isValidNumber()) {
      alert('Please enter a valid number');
      return;
    }

    // var header = new Headers();

    let code = "+" + this.phone.getCountryCode();
    let phone = this.phone.getValue();
    var phoneN = phone.replace(code, "");
    fetch(SEND_OTP, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({
        userMobile: phoneN,
        userCountryCode: code,

      }),
    }).then((response) => response.json())
      .then((responseJson) => {


        // alert(responseJson);
        // code: this.phone.getCountryCode(),
        // mobileNumber: this.phone.getValue(),
        // user_id : responseJson.userId
        // return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
    Navigation.push(this.props.componentId, {
      component: {
        name: 'OtpScreen',
        passProps: {

          code:code,
          mobileNumber: phoneN
        },
      },
    });

    




  };

  // mobileNumberChanged = (changedNumber) => {
  // console.log(changedNumber);
  // console.log(this.phone.getCountryCode());
  // console.log(this.phone.getValue());

  // this.setState ({
  //   number : changedNumber,
  //   countryCode : '+1'
  // })
  // }

  render() {
    var { height, width } = Dimensions.get('window');
    const options = {
      behavior: Platform.OS === "ios" ? "padding" : "null"
    }
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'clear',
            margin: 30,
            width: width - 30,
          }}
          {...options}
          enabled
        >
          <View style={{ marginBottom: 20 }} alignItems='center' backgroundColor='transparent'>


            <Image style={{ position: 'absolute', bottom: 22, height: normalize(150), width: normalize(150), resizeMode: 'cover' }} source={require('../../assets/logoComp.png')} />
            <Text style={{ position: 'absolute', bottom: 10, fontWeight: "600", fontSize: 14, color: "rgba(86,49,135,1)" }}>AGENCY NAME</Text>

          </View>

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
            ref={(ref) => { this.phone = ref }}
            style={styles.phoneInput}
            textProps={{ placeholder: 'Mobile Number', height: 25 }}
            textStyle={{ borderBottomWidth: 1, borderColor: '#BFBFBF' }}
          // onChangePhoneNumber={(e) => this.mobileNumberChanged(e)}

          />

          <ButtonMod
            style={{ marginTop: 20 }}
            onPress={this.mobileNumberSubmit}
            color="rgba(86,49,135,1)"
          >
            Get OTP
          </ButtonMod>
        </KeyboardAvoidingView>
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
