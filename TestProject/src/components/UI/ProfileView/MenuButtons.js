import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { normalize } from '../../../../Constant';

const menuButtons = props => (
 
    <TouchableOpacity
      style={[styles.container,props.style]}
      onPress={props.onPress}
    >
        <Image style={styles.icon} source={props.source} />
        <Text style={styles.text}>
          {props.info}
        </Text>
    </TouchableOpacity>

);

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"rgba(87,48,134,1)"
  },
  icon: {
    height: normalize(35),
    width: normalize(35),
  },
  text: {
    fontSize: normalize(11),
    color: 'white',
  },
});

export default menuButtons;
