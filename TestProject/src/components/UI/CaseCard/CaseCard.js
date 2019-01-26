import React, {Component} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import {normalize} from '../../../../Constant';
// import Video from 'react-native-video';

const caseCard = props => {
  return (
    <View style={styles.container}>

      {/* header */}
      <View style={{flex: 0.15, flexDirection: 'row'}}>

        <View style={{flex: 2, alignItems: 'center'}}>
          <Image
            style={{
              //   marginLeft: normalize (10),
              width: normalize (40),
              height: normalize (40),
              marginTop: normalize (5),
              marginBottom: normalize (5),
              borderRadius: normalize (40) / 2,
            }}
            source={props.picture}
            // source={require('../../../assets/user.png')}
          />
        </View>

        <View style={{flex: 7, justifyContent: 'center'}}>
          <Text
            style={{
              textAlign: 'left',
              marginLeft: 5,
              fontSize: normalize (12),
              fontWeight: 'bold',
            }}
          >
            {props.name}
          </Text>
          <Text
            style={{
              textAlign: 'left',
              marginLeft: 5,
              fontSize: normalize (10),
            }}
          >
            {props.place}
          </Text>
        </View>

        <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: normalize (12),
            }}
          >
            {props.caseId}
          </Text>
        </View>

      </View>

      {/* middle */}
      <View style={{flex: 0.75}}>
        {props.details &&
          <Text
            style={{
              marginBottom: 5,
              marginLeft: 5,
              marginRight: 5,
              textAlign: 'justify',
            }}
          >
            {props.details}
          </Text>}
        {props.picture &&
          <Image
            resizeMode="stretch"
            // source={require ('../../../assets/1.png')}
            source={props.picture}
            style={{flex: 1, height: 250, width: '100%'}}
          />}
      </View>

      {/* footer */}
      <View style={{flex: 0.1, flexDirection: 'row'}}>
        <View style={{flex: 0.4}}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#C0C0C0',
              borderRadius: 10,
              margin: 10,
            }}
          >
            <Text style={{textAlign: 'center', padding: 2}}>Comments</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 0.6}}><Text> </Text></View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    marginTop: 3,
    marginBottom: 3,
    backgroundColor: 'white',
  },
});

export default caseCard;
