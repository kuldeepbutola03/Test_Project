import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Button,
  Image,
  ScrollView,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {PropTypes} from 'prop-types';
import ImagePicker from 'react-native-image-picker';
import Remove from './DeleteButton';

export default class ComposeScreen extends Component {
  constructor (props) {
    super (props);
  }

  state = {
    selected: [],
  };

  static propTypes = {
    componentId: PropTypes.string,
  };

  cancel = () => {
    Navigation.dismissOverlay (this.props.componentId);
  };

  openCamera = () => {
    const options = {
      title: 'Select Image',
      //   customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchCamera (options, response => {
      console.log ('Response = ', response);

      if (response.didCancel) {
        console.log ('User cancelled image picker');
      } else if (response.error) {
        console.log ('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log ('User tapped custom button: ', response.customButton);
      } else {
        // const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState ({
          selected: [...this.state.selected, {uri: response.uri}],
        });
      }
    });
  };

  openGallery = () => {
    const options = {
      title: 'Select Image',
      //   customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary (options, response => {
      console.log ('Response = ', response);

      if (response.didCancel) {
        console.log ('User cancelled image picker');
      } else if (response.error) {
        console.log ('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log ('User tapped custom button: ', response.customButton);
      } else {
        // const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState ({
          selected: [...this.state.selected, {uri: response.uri}],
        });
      }
    });
  };

  removeMedia = i => {
    // alert (i);
    let media = this.state.selected;
    media = media.filter (function(item,key){
        return key != i
    });
    this.setState ({
      selected: media,
    });
  };

  render () {
    let images = this.state.selected.map ((image, index) => {
      alert(index);
      return (
        <View>
          <Image source={image} style={{height: 200, width: 200, margin: 10}} />
          <Remove
            style={{position: 'absolute', top: 5, left: 5}}
            onPress={() => this.removeMedia (index)}
          />
        </View>
      );
    });

    return (
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAvoidingView
          style={{flex: 1, backgroundColor: 'white'}}
          behavior= {Platform.OS === 'ios' ? "padding" : null}
          enabled
        >

          {/* Header */}
          <View style={{height: 50, width: '100%', flexDirection: 'row'}}>

            <TouchableOpacity style={{flex: 1}} onPress={this.cancel}>
              <Text
                style={{
                  flex: 1,
                  width: '100%',
                  textAlign: 'left',
                  paddingTop: 10,
                  paddingLeft: 10,
                  fontSize: 18,
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{flex: 1}}>
              <Text
                style={{
                  flex: 1,
                  width: '100%',
                  textAlign: 'right',
                  paddingTop: 10,
                  paddingRight: 10,
                  fontSize: 18,
                }}
              >
                Post
              </Text>
            </TouchableOpacity>

          </View>

          {/* Middle */}

          <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
            <TextInput
              style={{padding: 10, fontSize: 16}}
              placeholder="Write Something"
              multiline
              autoFocus
            />

            {images}

          </ScrollView>

          {/* Footer */}
          <View
            style={{
              height: 50,
              width: '100%',
              backgroundColor: 'yellow',
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              style={{
                justifyContent: 'flex-start',
                alignContent: 'center',
              }}
              onPress={this.openCamera}
            >
              <Image
                source={require ('../../assets/opencamera.png')}
                style={{height: 35, width: 35, marginLeft: 20, marginTop: 10}}
              />

            </TouchableOpacity>

            <TouchableOpacity
              style={{
                justifyContent: 'flex-start',
                alignContent: 'center',
                flexDirection: 'row',
              }}
              onPress={this.openGallery}
            >
              <Image
                source={require ('../../assets/gallery.png')}
                style={{height: 35, width: 35, marginLeft: 20, marginTop: 10}}
              />
            </TouchableOpacity>

          </View>

        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
