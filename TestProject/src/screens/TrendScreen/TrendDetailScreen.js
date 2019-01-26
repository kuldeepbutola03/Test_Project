import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Modal,
  Picker,
  Platform,
} from 'react-native';
import {PropTypes} from 'prop-types';
import {normalize} from '../../../Constant';
import CustomButton from '../../components/UI/ButtonMod/CustomButtom';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Navigation} from 'react-native-navigation';
import Graph from '../../components/UI/Graph/Graph';
import HeatMap from '../../components/UI/HeatMap/HeatMap';

export default class TrendDetailScreen extends Component {
  static propTypes = {
    componentId: PropTypes.string,
  };

  state = {
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
    timePeriod: '6 Months',
  };

  setModalVisible = visible => {
    this.setState ({modalVisible: visible});
  };

  selector = () => {
    this.setModalVisible (true);
  };

  _onValueChange = itemValue => {
    this.setState ({
      timePeriod: itemValue,
    });
    this.setModalVisible (!this.state.modalVisible);
  };

  constructor (props) {
    super (props);
  }
  homeButtonTapped = () => {
    Navigation.pop (this.props.componentId);
  };

  onPress2 = itemValue => {
    this.setState ({
      timePeriod: itemValue,
    });
  };

  render () {
    let list = [
      {key: 'ATTRIBUTE NAME', value: 'ATTRIBUTE VALUE'},
      {key: 'Devin', value: 'Devin'},
      {key: 'Jackson', value: 'Devin'},
      {key: 'James', value: 'Devin'},
      {key: 'Joel', value: 'Devin'},
      {key: 'John', value: 'Devin'},
      {key: 'Jillian', value: 'Devin'},
      {key: 'Jimmy', value: 'Devin'},
      {key: 'Julie', value: 'Devin'},
    ];

    // var lss = [{key : 'ATTRIBUTE NAME'}];
    // lss.append (list);

    // list.push({key : 'ATTRIBUTE NAME'} index : 0);

    let data = {
      name: 'JOHNSON ADOLPH BLAINE CHARLES',
      area: 'DNTN | WASHINGTON',
      totalCount: 1000,
      uniqueCount: 123,
      score: {
        gpr: {
          score: '63%',
          name: 'GPR',
        },
        agpr: {
          score: '43',
          name: 'AGPR',
        },
        extraCount: {
          score: '3.5',
          name: 'XYZ',
        },
      },

      data: list,
    };

    return (
      <SafeAreaView
        forceInset={{bottom: 'always'}}
        style={{flex: 1, backgroundColor: 'rgba(210,210,208,1)'}}
      >

        <View
          style={topViewStyle.headerView}
          backgroundColor="rgba(242,241,244,1)"
        >
          <View style={{flex: 1, backgroundColor: 'rgba(87,48,134,1)'}}>
            <CustomButton
              style={{
                flexDirection: 'row',
                flex: 1,
              }}
              source={require ('../../assets/back.png')}
              onPress={this.homeButtonTapped}
            />
          </View>

          <View style={topViewStyle.textheaderView}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              minimumFontScale={0.8}
              style={topViewStyle.textView}
            >
              {data.name}
            </Text>
            <Text style={topViewStyle.textView2}>{data.area}</Text>
          </View>

        </View>

        {/* secondViewStyle */}
        <View style={secondViewStyle.secondView}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          >
            <Modal
              animationType="slide"
              transparent
              visible={this.state.modalVisible}
              onRequestClose={() => {
                this.setModalVisible (!this.state.modalVisible);
              }}
            >

              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0,0,0,0)',
                }}
              >
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 1,
                    width: '80%',
                    height: 250,
                    backgroundColor: 'white',
                  }}
                >

                  <Picker
                    selectedValue={this.state.timePeriod}
                    style={{width: '100%'}}
                    onValueChange={this._onValueChange}
                    mode="dropdown"
                  >
                    <Picker.Item label="6 Months" value="6 Months" />
                    <Picker.Item label="1 Year" value="1 Year" />
                    <Picker.Item label="2 Year" value="2 Year" />
                    <Picker.Item label="3 Year" value="3 Year" />
                    <Picker.Item label="4 Year" value="4 Year" />
                    <Picker.Item label="5 Year" value="5 Year" />
                    <Picker.Item label="6 Year" value="6 Year" />
                  </Picker>

                </View>
              </View>
            </Modal>

            <Graph
              header
              footer={false}
              timeAxis={this.state.timeFrame[this.state.timePeriod]}
              data={this.state.timePeriod}
              totalCount="2342"
              uniqueCount="923"
              onPress={Platform.OS === 'ios' ? this.selector : this.onPress2}
              percentage={this.state.percentage[this.state.timePeriod]}
              os={Platform.OS === 'android' ? 'android' : 'ios'}
            />
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          >

            <HeatMap />
          </View>
        </View>

      </SafeAreaView>
    );
  }
}

const topViewStyle = StyleSheet.create ({
  headerView: {
    flex: 0.075,
    // position: 'absolute',
    // backgroundColor: 'red',
    // backgroundColor: 'rgba(244,244,246,1)',
    justifyContent: 'center',
    // alignItems: 'center'
    // borderRadius: 10,
    flexDirection: 'row',
    // height: '20%',
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
    fontSize: normalize (13),
    // fontSize: PixelRatio.get () <= 2 ? 14 : 15,
    //   fontWeight: 'bold',
  },
  textView2: {
    // flex: 1,
    // position: 'absolute',
    backgroundColor: 'transparent',
    marginLeft: 10,
    fontSize: normalize (12),
    // fontSize: PixelRatio.get () <= 2 ? 12 : 13,
    //   fontWeight: 'bold',
  },
});

const secondViewStyle = StyleSheet.create ({
  secondView: {
    flex: 0.925,
    // position: 'absolute',
    backgroundColor: 'transparent',
    // flexDirection: 'row',
  },
});

const styles = StyleSheet.create ({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
