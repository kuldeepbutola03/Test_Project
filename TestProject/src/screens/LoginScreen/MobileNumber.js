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
import PhoneInput from 'react-native-phone-input';
import HeaderText from '../../components/UI/HeaderText/HeaderText';
import { SEND_OTP, DEBUG } from '../../../Apis';

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


    fetch(SEND_OTP, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({
        userMobile: this.phone.getCountryCode(),
        userCountryCode: this.phone.getValue(),
      }),
    }).then((response) => response)
      .then((responseJson) => {

        

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
            
            code: this.phone.getCountryCode(),
            mobileNumber: this.phone.getValue(),
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
