import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import { Navigation } from 'react-native-navigation';
import { PropTypes } from 'prop-types';
import ButtonMod from '../../components/UI/ButtonMod/ButtonMod';
import HeaderText from '../../components/UI/HeaderText/HeaderText';
import { VALIDATE_OTP, DEBUG, GET_USER_DETAILS_EMAIL } from '../../../Apis';
import { saveUserID, authHeaders, saveUserData, APP_ALERT_MESSAGE } from '../../../Constant';
import Permissions from 'react-native-permissions'
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

import Loading from 'react-native-whc-loading';
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
    ...this.props
  }

  componentDidMount() {
    Permissions.check('location').then(response => {
        if(response === 'denied' || response === 'undetermined') {
          this._requestPermission();
        } else if(response === 'authorized') {
            // this.getLocation()
        }
    })
  }

  _requestPermission = () => {
    Permissions.request('location').then(response => {
      this.setState({ location: response })
        // this.getLocation()
    })
  }

  getLocation = () => {
    this.refs.loading.show();
    Geolocation.getCurrentPosition(
        (position) => {
            // console.log(position);
            let lat_lon = position.coords.latitude.toString() + "," + position.coords.longitude.toString();
            console.log(lat_lon)
            this.mobileNumberSubmit(lat_lon , this);
        },
        (error) => {
            // See error code charts below.
            this.mobileNumberSubmit(null , this);
            console.log(error.code, error.message);
        },
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
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

    axios.post(VALIDATE_OTP, {
        userMobile: this.props.mobileNumber,
        userCountryCode: this.props.code,
        userOtp: this.state.name
    })
    .then(response => {
      let responseData = response.data;
      this.refs.loading.close();
      console.log(responseData)

      let data = {
        image: responseData.userImage ? responseData.userImage : require('../../assets/UserSmall.png'),
        name: responseData.userFirstName,
        email: responseData.userEmail,
        username : responseData.userLastName
      }

      setTimeout(function () {
        if (responseData) {
          if (responseData.userId) {
            saveUserID(responseData.userId);
            saveUserData(data)

            if (location) {
                if(responseData.userLastName) {
                  Navigation.push(thisObj.props.componentId, {
                    component: {
                      name: 'HomeScreen',
                      passProps: {
                        data: data
                      },
                      options: {
                        topBar: {
                          visible: false,
                          drawBehind: true,
                          animate: false,
                        },
                        popGesture: false
                      },
                      sideMenu: {
                        enabled: false,
                        visible: false
                      }
                    }
                  });
                } else if(!responseData.userLastName) {
                  Navigation.push(thisObj.props.componentId, {
                    component: {
                      id: 'Profile',
                      name: 'Profile',
                      passProps: {
                        email: null,
                        image: null,
                        name: null,
                        mobileNumber : thisObj.props.mobileNumber,
                        code : thisObj.props.code
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
                }
            } else {
              console.log('no location')
                Navigation.push(thisObj.props.componentId, {
                  component: {
                    name: 'AreaScreen',
                    passProps: {
                      data: responseData.areaStateMap,
                      mobileNumber : thisObj.props.mobileNumber,
                      code : thisObj.props.code,
                      username: responseData.userLastName,
                      name: responseData.userFirstName,
                      responseData: responseData
                    },
                  },
                });
              // }, 1000)
            }
            // Navigation.push(thisObj.props.componentId, {
            //   component: {
            //     name: 'AreaScreen',
            //     passProps: {
            //       data: responseData.areaStateMap,
            //       mobileNumber : thisObj.props.mobileNumber,
            //       code : thisObj.props.code,
            //       username: responseData.userLastName,
            //       name: responseData.userFirstName,
            //       responseData: responseData
            //     },
            //   },
            // });
          } else {
            Alert.alert(
              APP_ALERT_MESSAGE,
              'Invalid OTP!',
              [
                {text: 'OK', onPress: () => { }},
              ],
              {cancelable: false},
            );
          }
        }
      }, 1000)
    })
    .catch((error) => {
        this.refs.loading.close();
        console.error(error);
      });
  };



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
