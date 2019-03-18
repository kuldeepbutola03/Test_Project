import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Button,
  KeyboardAvoidingView,
  Platform,
  TextInput
} from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import { Navigation } from 'react-native-navigation';
import { PropTypes } from 'prop-types';
import ButtonMod from '../../components/UI/ButtonMod/ButtonMod';
import HeaderText from '../../components/UI/HeaderText/HeaderText';
import { VALIDATE_OTP, DEBUG, GET_USER_DETAILS_EMAIL } from '../../../Apis';
import { saveUserID, authHeaders, saveUserData, getCurrentLocation, defaultUser } from '../../../Constant';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import Loading from 'react-native-whc-loading';
import Permissions from 'react-native-permissions';
import { CheckBox } from 'react-native-elements';

import firebase from 'react-native-firebase';

export default class OtpScreen extends Component {

  static propTypes = {
    componentId: PropTypes.string,

  };

  constructor(props) {
    super(props);
  }

  state = {
    name: null,
    location: null,
    // checkBocSelected: false,
    ...this.props
  }

  componentDidMount() {
    Permissions.check('location').then(response => {
      if (response === 'denied' || response === 'undetermined') {
        this._requestPermission();
      } else if (response === 'authorized') {
        // this.getLocation()
      }
    })

    // this.getDataFromServer(true)
    firebase.analytics().setCurrentScreen("Screen", "OTP_Screen");
    //firebase.analytics().logEvent("Trends_Screen");
    firebase.analytics().setUserProperty("Screen", "OTP_Screen");
    firebase.analytics().logEvent("Content", { "Screen": "OTP_Screen" });

  }

  _requestPermission = () => {
    Permissions.request('location').then(response => {
      this.setState({ location: response })
      // alert(response);
      // this.getLocation()
    })
  }



  getLocation = () => {
    this.refs.loading.show();

    if (this.state.location === 'denied' || this.state.location === 'undetermined') {
      this.mobileNumberSubmit(null, this);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const initialPosition = JSON.stringify(position);

        // let latlong = position.coords.latitude.toString() +  "," + position.coords.longitude.toString()
        let lat_lon = position.coords.latitude.toString() + "," + position.coords.longitude.toString();
        // alert(lat_lon);
        if (position.mocked) {
          if (position.mocked == true) {
            alert("you are using fake location");
            this.refs.loading.close();
            return;
          }
        }

        // alert(code + "   " + phoneN);
        // this.setState({ lat_lon: latlong });
        this.mobileNumberSubmit(lat_lon, this);
      },
      (error) => {
        // alert(error.message)
        // this.locationErrorMessage = error.message;
        // alert(locationErrorMessage)
        // this.showDialog();
        this.mobileNumberSubmit(null, this);


      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );

    // Geolocation.getCurrentPosition(
    //   (position) => {
    //     const initialPosition = JSON.stringify(position);
    //     // let latlong = position.coords.latitude.toString() +  "," + position.coords.longitude.toString()
    //     let lat_lon = position.coords.latitude.toString() + "," + position.coords.longitude.toString();
    //     // alert(lat_lon);
    //     if (position.mocked) {
    //       if (position.mocked == true) {
    //         this.refs.loading.close();
    //         setTimeout(function () {
    //           alert("You are using fake location");
    //         }, 1000)
    //         return;
    //       }
    //     }
    //     //  alert(code + "   " + phoneN);
    //     // this.setState({ lat_lon: latlong });
    //     this.mobileNumberSubmit(lat_lon, this);
    //   },
    //   (error) => {
    //     // alert(error.message);
    //     // this.locationErrorMessage = error.message;
    //     // alert(locationErrorMessage)
    //     // this.showDialog();
    //     this.mobileNumberSubmit(null, this);
    //   },
    //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    // );
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
      body = {
        userMobile: this.props.mobileNumber,
        userCountryCode: this.props.code,
        userOtp: this.state.name,
        userInitCoord: locationStr
      }
    } else {
      body = {
        userMobile: this.props.mobileNumber,
        userCountryCode: this.props.code,
        userOtp: this.state.name
      }
    }
    axios.post(VALIDATE_OTP, body)
      .then(response => {
        let responseData = response.data;
        this.refs.loading.close();
        console.log(responseData)

        let data = {
          image: responseData.userImageData,
          name: responseData.userFirstName,
          email: responseData.userEmail,
          username: responseData.userName
        }

        setTimeout(function () {
          if (responseData) {
            if (responseData.userId) {



              if (location) {
                saveUserID(responseData.userId);
                saveUserData(data);
                Navigation.push(thisObj.props.componentId, {
                  component: {
                    id: 'Profile',
                    name: 'Profile',
                    passProps: {
                      email: responseData.userEmail,
                      image: responseData.userImageData,
                      firstName: responseData.userFirstName,
                      lastName: responseData.userLastName,
                      username: responseData.userName,
                      mobileNumber: thisObj.props.mobileNumber,
                      code: thisObj.props.code,
                      userId: responseData.userId,
                      userDesignation : responseData.userDesignation,
                      selectedAgeGroupCode: responseData.userAgeGroup,
                      description: responseData.userDescription,
                      gender: responseData.userGender,
                      userLanguage: responseData.userLanguage
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
                // }
              } else {
                // console.log('no location')
                Navigation.push(thisObj.props.componentId, {
                  component: {
                    name: 'AreaScreen',
                    passProps: {
                      data: responseData.areaStateMap,
                      mobileNumber: thisObj.props.mobileNumber,
                      code: thisObj.props.code,
                      username: responseData.userName,
                      firstName: responseData.userFirstName,
                      lastName: responseData.userLastName,
                      image: responseData.userImageData,
                      userId: responseData.userId,
                      responseData: responseData,
                      dataToSave: data,
                      userDesignation : responseData.userDesignation,
                      selectedAgeGroupCode: responseData.userAgeGroup,
                      description: responseData.userDescription,
                      gender: responseData.userGender,
                      userLanguage: responseData.userLanguage
                    },
                    options: {
                      topBar: {
                        visible: false,
                        drawBehind: true,
                        animate: false,
                      },
                      popGesture: false
                    }
                  },
                });
                // }, 1000)
              }
              // }


            } else {
              alert("Invalid OTP");
            }
          }
        }, 1000)
      })
      .catch((error) => {
        this.refs.loading.close();
        console.error(error);
      });
  };

  // showTC() {
  //   // if(this.state.)
  //   Navigation.push(this.props.componentId, {
  //     component: {
  //       name: 'TcScreen',
  //       // options: {
  //       //   topBar: {
  //       //     visible: false,
  //       //     animate: false,
  //       //     drawBehind: true
  //       //   }
  //       // }
  //     },
  //   });

  // }


  textChanged = (sender) => {
    this.setState({ name: sender });
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
          <DefaultInput onChangeText={(text) => this.textChanged(text)} placeholder="Enter OTP" secureTextEntry={true} />
          <ButtonMod onPress={this.getLocation} color="#a01414">
            Submit
          </ButtonMod>



          {/* <CheckBox style = {{marginTop : 20}}
            title='Agree to Terms and Conditions'
            checked={this.state.checkBocSelected}
            onPress = {()=> {
              
              // this.showTC();
              
              if(!this.state.checkBocSelected) {
                this.showTC();
              }
              // setTimeout(() => {
                this.setState({checkBocSelected : !this.state.checkBocSelected});
              // },300);
              
            }}
          /> */}
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
