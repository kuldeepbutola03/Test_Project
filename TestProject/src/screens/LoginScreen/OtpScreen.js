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
import { VALIDATE_OTP, DEBUG, GET_USER_DETAILS_EMAIL, LANDING_TOP_SIX, SEND_OTP } from '../../../Apis';
import { saveUserID, authHeaders, saveUserData, getCurrentLocation, defaultUser, APP_GLOBAL_COLOR } from '../../../Constant';
// import axios from 'axios';
// import Geolocation from 'react-native-geolocation-service';
import Loading from 'react-native-whc-loading';
import Permissions from 'react-native-permissions';
import { CheckBox } from 'react-native-elements';
import axios from 'axios';
import firebase from 'react-native-firebase';

import KochavaTracker from 'react-native-kochava-tracker';

export default class OtpScreen extends Component {

  static propTypes = {
    componentId: PropTypes.string,
  };

  state = {
    name: null,
    location: null,
    seconds: "00",
    minutes: 1,
    show: true,
    // checkBocSelected: false,
    ...this.props
  }

  constructor(props) {
    super(props);

    this.secondsRemaining;
    this.intervalHandle;
    // this.handleChange = this.handleChange.bind(this);
    this.startCountDown = this.startCountDown.bind(this);
    this.tick = this.tick.bind(this);
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
    var eventMapObject = {};
    eventMapObject["screen_name"] = "OTP_Screen";
    KochavaTracker.sendEventMapObject(KochavaTracker.EVENT_TYPE_LEVEL_COMPLETE_STRING_KEY, eventMapObject);
  }

  // handleChange(event) {
  //   this.setState({
  //     minutes: event.target.value
  //   })
  // }

  tick() {
    var min = Math.floor(this.secondsRemaining / 60);
    var sec = this.secondsRemaining - (min * 60);
    this.setState({
      minutes: min,
      seconds: sec
    })
    if (sec < 10) {
      this.setState({
        seconds: "0" + this.state.seconds,
      })
    }
    // if (min < 10) {
    //   this.setState({
    //     minutes : "0" + min,
    //   })
    // }
    // alert()
    if (min === 0 & sec == "00") {
      // alert('asdsa')
      clearInterval(this.intervalHandle);
      this.intervalHandle = null;
      this.setState({ show: true, minutes: 1, seconds: '00' })
      // alert(this.intervalHandle);
      return
    }
    this.secondsRemaining--
  }

  startCountDown() {
    // alert(this.intervalHandle);
    this.intervalHandle = setInterval(this.tick, 1000);
    let time = this.state.minutes;
    this.secondsRemaining = time * 60;
    // alert(this.intervalHandle);
  }

  getTimer = () => {
    return (
      <View>
        {this.state.show ? <Text onPress={() => { this.resendOTP() }} style={{ alignSelf: 'center', fontSize: 12, color: APP_GLOBAL_COLOR }}>Resend OTP</Text> : <Text style={{ alignSelf: 'center', fontSize: 12, color: APP_GLOBAL_COLOR }}>{this.state.minutes + ":" + this.state.seconds}</Text>}
      </View>
    )
  }

