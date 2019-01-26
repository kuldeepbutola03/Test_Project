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
// import { normalize } from '../../../../../Constant';
import ChoiceView from './ChoiceView'

export default multipleQuestionView = props => (

    <View style={props.style}>
        <View style={{ flexDirection: 'row' , paddingTop  : 10 , paddingBottom : 10}} >
            <View style={{ flex: 1.5 , justifyContent: 'center', alignContent: 'center' }} >
                <Text style={{ textAlign: 'center' ,  }}>{props.data.number}</Text>
            </View>
            <View style={{ flex: 8.5 , marginRight : 10 }} >
                <Text >{props.data.question}</Text>
            </View>
        </View>


        <View style={{ flex: 1}} >
            {
                
                props.data.choice.map((data, indexValue) => {

                    return(<ChoiceView onChangeData = {(index) => {
                        
                        props.data.isSelected = index;

                        // alert('sadsadas'+index);
                        // props.onChangeData(props.data, props.index);

                        props.onChangeData(props.data, props.index);
                    }

                    } index = {indexValue} currentIndex = {props.data.isSelected} value = {data}></ChoiceView>);
                })

            }
        </View>
    </View>

);



