import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

const buttonMod = props => {
  const content = (
    <View style={[styles.button, {backgroundColor: props.color}]}>
      <Text style={{fontWeight: 'bold', color: 'white'}}>{props.children}</Text>
    </View>
  );
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback onPress={props.onPress}>
        {content}
      </TouchableNativeFeedback>
    );
  }
  return (
    <TouchableOpacity onPress={props.onPress}>
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create ({
  button: {
    height: 45,
    width: 150,
    padding: 10,
    marginTop: 10,
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default buttonMod;