  resendOTP = () => {
    // this.refs.loading.show();
    // this.setState({ show: false });
    // this.secondsRemaining = null;
    // this.startCountDown();
    // alert(this.intervalHandle)
    axios.post(SEND_OTP, {
      userMobile: this.props.mobileNumber,
      userCountryCode: this.props.code
    })
      .then(response => {
        let responseData = response.data.response;
        this.setState({ show: false });
        this.secondsRemaining = null;
        this.startCountDown();
        // this.refs.loading.close();
      })
      .catch(error => {
        // this.refs.loading.close();
        console.error(error);
      })
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
    let thatObj = thisObj;
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
        userInitCoord: locationStr,
        pushNotificationToken: this.props.pushNotificationToken,
      }
    } else {
      body = {
        userMobile: this.props.mobileNumber,
        userCountryCode: this.props.code,
        userOtp: this.state.name,
        pushNotificationToken: this.props.pushNotificationToken,
      }
    }
    axios.post(VALIDATE_OTP, body)
      .then(response => {
        let responseData = response.data;
        console.log(responseData)

        let data = {
          image: responseData.userImageData,
          name: responseData.userFirstName,
          email: responseData.userEmail,
          username: responseData.userName
        }
        // setTimeout(function () {
        thatObj.refs.loading.close();
        // return;
        if (responseData) {
          if (responseData.userId) {
            if (!responseData.areaStateMap) {
              // axios.post(LANDING_TOP_SIX, {
              //   userId: responseData.userId,
              // })
              // .then(response_2 => {

              //   // alert(JSON.stringify(response_2.data));
              //   // console.log('kkkkkkkk');
              //   let responseData_2 = response_2.data;
              //   let languageArry = responseData_2.extraImageFile3 ? responseData_2.extraImageFile3 : "Trends,Survey,Arena,Notifications,Rate Now, Profile, Male,Female, Select Your Profession,Student,Salaried,Entrepreneur, Retired, Housewife,Other, Select Your Age group, Teenager,Twenties,Thirties,Forties,Fifties,Sixty+";

              let languageArry = "Trends,Survey,Arena,Notifications,Rate Now, Profile, Male,Female, Select Your Profession,Student,Salaried,Entrepreneur, Retired, Housewife,Other, Select Your Age group, Teenager,Twenties,Thirties,Forties,Fifties,Sixty+";
              let menuArr = languageArry.split(',');


              saveUserID(responseData.userId);
              let dict = {
                email: responseData.userEmail,
                image: responseData.userImageData,
                firstName: responseData.userFirstName,
                lastName: responseData.userLastName,
                username: responseData.userName,
                mobileNumber: thatObj.props.mobileNumber,
                code: thatObj.props.code,
                userId: responseData.userId,
                userDesignation: responseData.userDesignation,
                selectedAgeGroupCode: responseData.userAgeGroup,
                description: responseData.userDescription,
                gender: responseData.userGender,
                userLanguage: responseData.userLanguage
              };
              saveUserData(dict);
              Navigation.push(thatObj.props.componentId, {
                component: {
                  id: 'Profile',
                  name: 'Profile',
                  passProps: {
                    ...dict,
                    language: menuArr ? menuArr[5] : null,
                    male: menuArr ? menuArr[6] : null,
                    female: menuArr ? menuArr[7] : null,
                    selProfession: menuArr ? menuArr[8] : null,
                    student: menuArr ? menuArr[9] : null,
                    salaried: menuArr ? menuArr[10] : null,
                    entrepreneur: menuArr ? menuArr[11] : null,
                    retired: menuArr ? menuArr[12] : null,
                    housewife: menuArr ? menuArr[13] : null,
                    other: menuArr ? menuArr[14] : null,
                    selAgeGroup: menuArr ? menuArr[15] : null,
                    teenager: menuArr ? menuArr[16] : null,
                    twenties: menuArr ? menuArr[17] : null,
                    thirties: menuArr ? menuArr[18] : null,
                    fourties: menuArr ? menuArr[19] : null,
                    fifties: menuArr ? menuArr[20] : null,
                    aboveSixty: menuArr ? menuArr[21] : null,
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
              // })
              // .catch(error => {
              //   console.log(error)
              // })
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
                    userDesignation: responseData.userDesignation,
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
            // this.refs.loading.close();
            setTimeout(function () {
              alert("Invalid OTP");
            }, 500);
          }
        } else {
          setTimeout(function () {
            alert("Invalid OTP");
          }, 500);
          // this.refs.loading.close();
        }
        // }, 200)
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
          <DefaultInput onChangeText={(text) => this.textChanged(text)} placeholder="Enter OTP" secureTextEntry={true} autoFocus/>
          {this.getTimer()}
          <ButtonMod onPress={this.getLocation} color="#a01414"> Submit </ButtonMod>
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
