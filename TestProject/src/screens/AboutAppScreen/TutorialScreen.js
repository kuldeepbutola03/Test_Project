import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  Platform
} from 'react-native';


import { Navigation } from 'react-native-navigation';
import Spinner from '../../components/UI/Spinner/Spinner';
import CustomButton from '../../components/UI/ButtonMod/CustomButtom';
import { PropTypes } from 'prop-types';
import TrendProfile from '../../components/UI/TrendProfile/TrendProfile';
import { TREND_, TREND_PDM, TREND_CDM, TREND_IMAGE } from '../../../Apis';
import { authHeaders, getUserID, APP_GLOBAL_COLOR, FCM_TOKEN } from '../../../Constant';
import axios from 'axios';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import _ from 'lodash';
import { normalize } from '../../../Constant';
import { sliderWidth, itemWidth } from './SliderEntry.style.js';
import { withTheme } from 'react-native-elements';

import firebase from 'react-native-firebase';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

import KochavaTracker from 'react-native-kochava-tracker';

export default class TutorialScreen extends Component {
  //   locationLatLong = null;
  // //   user_Id = 1;



  constructor(props) {
    super(props);

    let array = Platform.isPad ?
      [
        require('../../assets/Tutorial/tutorial_ipad_1.jpg'),
        require('../../assets/Tutorial/tutorial_ipad_2.jpg'),
        require('../../assets/Tutorial/tutorial_ipad_3.jpg')
      ]
      :
      [
        require('../../assets/Tutorial/tutorial_iphone_1.jpg'),
        require('../../assets/Tutorial/tutorial_iphone_2.jpg'),
        require('../../assets/Tutorial/tutorial_iphone_3.jpg')
      ];
    this.state = {
      // trendImages: null,
      imageList: array,
      activeSlide: 0,
      pushNotificationToken: null,
      // loading: true,
    }
  }

  componentDidMount() {
    this.checkPermission();
    // this.getDataFromServer(true)
    firebase.analytics().setCurrentScreen("Screen", "Tutorial_Screen");
    //firebase.analytics().logEvent("Trends_Screen");
    firebase.analytics().setUserProperty("Screen", "Tutorial_Screen");
    firebase.analytics().logEvent("Content", { "Screen": "Tutorial_Screen" });


    

var eventMapObject = {};
        eventMapObject["screen_name"] = "Tutorial_Screen";
        KochavaTracker.sendEventMapObject(KochavaTracker.EVENT_TYPE_LEVEL_COMPLETE_STRING_KEY, eventMapObject);


    this.createNotificationListeners();
  }




  //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem(FCM_TOKEN);
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem(FCM_TOKEN, fcmToken);
      }
    }
    // alert(fcmToken);
    this.setState({ pushNotificationToken: fcmToken })
    console.log(fcmToken);
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      alert('permission rejected');
      console.log('permission rejected');
    }
  }

  //////
  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      this.showAlert(title, body);
    });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      // alert(JSON.stringify(message));
      console.log(JSON.stringify(message));
    });
  }

  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

  static propTypes = {
    componentId: PropTypes.string,
  };

  homeButtonTapped = () => {
    Navigation.pop(this.props.componentId);
  };

  showMobileScreen() {

    // alert('aaaaa');
    Navigation.push(this.props.componentId, {
      component: {
        name: 'MobileNumber',
        options: {
          topBar: {
            visible: false,
            animate: false,
            drawBehind: true,
          },
          layout: {
            orientation: ['portrait']
          },
        },
        passProps: {
          pushNotificationToken: this.state.pushNotificationToken
        }
      },
    });
  };


  handleTap = () => {
    this.showMobileScreen()
  }



  renderComponent = () => {
    return (
      <View style={styles.carouselContainer}>
        <Carousel
          layout={'default'} layoutCardOffset={18}
          ref={(c) => { this._carousel = c; }}
          data={this.state.imageList}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          shouldOptimizeUpdates
          onSnapToItem={(index) => {

            if (index === 3) {
              //   alert('ddd');
              this.showMobileScreen();
            } else {
              this.setState({ activeSlide: index });
            }


          }}
        />
        {this.pagination}
      </View>
    )

  }


  get pagination() {
    const { activeSlide, imageList } = this.state;
    return (
      <Pagination
        dotsLength={imageList.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          backgroundColor: APP_GLOBAL_COLOR,
          // backgroundColor: 'rgba(0, 0, 0, 0.75)',
          width: SCREEN_WIDTH,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center'
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: 'rgba(255, 255, 255, 0.92)'
        }}
        inactiveDotStyle={{
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  _renderItem({ item, index }) {
    // let data = "trendsImage"+(index+1)+".jpg";
    return (
      <View key={index + "abc"} style={styles.imageContainer}>
        {/* <View style={{ width: '100%' , backgroundColor : 'yellow'}}> */}
        <Image
          resizeMode='contain'
          resizeMethod="scale"
          style={{ height: '100%', width: '100%', marginTop: 0, borderRadius: 0 }}
          source={item}
        />
        {/* </View> */}
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView
        forceInset={{ bottom: 'always' }}
        style={styles.safeViewContainer} backgroundColor={APP_GLOBAL_COLOR}>

        {this.renderComponent()}
        <View style={{ flex: 0.1, backgroundColor: APP_GLOBAL_COLOR, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={this.handleTap} style={{ height: 40, width: '40%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }} >

            <Text style={{ fontWeight: 'bold', color: APP_GLOBAL_COLOR }}>{this.state.activeSlide !== 2 ? 'Skip to Login' : 'Login'}</Text>

          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  safeViewContainer: {
    flex: 1,
    backgroundColor: APP_GLOBAL_COLOR
  },

  imageContainer: {
    flex: 1,
    backgroundColor: 'transparent'
  },

  carouselContainer: {
    flex: 0.9,
    margin: 0,
  }

})

