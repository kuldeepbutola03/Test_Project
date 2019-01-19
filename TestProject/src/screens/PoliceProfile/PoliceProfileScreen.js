import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';

import ProfileCard from '../../components/UI/ProfileCard/ProfileCard';
// import Apis from '../../../Apis';
import { Navigation } from 'react-native-navigation';
import { PropTypes } from 'prop-types';
import { normalize, authHeaders } from '../../../Constant';
import { AREA_PDM, DEBUG, GPR_FLAG, AREA_CDM } from '../../../Apis';

export default class PoliceProfileScreen extends Component {
  static propTypes = {
    componentId: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      APIresponse: null,

      isLiked1: 0,
      isLiked2: 0
    }
  };

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

  saveDataInStorage(isResourceFirst , isLiked) {

    const dateTime = Date.now();
    const currentTime = Math.floor(dateTime / 1000) + (60 * 60 * 3);

    // et timeStamp = value.timeStamp;
    //         let isLiked = value.isLiked;
    let data = {timeStamp : currentTime , isLiked : isLiked}
    if (isResourceFirst) {
      this.hitServerForLikeDislike(this.state.APIresponse ? this.state.APIresponse.resourceId1 : '');
      let resource_Id_1 = (this.state.APIresponse ? this.state.APIresponse.resourceId1 : '0') + '_1'  + (this.props.isPolice ? '_P' : '_F');
      AsyncStorage.setItem(resource_Id_1,JSON.stringify(data));
    }else{
      this.hitServerForLikeDislike(this.state.APIresponse ? this.state.APIresponse.resourceId2 : '');
      let resource_Id_2 = (this.state.APIresponse ? this.state.APIresponse.resourceId2 : '0') + '_2'  + (this.props.isPolice ? '_P' : '_F');
      AsyncStorage.setItem(resource_Id_2,JSON.stringify(data));
    }
  }


  componentDidMount() {
    this.serverHitForDetail();



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

        // this.setState({ APIresponse: responseJson });

        // AsyncStorage
        // AsyncStorage.setItem(DEFAULT_USER_ID, userId);
        // return responseJson;
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



    fetch( this.props.isPolice ? AREA_PDM : AREA_CDM , {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({
        userId: this.props.user_id,
        latLngSeparatedByComma: this.props.lat_long,

        // userId: 1,
        // latLngSeparatedByComma:"28.722,77.125"

      }),
    }).then((response) => response.json())
      .then((responseJson) => {

        this.setState({ APIresponse: responseJson });

        // const dateTime = Date.now();
        // const currentTime = Math.floor(dateTime / 1000) + (60 * 60 * 1);

        this.setValueForFlag(responseJson)


      })
      .catch((error) => {
        console.error(error);
      });

  }

  setValueForFlag(responseJson) {
    let resource_Id_1 = (responseJson ? responseJson.resourceId1 : '0') + '_1' +  (this.props.isPolice ? '_P' : '_F');
    
        AsyncStorage.getItem(resource_Id_1).then((data) => {
          if (data) {
            let value = JSON.parse(data);
            let timeStamp = value.timeStamp;
            let isLiked = value.isLiked;
            
            const dateTime = Date.now();
            const currentTime = Math.floor(dateTime / 1000)

            if (currentTime < timeStamp) {
              this.setState({isLiked1 : isLiked})
            }

          }
        })

        let resource_Id_2 = (responseJson ? responseJson.resourceId2 : '0') + '_2'  + (this.props.isPolice ? '_P' : '_F');
        AsyncStorage.getItem(resource_Id_2).then((data) => {
          if (data) {
            let value = JSON.parse(data);
            let timeStamp = value.timeStamp;
            let isLiked = value.isLiked;
            
            const dateTime = Date.now();
            const currentTime = Math.floor(dateTime / 1000)

            if (currentTime < timeStamp) {
              this.setState({isLiked2 : isLiked})
            }

          }
        })
        // alert(resource_Id_1 + '  ' + resource_Id_2);
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

      profilePic : this.state.APIresponse ? { uri: 'data:image/png;base64,' + this.state.APIresponse.resourceImageData1 } : this.props.isPolice ? require('../../assets/1.png') : require('../../assets/2.png'),
      profileCompPic : this.state.APIresponse ? { uri: 'data:image/png;base64,' + this.state.APIresponse.resourceCategoryLogoData1 } : require('../../assets/logoComp.png'),

      


      name: this.state.APIresponse ? this.state.APIresponse.resourceName1 : 'JOHNSON ADOLPH BLAINE CHARLES',
      area: this.state.APIresponse ? (this.state.APIresponse.resourceTypeRes1 + ' | ' + this.state.APIresponse.customAreaName) : 'DNTN | Alaska ',
      totalCount: this.state.APIresponse ? this.state.APIresponse.resourceTotalFlagCount1 : 1000,
      uniqueCount: this.state.APIresponse ? this.state.APIresponse.resourceTotalFlagUniqueCount1 : 123,
      score: {
        gpr: {
          score: this.state.APIresponse ? this.state.APIresponse.resourceGPR1 : '52%',
          name: 'GPR',
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

      data: list,
    };

    let data2 = {


      profilePic : this.state.APIresponse ? { uri: 'data:image/png;base64,' + this.state.APIresponse.resourceImageData2 } : this.props.isPolice ? require('../../assets/Extra/people7.png') : require('../../assets/Extra/people6.png'),
      profileCompPic : this.state.APIresponse ? { uri: 'data:image/png;base64,' + this.state.APIresponse.resourceCategoryLogoData2 } : require('../../assets/logoComp.png'),


      name: this.state.APIresponse ? this.state.APIresponse.resourceName2 : 'JOHNSON ADOLPH BLAINE CHARLES',
      area: this.state.APIresponse ? (this.state.APIresponse.resourceTypeRes2 + ' | ' + this.state.APIresponse.customAreaName) : 'DNTN | Alaska',
      totalCount: this.state.APIresponse ? this.state.APIresponse.resourceTotalFlagCount2 : 1000,
      uniqueCount: this.state.APIresponse ? this.state.APIresponse.resourceTotalFlagUniqueCount2 : 123,
      score: {
        gpr: {
          score: this.state.APIresponse ? this.state.APIresponse.resourceGPR2 : '63%',
          name: 'GPR',
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

      data: list2,
    };

    // alert(this.state.isLiked1);


    return (
      <SafeAreaView
        forceInset={{ bottom: 'always' }}
        style={{ flex: 1, backgroundColor: 'rgba(210,210,208,1)' }}
      >

        <ProfileCard pointerEvents={this.state.isLiked1 == 0 ? "auto" : "none"}
          style={{ flex: 1 }}
          showHome={true}
          backgroundColor="white"
          data={data}
          onPress={this.homeButtonTapped}
          onPressLike={this.like1ButtonTapped}
          onPressDislike={this.dislike1ButtonTapped}
          isLiked={this.state.isLiked1}
          
          

        />
        {/* divider */}
        <View 
          style={{ height: normalize(3), margin: 0 }}
          backgroundColor='rgba(201,201,198)'
        />

        <ProfileCard pointerEvents={this.state.isLiked2 == 0 ? "auto" : "none"}
          style={{ flex: 1 }}
          showHome={false}
          backgroundColor='white'
          data={data2}

          onPressLike={this.like2ButtonTapped}
          onPressDislike={this.dislike2ButtonTapped}
          isLiked={this.state.isLiked2}

          
        />
      </SafeAreaView>
    );
  }
}

const stylesTopView = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'rgba(87,48,134,1)',
    width: '100%',
    flexDirection: 'row',
  },
});
