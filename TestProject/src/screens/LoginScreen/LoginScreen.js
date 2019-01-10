import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import { Navigation } from 'react-native-navigation';
import { PropTypes } from 'prop-types';
import ButtonMod from '../../components/UI/ButtonMod/ButtonMod';
import {
  LoginButton,
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import { DEBUG } from '../../../Apis';

export default class LoginScreen extends Component {

  static propTypes = {
    componentId: PropTypes.string,
  };

  constructor(props) {
    super(props);
    // this.pushScreen = this.pushScreen.bind(this);
    this.mobileNumberVerification = this.mobileNumberVerification.bind(this);
  }

  toProfile(json) {

    if (DEBUG == 0) {
      Navigation.push(this.props.componentId, {
        component: {
          name: 'Profile',
          passProps: {
            email: json.email,
            image: json.picture.data,
            name: json.name,
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
      return;
    } else {
      //   "userFirstName": "Jackson",
      // "userLastName": "Jackson",
      // "userEmail": "j@j.com",
      // "userFb": 123123123424353453,
      // "userMobile": "447817799083",
      // "userCountryCode": "44",
      // "userImageName": "user_image.jpg",
      // "userImageData": “DATA IN FORM OF BASE64 STRING”
      fetch(FACEBOOK_REGISTRATION, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userFirstName: "",
          userLastName: "",
          userEmail: json.email,
          userFb: json.id,
          userMobile: "",
          userCountryCode: "",
          userImageName: "user_image.jpg",
          userImageData: json.picture.data
        }),
      }).then((response) => response)
        .then((responseJson) => {

          Navigation.push(this.props.componentId, {
            component: {
              name: 'Profile',
              passProps: {
                email: json.email,
                image: json.picture.data,
                name: json.name,
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


          // return responseJson;
        })
        .catch((error) => {
          console.error(error);
        });
    }


  }

  mobileNumberVerification = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'MobileNumber',
      },
    });
  };

  emailVerification = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'EmailScreen',
      },
    });
  };
  registerWithEmail = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'RegistrationScreen',
      },
    });
  };

  initUser = token => {
    fetch(
      'https://graph.facebook.com/v2.5/me?fields=email,picture.type(normal),about,id,name&access_token=' +
      token
    )
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.toProfile(json);
      })
      .catch(error => {
        reject('ERROR GETTING DATA FROM FACEBOOK');
        throw error;
      });
  };

  fbHandler = () => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      (LoginManager.onLoginFinished = result => {
        if (result.isCancelled) {
          console.log('login is cancelled.');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            console.log(data.accessToken.toString());
            this.initUser(data.accessToken.toString());
          });
        }
      }),
      (LoginManager.onLogoutFinished = () => console.log('logout.'))
    );
  };

  render() {
    return (
      <View style={styles.container}>

        <ButtonMod color="#2980b9" onPress={this.fbHandler}>Facebook</ButtonMod>

        <ButtonMod
          onPress={this.mobileNumberVerification}
          title="Mobile Number Verification"
          color="#2980b9"
        >
          Phone Number
        </ButtonMod>
        <ButtonMod
          onPress={this.emailVerification}
          title="Email"
          color="#2980b9"
        >
          Email
        </ButtonMod>
        <ButtonMod
          style={styles.container}
          onPress={this.registerWithEmail}
          color="#2980b9"
        >
          Register
        </ButtonMod>
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
});
