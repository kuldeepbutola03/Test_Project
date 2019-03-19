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
  PickerIOS
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import ProfileView from '../../components/UI/ProfileView/ProfileView';
import MenuButtons from '../../components/UI/ProfileView/MenuButtons';
import { Navigation } from 'react-native-navigation/';
import { PropTypes } from 'prop-types';
import { normalize, getUserID, DEFAULT_USER_ID, authHeaders, getUserData } from '../../../Constant';
import { LANDING_RESOURCES, LANDING_CDM, DEBUG, LANDING_PDM, LANDING_TOP_SIX } from '../../../Apis';
import axios from 'axios';
import { Button } from 'react-native-elements';
import HomeScoreView from '../../components/UI/ProfileCard/HomeScoreView';
import Spinner from '../../components/UI/Spinner/Spinner';
import TopSix from '../../components/UI/TopSix/TopSix';
// import Dialog from 'react-native-dialog';
import Permissions from 'react-native-permissions';

import firebase from 'react-native-firebase';

export default class HomeScreen extends Component {

  areaCode = null;
  locationErrorMessage = null;

  static propTypes = {
    componentId: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
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
      menuName: this.getLanguageCode(this.props.data.userLanguage)
      // loadingFourth
    };
  }
  // this.props.updateUser
  refreshUI = (data) => {
    // getUserData().then((data) => {

    if (data.userLanguage === 'hi') {
      let menu = ['रुझान', 'सर्वे', 'अखाड़ा'];
      this.setState({ menuName: menu, data: data });
      return;
    }

    let menu = ['Trends', 'Survey', 'Arena'];
    this.setState({ menuName: menu, data: data });


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
    Permissions.check('location').then(response => {
      if (response === 'denied' || response === 'undetermined') {
        // this.setState({ isForFirstTime: true });
        this._requestPermission();
      } else if (response === 'authorized') {
        // this.getLocation()
        this.fetchCurrentLocation();
      }
    })

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
          languageCode: this.state.firstAPIresponse ? this.state.firstAPIresponse.languageCodes : null
        }

      },
    });
  };

  toPoliceProfileScreen = () => {
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
          userLanguage: this.state.data.userLanguage,
          languageCode: this.state.firstAPIresponse ? this.state.firstAPIresponse.languageCodes : null
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
          user_id: this.state.user_id,
          data: this.state.data,
          refreshUI: this.refreshUI,
          userLanguage: this.state.data.userLanguage,
          languageCode: this.state.firstAPIresponse ? this.state.firstAPIresponse.languageCodes : null
        },
      },
    });
  };

  toQuesScreen = () => {
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
        }
      },
    });
  };

  toTrendScreen = () => {
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
          languageCode: this.state.firstAPIresponse ? this.state.firstAPIresponse.languageCodes : null
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
        this.requestToServer()
        this.serverHitForFourthResponse()
      },
      (error) => {
        console.log(error)
        this.requestToServer();
        this.serverHitForFourthResponse()
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
      if (response === 'denied' || response === 'undetermined') {
        this._requestPermission();
      } else if (response === 'authorized') {
        // this.getLocation()
        this.fetchCurrentLocation();
      }
    })
  }

  _requestPermission = () => {
    Permissions.request('location').then(response => {
      // this.setState({ location: response })
      if (response === 'denied' || response === 'undetermined') {
        // this._requestPermission();
        this.requestToServer();
        this.serverHitForFourthResponse();
      } else if (response === 'authorized') {
        // this.getLocation()
        this.fetchCurrentLocation();
      }
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
    this.backHandler.remove();

    firebase.analytics().setCurrentScreen("Home_Screen");
    //firebase.analytics().logEvent("Home_Screen");
    firebase.analytics().setUserProperty("Screen", "Home_Screen");
    firebase.analytics().logEvent("Content", { "Screen": "Home_Screen" });
  }

  goBack = () => {
    if (this.props.componentId === "HomeScreen" || this.props.componentId === "Component10") {
      BackHandler.exitApp();
      return true;

    }
  }

  componentDidMount() {
    // getUserID();
    // SplashScreen.hide();
    AsyncStorage.getItem(DEFAULT_USER_ID).then((value) => {
      // alert(value);
      let userID = value ? value : 1;
      // alert(userID);
      this.setState({ user_id: userID })
    })
    this.checkPermission()
    // alert(getUserID());

    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.goBack);
    this.startTimer();

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
      userId: this.state.user_id,
      // latLngSeparatedByComma: "27.5,77.5",
      // languageCode: this.state.data.userLanguage ? this.state.data.userLanguage : 'en'
    };
    if (this.state.lat_lon) {
      body["latLngSeparatedByComma"] = this.state.lat_lon;
    }

    axios.post(LANDING_TOP_SIX, body)
      .then(response => {
        let responseData = response.data;
        // console.log(responseData)
        this.setState({ landingTopSix: responseData })
      })
      .catch(error => {
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
    const { currLandPageSurvey } = this.state;
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
                  user_id: this.state.user_id,
                  lat_lon: this.state.lat_lon,
                  surveyType: 'L',
                  surveyTitle: currLandPageSurvey[firstKey],
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
  }

  gotoProfile = () => {


    let labguageCode = this.state.firstAPIresponse ? this.state.firstAPIresponse.languageCodes : null;

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

      languageCode: labguageCode
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
    let menuName = this.state.menuName;
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
                width: normalize(40),
                height: normalize(40),
                marginTop: normalize(5),
                marginBottom: normalize(5),
                borderRadius: normalize(40) / 2,
              }}
              // source={typeof(this.props.data.image) === 'number' ? require('../../assets/UserSmall.png') : this.props.data.image}
              source={this.state.data.image ? { uri: "data:image/png;base64," + this.state.data.image } : require('../../assets/UserSmall.png')}
            />
          </TouchableOpacity>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 5,
              fontSize: normalize(14),
              color: 'white',
            }}
          >
            {this.state.data.username}
          </Text>

          {/* <View style={{ height: 40, width: 100, position: 'absolute', right: 10 ,top:2}} >
            <Picker
              selectedValue={this.state.language}
              style={{ height: 40, width: 100, position: 'absolute', right: 5 }}
              itemStyle={{ color: "white" }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ language: itemValue })
              }>
              <Picker.Item label="English" value="English" />
              <Picker.Item label="Hindi" value="Hindi" />
            </Picker>
            
          </View> */}
        </View>

        {/* //Second half */}
        {this.profileViewAfterLoading(this.state)}

        {/* //Third half */}
        <ScrollView
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            flex: 1,
            width: '100%',
            backgroundColor: 'white',
            borderTopColor: 'grey',
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
                <TopSix
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

        {/* //Forth half */}
        <View style={styles.bottomContainer}>

          <MenuButtons
            onPress={this.toTrendScreen}
            info={menuName[0]}
            source={menuImageName[0]}
          />

          <View style={styles.seperator} />

          <MenuButtons
            onPress={this.toQuesScreen}
            info={menuName[1]}
            source={menuImageName[1]}
          />

          <View style={styles.seperator} />

          <MenuButtons
            onPress={this.toReportScreen}
            info={menuName[2]}
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
    height: normalize(60),
    flexDirection: 'row',
  },
  profileContainer: {
    alignItems: 'center',
    // width: '100%',
    height: '31%',
    flexDirection: 'row',
    backgroundColor: 'white',
    // flex: 1,
  },
});

const stylesTopView = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#a01414',
    width: '100%',
    flexDirection: 'row',
  },
});
