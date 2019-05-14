import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  SafeAreaView,
  BackHandler,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
  Picker,
  PickerIOS,
  Platform,
  Linking,
  Alert
} from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import ProfileView from '../../components/UI/ProfileView/ProfileView';
import MenuButtons from '../../components/UI/ProfileView/MenuButtons';
import { Navigation } from 'react-native-navigation';
import { PropTypes } from 'prop-types';
import { normalize, getUserID, DEFAULT_USER_ID, authHeaders, getUserData, saveUserData, APP_GLOBAL_COLOR } from '../../../Constant';
import { LANDING_RESOURCES, LANDING_CDM, DEBUG, LANDING_PDM, LANDING_TOP_SIX, GET_USER_NOTIFICATIONS, UPDATE_USER_NOTIFICATIONS, GET_USER_DETAILS_EMAIL } from '../../../Apis';
import axios from 'axios';
import { Button, withBadge, Icon } from 'react-native-elements';
import HomeScoreView from '../../components/UI/ProfileCard/HomeScoreView';
import Spinner from '../../components/UI/Spinner/Spinner';
import TopSix from '../../components/UI/TopSix/TopSix';
import TopSix_2 from '../../components/UI/TopSix/TopSix_2';
// import Dialog from 'react-native-dialog';
import Permissions from 'react-native-permissions';

import firebase from 'react-native-firebase';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

// const { notifications } = this.state
import KochavaTracker from 'react-native-kochava-tracker';
import Circle from '../../components/UI/ResultPoll/Circle';
import TextTicker from 'react-native-text-ticker'

export default class HomeScreen extends Component {

  areaCode = null;
  locationErrorMessage = null;

  static propTypes = {
    componentId: PropTypes.string,
  };

  constructor(props) {


    let extraImage = "Trends,Survey,Arena,Notifications,Rate Now, Profile, Male,Female, Select Your Profession,Student,Salaried,Entrepreneur, Retired, Housewife,Other, Select Your Age group, Teenager,Twenties,Thirties,Forties,Fifties,Sixty+";
    let menuArr = extraImage.split(',');


    super(props);
    // this.createNotificationListeners();

    this.state = {
      showDialog: false,
      currLandPageSurvey: null,
      isLoading: true,
      timer: null,
      counter: 0,
      // user_id: '1',
      firstAPIresponse: null,
      secondAPIresponse: null,
      thirdAPIresponse: null,
      landingTopSix: null,
      lat_lon: null,
      coordinates: null,
      language: 'English',

      data: this.props.data,
      // menuName: this.getLanguageCode(this.props.data.userLanguage),
      menuName: menuArr,
      // loadingFourth

      notifications: {
        count: null,
        data: this.props.data,
        menuName: this.getLanguageCode(this.props.data.userLanguage),
        notification: [
          {
            read: false,
            notificationLogId: '12',
            title: 'Survey Update',
            notificationFor: 'survey',
            subtitle: 'A new survey has been added, please take your time and check it out',
            notificationDateTime: moment().format(),

          },
          {
            read: true,
            notificationLogId: '11',
            title: 'Survey Update',
            notificationFor: 'survey',
            subtitle: 'A new survey has been added, please take your time and check it out',
            notificationDateTime: moment().format(),
          },
          {
            read: false,
            notificationLogId: '14',
            title: 'Timeline Update',
            notificationFor: 'timeline',
            subtitle: 'Someone liked your comment',
            notificationDateTime: moment().format(),
          },
          {
            read: false,
            notificationLogId: '743',
            title: 'Survey Update',
            notificationFor: 'survey',
            subtitle: 'A new survey has been added, please take your time and check it out',
            notificationDateTime: moment().format(),
          },
          {
            read: false,
            notificationLogId: '9483',
            title: 'Survey',
            notificationFor: 'survey',
            subtitle: 'A new survey has been added, please take your time and check it out',
            notificationDateTime: moment().format(),
          },
          {
            read: false,
            notificationLogId: '0293',
            title: 'Timeline Update',
            notificationFor: 'timeline',
            subtitle: 'Ben just commented on your update',
            notificationDateTime: moment().format(),
          },
          {
            read: false,
            notificationLogId: '837484',
            title: 'Timeline Update',
            notificationFor: 'timeline',
            subtitle: 'Chuks commented on your post',
            notificationDateTime: moment().format(),
          },
          {
            read: false,
            notificationLogId: '838494',
            title: 'Survey',
            notificationFor: 'survey',
            subtitle: 'A new survey has been added, please take your time and check it out',
            notificationDateTime: moment().format(),
          },
          {
            read: true,
            notificationLogId: '938292933',
            title: 'Survey',
            notificationFor: 'survey',
            subtitle: 'A new survey has been added, please take your time and check it out',
            notificationDateTime: moment().format(),
          },
          {
            read: false,
            notificationLogId: '027842',
            title: 'Survey',
            notificationFor: 'survey',
            subtitle: 'A new survey has been added, please take your time and check it out',
            notificationDateTime: moment().format(),
          },
          {
            read: true,
            notificationLogId: '948392',
            title: 'Survey',
            notificationFor: 'survey',
            subtitle: 'A new survey has been added, please take your time and check it out',
            notificationDateTime: moment().format(),
          },
        ]
      }
    };
  }

