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
import { MOBILE_NUMBER_, MESSAGE_COMPOSE, MEDIA_COMPOSE, MEDIA_MESSAGE_REPLY, MESSAGE_REPLY } from '../../../Apis';
import { normalize, getUserID, DEFAULT_USER_ID, authHeaders, getUserData, authHeadersMedia } from '../../../Constant';

export default class ComposeScreen extends Component {

  state = {
    selected: [],
    text: this.props.text ? this.props.text : "",
    mimeType: '',
    dimensions: {
      height: null,
      width: null
    },
    disabled: false
    // isVideo: false
  };

  static propTypes = {
    componentId: PropTypes.string,
  };

  cancel = () => {
    Navigation.dismissModal(this.props.componentId);
  };

  openCamera = () => {

    // alert('asdsad');

    ImagePicker.openCamera({
      mediaType: 'photo',
      includeBase64: true,
      maxFiles: 1
    }).then(response => {
      // alert(JSON.stringify(response));
      let media = [];// this.state.selected;

      // for (i = 0; i < response.length; i++) {
      if (response.data) {
        // alert(response.data);
        // media.push({ uri: "data:image/png;base64," + response.data });
        media.push({ uri: response.data });
      }

      this.setState({
        selected: media,
      });
    });
  }; npm

  openImageGallery = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      includeBase64: true,
      maxFiles: 1
    }).then(response => {
      console.log(response);
      let media = [];// this.state.selected;

      for (i = 0; i < 1; i++) {                //------------------ i < response.length ------------------
        media.push({ uri: response[i].data });
      }
      // alert(JSON.stringify(media));
      this.setState({
        selected: media,
      });

    });

  };

  removeMedia = i => {
    let media = this.state.selected;
    media = media.filter(function (item, key) {
      return key != i;
    });
    this.setState({
      selected: media,
    });
  };

  postTapped = () => {

    let locationCoordinates = {};
    if (this.props.coordinates) {
      locationCoordinates = {
        "latitude": this.props.coordinates.latitude,
        "longitude": this.props.coordinates.longitude,
      }
    }


    if (this.state.selected.length > 0) {

      this.setState({ disabled: true });

      const dateTime = new Date();
      const timestamp = Math.floor(dateTime / 1000) + 'IMG_0001.jpg';
      // alert(typeof (timestamp));
      let formdata = new FormData();
      // formdata.append("file", {
      //   "uri": this.state.selected[0].uri,
      //   "name": timestamp,
      //   "type": 'image/jpg'
      // });

      getUserID().then((userId) => {
        let body = {
          "userMaster":
          {
            "userId": userId
          },

          "message": this.state.text,
          "height": "100",
          "width": "200",
          "messageType": this.state.mimeType === "image/jpeg" || this.state.mimeType === "image/png" ? "Image" : "Gif",

          "mediaContentData": this.state.selected[0].uri,

          ...locationCoordinates
          // "threadId" : this.props.reply ? this.props.thread : null
        }

        // let obj = {
        //   "userId": userId
        // }

        //   for ( var key in body ) {
        //     formdata.append(key, body[key]);
        // }

        // formdata.append("userMaster", obj);

        // formdata.append("latitude", "28");
        // formdata.append("longitude", "77");
        // formdata.append("mobileNumber", MOBILE_NUMBER_);
        // formdata.append("message", this.state.text);
        // formdata.append("locationName", "noida");
        // formdata.append("userLocation", "noida");
        // formdata.append("isMessageHasWarning", "N");
        // formdata.append("abusiveWord", "a");
        // formdata.append("language", "Latn");
        // formdata.append("address", "greater noida");
        // formdata.append("countryName", "india");
        // formdata.append("platform", "iOS");
        // formdata.append("height", "100");
        // formdata.append("width", "200");
        // formdata.append("imgOrientation", 0);
        // formdata.append("duration", 0);
        // formdata.append("messageType", "Image");
        // formdata.append("mediaContentData", this.state.selected[0].uri);

        // console.log(JSON.stringify(formdata));

        if (this.props.reply) {
          // body = { ...body, "threadId": this.props.thread}

          // body = Object.assign({ "threadId": this.props.thread }, body);

          body["threadId"] = this.props.thread
        }

        body = JSON.stringify(body);
        console.log(body);

        let FETCH = this.props.reply ? MESSAGE_REPLY : MESSAGE_COMPOSE; // +_+

        fetch(FETCH, {
          method: 'POST',
          headers: authHeaders(),
          body: body,
        }).then((response) => {
          // alert(JSON.stringify(response))
          this.cancel();
          // if (this.props.reply) {
          this.props.selfObj()

          // }

        })
          // .then((responseJson) => {

          // alert(JSON.stringify(responseJson));
          // this.filterData(responseJson.result);
          // })
          .catch((error) => {
            // this.setState({ refreshing: false });
            console.error(error);
            // alert(error);
          });
      });

    } else if (this.state.text.length > 0) {

      this.setState({ disabled: true });

      getUserID().then((userId) => {

        let body = null;

        body = {
          "message": this.state.text,
          "userMaster":
          {
            "userId": userId
          },
          ...locationCoordinates
        }

        if (this.props.reply) {
          body["threadId"] = this.props.thread;
        }

        body = JSON.stringify(body);
        // alert(body);
        // return;
        let FETCH = this.props.reply ? MESSAGE_REPLY : MESSAGE_COMPOSE;

        fetch(FETCH, {
          method: 'POST',
          headers: authHeaders(),
          body: body,
        }).then((response) => response.json())

          .then((responseJson) => {
            // if (this.props.reply) {
            this.props.selfObj()
            // alert(JSON.stringify(responseJson));
            // this.filterData(responseJson.result);
          })
          .catch((error) => {
            // this.setState({ refreshing: false });
            // console.error(error);
            alert(error);
          });

        this.cancel();

      });

    } else {
      alert("Please write something to post!");
    }

  }


  handleTextChange = (e) => {
    // let str = this.state.text + e;
    this.setState({
      text: e
    })
  }

  render() {
    let images = this.state.selected.map((image, index) => {
      //  let img = "data:image/png;base64,"+image;
      console.log(image);
      return (
        <View>
          <Image
            source={{ uri: "data:image/png;base64," + image.uri }}
            style={{ height: 150, width: 150, marginTop: 10, marginHorizontal: 5, borderRadius: 20 }}
          // onError={() => {this.setState({isVideo : true})}}
          />
          <Remove
            style={{ position: 'absolute', top: 5, right: 5  , height : 50 , width : 50}}
            onPress={() => this.removeMedia(index)}
          />
        </View>
      );
    });

    const options = {
      behavior: Platform.OS === "ios" ? "padding" : "null"
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: 'white' }}
          {...options}
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
              }}
                disabled={this.state.disabled}
                onPress={() => { this.postTapped() }}
              >
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
                  source={this.props.data.image ? { uri: "data:image/png;base64," + this.props.data.image } : require('../../assets/UserSmall.png')}
                  style={{ borderRadius: 30, height: 60, width: 60, margin: 10 }}
                />
              </View>
              <View>
                <Text style={{ paddingTop: 15, fontSize: 18 }}>{this.props.data.name ? this.props.data.name : ""}</Text>
                <Text style={{ paddingTop: 4, fontSize: 14, fontWeight: '200' }}>
                  {this.props.data.username ? ("@" + this.props.data.username) : ""}
                </Text>
              </View>
            </View>

            <TextInput
              style={{ padding: 10, fontSize: 16, marginLeft: 10 }}
              placeholder="Write Something"
              multiline
              autoFocus
              value={this.state.text}
              onChangeText={(e) => this.handleTextChange(e)}
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
