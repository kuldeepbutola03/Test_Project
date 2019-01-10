import React, {Component} from 'react';
import {View, StyleSheet, Text, Slider, Button} from 'react-native';


class Sliders extends Component {

    state = {
        color:'#FFFF00'
    }

    colorChange = color => {
        switch (color) {
          case 0: {
            this.setState ({
              color: '#FF0000',
            });
            break;
          }
          case 1: {
            this.setState ({
              color: '#FFA500',
            });
            break;
          }
          case 2: {
            this.setState ({
              color: '#FFFF00',
            });
            break;
          }
          case 3: {
            this.setState ({
              color: '#7FFF00',
            });
            break;
          }
          case 4: {
            this.setState ({
              color: '#00CC00',
            });
            break;
          }
        }
      };

    render(){
        return(<View >
            <View style={{flexDirection: 'row', paddingTop: 10, paddingBottom: 10}}>
              <View
                style={{flex: 1.5, justifyContent: 'center', alignContent: 'center'}}
              >
                <Text style={{textAlign: 'center'}}>{this.props.data.number}</Text>
              </View>
              <View style={{flex: 8.5, marginRight: 10}}>
                <Text>{this.props.data.question}</Text>
              </View>
            </View>
        
            <View style={{flex: 1, height: 50, flexDirection: 'row'}}>
        
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Slider
                  value={2}
                  maximumValue={4}
                  minimumValue={0}
                  style={{height: 30, width: '80%'}}
                  step={1}
                  minimumTrackTintColor={this.state.color}
                  maximumTrackTintColor={this.state.color}
                  onValueChange={this.colorChange}
                  // onValueChange={(value) =>  {
                  //   props.data.colorValue = value;
                  //   props.onChangeData(props.data, props.index);
                  // }}
                />
                <View style={{flexDirection: 'row', width: '90%'}}>
                  <Text style={{width: '20%', textAlign: 'center',fontSize:11}}>
                    Strongly{'\n'}Disagree
                  </Text>
                  <Text  style={{ width: '20%', textAlign: 'center',fontSize:11}}>Disagree</Text>
                  <Text style={{width: '20%', textAlign: 'center',fontSize:11}}>Neutral</Text>
                  <Text style={{width: '20%', textAlign: 'center',fontSize:11}}>Agree</Text>
                  <Text style={{width: '20%', textAlign: 'center',fontSize:11}}>
                    Strongly{'\n'}Agree
                  </Text>
                </View>
              </View>
            </View>
          </View>)
    }
  
    };

export default Sliders;
