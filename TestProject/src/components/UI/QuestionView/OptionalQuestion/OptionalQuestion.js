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
import CustomTextButton from '../../ButtonMod/CustomTextButton';
import { APP_GLOBAL_COLOR } from '../../../../../Constant';
// import { normalize } from '../../../../../Constant';



export default optionalQuestionView = props => {
    // handlledPress1 = (props) => {
    //     props.data.isSelected = !props.data.isSelected;

    //     props.onChangeData(props.data, props.index);
    // }
    // handlledPress2 = (props) => {
    //     props.data.isSelected = !props.data.isSelected;
    //     props.onChangeData(props.data, props.index);
    // }


    return (
        <View style={props.style}>
            <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }} >
                <View style={{ flex: 1.5, justifyContent: 'center', alignContent: 'center' }} >
                    <Text style={{ textAlign: 'center', }}>{props.data.number}</Text>
                </View>
                <View style={{ flex: 8.5, marginRight: 10 }} >
                    <Text >{props.data.question}</Text>
                </View>
            </View>


            <View style={{ flex: 1, height: 30, flexDirection: 'row' }} >
                <View style={{ flex: 1.5, justifyContent: 'center', alignContent: 'center' }} >

                </View>
                <View style={{ flex: 8.5, marginRight: 10, flexDirection: 'row' }}>
                    <CustomTextButton style={props.data.isSelected == 1 ? buttonViewStyle.selectedStyle : buttonViewStyle.unSelectedStyle} onPress={() => {
                        props.data.isSelected = 1;

                        props.onChangeData(props.data, props.index);
                    }
                    }> YES </CustomTextButton>
                    <CustomTextButton  style={props.data.isSelected == 2 ? buttonViewStyle.selectedStyle : buttonViewStyle.unSelectedStyle} backgroundColor={!props.data.isSelected ? 'red' : 'blue'} onPress={() => {
                        props.data.isSelected = 2;

                        props.onChangeData(props.data, props.index);
                    }
                    }> NO</CustomTextButton>
                </View>
            </View>
        </View>
    )
};

const buttonViewStyle = StyleSheet.create({
    selectedStyle: { 
        borderColor: APP_GLOBAL_COLOR, 
        borderRadius: 5, 
        borderWidth: 1, 
        width: 100 ,
        height : '90%',
        margin : 5
    },
    unSelectedStyle: {
        borderColor: 'white',
        width: 100 ,
        borderRadius: 5, 
        borderWidth: 1, 
        height : '90%',
        margin : 5
    },
});


