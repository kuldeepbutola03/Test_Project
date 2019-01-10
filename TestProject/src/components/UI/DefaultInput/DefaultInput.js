import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const defaultInput = props => (
  <TextInput
    underlineColorAndroid="transparent"
    {...props}
    style={[styles.input, props.style]}
    onChangeText = {props.onChangeText}

  />
);

const styles = StyleSheet.create({
  input: {
    width: '65%',
    borderWidth: 2,
    borderColor: '#eee',
    padding: 5,
    marginTop: 8,
    marginBottom: 8,
    height : 40,
    borderRadius : 20,
    textAlign:'center'
  }
});

export default defaultInput;
