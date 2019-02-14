import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Image,
  ScrollView,
  Platform
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { PropTypes } from 'prop-types';
import Remove from './DeleteButton';
// import Video from 'react-native-video';
import ImagePicker from 'react-native-image-crop-picker';

export default class ComposeScreen extends Component {

  state = {
    selected: [],
    text:''
    // isVideo: false
  };

  static propTypes = {
    componentId: PropTypes.string,
  };

  cancel = () => {
    Navigation.dismissModal(this.props.componentId);
  };

  openCamera = () => {
    ImagePicker.openCamera({
      mediaType: 'photo',
    }).then(response => {
      let media = this.state.selected;

      for (i = 0; i < response.length; i++) {
        media.push({ uri: response[i].path });
      }

      this.setState({
        selected: media,
      });
    });
  };

  openImageGallery = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo'
    }).then(response => {

      let media = this.state.selected;

      for (i = 0; i < response.length; i++) {
        media.push({ uri: response[i].path });
      }

      this.setState({
        selected: media,
      });

    });
  };

  // openVideoGallery = () => {
  //   ImagePicker.openPicker({
  //     multiple: true,
  //     mediaType: 'video'
  //   }).then(response => {

  //     for (i = 0; i < response.length; i++) {
  //       media.push({ uri: response[i].path });
  //     }

  //     this.setState({
  //       selected: media
  //     });
  //   });
  // };

  removeMedia = i => {
    let media = this.state.selected;
    media = media.filter(function (item, key) {
      return key != i;
    });
    this.setState({
      selected: media,
    });
  };

  render() {
    let images = this.state.selected.map((image, index) => {
      return (
        <View>
          <Image
            source={image}
            style={{ height: 150, width: 150, marginTop: 10, marginHorizontal: 5, borderRadius: 20 }} 
            // onError={() => {this.setState({isVideo : true})}}
            />
          <Remove
            style={{ position: 'absolute', top: 5, right: 5 }}
            onPress={() => this.removeMedia(index)}
          />
        </View>
      );
    });
    let options = {
      value : this.props.text ? this.props.text : null
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: 'white' }}
          behavior="padding"
          enabled
        >

          {/* Header */}
          <View style={{ height: 50, width: '100%', flexDirection: 'row' }}>

            <View style={{ flex: 1 }}>
              <TouchableOpacity style={{ height: '100%', width: 50 }} onPress={this.cancel}>
                <Image
                  source={require('../../assets/close.png')}
                  style={{ height: 40, width: 40, marginLeft: 10, marginTop: 5 }} />
              </TouchableOpacity>
            </View>


            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <TouchableOpacity style={{
                height: '70%',
                width: '50%',
                marginRight: 15,
                marginTop: 5,
                borderRadius: 100,
                borderWidth: 1
                // backgroundColor: 'yellow'
              }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    paddingTop: 5,
                    fontWeight: 'bold'
                    // textShadowRadius:1,
                    // textShadowOffset:{width:-4,height:1},
                    // textShadowColor:'grey'
                  }}
                >
                  Post
              </Text>
              </TouchableOpacity>
            </View>

          </View>

          {/* Middle */}

          <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>

            <View style={{ flexDirection: 'row', margin: 10 }}>
              <View>
                <Image
                  source={require('../../assets/1.png')}
                  style={{ borderRadius: 30, height: 60, width: 60, margin: 10 }}
                />
              </View>
              <View>
                <Text style={{ paddingTop: 15, fontSize: 18 }}>Username</Text>
                <Text style={{ paddingTop: 4, fontSize: 14, fontWeight: '200' }}>
                  @handle
                </Text>
              </View>
            </View>

            <TextInput
              style={{ padding: 10, fontSize: 16, marginLeft: 10 }}
              placeholder="Write Something"
              multiline
              autoFocus
              {...options}
            />

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {images}
            </ScrollView>

          </ScrollView>

          {/* Footer */}
          <View
            style={{
              height: 50,
              width: '100%',
              // backgroundColor: 'yellow',
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
                source={require('../../assets/screenshot-filled-500.png')}
                style={{ height: 35, width: 35, marginLeft: 30, marginTop: 10 }}
              />

            </TouchableOpacity>

            <TouchableOpacity
              style={{
                justifyContent: 'flex-start',
                alignContent: 'center',
                flexDirection: 'row',
              }}
              onPress={this.openImageGallery}
            >
              <Image
                source={require('../../assets/image-gallery-filled-480.png')}
                style={{ height: 35, width: 35, marginLeft: 30, marginTop: 10 }}
              />
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={{
                justifyContent: 'flex-start',
                alignContent: 'center',
                flexDirection: 'row',
              }}
              onPress={this.openVideoGallery}
            >
              <Image
                source={require('../../assets/video-gallery-filled-480.png')}
                style={{ height: 35, width: 35, marginLeft: 30, marginTop: 10 }}
              />
            </TouchableOpacity> */}

          </View>

        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
