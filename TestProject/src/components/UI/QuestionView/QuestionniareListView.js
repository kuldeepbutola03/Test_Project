import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Platform,
    Image,
    FlatList
} from 'react-native';
// import { normalize } from '../../../../../Constant';
import MultipleQuestionView from './MultipleQuestion/MultipleQuestionView';
// import SliderQuestionView from './SliderQuestion/SliderQuestionView';
import OptionalQuestion from './OptionalQuestion/OptionalQuestion';
import Sliders from './SliderQuestion/Slider';

viewWithQuestionType = (props, item , index) => {
    if (item.type === 'multiple'){
        return (<MultipleQuestionView onChangeData = {props.onChangeData}  data = {item} index = {index}/>)
    }else if (item.type === 'slider'){
        return (<Sliders  data = {item}/>)
    }else if (item.type === 'optional') {
        return (<OptionalQuestion onChangeData = {props.onChangeData} data = {item} index = {index}/>)
    }
    

    return null;
    
}

export default questionniareListView = props => {
    
    
    return (
        <FlatList refreshing = {true} ref = {(_scroll) => {props._scrollView = _scroll}}
            data={props.data}
            renderItem={({ item , index }) => <View>{viewWithQuestionType(props,item,index)}<View style = {{ height : 10}}></View><View style = {{ height : 1 , backgroundColor : 'grey', marginLeft : 10, marginRight : 10}}></View></View>}
        />

    )
};
