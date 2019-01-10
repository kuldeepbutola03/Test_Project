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

const editButton = props => {
  const content = (
    <Image source={require ('./../../../assets/camera.png')} style={styles.icon} />
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
    height: 40,
    width: 40,
    // backgroundColor:'rgba(0,0,0,.5)',
    borderRadius:20,
  },
  touch : {
    position: 'absolute',
    bottom: 15,
    right: 50,
    // backgroundColor:'transparent'
  }
});

export default editButton;
