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

    

    return (<TouchableOpacity style={{
        ...props.style,
        // padding: normalize(5),
        alignItems: 'center', justifyContent: 'center', backgroundColor : props.bgColor
    }} onPress={props.onPress} >
        <Text style = {{color : props.textColor ? props.textColor : "black"}}>
            {props.children}
        </Text>
    </TouchableOpacity>
    )
}



