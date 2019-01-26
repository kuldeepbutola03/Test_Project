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
} from 'react-native';

import ProfileCard from '../../components/UI/ProfileCard/ProfileCard';
// import Apis from '../../../Apis';
import { Navigation } from 'react-native-navigation';
import { AREA_CDM, DEBUG } from '../../../Apis';
export default class FireDepartmentScreen extends Component {
  constructor(props) {
    super(props);



    this.state = {
      APIresponse : null
    }

  }

  homeButtonTapped = () => {
    Navigation.pop(this.props.componentId);
  };

  componentDidMount() {
    this.serverHitForDetail();
  }
  serverHitForDetail() {
    if (DEBUG == 0) {
      return;
    }



    fetch(AREA_CDM, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: this.props.user_id,
        latLngSeparatedByComma: this.props.lat_lon,

      }),
    }).then((response) => response.json())
      .then((responseJson) => {

        this.setState({ APIresponse: responseJson });
        
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
        { attributeName: 'Jillian', attributeValue: 'Devin' },
        { attributeName: 'Jimmy', attributeValue: 'Devin' },
        { attributeName: 'Julie', attributeValue: 'Devin' },
      ];
    let abc =
      [
        
        { attributeName: 'Devin', attributeValue: 'Devin' },
        { attributeName: 'Jackson', attributeValue: 'Devin' },
        { attributeName: 'James', attributeValue: 'Devin' },
        { attributeName: 'Joel', attributeValue: 'Devin' },
        { attributeName: 'John', attributeValue: 'Devin' },
        { attributeName: 'Jillian', attributeValue: 'Devin' },
        { attributeName: 'Jimmy', attributeValue: 'Devin' },
        { attributeName: 'Julie', attributeValue: 'Devin' },
      ];

    var list = [{ attributeName: 'ATTRIBUTE NAME', attributeValue: 'ATTRIBUTE VALUE' }];
    list.push(...(this.state.APIresponse ? this.state.APIresponse.resource1AttributesList : abc2));

    var list2 = [{ attributeName: 'ATTRIBUTE NAME', attributeValue: 'ATTRIBUTE VALUE' }];
    list.push(...(this.state.APIresponse ? this.state.APIresponse.resource2AttributesList : abc));

    let data = {
      name: this.state.APIresponse ? this.state.APIresponse.resourceName1 : 'JOHNSON ADOLPH BLAINE CHARLES',
      area: this.state.APIresponse ? this.state.APIresponse.customAreaName : 'DNTN | Washington ',
      totalCount: this.state.APIresponse ? this.state.APIresponse.resourceTotalFlagCount1 : 1000,
      uniqueCount: this.state.APIresponse ? this.state.APIresponse.resourceTotalFlagUniqueCount1 : 123,
      score: {
        gpr: {
          score: this.state.APIresponse ? this.state.APIresponse.resourceGPR1 : '63%',
          name: 'GPR',
        },
        agpr: {
          score: this.state.APIresponse ? '' : '43',
          name: this.state.APIresponse ? '' :'AGPR',
        },
        extraCount: {
          score: this.state.APIresponse ? '' : '3.5',
          name: this.state.APIresponse ? '' : 'XYZ',
        },
      },

      data: list,
    };

    let data2 = {
      name: this.state.APIresponse ? this.state.APIresponse.resourceName2 : 'JOHNSON ADOLPH BLAINE CHARLES',
      area: this.state.APIresponse ? this.state.APIresponse.customAreaName : 'DNTN | Washington ',
      totalCount: this.state.APIresponse ? this.state.APIresponse.resourceTotalFlagCount2 : 1000,
      uniqueCount: this.state.APIresponse ? this.state.APIresponse.resourceTotalFlagUniqueCount2 : 123,
      score: {
        gpr: {
          score: this.state.APIresponse ? this.state.APIresponse.resourceGPR2 : '63%',
          name: 'GPR',
        },
        agpr: {
          score: this.state.APIresponse ? '' : '43',
          name: this.state.APIresponse ? '' :'AGPR',
        },
        extraCount: {
          score: this.state.APIresponse ? '' : '3.5',
          name: this.state.APIresponse ? '' : 'XYZ',
        },
      },

      data: list2,
    };

    return (
      <SafeAreaView
        forceInset={{ bottom: 'always' }}
        style={{ flex: 1, backgroundColor: 'rgba(210,210,208,1)' }}
      >
        <ProfileCard
          style={{ flex: 1 }}
          showHome={true}
          backgroundColor="white"
          data={data}
          onPress={this.homeButtonTapped}
        />
        <ProfileCard
          style={{ flex: 1 }}
          showHome={false}
          backgroundColor="white"
          data={data}
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
