import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  AsyncStorage,
  Text,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';

import ProfileCard from '../../components/UI/ProfileCard/ProfileCard';
import { Navigation } from 'react-native-navigation';
import { PropTypes } from 'prop-types';
import { normalize, authHeaders, APP_GLOBAL_COLOR } from '../../../Constant';
import { AREA_PDM, DEBUG, GPR_FLAG, AREA_CDM } from '../../../Apis';
import Spinner from '../../components/UI/Spinner/Spinner';
import CustomButton from '../../components/UI/ButtonMod/CustomButtom';
// import HomeButton from '../../components/UI/HomeButton/HomeButton';
import firebase from 'react-native-firebase';

export default class PoliceProfileScreen extends Component {
  static propTypes = {
    componentId: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      APIresponse: null,
      isLiked1: 0,
      isLiked2: 0,
      resourceGPR_1: null,
      resourceGPR_2: null,
      rtnGprI_1: null,
      rtnGprI_2: null,
      rtnGprO_1: null,
      rtnGprO_2: null,
      totalFlagCount_1: null,
      totalFlagCount_2: null,
      totalFlagUniqueCount_1: null,
      totalFlagUniqueCount_2: null,
      showInfo: false,
      menuName : this.props.language
    }
  };

  // getLanguageCode(language) {
  //   if (language === 'hi') {
  //     let menu = "रेट करें";
  //     return menu;
  //   }
    
  //   return "Rate Now";
    
  // }


  showInfoScreen(show) {
    this.setState({ showInfo: show });
  }
  homeButtonTapped = () => {


    Navigation.pop(this.props.componentId);
  };

  like1ButtonTapped = () => {

    const dateTime = Date.now();
    const currentTime = Math.floor(dateTime / 1000) + (60 * 60 * 1);

    this.setState({ isLiked1: 1 });
    this.saveDataInStorage(true, 1)
  };

  like2ButtonTapped = () => {

    this.setState({ isLiked2: 1 });
    this.saveDataInStorage(false, 1)
  };

  dislike1ButtonTapped = () => {

    this.setState({ isLiked1: 2 });
    this.saveDataInStorage(true, 2)
  };

  dislike2ButtonTapped = () => {

    this.setState({ isLiked2: 2 });
    this.saveDataInStorage(false, 2)
  };

  saveDataInStorage(isResourceFirst, isLiked) {

    const dateTime = Date.now();
    const currentTime = Math.floor(dateTime / 1000) + (60 * 60 * 3);

    // et timeStamp = value.timeStamp;
    //         let isLiked = value.isLiked;
    let data = { timeStamp: currentTime, isLiked: isLiked }
    if (isResourceFirst) {
      this.hitServerForLikeDislike(this.state.APIresponse ? this.state.APIresponse.resourceId1 : '');
      let resource_Id_1 = (this.state.APIresponse ? this.state.APIresponse.resourceId1 : '0') + '_1' + (this.props.isPolice ? '_P' : '_F');
      AsyncStorage.setItem(resource_Id_1, JSON.stringify(data));
    } else {
      this.hitServerForLikeDislike(this.state.APIresponse ? this.state.APIresponse.resourceId2 : '');
      let resource_Id_2 = (this.state.APIresponse ? this.state.APIresponse.resourceId2 : '0') + '_2' + (this.props.isPolice ? '_P' : '_F');
      AsyncStorage.setItem(resource_Id_2, JSON.stringify(data));
    }
  }

  componentDidMount() {
    this.serverHitForDetail();

    let screenName = this.props.isPolice ? 'MLA_Screen' : 'MP_Screen';
    firebase.analytics().setCurrentScreen("Screen", screenName);
    //firebase.analytics().logEvent("Trends_Screen");
    firebase.analytics().setUserProperty("Screen", screenName);
    firebase.analytics().logEvent("Content", { "Screen": screenName });

  }

  hitServerForLikeDislike(resourceId, isLiked) {
    if (DEBUG == 0) {
      return;
    }
    fetch(GPR_FLAG, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({

        userLocationCoord: this.props.lat_long,
        resourceMaster: {
          resourceId: resourceId
        },
        userMaster: {
          userId: this.props.user_id
        },
        flagValue: isLiked ? 'S' : 'N'

      }),
    }).then((response) => response.json())
      .then((responseJson) => {

      })
      .catch((error) => {
        console.error(error);
      });
  }

  serverHitForDetail() {

    if (DEBUG == 0) {
      // alert(this.props.user_id + this.props.lat_long);
      this.setValueForFlag(null);
      return;
    }


    fetch(this.props.isPolice ? AREA_PDM : AREA_CDM, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({
        userId: this.props.user_id,
        latLngSeparatedByComma: this.props.lat_long,
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          APIresponse: responseJson,
          resourceGPR_1: responseJson.resourceGPR1,
          resourceGPR_2: responseJson.resourceGPR2,
          rtnGprI_1: responseJson.resourceGPRI1,
          rtnGprI_2: responseJson.resourceGPRI2,
          rtnGprO_1: responseJson.resourceGPRO1,
          rtnGprO_2: responseJson.resourceGPRO2,
          totalFlagCount_1: responseJson.resourceTotalFlagCount1,
          totalFlagCount_2: responseJson.resourceTotalFlagCount2,
          totalFlagUniqueCount_1: responseJson.resourceTotalFlagUniqueCount1,
          totalFlagUniqueCount_2: responseJson.resourceTotalFlagUniqueCount2,
        });
        // this.setValueForFlag(responseJson)
      })
      .catch((error) => {
        console.error(error);
      });

  }

  setValueForFlag(responseJson) {
    let resource_Id_1 = (responseJson ? responseJson.resourceId1 : '0') + '_1' + (this.props.isPolice ? '_P' : '_F');

    AsyncStorage.getItem(resource_Id_1).then((data) => {
      if (data) {
        let value = JSON.parse(data);
        let timeStamp = value.timeStamp;
        let isLiked = value.isLiked;

        const dateTime = Date.now();
        const currentTime = Math.floor(dateTime / 1000)

        if (currentTime < timeStamp) {
          this.setState({ isLiked1: isLiked })
        }

      }
    })

    let resource_Id_2 = (responseJson ? responseJson.resourceId2 : '0') + '_2' + (this.props.isPolice ? '_P' : '_F');
    AsyncStorage.getItem(resource_Id_2).then((data) => {
      if (data) {
        let value = JSON.parse(data);
        let timeStamp = value.timeStamp;
        let isLiked = value.isLiked;

        const dateTime = Date.now();
        const currentTime = Math.floor(dateTime / 1000)

        if (currentTime < timeStamp) {
          this.setState({ isLiked2: isLiked })
        }

      }
    })
    // alert(resource_Id_1 + '  ' + resource_Id_2);
  }

  updateResources = (val) => {
    if (val.resourceType === 1) {
      this.setState({
        resourceGPR_1: val.resourceGPR,
        rtnGprI_1: val.rtnGprI,
        rtnGprO_1: val.rtnGprO,
        totalFlagCount_1: val.totalFlagCount,
        totalFlagUniqueCount_1: val.totalFlagUniqueCount,
      })
    } else if (val.resourceType === 2) {
      this.setState({
        resourceGPR_2: val.resourceGPR,
        rtnGprI_2: val.rtnGprI,
        rtnGprO_2: val.rtnGprO,
        totalFlagCount_2: val.totalFlagCount,
        totalFlagUniqueCount_2: val.totalFlagUniqueCount,
      })
    }

    fetch(this.props.isPolice ? AREA_PDM : AREA_CDM, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({
        userId: this.props.user_id,
        latLngSeparatedByComma: this.props.lat_long,
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          APIresponse: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }


  render() {
    let abc2 =
      [
        { attributeName: 'Devin', attributeValue: 'Devin' },
        { attributeName: 'Jackson', attributeValue: 'Devin' },
        { attributeName: 'James', attributeValue: 'Devin' },
        { attributeName: 'Joel', attributeValue: 'Devin' },
        { attributeName: 'John', attributeValue: 'Devin' },

      ];
    let abc =
      [
        { attributeName: 'Joel', attributeValue: 'Devin' },
        { attributeName: 'John', attributeValue: 'Devin' },
        { attributeName: 'Jillian', attributeValue: 'Devin' },
        { attributeName: 'Jimmy', attributeValue: 'Devin' },
        { attributeName: 'Julie', attributeValue: 'Devin' },
      ];

    var list = [{ attributeName: 'ATTRIBUTE NAME', attributeValue: 'ATTRIBUTE VALUE' }];
    list.push(...(this.state.APIresponse ? (this.state.APIresponse.resource1AttributesList ? this.state.APIresponse.resource1AttributesList : []) : abc));

    var list2 = [{ attributeName: 'ATTRIBUTE NAME', attributeValue: 'ATTRIBUTE VALUE' }];
    list2.push(...(this.state.APIresponse ? (this.state.APIresponse.resource2AttributesList ? this.state.APIresponse.resource2AttributesList : []) : abc2));

    let data = {
      profilePic: this.state.APIresponse ? { uri: 'data:image/png;base64,' + this.state.APIresponse.resourceImageData1 } : this.props.isPolice ? require('../../assets/1.png') : require('../../assets/2.png'),
      profileCompPic: this.state.APIresponse ? { uri: 'data:image/png;base64,' + this.state.APIresponse.resourceCategoryLogoData1 } : require('../../assets/logoComp.png'),
      name: this.state.APIresponse ? this.state.APIresponse.resourceName1 : 'JOHNSON ADOLPH BLAINE CHARLES',
      area: this.state.APIresponse ? (this.state.APIresponse.resourceTypeRes1 + ' | ' + this.state.APIresponse.customAreaName) : 'DNTN | Alaska ',
      totalCount: this.state.APIresponse ? this.state.APIresponse.resourceTotalFlagCount1 : 1000,
      uniqueCount: this.state.APIresponse ? this.state.APIresponse.resourceTotalFlagUniqueCount1 : 123,
      score: {
        gpr: {
          score: this.state.APIresponse ? this.state.APIresponse.resourceGPR1 : '52%',
          name: '',
        },
        agpr: {
          score: this.state.APIresponse ? '' : '32',
          name: this.state.APIresponse ? '' : 'AGPR',
        },
        extraCount: {
          score: this.state.APIresponse ? '' : '3.5',
          name: this.state.APIresponse ? '' : 'XYZ',
        },
      },
      resourceId: this.state.APIresponse ? this.state.APIresponse.resourceId1 : 0,
      userId: this.props.user_id,
      location: this.props.lat_long,
      data: list,
    };

    let data2 = {
      profilePic: this.state.APIresponse ? { uri: 'data:image/png;base64,' + this.state.APIresponse.resourceImageData2 } : this.props.isPolice ? require('../../assets/Extra/people7.png') : require('../../assets/Extra/people6.png'),
      profileCompPic: this.state.APIresponse ? { uri: 'data:image/png;base64,' + this.state.APIresponse.resourceCategoryLogoData2 } : require('../../assets/logoComp.png'),


      name: this.state.APIresponse ? this.state.APIresponse.resourceName2 : 'JOHNSON ADOLPH BLAINE CHARLES',
      area: this.state.APIresponse ? (this.state.APIresponse.resourceType2Res2 + ' | ' + this.state.APIresponse.customAreaState) : 'DNTN | Alaska',
      totalCount: this.state.APIresponse ? this.state.APIresponse.resourceTotalFlagCount2 : 1000,
      uniqueCount: this.state.APIresponse ? this.state.APIresponse.resourceTotalFlagUniqueCount2 : 123,
      score: {
        gpr: {
          score: this.state.APIresponse ? this.state.APIresponse.resourceGPR2 : '63%',
          name: '',
        },
        agpr: {
          score: this.state.APIresponse ? '' : '43',
          name: this.state.APIresponse ? '' : 'AGPR',
        },
        extraCount: {
          score: this.state.APIresponse ? '' : '4.5',
          name: this.state.APIresponse ? '' : 'XYZ',
        },
      },
      resourceId: this.state.APIresponse ? this.state.APIresponse.resourceId2 : 0,
      userId: this.props.user_id,
      location: this.props.lat_long,
      data: list2,
    };

    console.log(this.state.APIresponse)
    return (
      <SafeAreaView
        forceInset={{ bottom: 'always' }}
        style={{ flex: 1, backgroundColor: 'rgba(210,210,208,1)' }}
      >
        {/* {this.state.APIresponse ? null : */}
        <View style={{ flexDirection: 'row', height: 50 }} backgroundColor={APP_GLOBAL_COLOR}>

          <View style={{ flex: 1, backgroundColor: APP_GLOBAL_COLOR, }}>
            <CustomButton
              style={{
                flexDirection: 'row',
                flex: 1
              }}
              source={require('../../assets/homez.png')}
              onPress={this.homeButtonTapped}
            />
          </View>

          {/* <View style={{ flex: 5, backgroundColor:'#f2f1f4' }} /> */}

          <View style={cardViewStyle.textheaderView}>
            <Text style={{
              position: 'absolute',
              backgroundColor: 'transparent',
              right: 15,
              fontSize: normalize(14),
              fontWeight: 'bold',
              color: 'white'
            }}>
              {this.state.menuName}</Text>
            {/* {this.props.isPolice ? "Every Opinion Counts. Rate Now !" : "Rate Your MP | PM"}</Text> */}
            {/* <Text adjustsFontSizeToFit numberOfLines={1} minimumFontScale={.8} style={cardViewStyle.textView}>{this.props.name}</Text> */}
            {/* <Text style={cardViewStyle.textView2}>{this.props.area === "PDM | null" ? "PDM" : this.props.area}</Text> */}
          </View>

        </View>
        {/* } */}
        {this.state.APIresponse ?
          <ProfileCard pointerEvents={this.state.isLiked1 == 0 ? "auto" : "none"}
            style={{ flex: 1 }}
            showHome={true}
            backgroundColor="white"
            data={data}
            onPress={this.homeButtonTapped}
            onPressLike={this.like1ButtonTapped}
            onPressDislike={this.dislike1ButtonTapped}
            isLiked={this.state.isLiked1}
            customAreaId={this.state.APIresponse.customAreaId}
            isFlagEnabled={this.state.APIresponse.isFlagEnabled1}
            resourceGPR={this.state.resourceGPR_1}
            rtnGprI={this.state.rtnGprI_1}
            rtnGprO={this.state.rtnGprO_1}
            totalFlagCount={this.state.totalFlagCount_1}
            totalFlagUniqueCount={this.state.totalFlagUniqueCount_1}
            resourceType={1}
            updateResources={this.updateResources}
            onPressInfo={() => {
              this.showInfoScreen(true)
            }}
          /> :
          <View style={{ backgroundColor: '#fff', flex: 6, marginButtom: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Spinner />
          </View>
        }
        {/* divider */}
        <View
          style={{ height: normalize(3), margin: 0 }}
          backgroundColor='rgba(201,201,198)'
        />
        {this.state.APIresponse ?
          <ProfileCard pointerEvents={this.state.isLiked2 == 0 ? "auto" : "none"}
            style={{ flex: 1 }}
            showHome={false}
            backgroundColor='white'
            data={data2}
            onPressLike={this.like2ButtonTapped}
            onPressDislike={this.dislike2ButtonTapped}
            isLiked={this.state.isLiked2}
            customAreaId={this.state.APIresponse.customAreaId}
            isFlagEnabled={this.state.APIresponse.isFlagEnabled2}
            resourceGPR={this.state.resourceGPR_2}
            rtnGprI={this.state.rtnGprI_2}
            rtnGprO={this.state.rtnGprO_2}
            totalFlagCount={this.state.totalFlagCount_2}
            totalFlagUniqueCount={this.state.totalFlagUniqueCount_2}
            resourceType={2}
            updateResources={this.updateResources}
          /> :
          <View style={{ backgroundColor: '#fff', flex: 6, justifyContent: 'center', alignItems: 'center' }}>
            <Spinner />
          </View>
        }

        {this.state.showInfo &&
          <View style={{ position: 'absolute', height: Dimensions.get('window').height, width: Dimensions.get('window').width, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(1,1,1,0.5)', }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image source={require('../../assets/Home_1_2/infoScreen2.png')} />
              <TouchableOpacity style={{ position: 'absolute', height: 50, width: 50, right: 0, top: 0 }} onPress={() => this.showInfoScreen(false)}>

              </TouchableOpacity>
            </View>

          </View>
        }
      </SafeAreaView>
    );
  }
}

const stylesTopView = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: APP_GLOBAL_COLOR,
    width: '100%',
    flexDirection: 'row',
  },
});

const cardViewStyle = StyleSheet.create({
  headerView: {
    flex: 0.15,
    justifyContent: 'center',
    flexDirection: 'row',
  },

  textheaderView: {
    flex: 5,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: 50,
  },

  textView: {
    backgroundColor: 'transparent',
    marginLeft: normalize(13),
    fontSize: normalize(25),
    marginBottom: normalize(5)
  },
  textView2: {
    backgroundColor: 'transparent',
    marginLeft: normalize(13),
    fontSize: normalize(12),
    marginBottom: normalize(10)
  },
});

const styles = StyleSheet.create({
  headerView: {
    // flex: 0.08,
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 5,
    backgroundColor: 'white',
    height: Dimensions.get('window').height * 0.07
  },
  textheaderView: {
    // flex: 5,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  textView: {
    position: 'absolute',
    backgroundColor: 'transparent',
    right: 15,
    fontSize: normalize(17),
    fontWeight: 'bold',
    color: 'white'
  },
  bottomView: {
    flex: 0.93,
  },
});