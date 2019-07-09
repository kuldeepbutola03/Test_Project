import React, { Component } from 'react';
import ParsedText from 'react-native-parsed-text';

import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { normalize } from '../../../../Constant';




export default class HashTag extends React.Component {


  handleUrlPress(url, matchIndex /*: number*/) {
    Linking.openURL(url);
  }

  handlePhonePress(phone, matchIndex /*: number*/) {
    // AlertIOS.alert(`${phone} has been pressed!`);
  }

  handleNamePress(name, matchIndex /*: number*/) {
    // AlertIOS.alert(`Hello ${name}`);
    // alert(name);
  }

  handleEmailPress(email, matchIndex /*: number*/) {
    // AlertIOS.alert(`send email to ${email}`);
  }
  handleHashTagPress(hashTag, matchIndex /*: number*/) {
    // AlertIOS.alert(`send email to ${email}`);
    // alert(hashTag);
  }


  renderText(matchingString, matches) {
    // matches => ["[@michel:5455345]", "@michel", "5455345"]
    let pattern = /\[(@[^:]+):([^\]]+)\]/i;
    let match = matchingString.match(pattern);
    return `^^${match[1]}^^`;
  }

  render() {

    // let textStyle = this.props.textSize ? {...styles.text, fontSize : this.props.textSize} : {...styles.text, fontSize : normalize(10)};
    return (
      <View style={{ ...styles.container, ...this.props.style , }}>
        <ParsedText
          style={{ ...styles.text, fontSize: this.props.style.fontSize ? this.props.style.fontSize : 13   }}
          parse={
            [
              { type: 'url', style: styles.url, onPress: this.handleUrlPress },
              //   {type: 'phone',                     style: styles.phone, onPress: this.handlePhonePress},
              { type: 'email', style: styles.email, onPress: this.handleEmailPress },
              //   {pattern: /Bob|David/,              style: styles.name, onPress: this.handleNamePress},
              //   {pattern: /\[(@[^:]+):([^\]]+)\]/i, style: styles.username, onPress: this.handleNamePress, renderText: this.renderText},
              //   {pattern: /42/,                     style: styles.magicNumber},
              { pattern: /#(\w+)/, style: styles.hashTag, onPress: this.handleHashTagPress },
              { pattern: /@(\w+)/, style: styles.username, onPress: this.handleNamePress },
            ]
          }
          childrenProps={{ allowFontScaling: false }}
        >
          {this.props.children}
        </ParsedText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'flex-start',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },

  url: {
    color: 'red',
    textDecorationLine: 'underline',
  },

  email: {
    textDecorationLine: 'underline',
  },

  text: {
    color: 'black',
    // justifyContent : 'space-evenly'
  },

  phone: {
    color: 'blue',
    textDecorationLine: 'underline',
  },

  name: {
    color: 'red',
  },

  username: {
    color: 'black',
    fontWeight: 'bold'
  },

  magicNumber: {
    fontSize: 42,
    color: 'pink',
  },

  hashTag: {
    fontStyle: 'italic',
    color: 'red',
  },

});

