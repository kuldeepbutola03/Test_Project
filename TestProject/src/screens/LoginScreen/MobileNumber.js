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
// import { Geolocation } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
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


    // alert("hhhvv");
    
    Geolocation.getCurrentPosition(
      
      // navigator.geolocation.getCurrentPosition(
        (position) => {
          // alert("hhh");
          // const initialPosition = JSON.stringify(position);
  
          // let latlong = position.coords.latitude.toString() +  "," + position.coords.longitude.toString()
          // let lat_lon = position.coords.latitude.toString() + "," + position.coords.longitude.toString();
          // alert(lat_lon);
          // if (position.mocked) {
          //   if (position.mocked == true) {
          //     this.refs.loading.close();
          //     setTimeout(function () {
          //       alert("you are using fake location");
          //     }, 1000)
  
          //     return;
          //   }
          // }
  
          //  alert(code + "   " + phoneN);
          // this.setState({ lat_lon: latlong });
  
          // this.mobileNumberSubmit(lat_lon, this);
        },
        (error) => {
          // alert(error.message);
          // this.locationErrorMessage = error.message;
          // alert(locationErrorMessage)
          // this.showDialog();
          // this.mobileNumberSubmit(null, this);
  
  
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
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
    })
    // .then((response) => response.json())
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
