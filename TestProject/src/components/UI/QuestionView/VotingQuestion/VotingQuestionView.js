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
// import ChoiceView from './ChoiceView'
import MultiplePoll from '../../Poll/MultiplePoll';
import { normalize, APP_GLOBAL_COLOR, defaultUser } from '../../../../../Constant';
import FastImage from 'react-native-fast-image';
import { widthPercentageToDP as wd, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default class VotingQuestionView extends React.Component {
    state = {
        // clicked: false
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
        // let array = this.props.data.surveyAnswerList;
        // array.push("NOTA");
        return ( 
            this.props.data.surveyAnswerList.map((data, indexValue) => {

                
                let pictureSource =
                    data.imageData ?
                        {
                            uri: "data:image/png;base64," + data.imageData,
                            priority: FastImage.priority.normal
                        }
                        : null;
                return (

                
                    <View style={{flex: 1, padding: normalize(5)}} >
                            <View style={{ flex: 1, borderRadius : 10,borderColor : 'grey', borderWidth : 1, padding: normalize(2), flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

                                <Text style={{ flex: 1, marginRight: normalize(5) , marginLeft : 1 }}> {data.answerText} </Text>
                                {/* <View style={{alignItems: 'center' , justifyContent : 'center' , flex : 1 , height: hp('10%'),width: hp('10%') , backgroundColor : 'red'}}> */}
                                <FastImage
                                    resizeMode="contain"
                                    style={styles.image}
                                    source={pictureSource}
                                />
                                <View style={{ width: 70, borderRadius : 10, height: null, backgroundColor: 'blue' }}>
                                    <TouchableOpacity style={{ flex: 1 , alignItems : 'center' , justifyContent : 'center'}} onPress={() => {
                                        if (this.props.isSurveyTaken === 'N') {
                                            // this.props.data.userAnswerId = indexValue+1;
                                            this.props.data.userAnswerId = data.answerId;
                                            this.props.onChangeData(this.props.data, this.props.indexValue);
                                        }
                                    }} />
                                </View>
                            </View>
                    </View>

                );
            })
        )
    }

    render() {
        return (
            <View style={[this.props.style, { marginBottom: normalize(10) }]}>
                <View style={{ flexDirection: 'row', padding : 10 }} >
                    {/* <View style={{ flex: 1.5, justifyContent: 'center', alignContent: 'center' }} >
                        <Text style={{ textAlign: 'center', }}>{this.props.i}</Text>
                    </View> */}
                    <View style={{ flex: 8.5 }} >
                        <Text> {this.props.data.questionText} </Text>
                    </View>
                </View>


                {/* <View style={{ flex: 1, marginHorizontal: normalize(35), marginTop: normalize(8) }} > */}

                {this.renderOptions()}
                {/* </View> */}
            </View>
        );
    }


}

const styles = StyleSheet.create({


    image: {
        // flex: 1,
        height: hp('5%'),
        width: hp('5%'),
        marginRight: 10,
        // backgroundColor: 'blue'
        // marginBottom: hp('2%'),
    },
});



