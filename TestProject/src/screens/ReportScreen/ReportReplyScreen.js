import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, Text, ScrollView, RefreshControl, Dimensions, KeyboardAvoidingView, TextInput, Image, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { PropTypes } from 'prop-types';
import { normalize } from '../../../Constant';
import CustomButton from "../../components/UI/ButtonMod/CustomButtom";
import CaseCard from "../../components/UI/CaseCard/CaseCard";
import { Platform } from 'react-native';
import { authHeaders } from '../../../Constant';

export default class ReportReplyScreen extends Component {

  static propTypes = {
    componentId: PropTypes.string,
  };

  componentDidMount() {
    console.log(this.props.data);
    this.fetchUserMessage();
  }

  state = {
    replies: [],
    height: 40,
    text: ''
  }

  componentDidAppear() {
    alert("DidApperar");
  }

  componentDidDisappear() {
    alert("Asdhjsdfjk");
    this.setState({
      text:''
    });
  }

  attachment = () => {
    Navigation.showModal({
      component: {
        name: 'ComposeScreen',
        passProps:{
          text:this.state.text
        }
      },
    });
  }

  homeButtonTapped = () => {
    Navigation.pop(this.props.componentId);
  };

  fetchUserMessage() {

    let body = JSON.stringify({
      "threadId": "THD7590580366",
      "mobileNumber": "918375057836"
    });

    fetch("http://babbleswar.babbles.zone/getUserMessage", {
      method: 'POST',
      headers: authHeaders(),
      body: body
    }).then(resp => resp.json()).then(respJson => {

      console.log(respJson);
      this.filterData2(respJson.result)
    }).catch(err => { alert(error) })
    console.log("asdahjdfb");
  }

  filterData2(data) {

    var array = [];
    data.map(dict => {

      let innerData = {
        // // key: key,
        // // picture: (dict.Image_Path && (dict.messageType === 'Image' || dict.messageType === 'Gif')) ? { uri: dict.Image_Path } : videoURL,
        // name: "@" + dict.Mobile_Number,
        // place: dict.Location_Name,
        // details: dict.Message ? dict.Message : null,
        // // caseId: null,
        // // video: (dict.contentUrl && dict.messageType === 'Video') ? { uri: dict.contentUrl } : null,// "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        // // height_Image: dict.height_Image,
        // // width_Image: dict.width_Image,
        // // Is_Liked: dict.Is_Liked,
        // // LikingCount: dict.LikingCount


        key: key,
        picture: (dict.Image_Path && (dict.messageType === 'Image' || dict.messageType === 'Gif')) ? { uri: dict.Image_Path } : videoURL,
        name: "@" + dict.Mobile_Number,
        place: dict.Location_Name,
        details: dict.Message ? dict.Message : null,
        caseId: null,
        video: (dict.contentUrl && dict.messageType === 'Video') ? { uri: dict.contentUrl } : null,// "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"

        height_Image: dict.height_Image,
        width_Image: dict.width_Image,
        Is_Liked: dict.Is_Liked,
        LikingCount: dict.LikingCount,
        ...dict

      }

      console.log(JSON.stringify(innerData));
      console.log(innerData);
      array.push(innerData);
    });
    that = this;
    this.setState({ replies: array })
    setTimeout(function () {
      that.scroll.scrollToEnd({ animated: true });
    }, 300);

  }

  render() {

    const options = {
      behavior: Platform.OS === "ios" ? "padding" : "null"
    }

    const {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    } = Dimensions.get('window');

    return (
      <SafeAreaView
        forceInset={{ bottom: 'always' }}
        style={{ flex: 1, backgroundColor: 'rgba(210,210,208,1)' }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          enabled
          {...options}
        >

          {/* <View style={styles.headerView} backgroundColor="rgba(242,241,244,1)">

            <View style={{ flex: 1, backgroundColor: 'rgba(87,48,134,1)' }}>
              <CustomButton
                source={require('../../assets/home.png')}
                style={{
                  flexDirection: 'row',
                  flex: 1,
                }}
                onPress={this.homeButtonTapped}
              />
            </View>
            <View style={styles.textheaderView}>
              <Text style={styles.textView}>Reports</Text>
            </View>

          </View> */}

          <ScrollView style={styles.bottomView}
            ref={ref => {
              this.scroll = ref;
            }}
          >
            <View style={{ padding: 1, backgroundColor: 'black', margin: 5, elevation: 100 }}>
              <CaseCard
                // picture={this.props.data.picture}
                // name={this.props.data.name}
                // place={this.props.data.place}
                // details={this.props.data.details}
                // caseId={this.props.data.caseId}
                // video={this.props.data.video}
                // height_Image={this.props.data.height_Image}
                // width_Image={this.props.data.width_Image}

               
        
              // Is_Liked = {this.props.data.Is_Liked}
              // onPressLike = {(data) => this.likeButtonTapped(data)}

              moreButtonTapped={() => {}}
              onPressLike={(data2) => {}}
              onPressDisLike={(data2) => {}}
              data={this.props.data}
              onPressReply={(data2) => {}}
              />
            </View>

            {this.state.replies.map(data => {

              return (
                <CaseCard
                  // picture={this.props.data.picture}
                  name={data.name}
                  place={data.place}
                  details={data.details}
                  onPressLike={() => { }}
                  onPressReply={() => { }}

                  moreButtonTapped={() => {}}
              onPressLike={(data2) => {}}
              onPressDisLike={(data2) => {}}
              data={data}
              onPressReply={(data2) => {}}
                />
              )

            })}

          </ScrollView >
          <View style={{ flexDirection: 'row' }}>

            <TouchableOpacity
              style={{ height: 40, width: 40, borderRadius: 20, backgroundColor: 'white', marginTop: 5, marginLeft: 5, alignItems: 'center', justifyContent: 'center' }}
              onPress={this.attachment}
            >
              <Image source={require("../../assets/attach.png")} style={{ height: 30, width: 30 }} />
            </TouchableOpacity>

            <TextInput
              multiline
              placeholder="Reply"
              value={this.state.text}
              onChangeText={(value) => this.setState({ text: value })}
              onContentSizeChange={(event) => {
                // console.log(event.nativeEvent);
                this.setState({ height: event.nativeEvent.contentSize.height > 100 ? 100 : event.nativeEvent.contentSize.height < 40 ? 40 : event.nativeEvent.contentSize.height })
              }}
              // style={[styles.default, {height: Math.max(35, this.state.height)}]}
              style={{ borderRadius: 20, backgroundColor: 'white', height: this.state.height, paddingTop: 10, paddingLeft: 10, paddingRight: 10, paddingBottom: 5, margin: 5, flex: 1, }}
            />

            <TouchableOpacity
              style={{ height: 40, width: 40, borderRadius: 20, backgroundColor: 'white', marginTop: 5, marginRight: 5, alignItems: 'center', justifyContent: 'center' }}
            >
              <Image source={require("../../assets/send.png")} style={{ height: 30, width: 30 }} />
            </TouchableOpacity>

          </View>

        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headerView: {
    flex: 0.07,
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 5,
    backgroundColor: 'white',
  },
  textheaderView: {
    flex: 5,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  textView: {
    backgroundColor: 'transparent',
    marginLeft: 10,
    fontSize: normalize(14),
  },
  bottomView: {
    flex: 0.93,
  },
});
