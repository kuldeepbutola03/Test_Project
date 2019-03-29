import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { normalize } from '../../../../Constant';

const menuButtons = props => {
  return (
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
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#a01414"
  },
  icon: {
    height: normalize(25),
    width: normalize(25),
    marginBottom: normalize(5)
  },
  text: {
    fontSize: normalize(11),
    color: 'white',
  },
});

export default menuButtons;
