import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
  BackHandler,
  ScrollView,
  AsyncStorage
} from 'react-native';
import ProfileView from '../../components/UI/ProfileView/ProfileView';
import MenuButtons from '../../components/UI/ProfileView/MenuButtons';
import { Navigation } from 'react-native-navigation/';
import { PropTypes } from 'prop-types';
import profileView from '../../components/UI/ProfileView/ProfileView';
import { normalize, getUserID, DEFAULT_USER_ID, authHeaders, getUserData } from '../../../Constant';
import ScoreView from '../../components/UI/ProfileCard/ScoreView';
import HeatMap from '../../components/UI/HeatMap/HeatMap';
import { LANDING_RESOURCES, LANDING_CDM, DEBUG, LANDING_PDM } from '../../../Apis';

import Geolocation from 'react-native-geolocation-service';
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

      isLoading: true,
      timer: null,
      counter: 0,

      user_id: '1',
      firstAPIresponse: null,
      secondAPIresponse: null,
      thirdAPIresponse: null,

      lat_lon: null,
      coordinates: null
    };
  }

  tick = () => {
    let counter = this.state.counter + 1;
    this.setState({
      counter: counter >= 3 ? 0 : counter,
    });
    this.scroll.scrollTo({
      x: this.state.counter * Dimensions.get('window').width,
      y: 0,
      animate: true,
    });
  };

  // toTestScreen = () => {
  //   Navigation.push(this.props.componentId, {
  //     component: {
  //       name: 'Test',
  //     },
  //   });
  // };

  toFireDepartmentScreen = () => {
    // Navigation.push(this.props.componentId, {
    //   component: {
    //     name: 'FireDepartmentScreen',
    //     options: {
    //       topBar: {
    //         visible: false,
    //         drawBehind: true,
    //         animate: false,
    //       },
    //     },
    //     passProps: {
    //       user_id: this.state.user_id,
    //       lat_long: this.state.lat_lon,
    //       isPolice : false
    //     }

    //   },
    // });
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
          resourceIdCDM: this.state.firstAPIresponse ? this.state.firstAPIresponse.polResourceId : 1
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


    Geolocation.getCurrentPosition(
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
        //alert(latlong);
        // this.setState({ lat_lon: "28.722,77.125" });
        this.setState({ lat_lon: latlong });
        this.setState({ coordinates: position.coords });
        // alert(latlong);
        this.requestToServer()
      },
      (error) => {

        this.requestToServer()
        //alert(error.message)
        // this.locationErrorMessage = error.message;
        // alert(locationErrorMessage)
        // this.showDialog();
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }
  componentWillUnmount() {
    clearInterval(this.state.timer);



  }

  
  componentDidMount() {
    // getUserID();
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
    return;
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
        // alert(responseJson);
        // alert(JSON.stringify(responseJson));
        this.setState({ isLoading: false, firstAPIresponse: responseJson });
        this.serverHitForSecondResponse();

        // return responseJson;
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
        latLngSeparatedByComma: this.state.lat_lon,
        // latLngSeparatedByComma:"28.722,77.125"
      });
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

        // alert(JSON.stringify(responseJson));
        this.setState({ thirdAPIresponse: responseJson });

        this.startTimer()
        // return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  showDialog() {
    // alert(this.locationErrorMessage);
    // this.setState({ showDialog: true });


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
        this.state.firstAPIresponse.customAreaName,
      ];
      let profileInfo2 = [
        this.state.firstAPIresponse.firResourceName,
        this.state.firstAPIresponse.customAreaName,
      ];
      let areaType = [this.state.firstAPIresponse.polResourceType, this.state.firstAPIresponse.firResourceType];
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
    }
  };

  render() {
    // if (this.state.isLoading) {
    //   return (
    //     <View style={{flex: 1, padding: 20}}>
    //       <ActivityIndicator />
    //     </View>
    //   );
    // }
    // if (this.state.showDialog ) {
    // return this.showAlertWithText;
    // }


    let menuName = ['Team', 'Questionnaire', 'Report'];

    // let profilePic = [
    //   {uri: this.state.dataSource[0].picture.medium},
    //   {uri: this.state.dataSource[0].picture.medium},
    // ];
    // let profileCompanyPic = [
    //   {uri: this.state.dataSource[0].picture.medium},
    //   {uri: this.state.dataSource[0].picture.medium},
    // ];
    // let profileInfo = [
    //   this.state.dataSource[0].name.first,
    //   this.state.dataSource[0].name.last,
    // ];
    // let profileInfo2 = [
    //   this.state.dataSource[0].location.city,
    //   this.state.dataSource[0].location.state,
    // ];

    // let profilePic = [require('../../assets/1.png'), require('../../assets/pic1.png')];
    // let profileCompanyPic = [require('../../assets/batch1.png'), require('../../assets/batch1.png')];
    // let profileInfo = ['shashi kumar singh', 'United Kingdom'];
    // let profileInfo2 = ['Heena kumar singh', 'United State'];

    let menuImageName = [
      require('../../assets/chart.png'),
      require('../../assets/state1.png'),
      require('../../assets/national2.png'),
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
            source={this.props.data.image}
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
            flexDirection: 'row',
            backgroundColor: 'white',
            borderTopColor: 'grey',
            borderTopWidth: 0.2,
          }}
          ref={ref => {
            this.scroll = ref;
          }}
        // onScroll={this.swipe}
        >
          <View style={{ width: wd, height: '100%' }}>
            <HeatMap currentCoordinate={this.state.coordinates} data={this.state.firstAPIresponse ? this.state.firstAPIresponse.heatMapDataList : null} />
          </View>

          <View style={{ width: wd, height: '100%', flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Image
                source={cdmImage1}
                style={{ flex: 1, height: null, width: null }}
              />
              <ScoreView
                style={{ position: 'absolute', bottom: -10, right: 10 }}
                text={['', cdmGPR1]}
                backgroundColor="#279FC4"
              />
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                <Image
                  source={cdmImage2}
                  style={{ flex: 1, height: null, width: null }}
                />
                <ScoreView
                  style={{ position: 'absolute', bottom: -10, right: 10 }}
                  text={['', cdmGPR2]}
                  backgroundColor="#FAA21B"
                />
              </View>
              <View style={{ flex: 1 }}>
                <Image
                  source={cdmImage3}
                  style={{ flex: 1, height: null, width: null }}
                />
                <ScoreView
                  style={{ position: 'absolute', bottom: -10, right: 10 }}
                  text={['', cdmGPR3]}
                  backgroundColor="#9D3995"
                />
              </View>
            </View>
          </View>

          <View style={{ width: wd, height: '100%', flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Image
                source={pdmImage1}
                style={{ flex: 1, height: null, width: null }}
              />
              <ScoreView
                style={{ position: 'absolute', bottom: -10, right: 10 }}
                text={['', pdmGPR1]}
                backgroundColor="#279FC4"
              />
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                <Image
                  source={pdmImage2}
                  style={{ flex: 1, height: null, width: null }}
                />
                <ScoreView
                  style={{ position: 'absolute', bottom: -10, right: 10 }}
                  text={['', pdmGPR2]}
                  backgroundColor="#FAA21B"
                />
              </View>
              <View style={{ flex: 1 }}>
                <Image
                  source={pdmImage3}
                  style={{ flex: 1, height: null, width: null }}
                />
                <ScoreView
                  style={{ position: 'absolute', bottom: -10, right: 10 }}
                  text={['', pdmGPR3]}
                  backgroundColor="#9D3995"
                />
              </View>
            </View>
          </View>

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

        {/* <View> */}
        {/* <Dialog.Container visible={this.state.showDialog }> */}
        {/* <Dialog.Title>{this.locationErrorMessage ? this.locationErrorMessage : " "}</Dialog.Title> */}
        {/* <Dialog.Description> */}
        {/* Please enter your area code */}
        {/* </Dialog.Description> */}
        {/* <Dialog.Input onChangeText={(text) => this.areaCode = text} /> */}
        {/* <Dialog.Button label="Cancel" /> */}
        {/* <Dialog.Button label="Submit" onPress = {this.handleCancel}/> */}
        {/* </Dialog.Container> */}
        {/* </View> */}

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
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
});

const stylesTopView = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'rgba(87,48,134,1)',
    width: '100%',
    flexDirection: 'row',
  },
});
