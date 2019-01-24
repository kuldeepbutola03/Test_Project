import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TimerMixin,
} from 'react-native';

// import ProfileCard from '../../components/UI/ProfileCard/ProfileCard';
// import Apis from '../../../Apis';
import { Navigation } from 'react-native-navigation';
// import CustomButton from '../../components/UI/ButtonMod/CustomButtom';
// import {normalize} from '../../../Constant'
import { PropTypes } from 'prop-types';
import TrendProfile from '../../components/UI/TrendProfile/TrendProfile';
import { TREND_ } from '../../../Apis';
import { authHeaders } from '../../../Constant';
export default class TrendScreen extends Component {
  state = {
    timer: null,
    counter: 0,

    pdmResponse: null,
    cdmResponse: null,

    timeFrame: {

      '6 Months': ["Jan'18", "Feb'18", "Mar'18", "Apr'18", "May'18", "Jun'18"],
      '1 Year': ["Mar'18", "Jun'18", "Sep'18", "Dec'18", null, null],
      '2 Year': ['2017', '2018', null, null, null, null],
      '3 Year': ['2016', '2017', '2018', null, null, null],
      '4 Year': ['2015', '2016', '2017', '2018', null, null],
      '5 Year': ['2014', '2015', '2016', '2017', '2018', null],
      '6 Year': ['2013', '2014', '2015', '2016', '2017', '2018'],
    },
    percentage: {

      '6 Months': [20, 40, 70, 60, 80, 20],
      '1 Year': [40, 60, 30, 70, null, null],
      '2 Year': [50, 30, null, null, null, null],
      '3 Year': [30, 50, 90, null, null, null],
      '4 Year': [20, 40, 90, 30, null, null],
      '5 Year': [30, 60, 20, 50, 70, null],
      '6 Year': [40, 30, 50, 60, 80, 60],
    },
    modalVisible: false,
    timePeriod: '3 Months',
  };

  componentDidMount() {
    this.getDataFromServer(true)
   

  }

