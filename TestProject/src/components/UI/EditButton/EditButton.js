import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Text,
} from 'react-native';
import { normalize } from '../../../../Constant';

const editButton = props => {
  const content = (
    <Image 
      resizeMode={"contain"}
      source={require ('./../../../assets/login_icon.png')} 
      style={styles.icon} />
  );

  // if (Platform.OS === 'android') {
  //   return (
  //     <TouchableNativeFeedback style={styles.touch} onPress={props.onPress}>
  //     {content}
  //     </TouchableNativeFeedback>
  //   );
  // }
  return (
    <TouchableOpacity style={styles.touch}  onPress={props.onPress} >
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create ({
  icon: {
    // position: 'absolute',
    // bottom: 20,
    // left: 45,
    height: normalize(20),
    width: normalize(20),
    // backgroundColor:'rgba(0,0,0,.5)',
    borderRadius:10,
  },
  touch : {
    position: 'absolute',
    bottom: 45,
    right: 20,
    // backgroundColor:'transparent'
  }
});

export default editButton;
