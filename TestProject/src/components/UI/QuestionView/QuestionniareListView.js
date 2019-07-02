import React from 'react';
import {
    View,
    FlatList
} from 'react-native';

import { Button } from 'react-native-elements';
import MultipleQuestionView from './MultipleQuestion/MultipleQuestionView';
import OptionalQuestion from './OptionalQuestion/OptionalQuestion';
import PictureQuestion from './PictureQuestion/PictureQuestion';
import VotingQuestionView from './VotingQuestion/VotingQuestionView';
import Sliders from './SliderQuestion/Slider';
import { APP_GLOBAL_COLOR, normalize, showAdsTilesRectangle } from '../../../../Constant';


viewWithQuestionType = (props, item, index, userLanguage) => {

    let i = index + 1
    if (item.questionType === 'MOQ') {
        return (<MultipleQuestionView color = {props.color} isSurveyTaken={props.isSurveyTaken} onChangeData={props.onChangeData} i={i} data={item} index={index} userLanguage={userLanguage} />)
    } else if (item.questionType === 'LSQ') {
        return (<Sliders color = {props.color}  isSurveyTaken={props.isSurveyTaken} onChangeData={props.onChangeData} i={i} index={index} data={item} userLanguage={userLanguage} />)
    } else if (item.questionType === 'YNQ') {
        return (<OptionalQuestion color = {props.color}  isSurveyTaken={props.isSurveyTaken} onChangeData={props.onChangeData} i={i} data={item} index={index} userLanguage={userLanguage} />)
    } else if (item.questionType === 'PQ') {
        return (<PictureQuestion color = {props.color}  isSurveyTaken={props.isSurveyTaken} onChangeData={props.onChangeData} i={i} data={item} index={index} userLanguage={userLanguage} />)
    }
    return null;
}
viewWithQuestionForVote = (props, item, index, userLanguage) => {
    let i = index + 1
    // return (<PictureQuestion isSurveyTaken={props.isSurveyTaken} onChangeData={props.onChangeData} i={i} data={item} index={index} userLanguage={userLanguage} />);
    return  (<VotingQuestionView isSurveyTaken={props.isSurveyTaken} onChangeData={props.onChangeData} i={i} data={item} index={index} userLanguage={userLanguage} />)
}

export default questionniareListView = props => {
    _keyExtractor = (item, index) => index + "abc";
    // if (props.data.isEE) {
        // return (
        //     <FlatList refreshing={true} ref={(_scroll) => { props._scrollView = _scroll }}
        //     data={props.data}
        //     keyExtractor={this._keyExtractor}
        //     extraData={props.data}
        //     onScroll={props.hideMoreSurveyOnScroll}
        //     renderItem={({ item, index }) =>
        //         <View>{viewWithQuestionForVote(props, item, index, props.userLanguage)}
        //             <View style={{ height: 10 }}/>
        //             <View style={{ height: 1, backgroundColor: '#ddd', marginLeft: 10, marginRight: 10 }}/>
        //             {(index + 1) % 4 === 0 && showAdsTilesRectangle()}
        //             {(index + 1) % 4 === 0 && <View style={{ height: 1, backgroundColor: '#ddd', marginLeft: 10, marginRight: 10 }}/>}
        //         </View>
        //     }
        // />
        // );
    // }
    return (
        <FlatList refreshing={true} ref={(_scroll) => { props._scrollView = _scroll }}
            data={props.data}
            keyExtractor={this._keyExtractor}
            extraData={props.data}
            onScroll={props.hideMoreSurveyOnScroll}
            ListFooterComponent={() => {
                return (
                    <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}>
                        <Button
                            onPress={() => props.updateQuestionaire(props.survey)}
                            title="Submit"
                            titleStyle = {{fontSize: 12}}
                            buttonStyle={{  backgroundColor: props.color ? props.color : APP_GLOBAL_COLOR, borderRadius: 5, paddingHorizontal: normalize(15) }}
                            disabled={props.isSurveyTaken === 'N' ? false : true}
                        />
                    </View>
                )
            }}
            renderItem={({ item, index }) =>
                <View>{viewWithQuestionType(props, item, index, props.userLanguage)}
                    <View style={{ height: 10 }}/>
                    <View style={{ height: 1, backgroundColor: '#ddd', marginLeft: 10, marginRight: 10 }}/>
                    {/* {(index + 1) % 4 === 0 && showAdsTilesRectangle()} */}
                    {/* {(index + 1) % 4 === 0 && <View style={{ height: 1, backgroundColor: '#ddd', marginLeft: 10, marginRight: 10 }}/>} */}
                    <View style={{ height: 1, backgroundColor: '#ddd', marginLeft: 10, marginRight: 10 }}/>
                </View>
            }
        />

    )
};
