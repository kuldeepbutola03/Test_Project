import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Modal,
  TouchableHighlight,
  Picker,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {PropTypes} from 'prop-types';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryScatter,
} from 'victory-native';
import Graph from '../../components/UI/Graph/Graph';

export default class DataScreen extends Component {
  state = {
    timeFrame : {
      "6Mn" : ["0","Jan'18","Feb'18","Mar'18","Apr'18","May'18","Jun'18"],
    },
    modalVisible: false,
    timePeriod: "6 Months",
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

  render () {
    return (
      <SafeAreaView forceInset={{bottom: 'always'}} style={{flex: 1}}>
        <View
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        >
          <Modal
            animationType="slide"
            transparent
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert ('Modal has been closed.');
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
                  mode='dropdown'
                >
                  <Picker.Item label="6 Months" value="6 Months"/>
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
            footer
            timeAxis={this.state.timeFrame["6Mn"]}
            data={this.state.timePeriod}
            totalCount="2342"
            uniqueCount="923"
            onPress={this.selector}
          />

        </View>
      </SafeAreaView>
    );
  }
}
