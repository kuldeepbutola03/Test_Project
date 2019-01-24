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
import { saveUserID, authHeaders } from '../../../Constant';

export default class OtpScreen extends Component {
  static propTypes = {
    componentId: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }
  state = {
    name: null,
    ...this.props
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
      return;
    }

    // this.getUser();
    // return;

    console.log(this.state.name);
    console.log(this.state.code);
    console.log(this.state.mobileNumber);
    //     return;

    fetch(VALIDATE_OTP, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({
        userMobile: this.props.mobileNumber,
        userCountryCode: this.props.code,
        userOtp: this.state.name

      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        // alert(responseJson.response);
        if (responseJson.response === "true") {

          // saveUserID(responseJson.userId);

          this.getUser(this);
        } else {
          // this.getUser(this);
          alert("Invalid OTP");
        }

        // return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });


  };

  getUser(property) {
    // alert("In651256256P");
    setTimeout(function () {
      fetch(GET_USER_DETAILS_EMAIL
        , {
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify({
            userMobile: property.props.mobileNumber,
            userCountryCode: property.props.code,


          }),
        }).then((response) =>

          response.json()

        )
        .then((responseJson) => {
          console.log(responseJson);

          // alert("In651256256P");
          if (responseJson) {
            if (responseJson.userId) {
              saveUserID(responseJson.userId);

              Navigation.push(property.props.componentId, {
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
    }, 1000);
  }

  textChanged = (sender) => {
    console.log(sender);
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
          <ButtonMod onPress={this.mobileNumberSubmit} color="rgba(86,49,135,1)">
            Submit
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
  keyboard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
    width: Dimensions.get('window').width - 30,
  },
});
