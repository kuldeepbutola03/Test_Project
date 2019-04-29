import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import Spinner from '../../components/UI/Spinner/Spinner';
import CustomButton from '../../components/UI/ButtonMod/CustomButtom';
import { PropTypes } from 'prop-types';
import TrendProfile from '../../components/UI/TrendProfile/TrendProfile';
import { TREND_, TREND_PDM, TREND_CDM, TREND_IMAGE, GET_USER_NOTIFICATIONS, UPDATE_USER_NOTIFICATIONS } from '../../../Apis';
import { authHeaders, getUserID, APP_GLOBAL_COLOR, getUserData, showAdsBanner } from '../../../Constant';
import axios from 'axios';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { withBadge, Icon } from 'react-native-elements';
import _ from 'lodash';
import { normalize } from '../../../Constant';
import { sliderWidth, itemWidth } from './SliderEntry.style.js';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from 'moment';
import Permissions from 'react-native-permissions';

import firebase from 'react-native-firebase';
import KochavaTracker from 'react-native-kochava-tracker';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class TrendScreen extends Component {
  locationLatLong = null;
  user_Id = 1;

  state = {
    trendImages: null,
    imageList: [],
    activeSlide: 0,
    loading: true,
    data: this.props.data,
    notifications: this.props.notifications
    // refreshUI : this.props.refreshUI
  }

  componentDidMount() {
    // this.getDataFromServer(true)
    firebase.analytics().setCurrentScreen("Screen", "Trends_Screen");
    //firebase.analytics().logEvent("Trends_Screen");
    firebase.analytics().setUserProperty("Screen", "Trends_Screen");
    firebase.analytics().logEvent("Content", { "Screen": "Trends_Screen" });

    var eventMapObject = {};
    eventMapObject["screen_name"] = "Trends_Screen";
    KochavaTracker.sendEventMapObject(KochavaTracker.EVENT_TYPE_LEVEL_COMPLETE_STRING_KEY, eventMapObject);


    getUserID().then((userId) => {
      this.user_Id = userId;
      // this.getLocation()
      this.getDataFromServer(true);
      // this.getNotifications()

    })
  }

  static propTypes = {
    componentId: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  refreshUI = (data) => {
    // that = this;
    // getUserData().then((data) => {


    // setTimeout(()=> {
    this.props.refreshUI(data);
    // },300);


    // if (data.userLanguage === 'hi') {
    //   // let menu = ['रुझान', 'सर्वे', 'अखाड़ा']
    //   this.setState({ data: data });
    //   return;
    // }

    // let menu = ['Trends', 'Survey', 'Arena']
    this.setState({ data: data });


    // })
  }

  gotoProfile = () => {
    let menuName = this.props.menuName;
    Navigation.push(this.props.componentId, {
      component: {
        name: 'Profile',
        passProps: {
          image: this.props.data.image,
          firstName: this.props.data.firstName,
          lastName: this.props.data.lastName,
          // email: this.props.email ? this.props.email : "",
          username: this.props.data.username,
          selectedAgeGroupCode: this.props.data.selectedAgeGroupCode,
          gender: this.props.data.gender,
          userId: this.props.data.userId,
          description: this.props.data.description,
          userDesignation: this.props.data.userDesignation,
          userLanguage: this.props.data.userLanguage,

          refreshUI: this.refreshUI,

          languageCode: this.props.languageCode,

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
        },
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

  homeButtonTapped = () => {
    Navigation.pop(this.props.componentId);
  };

  handlePress = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'TrendDetailScreen',
        options: {
          topBar: {
            visible: false,
            animate: false,
            drawBehind: true,
          },
        },
      },
    });
  };

  requestCheckPremission = () => {
    Permissions.check('location').then(response => {
      if (response === 'denied' || response === 'undetermined') {
        this._requestPermission();
      } else if (response === 'authorized') {
        this.getLocation();
      } else {
        this.getDataFromServer(true);
      }
    })
  }

  _requestPermission = () => {
    Permissions.request('location').then(response => {
      this.setState({ location: response })
      // alert(response);
      // this.getLocation()
      if (response === 'denied' || response === 'undetermined') {
        this.getDataFromServer(true);
      } else if (response === 'authorized') {
        this.getLocation();
      } else {
        this.getDataFromServer(true);
      }
    })
  }

  getLocation() {
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

        this.locationLatLong = latlong;
        this.getDataFromServer(true)
      },
      (error) => {
        // alert(error.message)
        this.getDataFromServer(true)
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
  }

  getDataFromServer = () => {
    axios.post(TREND_IMAGE, {
      userId: this.user_Id
    })
      .then(response => {

        // alert(JSON.stringify(response));
        let responseData = response.data;

        this.setState({ trendImages: responseData });

        let mappedState = _.map(this.state.trendImages.imagesMap, (val, index) => {
          return { [index]: val }
        })

        this.setState({ imageList: mappedState, loading: false })

      })
      .catch(error => {
        console.log(error)
        this.setState({ loading: false })
      })
  }

  homeButtonTapped = () => {
    Navigation.pop(this.props.componentId);
  };

  renderComponent = () => {
    const { loading } = this.state;

    if (loading) {
      return (
        <View style={{ flex: 12, justifyContent: 'center', alignItems: 'center' }}>
          <Spinner />

        </View>
      )
    } else if (!loading) {
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
            onSnapToItem={(index) => this.setState({ activeSlide: index })}
          />
          {this.showBanner()}
          {this.pagination}
        </View>
      )
    }
  }

  showBanner = () => {
    return showAdsBanner();

    
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
          justifyContent: 'space-around'
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
    let data = "trendsImage" + (index + 1) + ".jpg";
    return (
      <View key={index + "abc"} style={styles.imageContainer}>
        {data === null ?
          <Image
            resizeMode="stretch"
            resizeMethod="scale"
            style={{ height: SCREEN_HEIGHT / 1.5, width: '100%', marginTop: normalize(30), borderRadius: 10 }}
            source={require('../../assets/info.jpg')}
          /> :
          <Image
            resizeMode="stretch"
            resizeMethod="scale"
            style={{ height: SCREEN_HEIGHT / 1.5, width: '100%', marginTop: normalize(30), borderRadius: 10 }}
            source={{ uri: `data:image/jpg;base64,${item[data]}` }}
          />
        }
      </View>
    );
  }

  getNotifications = () => {
    console.log(this.props.user_id)
    axios.post(GET_USER_NOTIFICATIONS, {
      userId: this.props.user_id
    }).then((response) => {
      let responseData = response.data;
      console.log(responseData)
      this.setState({
        notifications: responseData
      })
    }).catch(error => {
      console.log(error)
    })
  }

  readNotification = (index, notifications, screen) => {
    const { count } = this.state.notifications;
    let counted;
    let newNotifications = notifications;

    if (count > 0) {
      counted = count - 1;
    } else {
      counted = count;
    }

    newNotifications.notificationList[index].read = true;
    newNotifications.count = counted;

    let updatedNotification = Object.assign(newNotifications, {});
    console.log(updatedNotification)
    this.setState({
      notificationsnotification: updatedNotification
    })

    if (screen === 'survey' || screen === 'Survey') {
      let obj = updatedNotification.notificationList[index]
      let surveyThreadID = obj["surveyThreadId"];
      this.toQuesScreen(surveyThreadID)
    } else if (screen === 'trends' || screen === 'Survey') {
      // this.toTrendScreen()
    } else if (screen === 'timeline' || screen === 'Survey') {
      // this.toReportScreen()
    }
  }

  updateNotifications = (notificationLogId) => {
    console.log('called')
    axios.post(UPDATE_USER_NOTIFICATIONS, {
      notificationLogId: notificationLogId.toString(),
      read: "Y",
      userId: this.props.user_id
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
    const { menuName } = this.props;
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
              // text: 'Hello',
              fontSize: hp('2.5%'),
              color: '#fff',
            },
            backButton: {
              color: '#fff'
            }
          },
        },
        passProps: {
          // notifications: this.state.notifications,
          // readNotification: this.readNotification,
          // updateNotifications: this.updateNotifications,

          notifications: this.state.notifications,
          readNotification: this.props.readNotification,
          updateNotifications: this.props.updateNotifications,
        }

      },
    });
  }

  toQuesScreen = (surveyThreadID) => {
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
          user_id: this.props.user_id,
          lat_lon: this.props.lat_lon,
          userLanguage: this.props.userLanguage,
          surveyThreadID: surveyThreadID
        }
      },
    });
  };

  getLanguageCode(language) {
    if (language === 'hi') {
      let menu = "सर्वे"
      return menu;

    }

    return "SURVEY"

  }

  render() {
    console.log(this.state)
    console.log(this.props)
    const { notifications } = this.state;
    const BadgedIcon = withBadge(notifications.count)(Icon);




    return (
      <SafeAreaView
        forceInset={{ bottom: 'always' }}
        style={styles.safeViewContainer}>
        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'rgba(255,255,255,1)' }}>

          <View style={{ width: 60, backgroundColor: APP_GLOBAL_COLOR }}>
            <CustomButton
              style={{
                flexDirection: 'row',
                flex: 1,
              }}
              source={require('../../assets/homez.png')}
              onPress={this.homeButtonTapped}
            />
          </View>
          <TouchableOpacity style={{ flex: 5 }} onPress={this.gotoProfile}>
            <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,1)', flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={{
                  backgroundColor: APP_GLOBAL_COLOR,
                  marginLeft: normalize(10),
                  width: normalize(30),
                  height: normalize(30),
                  marginTop: normalize(5),
                  marginBottom: normalize(5),
                  borderRadius: normalize(30) / 2,
                }}
                source={this.state.data.image ? { uri: "data:image/png;base64," + this.state.data.image } : require('../../assets/UserSmall.png')}
              />

              <Text
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 5,
                  fontSize: normalize(14),
                  color: '#000',
                  flex: 1
                }}
                minimumFontScale={.03}
                adjustsFontSizeToFit
                numberOfLines={1}
              >
                {this.state.data.username}
              </Text>
            </View>
          </TouchableOpacity>
          {/* <View
            style={{
              // flex: 5,
              width: 100,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              // marginRight: hp('4%'),
              backgroundColor: 'rgba(255,255,255,1)',
            }}> */}
          <TouchableOpacity style={{
            // flex: 5,
            width: hp('10%'),
            justifyContent: 'center',
            alignItems: 'center',
            // flexDirection: 'row',
            // marginRight: hp('4%'),
            backgroundColor: 'rgba(255,255,255,1)',
          }}
            // style={{  justifyContent: 'center', alignItems: 'center' }}
            onPress={() => this.showNotificationScreen()}>
            {/* <View> */}
            {notifications.count && notifications.count > 0 ?
              <BadgedIcon
                size={hp('3%')}
                color={APP_GLOBAL_COLOR}
                type="font-awesome"
                // onPress={() => this.showNotificationScreen()}
                name="bell-o" />
              :
              <FontAwesome
                size={hp('3%')}
                // onPress={() => this.showNotificationScreen()}
                name="bell-o"
                color={APP_GLOBAL_COLOR}
              />
            }
            {/* </View> */}
            {/* {notifications.count <= 0 ?
                <FontAwesome
                  size={hp('3%')}
                  // onPress={() => this.showNotificationScreen()}
                  name="bell-o"
                  color={APP_GLOBAL_COLOR}
                /> :
                <BadgedIcon
                  color={APP_GLOBAL_COLOR}
                  type="font-awesome"
                  // onPress={() => this.showNotificationScreen()}
                  name="bell-o" />
              } */}
          </TouchableOpacity>
          {/* </View> */}
        </View>
        {this.renderComponent()}


      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  safeViewContainer: {
    flex: 1,
    backgroundColor: 'rgba(210,210,208,1)'
  },

  imageContainer: {
    flex: 1,
  },

  carouselContainer: {
    flex: 12,
    margin: 0,
  }

})

export default TrendScreen;

