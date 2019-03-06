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
  TouchableOpacity
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
      // loadingFourth
    };
  }

  tick = () => {
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
          isPolice: false
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
          isPolice: true
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
          data: this.props.data.image,
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
          image: this.props.data.image,
          username: this.props.data.username
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
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    // this.watchID = navigator.geolocation.watchPosition((position) => {
    //   const lastPosition = JSON.stringify(position);
    //   // this.setState({ lastPosition });
    //   alert(lastPosition)
    // });
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);



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
    this.fetchCurrentLocation();
    // alert(getUserID());

    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });

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

    fetch(LANDING_RESOURCES, {
      method: 'POST',
      headers: authHeaders(),
      body: body,
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ isLoading: false, firstAPIresponse: responseJson, currLandPageSurvey: responseJson.currLandPageSurvey });
        this.serverHitForSecondResponse();
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
        this.startTimer();
        // this.serverHitForFourthResponse();
        // return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  serverHitForFourthResponse = () => {
    // console.log('called')
    axios.post(LANDING_TOP_SIX, {
      userId: this.state.user_id,
      latLngSeparatedByComma: this.state.lat_lon
    })
    .then(response => {
      let responseData = response.data;
      // console.log(responseData)
      this.setState({ landingTopSix: responseData})
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
    let timer = setInterval(this.tick, 5 * 1000);
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
    if(currLandPageSurvey) {
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

  render() {
    let menuName = ['Trends', 'Survey', 'Timeline'];
    let menuImageName = [
      require('../../assets/trends.png'),
      require('../../assets/survey.png'),
      require('../../assets/timeline.png'),
    ];

    const wd = Dimensions.get('window').width;

    swipe = () => {
      this.scroll.scrollTo({ x: wd, y: 0, animated: true });
    };

    const cdmImage1 = this.state.thirdAPIresponse ? { uri: 'data:image/png;base64,' + this.state.thirdAPIresponse.cdmResourceImageData } : require('../../assets/Extra/people1.png');
    const cdmImage2 = this.state.thirdAPIresponse ? { uri: 'data:image/png;base64,' + this.state.thirdAPIresponse.cdmo1OrCnd1ResourceImageData } : require('../../assets/Extra/people2.png');
    const cdmImage3 = this.state.thirdAPIresponse ? { uri: 'data:image/png;base64,' + this.state.thirdAPIresponse.cdmo2OrCnd2ResourceImageData } : require('../../assets/Extra/people3.png');
    const cdmGPR1 = this.state.thirdAPIresponse ? this.state.thirdAPIresponse.cdmResourceGPR : "25";
    const cdmGPR2 = this.state.thirdAPIresponse ? this.state.thirdAPIresponse.cdmo1OrCnd1ResourceGPR : "10";
    const cdmGPR3 = this.state.thirdAPIresponse ? this.state.thirdAPIresponse.cdmo2OrCnd2ResourceGPR : "9";


    const pdmImage1 = this.state.secondAPIresponse ? { uri: 'data:image/png;base64,' + this.state.secondAPIresponse.pdmResourceImageData } : require('../../assets/Extra/people1.png');
    const pdmImage2 = this.state.secondAPIresponse ? { uri: 'data:image/png;base64,' + this.state.secondAPIresponse.pdmo1OrCndp1ResourceImageData } : require('../../assets/Extra/people3.png');
    const pdmImage3 = this.state.secondAPIresponse ? { uri: 'data:image/png;base64,' + this.state.secondAPIresponse.pdmo2OrCndp2ResourceImageData } : require('../../assets/Extra/people2.png');


    const pdmGPR1 = this.state.secondAPIresponse ? this.state.secondAPIresponse.pdmResourceGPR : "30";
    const pdmGPR2 = this.state.secondAPIresponse ? this.state.secondAPIresponse.pdmo1OrCndp1ResourceGPR : "25";
    const pdmGPR3 = this.state.secondAPIresponse ? this.state.secondAPIresponse.pdmo2OrCndp2ResourceGPR : "11";

    const resourceGPR_1 = this.state.landingTopSix ?  this.state.landingTopSix.resourceGPR_1 : 40;
    const resourceGPR_2 = this.state.landingTopSix ?  this.state.landingTopSix.resourceGPR_2 : 20;
    const resourceGPR_3 = this.state.landingTopSix ?  this.state.landingTopSix.resourceGPR_3 : 10;
    const resourceGPR_4 = this.state.landingTopSix ?  this.state.landingTopSix.resourceGPR_4 : 30;
    const resourceGPR_5 = this.state.landingTopSix ?  this.state.landingTopSix.resourceGPR_5 : 55;
    const resourceGPR_6 = this.state.landingTopSix ?  this.state.landingTopSix.resourceGPR_6 : 70;
    
    const resourceImageData_1 = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceImageData_1 } : null
    const resourceImageData_2 = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceImageData_2 } : null
    const resourceImageData_3 = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceImageData_3 } : null
    const resourceImageData_4 = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceImageData_4 } : null
    const resourceImageData_5 = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceImageData_5 } : null
    const resourceImageData_6 = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceImageData_6 } : null
    
    const resourceCategoryLogoData_1 = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceCategoryLogoData_1 } : null
    const resourceCategoryLogoData_2 = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceCategoryLogoData_2 } : null
    const resourceCategoryLogoData_3 = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceCategoryLogoData_3 } : null
    const resourceCategoryLogoData_4 = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceCategoryLogoData_4 } : null
    const resourceCategoryLogoData_5 = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceCategoryLogoData_5 } : null
    const resourceCategoryLogoData_6 = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceCategoryLogoData_6 } : null
    console.log(this.state)
    return (
      <SafeAreaView
        forceInset={{ bottom: 'always' }}
        style={{ flex: 1, backgroundColor: 'rgba(210,210,208,1)' }}
      >
        <View style={stylesTopView.container}>
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
            source={ this.props.data.image ?  {uri : "data:image/png;base64,"+this.props.data.image} : require('../../assets/UserSmall.png')}
          />

          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 5,
              fontSize: normalize(14),
              color: 'white',
            }}
          >
            {this.props.data.username}
          </Text>
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
            <View style={{ width: wd, flex: 1, padding: normalize(8) }}>
              <TopSix 
                source={[resourceImageData_1, 
                          resourceImageData_2, 
                          resourceImageData_3, 
                          resourceImageData_4, 
                          resourceImageData_5, 
                          resourceImageData_6]}

                logo={[resourceCategoryLogoData_1, 
                      resourceCategoryLogoData_2, 
                      resourceCategoryLogoData_3, 
                      resourceCategoryLogoData_4, 
                      resourceCategoryLogoData_5, 
                      resourceCategoryLogoData_6]}

                resourceGpr={[ resourceGPR_1, resourceGPR_2, resourceGPR_3, resourceGPR_4, resourceGPR_5, resourceGPR_6, ]}
                renderButton={this.renderSurveyButton}
              /> 
            </View> : 
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
