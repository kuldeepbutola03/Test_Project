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
import HeaderText from '../../components/UI/HeaderText/HeaderText'
import { EMAIL_REGISTRATION, DEBUG } from '../../../Apis';
import { validateEmail, saveUserID, authHeaders } from '../../../Constant';

export default class RegistrationScreen extends Component {
    static propTypes = {
        componentId: PropTypes.string,
    };

    state = {
        email: null,
        password: null,
        confirmPassword: null
    }

    mobileNumberSubmit = () => {
        // alert('hhhhh');
        // return;
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
        let confirmPassword = this.state.confirmPassword;
        console.log(email, password, confirmPassword);
        if (!email) {
            alert('Please enter email');
            return;
            // }// else if (validateEmail()) {
            // alert('Please enter valid email');
            // return;
        }
        // else if (!(password === confirmPassword)) {
        //     alert('Password does not match');
        //     return;
        // } else if (!password) {
        //     alert('Password can not be blank');
        //     return;
        // }


        navigator.geolocation.getCurrentPosition(
            (position) => {
                const initialPosition = JSON.stringify(position);

                // let latlong = position.coords.latitude.toString() +  "," + position.coords.longitude.toString()
                let latlong = position.coords.latitude.toString() + "," + position.coords.longitude.toString()
                if (position.mocked) {
                    if (position.mocked == true) {
                        alert("you are using fake location");
                        return;
                    }
                }
                //   this.setState({ lat_lon: latlong });

                fetch(EMAIL_REGISTRATION, {
                    method: 'POST',
                    headers: authHeaders(),
                    body: JSON.stringify({
                        userEmail: email,

                        userInitCoord: latlong
                    }),
                }).then((response) => response)
                    .then((responseJson) => {

                        if (responseJson ) {
                          if( responseJson.userId){
                            saveUserID(responseJson.userId);

                            
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
                          }else{
                              alert(responseJson.response);
                          }
                        }
                        // return responseJson;
                    })
                    .catch((error) => {
                        console.error(error);
                    });
              },
            (error) => {
                alert(error.message)
                // this.locationErrorMessage = error.message;
                // alert(locationErrorMessage)
                // this.showDialog();
            },
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
        );

    }

    emailChanged = (sender) => {
        this.setState({ email: sender });
    }
    passwordChanged = (sender) => {
        this.setState({ password: sender });
    }
    confirmedPasswordChanged = (sender) => {
        this.setState({ confirmPassword: sender });
    }

    render() {
        var { height, width } = Dimensions.get('window');

        const options = {
            behavior: Platform.OS === "ios" ? "padding" : "null"
        }

        return (
            <View style={styles.container}>
                <KeyboardAvoidingView style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'clear',
                    margin: 30,
                    width: width - 30
                }} enabled {...options}>

                    <View>
                        <HeaderText style={{
                            marginBottom: 8,
                        }}>Registration</HeaderText>
                    </View>
                    <DefaultInput
                        placeholder="Email"
                        style={styles.input}
                        onChangeText={(text) => this.emailChanged(text)}
                    />
                    {/* <DefaultInput
                        placeholder="Password"
                        password={true}
                        style={styles.input}
                        onChangeText={(text) => this.passwordChanged(text)}
                    />
                    <DefaultInput
                        placeholder="Confirm password"
                        password={true}
                        style={styles.input}
                        onChangeText={(text) => this.confirmedPasswordChanged(text)}
                    /> */}
                    <ButtonMod
                        onPress={this.mobileNumberSubmit}
                        color="rgba(86,49,135,1)"
                    >Submit</ButtonMod>
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
        backgroundColor: 'white'
    }
});
