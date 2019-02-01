import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, Text, ScrollView, RefreshControl } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { PropTypes } from 'prop-types';
import CustomButton from '../../components/UI/ButtonMod/CustomButtom';
import { normalize, getUserID, getCurrentLocation } from '../../../Constant';
import CaseCard from '../../components/UI/CaseCard/CaseCard';
import Draggable from 'react-native-draggable';
import { TIMELINE_DATA } from '../../../Apis';
import { authHeaders } from '../../../Constant';

import { Platform } from 'react-native';
export default class ReportScreen extends Component {
  state = {
    case: [
      // {
      //   picture: require('../../assets/1.png'),
      //   name: 'Ron Burgundy',
      //   place: 'Las Vegas',
      //   details: 'News Room Reporter : A chauvinistic host of a top-rated American news programme is threatened with the arrival of an ambitious female reporter which starts a bitter battle of the sexes.',
      //   caseId: 'HB345',
      //   video: null // "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      // },
      // {
      //   picture: require('../../assets/2.png'),
      //   name: 'Bo Burnaham',
      //   place: 'Washington DC',
      //   details: null,
      //   caseId: null,
      //   video: null //"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
      // },
    ],
    iconSrc: require('../../assets/report.png'),
    refreshing: false
  };

  static propTypes = {
    componentId: PropTypes.string,
  };
  componentDidMount() {

    // weakRef = this;

    this._onRefresh();

  }

  showCompose = () => {
    Navigation.showOverlay({
      component: {
        name: 'ComposeScreen',
        options: {
          overlay : {
            interceptTouchOutside: true
          },
        },
        passProps: null
      },
    });
  }

  _onRefresh = () => {
    // alert("asd");
    this.setState({ refreshing: true });
    getUserID().then((userId) => {
      getCurrentLocation((location) => {
        if (location) {
          if (typeof (location) === 'string') {
            alert(location);
            this.setState({ refreshing: false });
          } else {
            this.fetchTimeLineData(userId, location);
          }
        }

      })

    })
  }

  fetchTimeLineData(user_id, location) {


    var timeStamp = Math.floor(Date.now() / 1000);

    let body = JSON.stringify({

      "latitude": location.latitude.toString(),
      "longitude": location.longitude.toString(),

      "mobileNumber": "918375057836",
      "radians": "0",
      "Location_Name": "noida",

      "timestamp": timeStamp,

      "deviceTocken": "xxxxxxxxxxxxxxxx",
      "platform": Platform.OS === 'ios' ? "iOS" : "android",
      "countryName": "India",
      "appVersion": "5.2.2"

    });

    fetch(TIMELINE_DATA, {
      method: 'POST',
      headers: authHeaders(),
      body: body,
    }).then((response) => response.json())

      .then((responseJson) => {
       
        // alert(JSON.stringify(responseJson));
        this.filterData(responseJson.result);
      })
      .catch((error) => {
        this.setState({ refreshing: false });
        console.error(error);
      });
  }
  filterData(data) {

    // "messageType": "Video",Image
    var array = [];
    key = 0;
    data.map(dict => {
      videoURL = null; // ((dict.thumbnailUrl && dict.messageType === 'Video') ? { uri: dict.thumbnailUrl} : null)
      let innerData = {
        key: key,
        picture: (dict.Image_Path && (dict.messageType === 'Image' || dict.messageType === 'Gif')) ? { uri: dict.Image_Path } : videoURL,
        name: "@" + dict.Mobile_Number,
        place: dict.Location_Name,
        details: dict.Message ? dict.Message : null,
        caseId: null,
        video: (dict.contentUrl && dict.messageType === 'Video') ? { uri: dict.contentUrl } : null // "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      }
      // console.log(innerData);
      console.log(JSON.stringify(innerData));
      array.push(innerData);
      key = key + 1;
    });

    this.setState({ refreshing: false , case: array })
  }

  homeButtonTapped = () => {
    Navigation.pop(this.props.componentId);
  };

  render() {
    return (
      <SafeAreaView
        forceInset={{ bottom: 'always' }}
        style={{ flex: 1, backgroundColor: 'rgba(210,210,208,1)' }}


      >

        <View style={styles.headerView} backgroundColor="rgba(242,241,244,1)">

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

        </View>

        <ScrollView style={styles.bottomView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              
              onRefresh={this._onRefresh}
            />
          }
        >

          {this.state.case.map(data => (
            <CaseCard
              picture={data.picture}
              name={data.name}
              place={data.place}
              details={data.details}
              caseId={data.caseId}
              video={data.video}
            />
          ))}

        </ScrollView>

        <Draggable
          reverse={false}
          renderShape='image'
          // backgroundColor="#000000"
          offsetX={0}
          offsetY={0}
          imageSource={this.state.iconSrc}
          renderSize={60}
          pressDrag = {this.showCompose}
        />

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
