import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
import { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import PictureQuestionView from './PictureQuestionView';
import { normalize, APP_GLOBAL_COLOR } from '../../../../../Constant';
import { widthPercentageToDP as wd, heightPercentageToDP } from 'react-native-responsive-screen';

export default class PictureQuestion extends React.Component {
    state = {
        clicked: false
    }

    renderOptions_2 = () => {
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
                            isSelected={this.props.data.userAnswerId - 1 === (indexValue)}
                            onPress={() => {
                                if (this.props.isSurveyTaken === 'N') {
                                    this.props.data.userAnswerId = indexValue + 1;
                                    this.props.onChangeData(this.props.data, this.props.indexValue);
                                }
                            }}
                            borderWidth={1}
                            buttonInnerColor={APP_GLOBAL_COLOR}
                            buttonOuterColor={this.props.data.userAnswerId - 1 === indexValue ? APP_GLOBAL_COLOR : '#000'}
                            buttonSize={normalize(7)}
                            buttonOuterSize={normalize(14)}
                            buttonStyle={{}}
                            buttonWrapStyle={{ marginLeft: 10 }}
                        />
                        <Text style={{ marginLeft: normalize(3) }}> {data.answerText} </Text>
                    </RadioButton>
                );
            })
        )
    }

    renderOptions = () => {

        
        let width = Dimensions.get('window').width/2;

        let data = this.props.data.surveyAnswerList;

        var viewArray = [];
        for (let i = 0; i < data.length; i = i + 2) {
            viewArray.push(
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ height: width, width: width}}>
                        <PictureQuestionView
                            key={i}
                            isSelected={this.props.data.userAnswerId - 1 === (i)}
                            onPress={() => {
                                if (this.props.isSurveyTaken === 'N') {
                                    this.props.data.userAnswerId = i + 1;
                                    this.props.onChangeData(this.props.data, this.props.indexValue);
                                }
                            }}
                            data={data[i]}
                        />
                    </View>
                    {i + 1 < data.length &&
                        <View style={{ height: width , width: width }}>
                            <PictureQuestionView
                                key={i + 1}
                                isSelected={this.props.data.userAnswerId - 1 === (i + 1)}
                                onPress={() => {
                                    if (this.props.isSurveyTaken === 'N') {
                                        this.props.data.userAnswerId = i + 1 + 1;
                                        this.props.onChangeData(this.props.data, this.props.indexValue);
                                    }
                                }}
                                data={data[i + 1]}
                            />
                        </View>
                    }

                </View>
            );
        }
        return (
            <View style = {{flex : 1 }}>
                {viewArray}
            </View>


            // this.props.data.surveyAnswerList.map((data, indexValue) => {
            //     return (
            //         <View style={{ height: 100, width: 100 }}>
            //             <PictureQuestionView
            //                 key={indexValue}
            //                 isSelected={this.props.data.userAnswerId - 1 === (indexValue)}
            //                 onPress={() => {
            //                     if (this.props.isSurveyTaken === 'N') {
            //                         this.props.data.userAnswerId = indexValue + 1;
            //                         this.props.onChangeData(this.props.data, this.props.indexValue);
            //                     }
            //                 }}
            //                 data={data}
            //             />
            //         </View>
            //         // <RadioButton 
            //         //     labelHorizontal={true} 
            //         //     key={indexValue} 
            //         //     wrapStyle={{ marginVertical: normalize(5) }}>
            //         //     <RadioButtonInput
            //         //         obj={data}
            //         //         index={(indexValue)}
            //         //         isSelected={this.props.data.userAnswerId-1 === (indexValue)}
            //         //         onPress = {() => {
            //         //             if(this.props.isSurveyTaken === 'N') {
            //         //                 this.props.data.userAnswerId = indexValue+1;
            //         //                 this.props.onChangeData(this.props.data, this.props.indexValue);
            //         //             }
            //         //         }} 
            //         //         borderWidth={1}
            //         //         buttonInnerColor={APP_GLOBAL_COLOR}
            //         //         buttonOuterColor={this.props.data.userAnswerId-1 === indexValue ? APP_GLOBAL_COLOR : '#000'}
            //         //         buttonSize={normalize(7)}
            //         //         buttonOuterSize={normalize(14)}
            //         //         buttonStyle={{}}
            //         //         buttonWrapStyle={{marginLeft: 10 }}
            //         //     />
            //         //     <Text style={{ marginLeft: normalize(3)}}> {data.answerText} </Text>
            //         // </RadioButton>
            //     );
            // })
        )
    }


    render() {
        return (
            <View style={[this.props.style, { marginBottom: normalize(10) }]}>
                <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }} >
                    <View style={{ flex: 1.5, justifyContent: 'center', alignContent: 'center' }} >
                        <Text style={{ textAlign: 'center', }}>{this.props.i}</Text>
                    </View>
                    <View style={{ flex: 8.5, marginRight: 10 }} >
                        <Text >{this.props.data.questionText}</Text>
                    </View>
                </View>

                {/* //marginHorizontal: normalize(35), */}
                <View style={{ flex: 1, marginTop: normalize(8) }} > 
                    <View style={styles.answerContainer}>
                        {this.renderOptions()}
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    answerContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'column',
        // width: wd('100%'),
        // marginRight: heightPercentageToDP('3%')
    }
})


