import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import {Navigation} from 'react-native-navigation';
import {PropTypes} from 'prop-types';
import ButtonMod from '../../components/UI/ButtonMod/ButtonMod';
import HeaderText from '../../components/UI/HeaderText/HeaderText';
// import { EMAIL_REGISTRATION } from '../../../Apis';

export default class EmailScreen extends Component {
  static propTypes = {
    componentId: PropTypes.string,
  };

  constructor (props) {
    super (props);
  }

  state = {
    email : null,
    password : null
  }
  loginTapped = () => {
console.log(this.state.email);
console.log(this.state.password);

// fetch(EMAIL_REGISTRATION, {
//   method: 'POST',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     userMobile: this.phone.getCountryCode(),
//     userCountryCode: this.phone.getValue(),
//     userOtp : this.state.name
//   }),
// }).then((response) => response.json())
//   .then((responseJson) => {


//     // return responseJson;
//   })
//   .catch((error) => {
//     console.error(error);
//   });

    Navigation.push (this.props.componentId, {
      component: {
        name: 'Profile',
        options:{
          topBar:{
              visible:false,
              animate:false,
              drawBehind:true
          }
      }
      },
    });
  };

  emailChanged = (sender) => {
    this.setState({email : sender})
  }
  passwordChanged = (sender) => {
    this.setState({password : sender})
  }

  render () {
    var {height, width} = Dimensions.get ('window');
    const options = {
      behavior : Platform.OS === "ios" ? "padding" : "null"
    }
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
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
        >
        <View>
          <HeaderText
            style={{
              marginBottom: 8,
            }}
          >
            Login
          </HeaderText>
          </View>
          <DefaultInput
            keyboardType="email-address"
            autoCorrect={false}
            placeholder="Email Id"
            style={styles.input}
            
            onChangeText = {(text) => this.emailChanged(text)}
          />
          <DefaultInput
            placeholder="Password"
            password={true}
            autoCorrect={false}
            style={styles.input}
            onChangeText = {(text) => {this.passwordChanged(text)}}
          />
          <ButtonMod onPress={this.loginTapped} color="#2980b9">
            Submit
          </ButtonMod>

        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
