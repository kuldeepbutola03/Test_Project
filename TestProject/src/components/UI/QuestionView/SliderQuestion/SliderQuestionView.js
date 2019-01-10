import React, {Component} from 'react';
import {View, StyleSheet,Text,Slider,Button} from 'react-native';

const sliderQuestionView = (props) => (
  <View
    style={{
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Slider
      value={0}
      maximumValue={4}
      minimumValue={0}
      style={{height: 30, width: '80%'}}
      step={1}
      minimumTrackTintColor={props.color}
      maximumTrackTintColor={props.color}
      onValueChange={props.onValueChange}
    />
    <View style={{flexDirection: 'row', width: '90%'}}>
      <Text style={{width: '20%', textAlign: 'center'}}>
        Strongly{'\n'}Disagree
      </Text>
      <Text style={{width: '20%', textAlign: 'center'}}>Disagree</Text>
      <Text style={{width: '20%', textAlign: 'center'}}>Neutral</Text>
      <Text style={{width: '20%', textAlign: 'center'}}>Agree</Text>
      <Text style={{width: '20%', textAlign: 'center'}}>
        Strongly{'\n'}Agree
      </Text>
    </View>

  </View>
);


export default sliderQuestionView;

color:'red',

colorChange = color => {
    switch (color) {
      case 0: {
        this.setState ({
          color: 'red',
        });
        break;
      }
      case 1: {
        this.setState ({
          color: 'blue',
        });
        break;
      }
      case 2: {
        this.setState ({
          color: 'green',
        });
        break;
      }
      case 3: {
        this.setState ({
          color: 'black',
        });
        break;
      }
      case 4: {
        this.setState ({
          color: 'orange',
        });
        break;
      }
    }
  };