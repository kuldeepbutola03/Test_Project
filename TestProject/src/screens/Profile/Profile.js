import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
  SafeAreaView,
  BackHandler
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import ButtonMod from '../../components/UI/ButtonMod/ButtonMod';
import EditButton from '../../components/UI/EditButton/EditButton';
import { Navigation } from 'react-native-navigation';
import { PropTypes } from 'prop-types';
import { saveUserData, getUserData } from '../../../Constant';


export default class Profile extends Component {

  static propTypes = {
    componentId: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      image: this.props.image,
      name: this.props.name ? this.props.name : "",
      username: this.props.username ? this.props.username : "",
      confirmed: false,
      isUserNameDisabled : (this.props.username !== null)
      // isFocusedUserName: false,
      // isFocusedName: false,
      // nameBorderColor: "#eee",
      // userNameBorderColor: "#eee",
      // isValid: false
    };

    // BackHandler.addEventListener('hardwareBackPress', () => {
    //   return true;
    // });

    // saveUserData(this.state);
  }

  componentDidMount() {
    // getUserData().then(data => {
    //   this.setState({
    //     image : data.image,
    //     name : data.name,
    //     username: data.username
    //   })
    // });
  }

  toHomeScreen = () => {

    if (!this.state.username || !this.state.name) {
      alert("Please enter details");
      return;
    }

    // if (!this.state.username || !this.state.name) { this.setState({ confirmed: true }); }

    var sttts = this.state;
    sttts["confirmed"] = true;
    // this.setState({ confirmed: true });
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

    saveUserData(sttts);

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
        // const source = { uri: response.uri };
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        const source = 'data:image/jpeg;base64,' + response.data;

        this.setState({
          image: source,
        });
      }
    });
  };

  changeText = (text) => {
    this.setState({
      username: text.trim()
    });
  }

  // onBlurHandler = (isUserName) => {

  //   const user = this.state.username;
  //   const name = this.state.name;


  //   if (user.length > 0 && user.includes(" ") && isUserName) {
  //     // alert("whitespace is not allowed");
  //     this.setState({ userNameBorderColor: 'red' })
  //   }
  //   else if (name.length <= 0) {
  //     // alert("Please enter a name");
  //     this.setState({ nameBorderColor: 'red' })
  //   }
  // }

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
            <Image source={{ uri: "data:image/png;base64,"+ this.state.image }} style={styles.uploadAvatar} />
            <EditButton onPress={this.imagePicker} />
          </View>

          <DefaultInput
            placeholder="@username"
            value={this.state.username}
            onChangeText={this.changeText}
            disabled = {this.state.username !== null}
          />

          <DefaultInput
            placeholder="Name"
            value={this.state.name}
            onChangeText={(text) => {
              this.setState({ name: text })
            }}
            
          />

          <ButtonMod onPress={this.toHomeScreen} color="rgba(86,49,135,1)" >
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
