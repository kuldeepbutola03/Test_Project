import React, {Component} from 'react';
import { View, StyleSheet, Text, Slider, LayoutAnimation, UIManager } from 'react-native';
import { Button } from 'react-native-elements';
import { normalize } from '../../../../Constant'

class ProfileCardSlider extends Component {
    state = {
        color:'#000',
        value: 1,
        
    }

    componentDidMount() {
      // UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    componentWillUpdate() {
      // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }

    render(){
        const { value } = this.state;
        return(
            <View >
                {/* <View style={{flexDirection: 'row', paddingTop: 10, paddingBottom: 10}}>
                <View
                    style={{flex: 1.5, justifyContent: 'center', alignContent: 'center'}}
                >
                    <Text style={{textAlign: 'center'}}>{this.props.data.questionId}</Text>
                </View>
                <View style={{flex: 8.5, marginRight: 10}}>
                    <Text>{this.props.data.questionText}</Text>
                </View>
                </View> */}
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
                        value={value}
                        maximumValue={5}
                        minimumValue={1}
                        style={{height: 20, width: '80%', marginBottom: normalize(10)}}
                        step={1}
                        minimumTrackTintColor={this.state.color}
                        maximumTrackTintColor={this.state.color}
                        // onValueChange={this.colorChange}
                        onValueChange={(value) =>  {
                            this.setState({ value })
                            console.log(value)

                        }}
                    />
                    <View style={{flexDirection: 'row', width: '90%', marginBottom: normalize(10)}}>
                        <Text style={{width: '20%', textAlign: 'center',fontSize:11}}>
                            {/* Strongly{'\n'}Disagree */}
                            Useless
                        </Text>
                        <Text  style={{ width: '20%', textAlign: 'center',fontSize:11}}>Dislike</Text>
                        <Text style={{width: '20%', textAlign: 'center',fontSize:11}}>Neutral</Text>
                        <Text style={{width: '20%', textAlign: 'center',fontSize:11}}>Like</Text>
                        <Text style={{width: '20%', textAlign: 'center',fontSize:11}}>
                            {/* Strongly{'\n'}Agree */}
                            Awesome
                        </Text>
                    </View>
                    <View>

                    </View>
                    <Button 
                        title="Submit"
                        type="solid"
                        buttonStyle={{ backgroundColor: 'rgba(87,48,134,1)', borderRadius: normalize(20) }}
                        titleStyle={{ fontSize: 14, paddingHorizontal: normalize(15) }}
                    />
                </View>
            </View>
          
            {/* {this.renderPoll()} */}
          </View>)
        }
  
    };

export default ProfileCardSlider;
