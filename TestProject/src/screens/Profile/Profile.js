import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
  SafeAreaView,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import ButtonMod from '../../components/UI/ButtonMod/ButtonMod';
import EditButton from '../../components/UI/EditButton/EditButton';
import { Navigation } from 'react-native-navigation';
import { PropTypes } from 'prop-types';
import { saveUserData, defaultUser } from '../../../Constant';


export default class Profile extends Component {

  static propTypes = {
    componentId: PropTypes.string,
  };

  state = {
    image: this.props.image ? this.props.image : defaultUser,
    name: this.props.name ? this.props.name : "",
    email: this.props.email ? this.props.email : "",
    username : this.props.username ? this.props.username : ""
  }

  toHomeScreen = () => {

    const { name, username } = this.state;
    console.log(this.state.image)
    let usernameRegex = /^[a-zA-Z0-9]+$/;

    let validUsername = username.match(usernameRegex);

    if(name.length < 1) {
      alert('Please fill in your name');
      return;
    } else if(username.length < 1 ) {
      alert('Please fill in your username');
      return
    } else if (!validUsername) {
      alert('Your handle can only contain alphabets and numbers');
    } else {
      saveUserData(this.state);
      Navigation.push(this.props.componentId, {
        component: {
          name: 'HomeScreen',
          passProps: {
            data: this.state
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
    }
  }

  /**
   * The first arg is the options object for customization (it can also be null or omitted for default options),
   * The second arg is the callback which sends object: response (more info in the API Reference)
   */
  imagePicker = () => {
    ImagePicker.showImagePicker({ title: 'Select an Image' }, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        console.log(source)
        this.setState({
          image: source,
        });
      }
    });
  };

  render() {
    var { height, width } = Dimensions.get('window');
    const options = {
      behavior: Platform.OS === 'ios' ? 'padding' : 'null',
    };

    return (
      <SafeAreaView forceInset={{ bottom: 'always' }} style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{
            // flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'clear',
            width: width,
          }}
          behavior="padding"
          enabled
        >
          <View style={{ marginTop: 10 }}>
            <Image source={{uri : "data:image/png;base64,"+this.state.image}} style={styles.uploadAvatar} />
            <EditButton onPress={this.imagePicker} />
          </View>
          <DefaultInput placeholder="Handle" value={this.state.username} onChangeText={(text) => this.setState({ username: text })} />
          <DefaultInput placeholder="Name" value={this.state.name} onChangeText={(text) => this.setState({ name: text })} />
          {/* <DefaultInput placeholder="Last name" /> */}
          <ButtonMod onPress={this.toHomeScreen} color="#a01414">
            Submit
          </ButtonMod>
          <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  uploadAvatar: {
    margin: 20,
    height: 200,
    width: 200,
    borderRadius: 100,
    backgroundColor: '#F2F2F2',
  },
  keyboard: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 10,
    width: Dimensions.get('window').width,
  },
});
