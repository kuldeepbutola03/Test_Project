import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import { Navigation } from 'react-native-navigation';
import { PropTypes } from 'prop-types';
import ButtonMod from '../../components/UI/ButtonMod/ButtonMod';
import HeaderText from '../../components/UI/HeaderText/HeaderText';

import { VALIDATE_OTP, DEBUG, GET_USER_DETAILS_EMAIL } from '../../../Apis';
import { saveUserID, authHeaders, defaultUser, saveUserData } from '../../../Constant';

import Loading from 'react-native-whc-loading';
import Geolocation from 'react-native-geolocation-service';
// import { PermissionsAndroid } from 'react-native';

export default class OtpScreen extends Component {
  static propTypes = {
    componentId: PropTypes.string,
  };

  constructor(props) {
    super(props);
    // this.getLocation();
  }
  state = {
    otp: null,
    // ...this.props
  }

  getLocation = () => {
    //this.refs.loading.show();
    // geolocation.setRNConfiguration(config);

    Geolocation.getCurrentPosition(
      (position) => {

        const initialPosition = JSON.stringify(position);

        // let latlong = position.coords.latitude.toString() +  "," + position.coords.longitude.toString()
        let lat_lon = position.coords.latitude.toString() + "," + position.coords.longitude.toString();
        // alert(lat_lon);
        if (position.mocked) {
          if (position.mocked == true) {
            this.refs.loading.close();
            setTimeout(function () {
              alert("You are using fake location");
            }, 1000)
            return;
          }
        }

        //  alert(code + "   " + phoneN);
        // this.setState({ lat_lon: latlong });

        this.mobileNumberSubmit(lat_lon, this);
      },
      (error) => {
        // alert(error.message);
        // this.locationErrorMessage = error.message;
        // alert(locationErrorMessage)
        // this.showDialog();
        this.mobileNumberSubmit(null, this);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  mobileNumberSubmit = (locationStr, thisObj) => {
    // let thisObj = this;
    let location = locationStr;
    if (DEBUG == 0) {
      this.refs.loading.close();
      Navigation.push(this.props.componentId, {
        component: {
          name: 'Profile',
          options: {
            topBar: {
              visible: false,
              animate: false,
              drawBehind: true
            }
          }
        },
      });
      return;
    }

    let body = null;
    
    if (locationStr) {
      body = JSON.stringify({
        userMobile: this.props.mobileNumber,
        userCountryCode: this.props.code,
        userOtp: this.state.otp,
        userInitCoord: locationStr
      })
    } else {
      body = JSON.stringify({
        userMobile: this.props.mobileNumber,
        userCountryCode: this.props.code,
        userOtp: this.state.otp
      })
    }

    // alert(body);

    // console.log(this.state.otp);
    // console.log(this.state.code);
    // console.log(this.state.mobileNumber);
    //     return;
    // alert(body);

    fetch(VALIDATE_OTP, {
      method: 'POST',
      headers: authHeaders(),
      body: body,
    }).then((response) => response.json())
      .then((responseJson) => {
        //  alert(JSON.stringify(responseJson));
        //this.refs.loading.close();
        setTimeout(function () {

          // alert(JSON.stringify(responseJson));
          if (responseJson) {
            if (responseJson.userId) {

              saveUserID(responseJson.userId);
              saveUserData(responseJson);
              // alert(JSON.stringify(responseJson));

              if (location) {

                Navigation.push(thisObj.props.componentId, {
                  component: {
                    id: 'Profile',
                    name: 'Profile',
                    passProps: {
                      // email: null,
                      image: responseJson.image ? responseJson.image : defaultUser,  //null
                      name: responseJson.name ? responseJson.name : null,           //null 
                      mobileNumber: thisObj.props.mobileNumber,
                      code: thisObj.props.code,
                    },
                    options: {
                      topBar: {
                        visible: false,
                        animate: false,
                        drawBehind: true
                      }
                    }
                  },
                });

              } else {

                Navigation.push(thisObj.props.componentId, {
                  component: {
                    name: 'AreaScreen',
                    passProps: {
                      data: responseJson.areaStateMap,
                      mobileNumber: thisObj.props.mobileNumber,
                      code: thisObj.props.code,
                      image: responseJson.image ? responseJson.image : defaultUser, // ++
                      name: responseJson.name ? responseJson.name : null,            // ++
                    },
                  },
                });
              }
            } else {
              alert("Invalid OTP");
            }
            // saveUserID(responseJson.userId);
          } else {
            // this.getUser(this);
            alert("Invalid OTP");
          }
        }, 300)
        // return responseJson;
      })
      .catch((error) => {
        this.refs.loading.close();
        console.error(error);
      });
  };

  textChanged = (sender) => {
    // console.log(sender);
    this.setState({ otp: sender });
  }

  render() {

    const options = {
      behavior: Platform.OS === "ios" ? "padding" : "null"
    }

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboard}
          enabled
          {...options}
        >
          <View>
            <HeaderText
              style={{
                marginBottom: 8,
              }}
            >
              Enter OTP
          </HeaderText>
          </View>

          <DefaultInput 
              onChangeText={(text) => this.textChanged(text)} 
              placeholder="Enter OTP" 
              secureTextEntry={true} 
             />

          <ButtonMod onPress={this.getLocation} color="rgba(86,49,135,1)">
            Submit
          </ButtonMod>

          <Loading
            ref="loading" />
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
  keyboard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
    width: Dimensions.get('window').width - 30,
  },
});
