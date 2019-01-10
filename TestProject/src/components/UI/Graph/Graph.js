import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Picker,
  Modal,
  TouchableHighlight,
  TextInput,
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
import {normalize} from '../../../../Constant';

const graph = props => {
  return (
    <View style={{flex: 1}}>

      {/* Header */}
      {props.header &&
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            padding: 3,
            flex: 0.07,
            backgroundColor: 'white',
          }}
        >
          <View style={{width: '35%', margin: 1, borderRightWidth: 1}}>
            <Text
              style={{
                flex: 1,
                fontSize: normalize (12),
                textAlign: 'center',
                textAlignVertical: 'center',
                paddingTop: 1,
              }}
            >
              TOTAL: {props.totalCount}
            </Text>
          </View>
          <View style={{width: '35%', margin: 1}}>
            <Text
              style={{
                flex: 1,
                fontSize: normalize (12),
                textAlign: 'center',
                textAlignVertical: 'center',
                paddingTop: 1,
              }}
            >
              UNIQUE: {props.uniqueCount}
            </Text>
          </View>

          {props.os === 'ios' &&
            <TouchableOpacity
              
              onPress={props.onPress}
              style={{
                borderRadius: 10,
                backgroundColor: '#E9EEF0',
                width: '28%',
                margin: 2,
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  flex: 1,
                  // paddingTop: 2,
                }}
              >
                {props.data}
              </Text>
            </TouchableOpacity>}

          {props.os === 'android' &&
            <View style={{width: '30%', margin: 1}}>
              <Picker
                selectedValue={props.data}
                mode="dropdown"
                style={{flex: 1}}
                onValueChange={props.onPress}
              >
                <Picker.Item label="6 Months" value="6 Months" />
                <Picker.Item label="1 Year" value="1 Year" />
                <Picker.Item label="2 Year" value="2 Year" />
                <Picker.Item label="3 Year" value="3 Year" />
                <Picker.Item label="4 Year" value="4 Year" />
                <Picker.Item label="5 Year" value="5 Year" />
                <Picker.Item label="6 Year" value="6 Year" />
              </Picker>
            </View>}

        </View>}

      {/* Middle */}
      <View
        overflow='hidden'
        style={{
          backgroundColor: '#E9EEF0',
          flex: 0.92,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <VictoryChart
          theme={VictoryTheme.material}
          style={{flex: 1}}
          padding={{top: 45, bottom: 70, right: 45, left: 45}}
        >
          <VictoryLine
            style={{
              data: {stroke: '#c43a31'},
              parent: {border: '2px solid #ccc'},
            }}
            // labels={(datum) => datum.y}
            domain={{y: [0, 100]}}
            data={[
              {x: props.timeAxis[0], y: props.percentage[0]},
              {x: props.timeAxis[1], y: props.percentage[1]},
              {x: props.timeAxis[2], y: props.percentage[2]},
              {x: props.timeAxis[3], y: props.percentage[3]},
              {x: props.timeAxis[4], y: props.percentage[4]},
              {x: props.timeAxis[5], y: props.percentage[5]},
            ]}
          />
          <VictoryScatter
            data={[
              {x: props.timeAxis[0], y: props.percentage[0]},
              {x: props.timeAxis[1], y: props.percentage[1]},
              {x: props.timeAxis[2], y: props.percentage[2]},
              {x: props.timeAxis[3], y: props.percentage[3]},
              {x: props.timeAxis[4], y: props.percentage[4]},
              {x: props.timeAxis[5], y: props.percentage[5]},
            ]}
            size={5}
            style={{data: {fill: '#000000'}}}
          />
        </VictoryChart>
      </View>

      {/* Footer */}
      {props.footer &&
        <View
          style={{
            backgroundColor: '#E9EEF0',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 0.06,
          }}
        >
          <Text style={{marginRight: 4, paddingBottom:3, fontSize: normalize (12)}}>
            TOTAL: {props.totalCount}
          </Text>
          <Text style={{marginLeft: 4,paddingBottom:3, fontSize: normalize (12)}}>
            UNIQUE: {props.uniqueCount}
          </Text>
        </View>}
    </View>
  );
};

export default graph;