  static propTypes = {
    componentId: PropTypes.string,
  };
  constructor(props) {
    super(props);
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


  getDataFromServer(isPDM) {


    let data = JSON.stringify({
      resourceId: isPDM ? this.props.resourceIdPDM : this.props.resourceIdCDM,
      resourceType2: isPDM ? "PDM" : "CDM",
    });

    // "resourceId" : "1",
    //   "resourceType2" : "PDM"

    // setTimeout(function () {
    // alert(data);


    fetch(TREND_, {
      method: 'POST',
      headers: authHeaders(),
      body: data,
    }).then((response) =>
      response.json())
      .then((responseJson) => {

        alert(responseJson.resourceName);
        console.log("111111111`");
        console.log(responseJson);



        if (responseJson) {
          let data = isPDM ? { pdmResponse: responseJson } : { cdmResponse: responseJson };
          this.setState(data);
          if (isPDM) {
            this.getDataFromServer(false);
          }
        } else {

          // setTimeout(function () {
          alert("something went wrong");
          // }, 100)


        }


        // return responseJson;
      })
      .catch((error) => {
        alert(error);
        console.error(error);
      });
  }

  getDataFromObject(dataObject) {

    let list = [
      { key: 'ATTRIBUTE NAME', value: 'ATTRIBUTE VALUE' },
      { key: 'Devin', value: 'Devin' },
      { key: 'Jackson', value: 'Devin' },
      { key: 'James', value: 'Devin' },
      { key: 'Joel', value: 'Devin' },
      { key: 'John', value: 'Devin' },
      { key: 'Jillian', value: 'Devin' },
      { key: 'Jimmy', value: 'Devin' },
      { key: 'Julie', value: 'Devin' },
    ];

    return {
      name: dataObject ? dataObject.resourceName : '',
      area: dataObject ? (dataObject.resourceType + " | " + dataObject.resourceType2) : '',
      totalCount: dataObject ? dataObject.resourceTotalFlagCount : 0,
      uniqueCount: dataObject ? dataObject.resourceTotalFlagUniqueCount : 0,
      score: {
        gpr: {
          score: dataObject ? (dataObject.resourceGPR + '%') : '0%',
          name: 'GPR',
        },
        agpr: {
          score: '0',
          name: 'AGPR',
        },
        extraCount: {
          score: '0',
          name: 'XYZ',
        },
      },

      data: dataObject ? dataObject.basicResourceDetailsPojoList : list,
    }
  }

  render() {
    

    // var lss = [{key : 'ATTRIBUTE NAME'}];
    // lss.append (list);

    // list.push({key : 'ATTRIBUTE NAME'} index : 0);

    let dataPDM = this.getDataFromObject(this.state.pdmResponse);
    let dataCDM = this.getDataFromObject(this.state.cdmResponse);

    return (
      <SafeAreaView
        forceInset={{ bottom: 'always' }}
        style={{ flex: 1, backgroundColor: 'rgba(210,210,208,1)' }}
      >
        <ScrollView
          ref={view => (this._scrollView = view)}
          horizontal={true}
          pagingEnabled={true}
        >
          <TrendProfile
            timeFrame={this.state.timeFrame}
            percentage={this.state.percentage}
            onPressProfile={this.handlePress}
            style={{
              flex: 1,
              height: '100%',
              width: Dimensions.get('window').width,
            }}
            backgroundColor="transparent"
            data={dataCDM}
            onPress={this.homeButtonTapped}
            image = {this.state.pdmResponse ? { uri: 'data:image/png;base64,' + this.state.pdmResponse.resourceImageData } : require("../../assets/1.png") }
            catImage = {this.state.pdmResponse ? { uri: 'data:image/png;base64,' + this.state.pdmResponse.resourceCategoryLogoData } : null }
          />
          <TrendProfile
            timeFrame={this.state.timeFrame}
            percentage={this.state.percentage}
            onPressProfile={this.handlePress}
            style={{
              flex: 1,
              height: '100%',
              width: Dimensions.get('window').width,
            }}
            backgroundColor="transparent"
            data={dataPDM}
            onPress={this.homeButtonTapped}
            image={this.state.cdmResponse ? { uri: 'data:image/png;base64,' + this.state.cdmResponse.resourceImageData } : require("../../assets/2.png")}
            catImage = {this.state.pdmResponse ? { uri: 'data:image/png;base64,' + this.state.pdmResponse.resourceCategoryLogoData } : null }
          />

        </ScrollView>
      </SafeAreaView>
    );
  }
}

const cardViewStyle = StyleSheet.create({
  headerView: {
    // flex: 0.15,
    // position: 'absolute',
    // backgroundColor: 'red',
    // backgroundColor: 'rgba(244,244,246,1)',
    justifyContent: 'center',
    // alignItems: 'center'
    // borderRadius: 10,
    flexDirection: 'row',
    height: '20%',
  },

  textheaderView: {
    flex: 5,
    // position: 'absolute',
    // backgroundColor: 'red',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    // alignItems: 'center'
    // borderRadius: 10,
    // height: 50
    // marginLeft : 0,
  },

  textView: {
    // flex: 1,
    // position: 'absolute',
    backgroundColor: 'transparent',
    marginLeft: 10,
    fontSize: 13, // normalize(13),
    // fontSize: PixelRatio.get () <= 2 ? 14 : 15,
    //   fontWeight: 'bold',
  },
  textView2: {
    // flex: 1,
    // position: 'absolute',
    backgroundColor: 'transparent',
    marginLeft: 10,
    fontSize: 12, // normalize(12),
    // fontSize: PixelRatio.get () <= 2 ? 12 : 13,
    //   fontWeight: 'bold',
  },
});

const secondHalfView = StyleSheet.create({
  secondHalf: {
    flex: 0.85,
    // position: 'absolute',
    // backgroundColor: 'red',
    // backgroundColor: 'rgba(244,244,246,1)',
    justifyContent: 'center',
    // alignItems: 'center'
    // borderRadius: 10,
    flexDirection: 'row',
    height: '80%',
  },
});
