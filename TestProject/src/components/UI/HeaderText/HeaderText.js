import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

const headerText = props => (
  <Text {...props} style={[styles.text, props.style]}>
    {props.children}
  </Text>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
  }
});

export default headerText;
