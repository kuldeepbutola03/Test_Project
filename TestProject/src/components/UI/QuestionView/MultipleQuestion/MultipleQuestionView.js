import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Platform,
    Image
} from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import ChoiceView from './ChoiceView'
import MultiplePoll from '../../Poll/MultiplePoll';
import { normalize, APP_GLOBAL_COLOR } from '../../../../../Constant';

export default class multipleQuestionView extends React.Component {
    state = {
        clicked: false
    }

    showPoll = () => {
        this.setState({ clicked: true })
    }

    renderPoll = () => {
        const { data } = this.props;
        // if(data.userAnswerId) {
            return (
                <MultiplePoll 
                    surveyAnswerList={this.props.data.surveyAnswerList}
                    userAnswerId={this.props.data.userAnswerId}
                    answerID={this.props.data.surveyAnswerList.map(a => a.answerId)}
                />
            )
        // } else return null;
    }

    renderOptions = () => {
        const { data } = this.props;
            return (
                this.props.data.surveyAnswerList.map((data, indexValue) => {
                    return (
                        
                        <RadioButton
                            labelHorizontal={true}
                            key={indexValue}
                            wrapStyle={{ marginVertical: normalize(5) }}>
                            
                            <RadioButtonInput
                                obj={data}
                                index={(indexValue)}
                                // isSelected={this.props.data.userAnswerId-1 === (indexValue)}
                                isSelected={this.props.data.userAnswerId === data.answerId}
                                onPress = {() => {
                                    if(this.props.isSurveyTaken === 'N') {
                                        // this.props.data.userAnswerId = indexValue+1;
                                        this.props.data.userAnswerId = data.answerId;
                                        this.props.onChangeData(this.props.data, this.props.indexValue);
                                    }
                                }} 
                                borderWidth={1}
                                buttonInnerColor={APP_GLOBAL_COLOR}
                                buttonOuterColor={this.props.data.userAnswerId === data.answerId ? APP_GLOBAL_COLOR : '#000'}
                                buttonSize={normalize(7)}
                                buttonOuterSize={normalize(14)}
                                buttonStyle={{}}
                                buttonWrapStyle={{marginLeft: 10 }}
                            /><TouchableOpacity onPress={() =>{
                                if(this.props.isSurveyTaken === 'N') {
                                    // this.props.data.userAnswerId = indexValue+1;
                                    this.props.data.userAnswerId = data.answerId;
                                    this.props.onChangeData(this.props.data, this.props.indexValue);
                                }
                            }}>
                            <Text style={{ marginLeft: normalize(3)}}> {data.answerText} </Text></TouchableOpacity>
                        </RadioButton>
                    );
                })
            )
    }

    render() { 
        return (
            <View style={[this.props.style, { marginBottom: normalize(10)}]}>
                <View style={{ flexDirection: 'row' , paddingTop  : 10 , paddingBottom : 10 }} >
                    <View style={{ flex: 1.5 , justifyContent: 'center', alignContent: 'center' }} >
                        <Text style={{ textAlign: 'center' ,  }}>{this.props.i}</Text>
                    </View>
                    <View style={{ flex: 8.5 , marginRight : 10 }} >
                        <Text >{this.props.data.questionText}</Text>
                    </View>
                </View>
        
        
                <View style={{ flex: 1, marginHorizontal: normalize(35), marginTop: normalize(8)}} >
                    <RadioForm
                        formHorizontal={false}
                        animation={true}>
                        {this.props.isSurveyTaken === 'Y' ? this.renderPoll() : this.renderOptions()}
                            {/* {this.renderOptions()} */}
                    </RadioForm>
                </View>
            </View>
        );
    }

    
}



