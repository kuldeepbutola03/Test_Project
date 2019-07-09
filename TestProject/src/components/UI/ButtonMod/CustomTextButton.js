import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Image,
    PixelRatio,
    Dimensions
} from 'react-native';
import { PropTypes } from 'prop-types';
// import { normalize } from '../../../../Constant';

export default customTextButton = props => {
    return (<TouchableOpacity style={[
        {
            backgroundColor: props.bgColor,
            alignItems: 'center', justifyContent: 'center',
        },
        {
            ...props.style,
        }
    ]} onPress={props.onPress} >
        <Text style = {{color : props.textColor ? props.textColor : "black" , fontWeight : 'bold' , fontSize : 12}}>
            {props.children}
        </Text>
    </TouchableOpacity>
    )
}



