import React from 'react';
import {
    View,
    FlatList
} from 'react-native';

import { Button } from 'react-native-elements';
import MultipleQuestionView from './MultipleQuestion/MultipleQuestionView';
import OptionalQuestion from './OptionalQuestion/OptionalQuestion';
import Sliders from './SliderQuestion/Slider';
import { APP_GLOBAL_COLOR, normalize } from '../../../../Constant';


viewWithQuestionType = (props, item , index , userLanguage) => {
    let i = index+1
    if (item.questionType === 'MOQ'){
        return (<MultipleQuestionView isSurveyTaken={props.isSurveyTaken} onChangeData = {props.onChangeData} i={i} data={item} index = {index} userLanguage = {userLanguage}/>)
    }else if (item.questionType === 'LSQ'){
        return (<Sliders isSurveyTaken={props.isSurveyTaken} onChangeData = {props.onChangeData} i={i} index={index}  data = {item} userLanguage = {userLanguage}/>)
    }else if (item.questionType === 'YNQ') {
        return (<OptionalQuestion isSurveyTaken={props.isSurveyTaken} onChangeData = {props.onChangeData} i={i} data ={item} index = {index} userLanguage = {userLanguage}/>)
    }
    return null;
}

export default questionniareListView = props => {
    _keyExtractor = (item, index) => index + "abc";
    return (
        <FlatList refreshing = {true} ref = {(_scroll) => {props._scrollView = _scroll}}
            data={props.data}
            keyExtractor={this._keyExtractor}
            extraData={props.data}
            ListFooterComponent={() => {
                return (
                    <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Button 
                            onPress={() => props.updateQuestionaire(props.survey)} 
                            title="Submit"
                            buttonStyle={{ backgroundColor: APP_GLOBAL_COLOR, borderRadius: 100, paddingHorizontal: normalize(15) }} 
                            disabled={props.isSurveyTaken === 'N' ? false : true }
                        />
                    </View>
                )
            }}
            renderItem={({ item , index }) => 
                <View>{viewWithQuestionType(props,item,index,props.userLanguage)}
                    <View style = {{ height : 10}}></View>
                <View style = {{ height : 1 , backgroundColor : '#ddd', marginLeft : 10, marginRight : 10}}>
                </View>
                </View> 
            }    
        />

    )
};
