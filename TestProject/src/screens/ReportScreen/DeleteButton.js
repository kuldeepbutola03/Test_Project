import React, {Component} from 'react';
import {TouchableOpacity, Image} from 'react-native';

const deleteButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <Image
        source={require ('../../assets/close.png')}
        style={[props.style, {height: 20, width: 20,backgroundColor:'grey',borderRadius:10}]}
      />
    </TouchableOpacity>
  );
};

export default deleteButton;