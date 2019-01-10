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
import { validateEmail, saveUserID } from '../../../Constant';

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
        } else if (!(password === confirmPassword)) {
            alert('Password does not match');
            return;
        } else if (!password) {
            alert('Password can not be blank');
            return;
        }

        fetch(EMAIL_REGISTRATION, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userEmail: email,
                password: password,
            }),
        }).then((response) => response)
            .then((responseJson) => {

                if (responseJson && responseJson.userId){
                    
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
                    alert ("something went wrong");
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
                    <DefaultInput
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
                    />
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