  getUserDetails = () => {

    let body = null;
    that = this;
    body = JSON.stringify({
      userId: that.state.user_id,
    });

    fetch(GET_USER_DETAILS_EMAIL, {
      method: 'POST',
      headers: authHeaders(),
      body: body,
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          let dict = {};
          dict["image"] = responseJson.userImageData;
          dict["username"] = responseJson.userName;
          dict["firstName"] = responseJson.userFirstName;
          dict["lastName"] = responseJson.userLastName;
          dict["selectedAgeGroupCode"] = responseJson.userAgeGroup;
          dict["gender"] = responseJson.userGender;
          dict["userId"] = responseJson.userId;
          dict["description"] = responseJson.userDescription;
          dict["userDesignation"] = responseJson.userDesignation;
          dict["userLanguage"] = responseJson.userLanguage;

          this.setState({ data: dict });
          saveUserData(this.state.data);
        }

        // this.serverHitForSecondResponse();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  readNotification = (index, notifications, screen) => {
    // const { count } = this.state.notifications;
    // let counted;
    let newNotifications = notifications;


    // if (count > 0) {
    //   counted = count - 1;
    // } else {
    //   counted = count;
    // }

    // newNotifications.notificationList[index].read = true;
    // newNotifications.count = counted;

    let updatedNotification = Object.assign(newNotifications, {});

    console.log(updatedNotification)
    this.setState({
      notifications: updatedNotification
    })
    // alert(JSON.stringify(notifications[index]));
    if (screen.toString().toLowerCase() === 'survey' || screen === 'Survey') {
      let obj = newNotifications.notificationList[index];
      let surveyThreadID = obj["surveyThreadId"];
      this.toQuesScreen(surveyThreadID, updatedNotification);
    } else if (screen.toString().toLowerCase() === 'trends') {
      this.toTrendScreen()
    } else if (screen.toString().toLowerCase() === 'timeline') {
      this.toReportScreen()
    } else if (screen.toString().toLowerCase() === 'message') {
      let obj = newNotifications.notificationList[index];
      this.toReportReplyScreen(obj.surveyThreadId);
    }
  }
  //////
  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    console.log(JSON.stringify(" Triggered when a particular notification has been received in foreground"));
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      console.log(JSON.stringify(" Triggered when a particular notification has been received in foreground"));
      console.log(notification);
      const { title, body } = notification;
      // this.showScreen(title, body);
    });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    console.log(JSON.stringify("If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:"));
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      console.log(JSON.stringify("If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:"));
      console.log(notificationOpen);
      const { title, body } = notificationOpen.notification;
      this.showScreen(notificationOpen.notification);
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    console.log(JSON.stringify("If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:"));
    const notificationOpen = await firebase.notifications().getInitialNotification();
    console.log(JSON.stringify("If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:"));
    console.log(notificationOpen);
    if (notificationOpen) {
      // const { title, body } = notificationOpen.notification;
      this.showScreen(notificationOpen.notification);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    console.log(JSON.stringify("Triggered for data only payload in foreground"));
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      alert(JSON.stringify("process data message"));
      console.log(JSON.stringify(message));
    });
  }
  showScreen(notification) {

    console.log(notification);

    if (notification) {
      if (notification.data) {
        let dict = notification.data;
        if (dict.screen && dict.screen.toLowerCase() === 'survey') {
          let surveryId = dict['surveyid'];
          this.toQuesScreen(surveryId, null);
        }else if (dict.screen && dict.screen.toLowerCase() === 'trends') {
          this.toTrendScreen();
        }else if (dict.screen && (dict.screen.toLowerCase() === 'arena' || dict.screen.toLowerCase() === 'timeline')) {
          if (dict.arenaid) {
            this.toReportReplyScreen(dict.arenaid);
          }else if (dict.timelineid) {
            this.toReportReplyScreen(dict.timeline);
          }else if (dict.threadid) {
            this.toReportReplyScreen(dict.threadid);
          }else{
            this.toReportScreen();
          }
        }
      }
    }

    // if (screen.toString().toLowerCase() === 'survey' || screen === 'Survey') {
    //   let obj = newNotifications.notificationList[index];
    //   let surveyThreadID = obj["surveyThreadId"];
    //   this.toQuesScreen(surveyThreadID, updatedNotification);
    // } else if (screen.toString().toLowerCase() === 'trends') {
    //   this.toTrendScreen()
    // } else if (screen.toString().toLowerCase() === 'timeline') {
    //   this.toReportScreen()
    // } else if (screen.toString().toLowerCase() === 'message') {
    //   let obj = newNotifications.notificationList[index];
    //   this.toReportReplyScreen(obj.surveyThreadId);
    // }

    // Alert.alert(
    //   title, body,
    //   [
    //     { text: 'OK', onPress: () => console.log('OK Pressed') },
    //   ],
    //   { cancelable: false },
    // );
  }

  updateNotifications = (notificationLogId, notification) => {
    console.log('called')
    // return;
    axios.post(UPDATE_USER_NOTIFICATIONS, {
      notificationLogId: notificationLogId.toString(),
      read: "Y",
      userId: this.state.user_id
      // notificationLogId: notificationLogId.toString(),
      // read: 'Y',
      // userId: this.state.user_id
    }).then((response) => {
      let responseData = response.data;
      console.log('_________')
      console.log(responseData)
      console.log('_________')
      this.getNotifications()

    }).catch(error => {
      console.log(error)
    })
  }

  showNotificationScreen = () => {
    const { menuName } = this.state;

    Navigation.push(this.props.componentId, {
      component: {
        name: 'NotificationScreen',
        options: {
          topBar: {
            visible: true,
            // drawBehind: true,
            animate: true,
            buttonColor: '#fff',
            background: {
              color: APP_GLOBAL_COLOR,
            },
            title: {
              text: menuName ? menuName[3] : null,
              fontSize: hp('2.5%'),
              color: '#fff',
            },
            backButton: {
              color: '#fff'
            }
          },
        },
        passProps: {
          notifications: this.state.notifications,
          readNotification: this.readNotification,
          updateNotifications: this.updateNotifications,
        }

      },
    });
  }
  // this.props.updateUser
  refreshUI = (data) => {
    // getUserData().then((data) => {

    // if (data.userLanguage === 'hi') {
    //   let menu = ['रुझान', 'सर्वे', 'अखाड़ा'];
    //   this.setState({ menuName: menu, data: data });
    //   return;
    // }

    // let menu = ['Trends', 'Survey', 'Arena'];
    this.setState({ data: data });

    this.tick();
    // })
  }

  getLanguageCode(language) {
    if (language === 'hi') {
      let menu = ['रुझान', 'सर्वे', 'अखाड़ा']
      this.setState({ menuName: menu });
      return menu;
    }

    return ['Trends', 'Survey', 'Arena']

  }

  tick = () => {

    // alert('aaa');
    this.checkPermission();

    this.getUserDetails();

    // Permissions.check('location').then(response => {

    //   if (response === 'denied' || response === 'undetermined') {
    //     // this.setState({ isForFirstTime: true });
    //     this._requestPermission();
    //   } else if (response === 'authorized') {
    //     // this.getLocation()
    //     this.fetchCurrentLocation();
    //   }
    // })

    // let counter = this.state.counter + 1;
    // this.setState({
    //   counter: counter >= 2 ? 0 : counter,
    // });
    // this.scroll.scrollTo({
    //   x: this.state.counter * Dimensions.get('window').width,
    //   y: 0,
    //   animate: true,
    // });
  };

  toFireDepartmentScreen = () => {
    const { menuName } = this.state;
    Navigation.push(this.props.componentId, {
      component: {
        name: 'PoliceProfileScreen',
        options: {
          topBar: {
            visible: false,
            drawBehind: true,
            animate: false,
          },
        },
        passProps: {
          user_id: this.state.user_id,
          lat_long: this.state.lat_lon,
          isPolice: false,
          userLanguage: this.state.data.userLanguage,
          languageCode: this.state.firstAPIresponse ? this.state.firstAPIresponse.languageCodes : null,

          username: this.state.data.username,
          language: menuName ? menuName[4] : null
        }

      },
    });
  };

  toPoliceProfileScreen = () => {
    const { menuName } = this.state;

    Navigation.push(this.props.componentId, {
      component: {
        name: 'PoliceProfileScreen',
        options: {
          topBar: {
            visible: false,
            drawBehind: true,
            animate: false,
          },
        },

        passProps: {
          user_id: this.state.user_id,
          lat_long: this.state.lat_lon,
          isPolice: true,
          username: this.state.data.username,
          userLanguage: this.state.data.userLanguage,
          languageCode: this.state.firstAPIresponse ? this.state.firstAPIresponse.languageCodes : null,
          language: menuName ? menuName[4] : null,
        }

      },
    });
  };

  toDataScreen = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'DataScreen',
      },
    });
  };

  toReportScreen = () => {
    const { menuName } = this.state;

    Navigation.push(this.props.componentId, {
      component: {
        name: 'ReportScreen',
        options: {
          topBar: {
            visible: false,
            drawBehind: true,
            animate: false,
          },
        },
        passProps: {
          coordinates: this.state.coordinates,
          data: this.state.data,
          refreshUI: this.refreshUI,
          userLanguage: this.state.data.userLanguage,
          languageCode: this.state.firstAPIresponse ? this.state.firstAPIresponse.languageCodes : null,
          user_id: this.state.user_id,
          lat_lon: this.state.lat_lon,
          // languageCode: this.state.firstAPIresponse ? this.state.firstAPIresponse.languageCodes : null,
          menuName: menuName,

          notifications: this.state.notifications,
          readNotification: this.readNotification,
          updateNotifications: this.updateNotifications,
        },
      },
    });
  };

  toReportReplyScreen = (surveyThreadId) => {
    console.log('toReportReplyScreen----yyy');
    console.log(surveyThreadId);
    const { menuName } = this.state;
    if (surveyThreadId) {
      let dict = { threadId: surveyThreadId, Message_Id: '' };
      Navigation.push(this.props.componentId, {
        component: {
          name: 'ReportReplyScreen',
          options: {
            topBar: {
              visible: false,
              drawBehind: true,
              animate: false,
            },
          },

          passProps: {
            coordinates: this.state.coordinates,
            data: dict,
            data2: this.state.data,
            userData: this.state.data,
            // refreshUI: this.refreshUI,
            userLanguage: this.state.data.userLanguage,
            // languageCode: this.state.firstAPIresponse ? this.state.firstAPIresponse.languageCodes : null,
            user_id: this.state.user_id,
            // lat_lon: this.state.lat_lon,
            // // languageCode: this.state.firstAPIresponse ? this.state.firstAPIresponse.languageCodes : null,
            // menuName: menuName,

            // notifications: this.state.notifications,
            // readNotification: this.readNotification,
            // updateNotifications: this.updateNotifications,


          },
        },
      });
    }

  };

  toQuesScreen = (surveyThreadID, updatedNotification) => {
    const { menuName } = this.state;

    let notification = updatedNotification ? updatedNotification : this.state.notifications;
    Navigation.push(this.props.componentId, {
      component: {
        name: 'QuestionnaireScreen',
        options: {
          topBar: {
            visible: false,
            drawBehind: true,
            animate: false,
          },
        },
        passProps: {
          user_id: this.state.user_id,
          lat_lon: this.state.lat_lon,
          userLanguage: this.state.data.userLanguage,
          // languageCode: this.state.firstAPIresponse ? this.state.firstAPIresponse.languageCodes : null,
          menuName: menuName,
          surveyThreadID: surveyThreadID,

          notifications: notification,
          readNotification: this.readNotification,
          updateNotifications: this.updateNotifications,

        }
      },
    });

    // Navigation.push(this.props.componentId, {
    //   component: {
    //     name: 'QuestionnaireScreen',
    //     options: {
    //       topBar: {
    //         visible: false,
    //         drawBehind: true,
    //         animate: false,
    //       },
    //     },
    //     passProps: {
    //       surveyId : '1',
    //       notification : 'Y',
    //       user_id: this.state.user_id,
    //       lat_lon: this.state.lat_lon,
    //       userLanguage: this.state.data.userLanguage,
    //       // languageCode: this.state.firstAPIresponse ? this.state.firstAPIresponse.languageCodes : null,
    //       menuName: menuName
    //     }
    //   },
    // });
  };

  toTrendScreen = () => {
    const { menuName } = this.state;

    Navigation.push(this.props.componentId, {
      component: {
        name: 'TrendScreen',
        options: {
          topBar: {
            visible: false,
            drawBehind: true,
            animate: false,
          },
        },
        passProps: {
          resourceIdPDM: this.state.firstAPIresponse ? this.state.firstAPIresponse.firResourceId : 1,
          resourceIdCDM: this.state.firstAPIresponse ? this.state.firstAPIresponse.polResourceId : 1,
          image: this.state.data.image,
          username: this.state.data.username,
          data: this.state.data,
          refreshUI: this.refreshUI,
          userLanguage: this.state.data.userLanguage,
          languageCode: this.state.firstAPIresponse ? this.state.firstAPIresponse.languageCodes : null,
          user_id: this.state.user_id,
          menuName: menuName,

          notifications: this.state.notifications,
          readNotification: this.readNotification,
          updateNotifications: this.updateNotifications,
          // readNotification: this.readNotification,
        }
      },
    });
  };

  watchID = null;
  fetchCurrentLocation() {
    // alert('insider');

    if (DEBUG == 0) {
      this.startTimer()
      // return;
    }


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
        // alert(latlong);
        // this.setState({ lat_lon: "28.722,77.125" });
        this.setState({ lat_lon: latlong });
        this.setState({ coordinates: position.coords });
        // alert(latlong);
        this.serverHitForFourthResponse();
        this.requestToServer();

      },
      (error) => {
        console.log(error)
        this.serverHitForFourthResponse();
        this.requestToServer();

        // alert(error.message)
        // this.locationErrorMessage = error.message;
        // alert(locationErrorMessage)
        // this.showDialog();
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );

    // this.watchID = navigator.geolocation.watchPosition((position) => {
    //   const lastPosition = JSON.stringify(position);
    //   // this.setState({ lastPosition });
    //   alert(lastPosition)
    // });
  }

  checkPermission = () => {
    Permissions.check('location').then(response => {
      // alert(response);
      if (response === 'denied' || response === 'undetermined') {
        this._requestPermission();
      } else if (response === 'authorized') {
        // this.getLocation()
        this.fetchCurrentLocation();
      } else {
        this.serverHitForFourthResponse();
        this.requestToServer();
      }
    })
  }

  _requestPermission = () => {
    Permissions.request('location').then(response => {
      // this.setState({ location: response })
      // alert('aaaa'+response);
      if (response === 'denied' || response === 'undetermined') {
        // this._requestPermission();
        this.serverHitForFourthResponse();
        this.requestToServer();

      } else if (response === 'authorized') {
        // this.getLocation()
        this.fetchCurrentLocation();
      } else {
        this.serverHitForFourthResponse();
        this.requestToServer();
      }
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
    this.backHandler.remove();

    Linking.removeEventListener('url', this.handleOpenURL);

    // this.createNotificationListeners();
  }

  goBack = () => {
    if (this.props.componentId === "HomeScreen" || this.props.componentId === "Component10") {
      BackHandler.exitApp();
      return true;

    }
  }

  componentDidMount() {
    // SplashScreen.hide();
    // getUserID();
    // SplashScreen.hide();

    firebase.analytics().setCurrentScreen("Home_Screen");
    //firebase.analytics().logEvent("Home_Screen");
    firebase.analytics().setUserProperty("Screen", "Home_Screen");
    firebase.analytics().logEvent("Content", { "Screen": "Home_Screen" });

    var eventMapObject = {};
    eventMapObject["screen_name"] = "Home_Screen";
    KochavaTracker.sendEventMapObject(KochavaTracker.EVENT_TYPE_LEVEL_COMPLETE_STRING_KEY, eventMapObject);

    AsyncStorage.getItem(DEFAULT_USER_ID).then((value) => {
      // alert(value);
      let userID = value ? value : 1;
      // alert(userID);
      this.setState({ user_id: userID })
      this.getNotifications();
    })
    this.checkPermission()
    // alert(getUserID());

    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.goBack);
    this.startTimer();

    if (this.props.refresh) {

      this.setState({
        showDialog: false,
        currLandPageSurvey: null,
        isLoading: true,
        timer: null,
        counter: 0,
        user_id: '1',
        firstAPIresponse: null,
        secondAPIresponse: null,
        thirdAPIresponse: null,
        landingTopSix: null,
        lat_lon: null,
        coordinates: null,
        language: 'English',

        data: this.props.data,
        // menuName: this.getLanguageCode(this.props.data.userLanguage),
        // menuName: null,
        // loadingFourth

        notifications: {
          count: null,
          data: this.props.data,
          menuName: this.getLanguageCode(this.props.data.userLanguage),
          notification: [
            {
              read: false,
              notificationLogId: '12',
              title: 'Survey Update',
              notificationFor: 'survey',
              subtitle: 'A new survey has been added, please take your time and check it out',
              notificationDateTime: moment().format(),

            },
            {
              read: true,
              notificationLogId: '11',
              title: 'Survey Update',
              notificationFor: 'survey',
              subtitle: 'A new survey has been added, please take your time and check it out',
              notificationDateTime: moment().format(),
            },
            {
              read: false,
              notificationLogId: '14',
              title: 'Timeline Update',
              notificationFor: 'timeline',
              subtitle: 'Someone liked your comment',
              notificationDateTime: moment().format(),
            },
            {
              read: false,
              notificationLogId: '743',
              title: 'Survey Update',
              notificationFor: 'survey',
              subtitle: 'A new survey has been added, please take your time and check it out',
              notificationDateTime: moment().format(),
            },
            {
              read: false,
              notificationLogId: '9483',
              title: 'Survey',
              notificationFor: 'survey',
              subtitle: 'A new survey has been added, please take your time and check it out',
              notificationDateTime: moment().format(),
            },
            {
              read: false,
              notificationLogId: '0293',
              title: 'Timeline Update',
              notificationFor: 'timeline',
              subtitle: 'Ben just commented on your update',
              notificationDateTime: moment().format(),
            },
            {
              read: false,
              notificationLogId: '837484',
              title: 'Timeline Update',
              notificationFor: 'timeline',
              subtitle: 'Chuks commented on your post',
              notificationDateTime: moment().format(),
            },
            {
              read: false,
              notificationLogId: '838494',
              title: 'Survey',
              notificationFor: 'survey',
              subtitle: 'A new survey has been added, please take your time and check it out',
              notificationDateTime: moment().format(),
            },
            {
              read: true,
              notificationLogId: '938292933',
              title: 'Survey',
              notificationFor: 'survey',
              subtitle: 'A new survey has been added, please take your time and check it out',
              notificationDateTime: moment().format(),
            },
            {
              read: false,
              notificationLogId: '027842',
              title: 'Survey',
              notificationFor: 'survey',
              subtitle: 'A new survey has been added, please take your time and check it out',
              notificationDateTime: moment().format(),
            },
            {
              read: true,
              notificationLogId: '948392',
              title: 'Survey',
              notificationFor: 'survey',
              subtitle: 'A new survey has been added, please take your time and check it out',
              notificationDateTime: moment().format(),
            },
          ]
        }
      });
    }

    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        this.navigate(url);
      });

      // Linking.addEventListener('url', this.handleOpenURL);


    } else {
      Linking.addEventListener('url', this.handleOpenURL);

    }

    this.createNotificationListeners();
  }


  handleOpenURL = (event) => { // D
    this.navigate(event.url);
  }

  navigate = (url) => { // E
    // alert(url);
    // const { navigate } = this.props.navigation;
    const route = url.replace(/.*?:\/\//g, '');
    //alert(route);
    if (route) {
      if (Platform.OS === 'ios') {
        if (route.length > 3) {
          var strFirstThree = route.substring(0, 3);
          if (strFirstThree && strFirstThree === 'THD')
            this.toReportReplyScreen(route);
        }

      } else {
        let routeName = route.split('/');
        console.log(routeName);
        if (routeName.length >= 2) {
          this.toReportReplyScreen(routeName[1]);
        }
      }

    }

    // const id = route.match(/\/([^\/]+)\/?$/)[1];
    // const routeName = route.split('/')[0];

    // if (routeName === 'people') {
    //   navigate('People', { id, name: 'chris' })
    // };
  }

  componentDidUpdate() {
  }

  getNotifications = () => {
    console.log(this.state.user_id)
    axios.post(GET_USER_NOTIFICATIONS, {
      userId: this.state.user_id
    }).then((response) => {
      let responseData = response.data;
      this.setState({
        notifications: responseData
      })
    }).catch(error => {
      console.log(error)
    })
  }

  requestToServer() {
    if (DEBUG == 0) {
      return;
    }
    this.serverHitForFirstApi()
  }

  serverHitForFirstApi() {

    let body = null;
    if (this.state.lat_lon) {
      body = JSON.stringify({
        userId: this.state.user_id,
        latLngSeparatedByComma: this.state.lat_lon,
        // latLngSeparatedByComma:"28.722,77.125"
      });
    } else {
      body = JSON.stringify({
        userId: this.state.user_id

      });
    }
    // alert()
    // alert(body);
    fetch(LANDING_RESOURCES, {
      method: 'POST',
      headers: authHeaders(),
      body: body,
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ isLoading: false, firstAPIresponse: responseJson, currLandPageSurvey: responseJson.currLandPageSurvey });
        // this.serverHitForSecondResponse();
      })
      .catch((error) => {
        console.error(error);
      });

  }

  serverHitForSecondResponse() {

    let body = null;
    if (this.state.lat_lon) {
      body = JSON.stringify({
        userId: this.state.user_id,
        // latLngSeparatedByComma: "32.768238,-96.791281",
        latLngSeparatedByComma: this.state.lat_lon,
        // latLngSeparatedByComma:"28.722,77.125"
      });
      // console.log(this.state.lat_lon)
      // console.log("32.768238,-96.791281")
    } else {
      body = JSON.stringify({
        userId: this.state.user_id

      });
    }

    fetch(LANDING_PDM, {
      method: 'POST',
      headers: authHeaders(),
      body: body,
    }).then((response) => response.json())
      .then((responseJson) => {
        // alert(JSON.stringify(responseJson));
        this.setState({ secondAPIresponse: responseJson });
        this.serverHitForThirdResponse();

        // return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  serverHitForThirdResponse() {
    let body = null;
    if (this.state.lat_lon) {
      body = JSON.stringify({
        userId: this.state.user_id,
        latLngSeparatedByComma: this.state.lat_lon,
        // latLngSeparatedByComma:"28.722,77.125"
      });
    } else {
      body = JSON.stringify({
        userId: this.state.user_id

      });
    }

    fetch(LANDING_CDM, {
      method: 'POST',
      headers: authHeaders(),
      body: body,
    }).then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson)
        // console.log(response)
        // alert(JSON.stringify(responseJson));
        this.setState({ thirdAPIresponse: responseJson });
        // this.startTimer();
        // this.serverHitForFourthResponse();
        // return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  serverHitForFourthResponse = () => {
    // console.log('called')
    var body = {
      userId: this.state.user_id
    };
    if (this.state.lat_lon) {
      body["latLngSeparatedByComma"] = this.state.lat_lon;
    }
    //alert(JSON.stringify(body));
    axios.post(LANDING_TOP_SIX, body)
      .then(response => {
        let responseData = response.data;
        // console.log(responseData)
        //alert(JSON.stringify(responseData));
        let extraImage = responseData.extraImageFile3 ? responseData.extraImageFile3 : "Trends,Survey,Arena,Notifications,Rate Now, Profile, Male,Female, Select Your Profession,Student,Salaried,Entrepreneur, Retired, Housewife,Other, Select Your Age group, Teenager,Twenties,Thirties,Forties,Fifties,Sixty+";
        let menuArr = extraImage.split(',');
        this.setState({ landingTopSix: responseData, menuName: menuArr })

      })
      .catch(error => {
        // alert('bbb');
        console.log(error)
      })
  }

  showDialog() {

  };

  handleCancel = () => {
    this.setState({ showDialog: false });
    // alert(this.areaCode);
  };


  startTimer() {
    let timer = setInterval(this.tick, 60 * 1000);
    this.setState({ timer: timer });
  }

  profileViewAfterLoading = data => {
    if (DEBUG == 0) {

      // let profilePic = [
      //   imageData2,
      //   imageData
      // ];
      let profilePic = [
        require("../../assets/1.png"),
        require("../../assets/2.png"),
      ];
      let profileCompanyPic = [
        require("../../assets/batch1.png"),
        require("../../assets/batch1.png"),
      ];
      // let profileCompanyPic = [
      //   imageData,
      //   imageData2
      // ];
      let profileInfo = [

        "Heena Kumar singh",
        "Alaska"
      ];
      let profileInfo2 = [
        "Shashi Kumar singh",
        "Alaska",
      ];

      let areaType = ["DNTN", "DNTN"];
      return (
        <View style={styles.profileContainer}>
          <ProfileView
            style={{ marginLeft: 1, marginRight: 0.5 }}
            infos={profileInfo}
            source={[profilePic[0], profileCompanyPic[0]]}
            onPress={this.toPoliceProfileScreen}
            areaType={areaType[0]}
          />

          <ProfileView
            style={{ marginLeft: 0.5, marginRight: 1 }}
            infos={profileInfo2}
            source={[profilePic[1], profileCompanyPic[1]]}
            onPress={this.toFireDepartmentScreen}
            areaType={areaType[1]}
          />

        </View>
      );
    } else if (this.state.isLoading) {
      return (
        <View style={styles.profileContainer}>
          <ProfileView
            style={{ marginLeft: 1, marginRight: 0.5 }}
            infos={null}
            source={null}
            onPress={this.toPoliceProfileScreen}
            areaType={null}
          />


          <ProfileView
            style={{ marginLeft: 0.5, marginRight: 1 }}
            infos={null}
            source={null}
            onPress={this.toFireDepartmentScreen}
            areaType={null}
          />

        </View>
      );

    } else {
      let profilePic = [
        { uri: 'data:image/png;base64,' + this.state.firstAPIresponse.polResourceImageData },
        { uri: 'data:image/png;base64,' + this.state.firstAPIresponse.firResourceImageData },
      ];
      let profileCompanyPic = [
        { uri: 'data:image/png;base64,' + this.state.firstAPIresponse.polResourceCategoryLogoData },
        { uri: 'data:image/png;base64,' + this.state.firstAPIresponse.firResourceCategoryLogoData },
      ];
      let profileInfo = [
        this.state.firstAPIresponse.polResourceName,
        this.state.firstAPIresponse.polAreaName,
      ];
      let profileInfo2 = [
        this.state.firstAPIresponse.firResourceName,
        this.state.firstAPIresponse.firAreaName,
      ];
      let areaType = [this.state.firstAPIresponse.polResourceType, this.state.firstAPIresponse.firResourceType];
      // console.log(this.state.firstAPIresponse)
      return (
        <View style={styles.profileContainer}>
          {/* <Circle/> */}
          <ProfileView
            style={{ marginLeft: 0.5, marginRight: 1 }}
            infos={profileInfo}
            source={[profilePic[0], profileCompanyPic[0]]}
            onPress={this.toPoliceProfileScreen}
            areaType={areaType[0]}
          />

          <ProfileView
            style={{ marginLeft: 0.5, marginRight: 1 }}
            infos={profileInfo2}
            source={[profilePic[1], profileCompanyPic[1]]}
            onPress={this.toFireDepartmentScreen}
            areaType={areaType[1]}
          />
        </View>
      );
    }
  };

  renderSurveyButton = () => {
    const { currLandPageSurvey, menuName, landingTopSix } = this.state;
    if (landingTopSix) {
      if (currLandPageSurvey) {
        let firstKey = Object.keys(currLandPageSurvey)[0];
        // console.log(currLandPageSurvey[firstKey])
        return (
          <Button
            title={currLandPageSurvey[firstKey]}
            buttonStyle={{ backgroundColor: '#a01414' }}
            onPress={() => {
              Navigation.push(this.props.componentId, {
                component: {
                  name: 'QuestionnaireScreen',
                  options: {
                    topBar: {
                      visible: false,
                      drawBehind: true,
                      animate: false,
                    },
                  },
                  passProps: {
                    surveyThreadID: firstKey,
                    user_id: this.state.user_id,
                    lat_lon: this.state.lat_lon,
                    // surveyType: 'L',
                    surveyTitle: currLandPageSurvey[firstKey],
                    componentId: this.props.componentId,
                    menuName: menuName ? menuName : null,

                    notifications: this.state.notifications,
                    readNotification: this.readNotification,
                    updateNotifications: this.updateNotifications,
                  }
                },
              });
            }}
          />
        )
      } else {
        return (
          <Button
            title="No Active Survey"
            disabled />
        )
      }
    } else return null;
  }

  gotoProfile = () => {

    const { menuName } = this.state;

    let languageCode = this.state.firstAPIresponse ? this.state.firstAPIresponse.languageCodes : null;

    let body = {
      image: this.state.data.image,
      firstName: this.state.data.firstName,
      lastName: this.state.data.lastName,
      // email: this.props.email ? this.props.email : "",
      username: this.state.data.username,
      selectedAgeGroupCode: this.state.data.selectedAgeGroupCode,
      gender: this.state.data.gender,
      userId: this.state.data.userId,
      description: this.state.data.description,
      userDesignation: this.state.data.userDesignation,
      userLanguage: this.state.data.userLanguage,

      refreshUI: this.refreshUI,

      languageCode: languageCode,
      language: menuName ? menuName[5] : null,
      male: menuName ? menuName[6] : null,
      female: menuName ? menuName[7] : null,
      selProfession: menuName ? menuName[8] : null,
      student: menuName ? menuName[9] : null,
      salaried: menuName ? menuName[10] : null,
      entrepreneur: menuName ? menuName[11] : null,
      retired: menuName ? menuName[12] : null,
      housewife: menuName ? menuName[13] : null,
      other: menuName ? menuName[14] : null,
      selAgeGroup: menuName ? menuName[15] : null,
      teenager: menuName ? menuName[16] : null,
      twenties: menuName ? menuName[17] : null,
      thirties: menuName ? menuName[18] : null,
      fourties: menuName ? menuName[19] : null,
      fifties: menuName ? menuName[20] : null,
      aboveSixty: menuName ? menuName[21] : null,
    };

    Navigation.push(this.props.componentId, {
      component: {
        name: 'Profile',
        passProps: body,
        options: {
          topBar: {
            visible: false,
            drawBehind: true,
            animate: false,
          },
        }
      }
    });
  }

  render() {
    let menuImageName = [
      require('../../assets/trends.png'),
      require('../../assets/survey.png'),
      require('../../assets/timeline.png'),
    ];

    const wd = Dimensions.get('window').width;

    swipe = () => {
      this.scroll.scrollTo({ x: wd, y: 0, animated: true });
    };
    // if (this.state.landingTopSix) {
    //   let keys = this.state.landingTopSix.keys;
    //   if (!keys.contains("areaTopSixResources2")) {
    //     return (<View></View>);
    //   }
    // }



    const resourceGPR_1 = this.state.landingTopSix ? this.state.landingTopSix.resourceGPR_1 : 40;
    const resourceGPR_2 = this.state.landingTopSix ? this.state.landingTopSix.resourceGPR_2 : 20;
    const resourceGPR_3 = this.state.landingTopSix ? this.state.landingTopSix.resourceGPR_3 : 10;
    const resourceGPR_4 = this.state.landingTopSix ? this.state.landingTopSix.resourceGPR_4 : 30;
    const resourceGPR_5 = this.state.landingTopSix ? this.state.landingTopSix.resourceGPR_5 : 55;
    const resourceGPR_6 = this.state.landingTopSix ? this.state.landingTopSix.resourceGPR_6 : 70;

    const resourceGPR_1_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceGPR_1 : 40;
    const resourceGPR_2_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceGPR_2 : 20;
    const resourceGPR_3_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceGPR_3 : 10;
    const resourceGPR_4_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceGPR_4 : 30;
    const resourceGPR_5_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceGPR_5 : 55;
    const resourceGPR_6_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceGPR_6 : 70;

    const resourceGPR_A_1 = [resourceGPR_1,
      resourceGPR_2,
      resourceGPR_3,
      resourceGPR_4,
      resourceGPR_5,
      resourceGPR_6];
    const resourceGPR_A_2 = [resourceGPR_1_,
      resourceGPR_2_,
      resourceGPR_3_,
      resourceGPR_4_,
      resourceGPR_5_,
      resourceGPR_6_,];

    const resourceImageData_1 = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceImageData_1 } : null
    const resourceImageData_2 = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceImageData_2 } : null
    const resourceImageData_3 = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceImageData_3 } : null
    const resourceImageData_4 = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceImageData_4 } : null
    const resourceImageData_5 = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceImageData_5 } : null
    const resourceImageData_6 = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceImageData_6 } : null

    const resourceImageData_1_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceImageData_1 } : null
    const resourceImageData_2_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceImageData_2 } : null
    const resourceImageData_3_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceImageData_3 } : null
    const resourceImageData_4_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceImageData_4 } : null
    const resourceImageData_5_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceImageData_5 } : null
    const resourceImageData_6_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceImageData_6 } : null

    const resourceImageData_A = [
      resourceImageData_1,
      resourceImageData_2,
      resourceImageData_3,
      resourceImageData_4,
      resourceImageData_5,
      resourceImageData_6];

    const resourceImageData_A_2 = [
      resourceImageData_1_,
      resourceImageData_2_,
      resourceImageData_3_,
      resourceImageData_4_,
      resourceImageData_5_,
      resourceImageData_6_];

    const resourceCategoryLogoData_1 = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceCategoryLogoData_1 } : null
    const resourceCategoryLogoData_2 = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceCategoryLogoData_2 } : null
    const resourceCategoryLogoData_3 = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceCategoryLogoData_3 } : null
    const resourceCategoryLogoData_4 = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceCategoryLogoData_4 } : null
    const resourceCategoryLogoData_5 = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceCategoryLogoData_5 } : null
    const resourceCategoryLogoData_6 = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceCategoryLogoData_6 } : null

    const resourceCategoryLogoData_1_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceCategoryLogoData_1 } : null
    const resourceCategoryLogoData_2_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceCategoryLogoData_2 } : null
    const resourceCategoryLogoData_3_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceCategoryLogoData_3 } : null
    const resourceCategoryLogoData_4_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceCategoryLogoData_4 } : null
    const resourceCategoryLogoData_5_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceCategoryLogoData_5 } : null
    const resourceCategoryLogoData_6_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceCategoryLogoData_6 } : null


    const esourceCategoryLogoData_A = [
      resourceCategoryLogoData_1,
      resourceCategoryLogoData_2,
      resourceCategoryLogoData_3,
      resourceCategoryLogoData_4,
      resourceCategoryLogoData_5,
      resourceCategoryLogoData_6];
    const esourceCategoryLogoData_A_2 = [
      resourceCategoryLogoData_1_,
      resourceCategoryLogoData_2_,
      resourceCategoryLogoData_3_,
      resourceCategoryLogoData_4_,
      resourceCategoryLogoData_5_,
      resourceCategoryLogoData_6_];

    const resourceName_1 = this.state.landingTopSix ? this.state.landingTopSix.resourceName_1 : "";
    const resourceName_2 = this.state.landingTopSix ? this.state.landingTopSix.resourceName_2 : "";
    const resourceName_3 = this.state.landingTopSix ? this.state.landingTopSix.resourceName_3 : "";
    const resourceName_4 = this.state.landingTopSix ? this.state.landingTopSix.resourceName_4 : "";
    const resourceName_5 = this.state.landingTopSix ? this.state.landingTopSix.resourceName_5 : "";
    const resourceName_6 = this.state.landingTopSix ? this.state.landingTopSix.resourceName_6 : "";

    const resourceName_1_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceName_1 : "";
    const resourceName_2_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceName_2 : "";
    const resourceName_3_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceName_3 : "";
    const resourceName_4_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceName_4 : "";
    const resourceName_5_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceName_5 : "";
    const resourceName_6_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceName_6 : "";

    const resourceName_A = [resourceName_1,
      resourceName_2,
      resourceName_3,
      resourceName_4,
      resourceName_5,
      resourceName_6];

    const resourceName_A_2 = [resourceName_1_,
      resourceName_2_,
      resourceName_3_,
      resourceName_4_,
      resourceName_5_,
      resourceName_6_];


    const resourceCategoryName_1 = this.state.landingTopSix ? this.state.landingTopSix.resourceCategoryName_1 : "";
    const resourceCategoryName_2 = this.state.landingTopSix ? this.state.landingTopSix.resourceCategoryName_2 : "";
    const resourceCategoryName_3 = this.state.landingTopSix ? this.state.landingTopSix.resourceCategoryName_3 : "";
    const resourceCategoryName_4 = this.state.landingTopSix ? this.state.landingTopSix.resourceCategoryName_4 : "";
    const resourceCategoryName_5 = this.state.landingTopSix ? this.state.landingTopSix.resourceCategoryName_5 : "";
    const resourceCategoryName_6 = this.state.landingTopSix ? this.state.landingTopSix.resourceCategoryName_6 : "";

    const resourceCategoryName_1_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceCategoryName_1 : "";
    const resourceCategoryName_2_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceCategoryName_2 : "";
    const resourceCategoryName_3_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceCategoryName_3 : "";
    const resourceCategoryName_4_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceCategoryName_4 : "";
    const resourceCategoryName_5_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceCategoryName_5 : "";
    const resourceCategoryName_6_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceCategoryName_6 : "";


    const resourceCategoryName_A = [resourceCategoryName_1,
      resourceCategoryName_2,
      resourceCategoryName_3,
      resourceCategoryName_4,
      resourceCategoryName_5,
      resourceCategoryName_6];

    const resourceCategoryName_A_2 = [resourceCategoryName_1_,
      resourceCategoryName_2_,
      resourceCategoryName_3_,
      resourceCategoryName_4_,
      resourceCategoryName_5_,
      resourceCategoryName_6_];

    const { notifications, menuName } = this.state;

    const BadgedIcon = withBadge(notifications.count)(Icon);


    console.log(this.state)


    return (
      <SafeAreaView
        forceInset={{ bottom: 'always' }}
        style={{ flex: 1, backgroundColor: 'rgba(210,210,208,1)' }}
      >
        <View style={stylesTopView.container}>
          <TouchableOpacity onPress={this.gotoProfile}>
            <Image
              style={{
                marginLeft: normalize(10),
                width: normalize(30),
                height: normalize(30),
                marginTop: normalize(5),
                marginBottom: normalize(5),
                borderRadius: normalize(30) / 2,
              }}
              // source={typeof(this.props.data.image) === 'number' ? require('../../assets/UserSmall.png') : this.props.data.image}
              source={this.state.data.image ? { uri: "data:image/png;base64," + this.state.data.image } : require('../../assets/UserSmall.png')}
            />
          </TouchableOpacity>
          <Text
            style={{
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 5,
              fontSize: normalize(14),
              color: 'white',
              flex: 1
            }}
            minimumFontScale={.3}
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            {this.state.data.username}
          </Text>

          <TouchableOpacity style={{
            // marginRight: hp('4%'),
            // marginLeft: 0,

            width: hp('10%'),
            justifyContent: 'center',
            alignItems: 'center',
          }} onPress={() => { this.showNotificationScreen() }}>
            {/* <BadgedIcon
                color="#fff"
                type="font-awesome"
                onPress={() => this.showNotificationScreen()}
                name="bell-o" /> */}
            {/* <FontAwesome
                size={hp('3%')}
                onPress={() => this.showNotificationScreen()}
                name="bell-o"
                color="#fff"
              />  */}
            {notifications.count && notifications.count > 0 ?
              <BadgedIcon
                size={hp('3%')}
                color="#fff"
                type="font-awesome"
                onPress={() => this.showNotificationScreen()}
                name="bell-o" />
              :
              <FontAwesome
                size={hp('3%')}
                onPress={() => this.showNotificationScreen()}
                name="bell-o"
                color="#fff"
              />
            }
            {/* <BadgedIcon
              color="#fff"
              type="font-awesome"
              onPress={() => this.showNotificationScreen()}
              name="bell-o" /> */}
          </TouchableOpacity>
        </View>

        {/* //Second half */}
        {this.profileViewAfterLoading(this.state)}

        {/* //Third half */}
        <View
          style={{
            flex: 1,
            width: '100%',
            backgroundColor: 'white',
            borderTopColor: 'grey',
            // height: hp('50%'),
            flexDirection: 'column'
          }}>

          {this.state.landingTopSix ?
            <Text style={styles.landingTopSixHeader}
              duration={3000}
              loop
              bounce
              repeatSpacer={50}
              marqueeDelay={1000}> {this.state.landingTopSix.extraImageFile1} </Text> :
            null
          }
          <View style={{ position: 'absolute', width: 50, height: 40, top: 0, right: 0 }}>
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
              this.setState({ landingTopSix: null });
              // this.tick();
              this.serverHitForFourthResponse();
            }
            }>
              <Image source={require('../../assets/Home_1_2/refresh.png')} />
            </TouchableOpacity>
          </View>

          <ScrollView
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              flex: 1,
              width: '100%',
              backgroundColor: 'white',
              borderTopColor: 'grey',
              height: hp('25%'),
              flexDirection: 'row'
            }}
            ref={ref => {
              this.scroll = ref;
            }}
          >
            {this.state.landingTopSix ?
              (<View style={{ flexDirection: 'row' }}>
                <View style={{ width: wd, flex: 1, padding: normalize(8) }}>
                  <TopSix
                    source={resourceImageData_A}

                    logo={esourceCategoryLogoData_A}
                    logoName={resourceName_A}

                    logoCatName={resourceCategoryName_A}

                    resourceGpr={resourceGPR_A_1}
                    renderButton={this.renderSurveyButton}
                  />
                </View>
                <View style={{ width: wd, flex: 1, padding: normalize(8) }}>
                  <TopSix_2
                    source={resourceImageData_A}

                    logo={esourceCategoryLogoData_A}
                    logoName={resourceName_A}

                    logoCatName={resourceCategoryName_A}

                    resourceGpr={resourceGPR_A_1}
                    renderButton={this.renderSurveyButton}
                  />
                </View>
              </View>
              ) :
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: wd }}>
                <Spinner />
              </View>
            }

          </ScrollView>
          <View style={styles.buttonContainer}>
            {this.renderSurveyButton()}
          </View>
          {this.state.landingTopSix ?
            <Text style={styles.landingTopSixHeader}> {this.state.landingTopSix.areaTopSixResources2.extraImageFile1} </Text> :
            null
          }
          <ScrollView
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              flex: 1,
              width: '100%',
              backgroundColor: 'white',
              borderTopColor: 'grey',
              height: hp('25%'),
              flexDirection: 'row'
            }}
            ref={ref => {
              this.scroll = ref;
            }}
          >
            {this.state.landingTopSix ?
              (<View style={{ flexDirection: 'row' }}>
                <View style={{ width: wd, flex: 1, padding: normalize(8) }}>
                  <TopSix
                    source={resourceImageData_A_2}

                    logo={esourceCategoryLogoData_A_2}

                    logoName={resourceName_A_2}
                    logoCatName={resourceCategoryName_A_2}

                    resourceGpr={resourceGPR_A_2}
                    renderButton={this.renderSurveyButton}
                  />
                </View>
                <View style={{ width: wd, flex: 1, padding: normalize(8) }}>
                  <TopSix_2
                    source={resourceImageData_A_2}

                    logo={esourceCategoryLogoData_A_2}

                    logoName={resourceName_A_2}
                    logoCatName={resourceCategoryName_A_2}

                    resourceGpr={resourceGPR_A_2}
                    renderButton={this.renderSurveyButton}
                  />
                </View>

              </View>
              ) :
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: wd }}>
                <Spinner />
              </View>
            }

          </ScrollView>
        </View>

        {/* //Forth half */}
        <View style={styles.bottomContainer}>

          <MenuButtons
            onPress={this.toTrendScreen}
            info={menuName ? menuName[0] : null}
            source={menuImageName[0]}
          />

          <View style={styles.seperator} />

          <MenuButtons
            onPress={() => this.toQuesScreen(null, null)}
            // info={menuName[1]}
            info={menuName ? menuName[1] : null}
            source={menuImageName[1]}
          />

          <View style={styles.seperator} />

          <MenuButtons
            onPress={this.toReportScreen}
            // info={menuName[2]}
            info={menuName ? menuName[2] : null}
            source={menuImageName[2]}
          />


        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  seperator: {
    width: 1,
    backgroundColor: 'white',
  },
  bottomContainer: {
    // height: normalize(60),
    flexDirection: 'row',
    height: hp('9%'),
  },

  profileContainer: {
    alignItems: 'center',
    paddingTop: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    aspectRatio: Platform.isPad ? 2.1 : 1.6
    // height: hp('24%'),
    // flex: 1,
  },

  buttonContainer: {
    marginHorizontal: hp('2%'),
    marginVertical: hp('1%')
  },

  landingTopSixHeader: {
    textAlign: 'center',
    fontSize: hp('1.5%'),
    fontWeight: '700',
    marginVertical: hp('1.8%')
  }
});

const stylesTopView = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#a01414',
    width: '100%',
    flexDirection: 'row',

    justifyContent: 'space-between',
    height: hp('8%'),
    display: 'flex'
  },
});
