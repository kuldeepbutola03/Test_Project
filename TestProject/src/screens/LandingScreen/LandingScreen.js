import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, Text, Image, KeyboardAvoidingView } from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import { Navigation } from 'react-native-navigation';
import { PropTypes } from 'prop-types';
import ButtonMod from '../../components/UI/ButtonMod/ButtonMod';
import { normalize, saveUserID } from '../../../Constant';
import {
  LoginButton,
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,

} from 'react-native-fbsdk';
import CustomTextButton from '../../components/UI/ButtonMod/CustomTextButton';
import CustomButton from '../../components/UI/ButtonMod/CustomButtom';
import { EMAIL_REGISTRATION, DEBUG, GET_USER_DETAILS_EMAIL } from '../../../Apis';

export default class LandingScreen extends Component {

  static propTypes = {
    componentId: PropTypes.string,
  };

  constructor(props) {

    super(props)

    // saveUserID("abcdef");
    // this.pushScreen = this.pushScreen.bind(this);

  }
  state = {
    email: null,
    password: null
  }



  mobileNumberSubmit = () => {

    if (DEBUG == 0) {
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
      return
    }

    let email = this.state.email;
    let password = this.state.password;
    // let confirmPassword = this.state.confirmPassword;
    console.log(email, password);
    if (!email) {
      alert('Please enter email');
      return;
      // }// else if (validateEmail()) {
      // alert('Please enter valid email');
      // return;
      // } else if (!(password === confirmPassword)) {
      //   alert('Password does not match');
      //   return;
    } else if (!password) {
      alert('Password can not be blank');
      return;
    }

    // fetch()
    //   .then(response => response.json())
    //   .then(json => {
    //     console.log(json);
    //     this.toProfile(json);
    //   })
    //   .catch(error => {
    //     reject('ERROR GETTING DATA FROM FACEBOOK');
    //     throw error;
    //   });
    fetch(GET_USER_DETAILS_EMAIL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userEmail: email

      }),
    }).then((response) => response.json())
      .then((responseJson) => {


        if (responseJson) {
          if (responseJson.userPassword === this.state.password) {
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
          } else {
            alert(responseJson.response);
          }
        } else {
          alert("please check your network");
        }
        // return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });




  }

  emailChanged = (sender) => {
    this.setState({ email: sender });
  }
  passwordChanged = (sender) => {
    this.setState({ password: sender });
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



          if (responseJson && esponseJson.userId) {
            // alert(responseJson.response);
            saveUserID(responseJson.userId);

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
          } else {
            alert("something went wrong");
          }


          // return responseJson;
        })
        .catch((error) => {
          console.error(error);
        });
    }


  }

  // toProfile(json) 
  // {
  //   Navigation.push(this.props.componentId, {
  //     component: {
  //       name: 'Profile',
  //       passProps: {
  //         email: json.email,
  //         image: json.picture.data,
  //         name: json.name,
  //       },
  //       options: {
  //         topBar: {
  //           visible: false,
  //           animate: false,
  //           drawBehind: true
  //         }
  //       }
  //     },
  //   });
  // }

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
    var { height, width } = Dimensions.get('window');
    return (

      <SafeAreaView
        forceInset={{ bottom: 'always' }}
        style={styles.container}
        backgroundColor='white'//'rgba(210,210,208,1)'

      >
        <KeyboardAvoidingView
          style={{
            flex: 1,
          }} >

          <View style={{ flex: 1 }} alignItems='center' backgroundColor='transparent'>


            <Image style={{ position: 'absolute', bottom: 22, height: normalize(150), width: normalize(150), resizeMode: 'cover' }} source={require('../../assets/logoComp.png')} />
            <Text style={{ position: 'absolute', bottom: 10, fontWeight: "600", fontSize: 14, color: "rgba(86,49,135,1)" }}>AGENCY NAME</Text>

          </View>


          <View style={{
            flex: 1, justifyContent: 'center',
            alignItems: 'center'
          }} backgroundColor='transparent'>

            {/* <KeyboardAvoidingView
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'clear',
            margin: 80,
            width: width - 30,
          }}
          {...options}
          enabled
        > */}

            <DefaultInput
              keyboardType="email-address"
              autoCorrect={false}
              placeholder="Email Id"
              // style={styles.input}

              onChangeText={(text) => this.emailChanged(text)}
            />
            <DefaultInput
              placeholder="Password"
              password={true}
              autoCorrect={false}
              // style={styles.input}
              onChangeText={(text) => { this.passwordChanged(text) }}
              secureTextEntry={true}
            />
            <ButtonMod onPress={this.mobileNumberSubmit} color="rgba(86,49,135,1)">
              LOGIN
          </ButtonMod>

            {/* </KeyboardAvoidingView> */}


          </View>


          {/* level 3 */}
          <View style={{ flex: 1 }} backgroundColor='transparent'>

            {/* first */}
            <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
              <View style={{ flex: 1, height: 1, marginLeft: normalize(10) }} backgroundColor='rgba(235,235,235,1)' />
              <View style={{ alignItems: 'center', justifyContent: 'center', width: normalize(30), height: normalize(30), borderRadius: normalize(30) / 2, marginLeft: 0, marginRight: 0 }} backgroundColor='rgba(235,235,235,1)'>
                <Text style={{ fontSize: normalize(11) }}>OR</Text>
              </View>
              <View style={{ flex: 1, height: 1, marginRight: normalize(10) }} backgroundColor='rgba(235,235,235,1)' />
            </View>

            {/* second */}
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: normalize(12), }} >Sign Up</Text>
            </View>

            {/* third */}
            <View style={{ flex: 4 }} backgroundColor='transparent' flexDirection='row' >
              <View style={{ flex: 0.37, justifyContent: 'center', alignItems: 'center' }} backgroundColor='transparent'>
                <CustomButton onPress={this.fbHandler} style={{ height: normalize(60), width: normalize(60) }} backgroundColor='white' source={require('../../assets/facebook.png')} />
                <Text style={{ color: 'silver', fontSize: normalize(12) }}>Facebook</Text>

              </View>
              <View style={{ flex: 0.26, justifyContent: 'center', alignItems: 'center' }} backgroundColor='transparent'>
                <CustomButton onPress={this.mobileNumberVerification} style={{ height: normalize(60), width: normalize(60) }} backgroundColor='white' source={require('../../assets/otp.png')} />
                <Text style={{ color: 'silver', fontSize: normalize(12) }}>Mobile OTP</Text>
              </View>
              <View style={{ flex: 0.37, justifyContent: 'center', alignItems: 'center' }} backgroundColor='transparent'>
                <CustomButton onPress={this.registerWithEmail} style={{ height: normalize(60), width: normalize(60) }} backgroundColor='white' source={require('../../assets/register.png')} />
                <Text style={{ color: 'silver', fontSize: normalize(12) }}>Register</Text>
              </View>
            </View>

          </View>

        </KeyboardAvoidingView>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
  },
});
