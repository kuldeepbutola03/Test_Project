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
  ActionSheetIOS,
  Platform
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import Spinner from '../../components/UI/Spinner/Spinner';
import CustomButton from '../../components/UI/ButtonMod/CustomButtom';
import { PropTypes } from 'prop-types';
import TrendProfile from '../../components/UI/TrendProfile/TrendProfile';
import { TREND_, TREND_PDM, TREND_CDM, TREND_IMAGE, GET_USER_NOTIFICATIONS, UPDATE_USER_NOTIFICATIONS, LANDING_RESOURCES } from '../../../Apis';
import { authHeaders, getUserID, APP_GLOBAL_COLOR, getUserData, showAdsBanner, SHARE_LINK, showAdsFullScreen, PROPS_ARRAY_NOTIFY_SCREEN, PROPS_ARRAY_FOR_LOCATION, refreshUserScreen, getUserHomeScreen, } from '../../../Constant';
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
import Share, { ShareSheet, Button } from 'react-native-share';
import firebase from 'react-native-firebase';
import KochavaTracker from 'react-native-kochava-tracker';
import { NavigationBarDefault } from '../../components/UI/NavigationBarDefault/NavigationBarDefault';
import TabBarNavigation from '../../components/UI/TabBarNavigation/TabBarNavigation';
import ResultExitScreen from '../HomeScreen/ResultExitScreen';
import { NAVIGATION_ROOT, setectTabBarNaviagtion } from '../../AppNavigation';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class TrendScreen extends Component {

  locationLatLong = null;
  user_Id = 1;
  shareOptions = null;

  state = {
    trendImages: null,
    imageList: [],
    activeSlide: 0,
    loading: true,
    data: this.props.data,
    notifications: this.props.notifications,
    visible: false,
    selectedThemeColor: this.props.color,
    dict: null,
    selectedIndexTab : this.props.selectedIndexTab
    // refreshUI : this.props.refreshUI
  }
  componentWillUnmount() {

    // PROPS_ARRAY_NOTIFICATION.push(this.refreshNotificationData);

    var index = PROPS_ARRAY_NOTIFY_SCREEN.indexOf(this.refreshUserScreenUI);
    if (index > -1) {
      PROPS_ARRAY_NOTIFY_SCREEN.splice(index, 1);
    }



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



    // getUserID().then((userId) => {
    //   this.user_Id = userId;
    //   // this.getLocation()
    //   this.getDataFromServer(true);
    //   // this.getNotifications()
    // })

    this.user_Id = this.props.user_id;
    // this.getLocation()
    if (this.props.notFirstScreen) {
      this.getDataFromServer();
    }


    PROPS_ARRAY_NOTIFY_SCREEN.push(this.refreshUserScreenUI);
  }
  refreshUserScreenUI = (notifications, screen, purpose) => {
    //
    if (screen === 3 || screen < 0) {
      if (purpose === 0) {
        this.setState({ data: notifications })
      } else if (purpose === 1) {
        this.setState({ selectedThemeColor: notifications })
      } else if (purpose === 2) {
        this.setState({ notifications: notifications });
      } else if (purpose === 4) {
        if (!this.props.notFirstScreen) {
          this.getFirstAPIdataFromServer()
        }
      } else if (purpose === 6) {
        this.setState({ selectedIndexTab: notifications });
      }
    }
  }


  static propTypes = {
    componentId: PropTypes.string,
  };

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

  getFirstAPIdataFromServer = () => {

    this.setState({ dict: { isLoading: true } })
    var targetLocation = PROPS_ARRAY_FOR_LOCATION.slice(-1).pop()
    let body = null;
    if (targetLocation) {
      let latlong = targetLocation.location.latitude.toString() + "," + targetLocation.location.longitude.toString()

      body = JSON.stringify({
        userId: this.user_Id,
        latLngSeparatedByComma: latlong,
        // latLngSeparatedByComma:"28.722,77.125"
      });
    } else {
      body = JSON.stringify({
        userId: this.user_Id,

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

        // alert("responseJson");
        // slideContent: [
        //   [require('../../assets/PollResults/poll_exit.jpg'), require('../../assets/PollResults/poll_result.jpg')],
        //   [],
        //   [],
        //   [require('../../assets/PollResults/poll_exit_1.jpg'), require('../../assets/PollResults/poll_result_1.jpg')],
        // ],
        let arr = [
          [require('../../assets/PollResults/poll_exit.jpg'), require('../../assets/PollResults/poll_result.jpg')],
          [],
          [],
          [require('../../assets/PollResults/poll_exit_1.jpg'), require('../../assets/PollResults/poll_result_1.jpg')],
        ];
        arr[1] = responseJson.resCatNationalGroupList;
        arr[2] = responseJson.resCatNationalList;
        // arr[3] = responseJson.resCatNationalList;

        const check = responseJson && responseJson.exitOrResultDay ? responseJson.exitOrResultDay : null;
        if (check === 'e' || check === 'r') {
          if (responseJson.newSlider) {
            arr[4] = responseJson.newSlider;
          }
          let objetc = Object.assign([], responseJson.resCatNationalList ? responseJson.resCatNationalList : []);


          var targetLocation = PROPS_ARRAY_FOR_LOCATION.slice(-1).pop()
          let body = null;
          let latlong = null;
          if (targetLocation) {
            latlong = targetLocation.location.latitude.toString() + "," + targetLocation.location.longitude.toString()
          }

          this.setState({ loading: false, dict: { lat_lon: latlong, isLoading: false, firstAPIresponse: responseJson, currLandPageSurvey: responseJson.currLandPageSurvey, slideContent: arr, topSixContent: objetc.splice(0, 6) } });

          if (this.state.selectedIndexTab != 3) {
            setectTabBarNaviagtion(3)
            refreshUserScreen(3 , -1 , 6)
          }
          
          // this.refreshUserScreenUI(3 , -1 , 6)
          // selectedIndexTab : 3

        } else {
          this.setState({ dict: null})
          this.getDataFromServer();
          getUserHomeScreen().then((data) => {
            if (data) {
              let d = parseInt(data);
              setectTabBarNaviagtion(d)
              refreshUserScreen(d , -1 , 6)
            }
          })
          
        }

      })
      .catch((error) => {
        console.error(error);
      });
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

  renderComponent = () => {
    const { loading, dict } = this.state;

    if (loading) {
      return (
        <View style={{ flex: 12, justifyContent: 'center', alignItems: 'center' }}>
          <Spinner />

        </View>
      )
    } else if (!loading) {

      if (dict) {
        return <ResultExitScreen {...dict} user_id={this.user_Id} serverHitForFirstApi={() => {

          this.getFirstAPIdataFromServer()
        }} />
      }

      return (
        <View style={styles.carouselContainer}>
          <Carousel
            layout={'default'}
            // layoutCardOffset={18}
            ref={(c) => { this._carousel = c; }}
            data={this.state.imageList}
            renderItem={this._renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            shouldOptimizeUpdates
            onSnapToItem={(index) => this.setState({ activeSlide: index })}
          >
            {/* {this.showBanner()} */}
            {/* <View style={{ height: 50 }}> */}

            {/* </View> */}
          </Carousel>
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

    // alert(activeSlide);
    if (activeSlide === 2 || activeSlide === 5 || activeSlide === 8) {
      showAdsFullScreen();
    }
    return (
      <Pagination
        dotsLength={imageList.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          backgroundColor: 'transparent',// APP_GLOBAL_COLOR,
          // backgroundColor: 'rgba(0, 0, 0, 0.75)',
          width: SCREEN_WIDTH,
          display: 'flex',
          flexDirection: 'row',
          // justifyContent: 'space-around'
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

  _renderItem = ({ item, index }) => {

    let data = "trendsImage" + (index + 1) + ".jpg";
    let image = "data:image/jpg;base64," + item[data];
    return (
      <View key={index + "abc"} style={styles.imageContainer}>
        {data === null ?
          <TouchableWithoutFeedback onPress={() => { this.showFullPic() }} onLongPress={() => { }} style={{}}>
            <Image
              resizeMode="stretch"
              resizeMethod="scale"
              style={{ height: SCREEN_HEIGHT / 1.5, width: '100%', marginTop: normalize(30), borderRadius: 10 }}
              source={require('../../assets/info.jpg')}
            /> </TouchableWithoutFeedback>
          :
          <TouchableWithoutFeedback onPress={() => this.showFullPic(image)} onLongPress={() => { }} style={{}}>
            <Image
              resizeMode="stretch"
              resizeMethod="scale"
              style={{ height: SCREEN_HEIGHT / 1.5, width: '100%', marginTop: normalize(30), borderRadius: 10 }}
              source={{ uri: `data:image/jpg;base64,${item[data]}` }}
            /></TouchableWithoutFeedback>
        }
      </View>
    );
  }

  showFullPic = (data) => {
    // console.log(data); 
    // alert(data)
    Navigation.push(this.props.componentId, {
      component: {
        name: 'FullPicture',
        passProps: {
          data: data
        },
        options: {
          topBar: {
            visible: true,
            background: {
              // color:'transparent',
              translucent: true
            }
            // drawBehind
            // drawBehind: true,
            // animate: false,
          },
        }
      }
    });
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
    // console.log(updatedNotification)
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

  getMessage = (data) => {
    if (data) {
      return (data.length > 100 ? data.substr(0, 100) + "..." : data) + '\n\nCheck it out on Raajneeti app'
    } else {
      return 'Check it out on Raajneeti app'
    }
  }

  longPressed = (data) => {
    // alert(data);
    dataTappedForMore = data;
    // alert(JSON.stringify(dataTappedForMore));

    shareOptions = {
      title: "Check out Raajneeti app",
      message: "asdadf",//this.getMessage(data.details),//((data.details ? data.details.length : '') > 100 ? data.details.substr(0,100) + '...' : data.details) + "\n\nCheck it out on Raajneeti app",
      subject: "Share Link",
      url: SHARE_LINK + "?raajneetiId=" // Platform.OS ===  'ios' ? 'https://itunes.apple.com/us/app/raajneeti/id1449128685?mt=8' : 'https://play.google.com/store/apps/details?id=com.aureans.raajneeti'
    };

    // if (data.picture && data.picture.uri) {
    shareOptions["url"] = data;
    shareOptions["message"] = shareOptions.message + "\n" + SHARE_LINK + "?raajneetiId=";
    // }
    if (Platform.OS === "android") {
      this.setState({ visible: true });
    } else {
      this.showActionSheetForIOS();
    }
  }

  showActionSheetForIOS() {

    var BUTTONS = [
      'Twitter',
      'Facebook',
      'WhatsApp',
      'GooglePlus',
      'Email',
      'More',
      'Cancel',
    ];

    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: 6,
      // destructiveButtonIndex: 6
    },
      (buttonIndex) => {

        switch (buttonIndex) {
          case 0:
            console.log("Option 1");
            setTimeout(() => {
              Share.shareSingle(Object.assign(shareOptions, {
                "social": "twitter"
              }));
            }, 300);
            break
          case 1:
            console.log("Option 2");
            setTimeout(() => {
              Share.shareSingle(Object.assign(shareOptions, {
                "social": "facebook"
              }));
            }, 300);
            break
          case 2:
            console.log("Option 3");
            setTimeout(() => {
              Share.shareSingle(Object.assign(shareOptions, {
                "social": "whatsapp"
              }));
            }, 300);
            break
          case 3:
            console.log("Option 4");
            setTimeout(() => {
              Share.shareSingle(Object.assign(shareOptions, {
                "social": "googleplus"
              }));
            }, 300);
            break
          case 4:
            console.log("Option 5");
            setTimeout(() => {
              Share.shareSingle(Object.assign(shareOptions, {
                "social": "email"
              }));
            }, 300);
            break
          case 5:
            console.log("Option 6");
            setTimeout(() => {
              Share.open(shareOptions);

            }, 300);
            break
          case 6:
            console.log("Option 7");
            break
        }
      });
  }

  onCancel() {
    console.log("CANCEL")
    this.setState({ visible: false });
  }

  render() {
    // console.log(this.state)
    // console.log(this.props)
    const { notifications } = this.state;
    // const BadgedIcon = withBadge(notifications.count)(Icon);


    return (
      <SafeAreaView
        forceInset={{ bottom: 'always' }}
        style={styles.safeViewContainer}>
        <NavigationBarDefault
          imageSource={this.state.data.image ? { uri: "data:image/png;base64," + this.state.data.image } : require('../../assets/UserSmall.png')}
          bgColor={this.state.selectedThemeColor}

          notifications={notifications}
          data={this.props.data}
          showBackButton={this.props.notFirstScreen}

          
          // this.setState({selectedIndexTab : 3,
        >{this.state.data.username}</NavigationBarDefault>
        {/* <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'rgba(255,255,255,1)' }}>
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
          
          </TouchableOpacity>

        </View> */}
        {this.renderComponent()}

        {!this.props.notFirstScreen && <TabBarNavigation color={this.state.selectedThemeColor} selectedIndex={3} selectedIndexTab= {this.state.selectedIndexTab}/>}

        <ShareSheet visible={this.state.visible} onCancel={() => { this.onCancel() }}>

          <Button iconSrc={{ uri: TWITTER_ICON }}
            onPress={() => {
              this.onCancel();
              setTimeout(() => {
                Share.shareSingle(Object.assign(shareOptions, {
                  "social": "twitter"
                }));
              }, 300);
            }}>  Twitter  </Button>

          <Button iconSrc={{ uri: FACEBOOK_ICON }}
            onPress={() => {
              this.onCancel();
              setTimeout(() => {
                Share.shareSingle(Object.assign(shareOptions, {
                  "social": "facebook"
                }));
              }, 300);
            }}>  Facebook  </Button>

          <Button iconSrc={{ uri: WHATSAPP_ICON }}
            onPress={() => {
              this.onCancel();
              setTimeout(() => {
                Share.shareSingle(Object.assign(shareOptions, {
                  "social": "whatsapp"
                }));
              }, 300);
            }}>  Whatsapp  </Button>

          <Button iconSrc={{ uri: GOOGLE_PLUS_ICON }}
            onPress={() => {
              this.onCancel();
              setTimeout(() => {
                Share.shareSingle(Object.assign(shareOptions, {
                  "social": "googleplus"
                }));
              }, 300);
            }}>  Google +  </Button>

          <Button iconSrc={{ uri: EMAIL_ICON }}
            onPress={() => {
              this.onCancel();
              setTimeout(() => {
                Share.shareSingle(Object.assign(shareOptions, {
                  "social": "email"
                }));
              }, 300);
            }}>  Email  </Button>

        </ShareSheet>

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
    flex: 1,
    margin: 0,
  }
})

export default TrendScreen;

// /  twitter icon
const TWITTER_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAABvFBMVEUAAAAA//8AnuwAnOsAneoAm+oAm+oAm+oAm+oAm+kAnuwAmf8An+0AqtUAku0AnesAm+oAm+oAnesAqv8An+oAnuoAneoAnOkAmOoAm+oAm+oAn98AnOoAm+oAm+oAmuoAm+oAmekAnOsAm+sAmeYAnusAm+oAnOoAme0AnOoAnesAp+0Av/8Am+oAm+sAmuoAn+oAm+oAnOoAgP8Am+sAm+oAmuoAm+oAmusAmucAnOwAm+oAmusAm+oAm+oAm+kAmusAougAnOsAmukAn+wAm+sAnesAmeoAnekAmewAm+oAnOkAl+cAm+oAm+oAmukAn+sAmukAn+0Am+oAmOoAmesAm+oAm+oAm+kAme4AmesAm+oAjuMAmusAmuwAm+kAm+oAmuoAsesAm+0Am+oAneoAm+wAmusAm+oAm+oAm+gAnewAm+oAle0Am+oAm+oAmeYAmeoAmukAoOcAmuoAm+oAm+wAmuoAneoAnOkAgP8Am+oAm+oAn+8An+wAmusAnuwAs+YAmegAm+oAm+oAm+oAmuwAm+oAm+kAnesAmuoAmukAm+sAnukAnusAm+oAmuoAnOsAmukAqv9m+G5fAAAAlHRSTlMAAUSj3/v625IuNwVVBg6Z//J1Axhft5ol9ZEIrP7P8eIjZJcKdOU+RoO0HQTjtblK3VUCM/dg/a8rXesm9vSkTAtnaJ/gom5GKGNdINz4U1hRRdc+gPDm+R5L0wnQnUXzVg04uoVSW6HuIZGFHd7WFDxHK7P8eIbFsQRhrhBQtJAKN0prnKLvjBowjn8igenQfkQGdD8A7wAAAXRJREFUSMdjYBgFo2AUDCXAyMTMwsrGzsEJ5nBx41HKw4smwMfPKgAGgkLCIqJi4nj0SkhKoRotLSMAA7Jy8gIKing0KwkIKKsgC6gKIAM1dREN3Jo1gSq0tBF8HV1kvax6+moG+DULGBoZw/gmAqjA1Ay/s4HA3MISyrdC1WtthC9ebGwhquzsHRxBfCdUzc74Y9UFrtDVzd3D0wtVszd+zT6+KKr9UDX749UbEBgULIAbhODVHCoQFo5bb0QkXs1RAvhAtDFezTGx+DTHEchD8Ql4NCcSyoGJYTj1siQRzL/JKeY4NKcSzvxp6RmSWPVmZhHWnI3L1TlEFDu5edj15hcQU2gVqmHTa1pEXJFXXFKKqbmM2ALTuLC8Ak1vZRXRxa1xtS6q3ppaYrXG1NWjai1taCRCG6dJU3NLqy+ak10DGImx07LNFCOk2js6iXVyVzcLai7s6SWlbnIs6rOIbi8ViOifIDNx0uTRynoUjIIRAgALIFStaR5YjgAAAABJRU5ErkJggg==";

//  facebook icon
const FACEBOOK_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAYFBMVEUAAAAAQIAAWpwAX5kAX5gAX5gAX5gAXJwAXpgAWZ8AX5gAXaIAX5gAXpkAVaoAX5gAXJsAX5gAX5gAYJkAYJkAXpoAX5gAX5gAX5kAXpcAX5kAX5gAX5gAX5YAXpoAYJijtTrqAAAAIHRSTlMABFis4vv/JL0o4QvSegbnQPx8UHWwj4OUgo7Px061qCrcMv8AAAB0SURBVEjH7dK3DoAwDEVRqum9BwL//5dIscQEEjFiCPhubziTbVkc98dsx/V8UGnbIIQjXRvFQMZJCnScAR3nxQNcIqrqRqWHW8Qd6cY94oGER8STMVioZsQLLnEXw1mMr5OqFdGGS378wxgzZvwO5jiz2wFnjxABOufdfQAAAABJRU5ErkJggg==";

//  whatsapp icon
const WHATSAPP_ICON = "data:image/png;base64,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";

//  gplus icon
const GOOGLE_PLUS_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAACQ1BMVEUAAAD/RDP/STX9Sjb+STT+SjX+SjX+SjX+STT/SzP/Sjb/SzX/VVX/SDb+SDP+SjX9RzT9STT9SjT+STX+SjT9SjT/SST/TTP+SjX+SjX/RDP/RzP+SjX+SjX/STf9SDX/SjX/TU3+Sjb+SjX/Qyz/Szb+SjX/TTP+SjX9STX+SjP/TTX9Szb+Szb/YCD/SzX/SzX+Sjb+STX/TTX/SzX/Szb/TDT+SjX9SzX/STf+TDX/SjT9SzX9Szb+SjX/SjX/SzX/STT9SjT9TDT+SDT/VQD9STX/STX9SjX+SjX9STX+SzT/UDD9Sjb+SjX9RzT/QED+SjT+SjX/XS7+SjX/Ui7/RC3+SjX/TTz/RzP+SjX/TTP/STf+SjX/STT/RjP+Sjb/SzX/Szz/Rjr/RzL+RzP+SjX/Szf/SjX9Sjb+SjX+Sjb+SjX+SjX+SjX/STf/SjT/SjT9SjX9SzT+RzT+STT/STT+SjX/STP/Tjf+SjX/Szb/SjX/STX9SjX/SjT/AAD/SjH/STb+SzX+Sjb+SjT9SDT+Sjb+SjX9STf9STT/SDX/TDf+STb/TjT/TjH+SjX+SDT/Sjb9SzX9RzX+TDT/TUD/STX+SjX+STX/VTn/QjH/SjX+SjX/Ri7+Szb/TTP+SjX/SDX/STT9SjX+SjX/SDL/TjT9Sjb/RjL+SjX9SzX/QED/TDT+SjX+SjX9STX/RjX/VSv/Rzb/STX/ORz/UDD9SzX+Sjb/STT9SzP+SzX+SjX+SjX9Szb/Ti//ZjPPn7DtAAAAwXRSTlMAD1uiy+j5/8FBZHQDY9zvnYSc5dGhBwr+1S0Zqu44mz4KtNkXY7Yo8YLcfp3bCGZ+sLhWaks2z4wO6VOklrtWRFSXos4DoD+D/ZnoEKasjwS7+gvfHC3kHmjtMlTXYjfZXBEWa+/nQRiK5u7c8vVGRWepp6+5eulQF/dfSHSQdQEfdrzguZzm+4KSQyW1JxrAvCaCiLYUc8nGCR9h6gvzFM41MZHhYDGYTMejCEDi3osdBj1+CSCWyGyp1PC3hUEF/yhErwAAAjFJREFUSMft1tdfE0EQB/ADJD+JKAomHoqKxhJLFCnSpdgIxobYgqhYaJKIHVQUsSFiBSuCvWPv3T/N2ZPD3EucvVcyL3sz2W8+l73ZvShKKEIxcCIsPGJQpAV9MThK1KzAEAaNHjosZviI2DgBR9psVrvCx6Ni1fjRNI5JIDx2nF5m4ejxsCRqVxMmknZMksGTVUzpu5zqJD1NAodNB2boyUzCrlnK7CSKOUCyGJOC4BSan6onaWLN5irpCIwgOAMBt5eZRVk2H+fQx7n92TzK8pT8AopCwCbGgiB4Pk1fsFDPFlG2mL9gRTTdnahnxcASDx/nq6SX6tkyYLnEo1qxknBJ2t9kVSlcq2WaZM1a0qXrtOv18Jbp9Q3l5Rv/39ubHKQ3V2xRtm7bXlkluyGra2qJ76jzwb/TxH721O9K3U1fsMfsgbCXcLFZvI+wL8ok3i/6+ECDOdxYJ/TBQ9Kw+nDTkRyHtodKjjbLyGMtx304cTKi8NRpoVutfJp5xgtv21ntxGw/J7T3PNdeuAhcuqxn9o5W0p1Ma78CpF/9lzdfI3ydiStobrjhIL4BRN7k4WRa3i5D5RbQ3cPDMcDtO4ZKGXCXedtuQL1nqNwHHjDxQ/rNGYbKI/gfM/ETwv6ngafSM3RwH3O7eK86Wzz9L582PO9lN9iLl6KpXr2uf9P7tvHde4e75oNEZ3/85NQ2hKUyzg/1c57klur68vXbd9XtdP34+et36C9WKAZo/AEHHmXeIIIUCQAAAABJRU5ErkJggg==";

//  email icon
const EMAIL_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAABC1BMVEUAAAA/Pz8/Pz9AQEA/Pz8/Pz8+Pj4+Pj4/Pz8/Pz8/Pz8/Pz8+Pj4+Pj4/Pz8/Pz8/Pz9AQEA+Pj5AQEA/Pz87Ozs7Ozs/Pz8+Pj47OztAQEA/Pz89PT01NTVBQUFBQUE/Pz8/Pz8+Pj4/Pz9BQUE+Pj4/Pz8/Pz89PT0+Pj4/Pz9BQUFAQEA9PT09PT0/Pz87Ozs9PT05OTk/Pz8+Pj4/Pz9AQEA/Pz8/Pz8/Pz8/Pz+AgIA+Pj4/Pz8/Pz9AQEA/Pz8/Pz8/Pz8/Pz8+Pj4/Pz8/Pz8/Pz9AQEA+Pj4/Pz8+Pj4/Pz85OTk/Pz8/Pz8/Pz8/Pz88PDw9PT0/Pz88PDw8PDw+Pj45OTlktUJVAAAAWXRSTlMA/7N4w+lCWvSx8etGX/XlnmRO7+1KY/fjOGj44DU7UvndMec/VvLbLj7YKyiJdu9O7jZ6Um1w7DnzWQJz+tpE6uY9t8D9QehAOt7PVRt5q6duEVDwSEysSPRjqHMAAAEfSURBVEjH7ZTXUgIxGEa/TwURUFyKYgMURLCvbe2gYAV7ff8nMRksgEDiKl7lXOxM5p8zO3s2CWAwGAx/CjXontzT25Y+pezxtpv2+xTygJ+BYOvh4BBDwx1lKxxhNNZqNjLK+JjVWUYsykj4+2h8gpNTUMkIBuhPNE+SKU7PQC3D62E60ziYzXIuBx0Z+XRTc9F5fgF6MhKNzWXnRejKWGJdc9GZy8AP3kyurH52Ju01XTkjvnldNN+Qi03RecthfFtPlrXz8rmzi739Ax7mUCjy6FhH/vjPonmqVD6pdT718excLX/tsItLeRAqtc7VLIsFlVy/t6+ub27v7t8XD490niy3p+rZpv3i+jy/Or+5SUrdvcNcywaDwfD/vAF2TBl+G6XvQwAAAABJRU5ErkJggg==";

//  pinterest icon
const PINTEREST_ICON = "data:image/png;base64,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"

//  clipboard icon
const CLIPBOARD_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAB5lBMVEUAAAA8PDw+Pj4/Pz8/Pz8/Pz8/Pz8+Pj47OzsAAAA5OTk+Pj4/Pz8/Pz8+Pj49PT0/Pz8/Pz85OTlAQEA/Pz87Ozs+Pj4+Pj4/Pz8/Pz8/Pz8zMzNBQUE/Pz8/Pz8/Pz9AQEA7Ozs9PT0/Pz9AQEA+Pj4/Pz8+Pj4AAABAQEA/Pz87OztBQUE/Pz8+Pj4zMzNDQ0M/Pz89PT03Nzc/Pz8/Pz8/Pz8/Pz88PDw8PDwAAABCQkI7Ozs9PT0/Pz9AQEA/Pz8uLi4rKytAQEA/Pz89PT0+Pj4/Pz8/Pz8/Pz9CQkJAQEA/Pz9CQkI/Pz8/Pz8/Pz8+Pj49PT0/Pz8yMjI/Pz88PDw/Pz9BQUE8PDw/Pz9AQEA/Pz8/Pz8/Pz89PT0/Pz9CQkI9PT1EREQ9PT08PDw4ODg+Pj6AgIA/Pz8/Pz82NjZVVVU7Ozs/Pz81NTVAQEA/Pz8+Pj49PT1BQUE/Pz8/Pz8/Pz8vLy8/Pz87OztAQEA3Nzc9PT0+Pj4/Pz89PT0/Pz8/Pz89PT1AQEA9PT04ODgzMzM/Pz8/Pz9AQEA/Pz9AQEA/Pz83Nzc9PT0/Pz9AQEA/Pz8+Pj4+Pj5AQEA/Pz89PT1FRUU5OTk/Pz8/Pz8+Pj47Ozs/Pz89PT08PDw+Pj6z1Mg0AAAAonRSTlMAEXTG8/7pslICKMn//J0u2LcSLNu9Y0523KoKL9b7hggauZsEOuJ/ARS7VifkiwUX0bEq1f1p6KGQAz4NpnpY8AsGtMIyb46NbSOMcRuh+fGTFc0z1yKFKy/dpKff1CqKMoYPp+lAgAKd6kIDhdorJJExNjflktMr3nkQDoXbvaCe2d2EijIUn3JsbjDDF1jjOOdWvIDhmhoJfWrAK7bYnMgx8fGWAAACNUlEQVRIx+2W6V8SURSGBxEVeydMbVER1DCwRNTCEhMNsywqExXcUrNVU9NK2wy1fd9sMyvrP+1cmYH5eK5f5f3APef85hnuvfPeM6MoaaW1dWXKMGdasrJzrJtgc7dhQ+p2kzRry4OuHfmSbEEhUTt37d5TRGNxiRRrLwUczjKKyiuI3uuSYCv3ARa3ZyOu2k/xAT5b7aXra3xaVlsH1LPZg4cAvzM10wbgMBs+QqtsDKTyJroXGz7a7AgandECtPLXfKzFY8hCbcBxFudpP3Gy49RpQ8UXtgBnOOzZc53CU+e7Ism7uYnt5ji0p1e3pDmqzTnmAEr7GGz/AGEDg0MXaBgeERXrKIWFBQz2IvlYHbtEh/EycOUqVQLXVCDPxvGz+MPYdRGWjE/coGFyyg9M32SwM8PkydlQIim7JX6DxHpvM9g7c+SjoLESmqd9vjvDYO9NEzs1aahYY7SK+3Zm31Ddmp8jDx4qysIj2qt4O6dviH4xqvk5soj40vJjqjzh7HOf6BtPtb1SnulG6X3O6bHdqb5BejHbKtDOl+UcQ78iNuwzFKKvwx1v3npYJ+kd0BYynqz3Eu2OZvnB+IyCRVE+TD5qSmWBRuDjJzb8GWhIJq4xv36kWKoH6mr1vlFDnvRW86e9Qtd/qUrs1VeKv1VKbJjrOz3Wih8UrTpF37ArMlotFmfg58raLxrjvyXfifl/ku/TdZsiK9NfNcH+y93Ed4A1JzvLkmnOMClppbV19R+iQFSQ2tNASwAAAABJRU5ErkJggg==";

//  more icon
const MORE_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAQlBMVEUAAABEREQ9PT0/Pz8/Pz9AQEA7OzszMzM/Pz8/Pz9FRUU/Pz8/Pz9VVVUAAAA/Pz8+Pj4/Pz8/Pz9BQUFAQEA/Pz+e9yGtAAAAFnRSTlMAD5bv9KgaFJ/yGv+zAwGltPH9LyD5QNQoVwAAAF5JREFUSMft0EkKwCAQRFHHqEnUON3/qkmDuHMlZlVv95GCRsYAAAD+xYVU+hhprHPWjDy1koJPx+L63L5XiJQx9PQPpZiOEz3n0qs2ylZ7lkyZ9oyXzl76MAAAgD1eJM8FMZg0rF4AAAAASUVORK5CYII=";


const REACT_ICON = 'data:image/png;base64,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';



