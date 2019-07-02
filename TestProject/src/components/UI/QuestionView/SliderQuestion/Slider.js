import React, { Component } from 'react';
import { View, StyleSheet, Text, LayoutAnimation, UIManager } from 'react-native';
import Slider from "react-native-slider";
import SliderPoll from '../../Poll/SliderPoll';
import { normalize, APP_GLOBAL_COLOR } from '../../../../../Constant';

class Sliders extends Component {
  state = {
    color: this.props.color ? this.props.color : APP_GLOBAL_COLOR,
    clicked: false,
  }

  componentDidMount() {
    // UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  colorChange = color => {
    switch (color) {
      case 0: {
        this.setState({
          color: '#FF0000',
        });
        break;
      }
      case 1: {
        this.setState({
          color: '#FFA500',
        });
        break;
      }
      case 2: {
        this.setState({
          color: '#FFFF00',
        });
        break;
      }
      case 3: {
        this.setState({
          color: '#7FFF00',
        });
        break;
      }
      case 4: {
        this.setState({
          color: '#00CC00',
        });
        break;
      }
    }
  };

  componentWillUpdate() {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }

  showPoll = () => {
    this.setState({ clicked: true })
  }

  renderPoll = () => {
    // return null;
    // console.log(this.props)
    const { data } = this.props;
    if (data.userAnswerId) {
      return (
        <SliderPoll
          surveyAnswerList={this.props.data.surveyAnswerList}
          userAnswerId={this.props.data.userAnswerId}
        />
      )
    } else return null;
  }

  disabled = () => {
    let disable;

    if (this.props.data.userAnswerId) {
      disable = true;
    } else {
      disable = false
    }

    return disable;
  }

  onValueChange = (value) => {
    this.props.data.userAnswerId = value;
    this.props.onChangeData(this.props.data, this.props.index);
  }
  getLanguageCode(language) {
    if (language === 'hi') {
      let menu = ['दृढ़तापूर्वक\nअसहमत', 'असहमत', 'निष्पक्ष', 'सहमत', "दृढ़तापूर्वक\nसहमत"];
      // this.setState({ menuName: menu });
      return menu;
    }

    return ["Strongly\nDisagree", 'Disagree', 'Neutral', 'Agree', "Strongly\nAgree"];

  }
  render() {
    const dataO = this.getLanguageCode(this.props.userLanguage);
    return (
      <View style={{ marginBottom: normalize(10) }} >
        <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
          <View
            style={{ flex: 1.5, justifyContent: 'center', alignContent: 'center' }}
          >
            <Text style={{ textAlign: 'center' }}>{this.props.i}</Text>
          </View>
          <View style={{ flex: 8.5, marginRight: 10 }}>
            <Text>{this.props.data.questionText}</Text>
          </View>
        </View>

        {(this.props.isSurveyTaken === 'N') ?
          <View style={{ flex: 1, height: 50, flexDirection: 'row' }}>


            <View
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >

              <Slider
                disabled={this.props.isSurveyTaken === 'N' ? false : true}
                value={this.props.data.userAnswerId ? this.props.data.userAnswerId : this.props.data.surveyAnswerList[0].answerId + 2}
                // maximumValue={this.props.data.surveyAnswerList[this.props.data.surveyAnswerList.length - 1].answerId} //{4}
                maximumValue={this.props.data.surveyAnswerList[0].answerId + 4} //{4}
                // maximumValue={this.props.data.surveyAnswerList[4].answerId}
                minimumValue={this.props.data.surveyAnswerList[0].answerId}//{0}
                style={{ height: 30, width: '80%', marginBottom: normalize(5) }}
                step={1}
                minimumTrackTintColor={this.state.color}
                maximumTrackTintColor={this.state.color}
                trackStyle={{ height: 1 }}
                thumbStyle={{
                  shadowColor: '#000000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowRadius: 5,
                  shadowOpacity: 0.5,
                  elevation: 2
                }}
                thumbTintColor={this.props.data.userAnswerId === null ? '#fff' : APP_GLOBAL_COLOR}
                onValueChange={(value) => {
                  this.onValueChange(value);
                }}
              />
              <View style={{ flexDirection: 'row', width: '90%' }}>
                <Text style={{ width: '20%', textAlign: 'center', fontSize: 11 }}>
                  {dataO[0]}
                </Text>
                <Text style={{ width: '20%', textAlign: 'center', fontSize: 11 }}>{dataO[1]}</Text>
                <Text style={{ width: '20%', textAlign: 'center', fontSize: 11 }}>{dataO[2]}</Text>
                <Text style={{ width: '20%', textAlign: 'center', fontSize: 11 }}>{dataO[3]}</Text>
                <Text style={{ width: '20%', textAlign: 'center', fontSize: 11 }}>
                  {dataO[4]}
                </Text>
              </View>

            </View>

          </View>
          :
          this.renderPoll()
        }

      </View >)
  }

};

export default Sliders;
