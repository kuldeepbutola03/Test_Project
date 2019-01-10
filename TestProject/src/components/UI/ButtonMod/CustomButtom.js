import React from 'react';
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
import { normalize } from '../../../../Constant';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');


const customButton = props => (
  <TouchableOpacity style={{...props.style, 
    padding : normalize(5) }} onPress={props.onPress}  >
    <Image
      resizeMode="contain"
      style={styles.image}
      source={props.source}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create ({
  // container: {
  //   flex: 1,
  //   flexDirection: 'row',
  // },
  image:{
    flex: 1, 
    width: null, 
    height: null, 
    // backgroundColor:'transparent'
    // margin:10
  }
});

export default customButton;
