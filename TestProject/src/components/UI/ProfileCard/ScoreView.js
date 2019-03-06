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
import { normalize } from '../../../../Constant';

const scoreView = props => (

     <View style={props.style} >
     <View style={scoreViewStyle.scoreView} backgroundColor = {props.backgroundColor}>
      <Text style = {{color : 'white' , fontSize : normalize(15) , fontWeight : '600'}}>{props.text[1]}</Text>
      </View>
      {props.bottomText && <Text style={scoreViewStyle.textView}>{props.text[0]}</Text>}
    </View>

);


const scoreViewStyle = StyleSheet.create({

    scoreView: {
        justifyContent: 'center',
        alignItems: 'center',
        // position: 'absolute',
        backgroundColor: 'white',
        width : (Dimensions.get('window').width /(100/52) )/4 - 5,
        height : (Dimensions.get('window').width /(100/52) )/4 - 5,
        borderRadius: (((Dimensions.get('window').width /(100/52) )/4) - 5)/2,
    },
    textView: {
        marginTop : 5,
        fontSize : normalize(12)
    },
});

export default scoreView;