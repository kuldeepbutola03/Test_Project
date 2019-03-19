import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { normalize, APP_GLOBAL_COLOR } from '../../../../Constant';
import { Card } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SpinKit from 'react-native-spinkit';

const profileView = props => {
  // console.log(props)
  let source = props.source;
  if (source == null) {
    return (
      <View style={[styles.container]}>
          <SpinKit 
              isVisible 
              size={hp('3%')}
              type={'ChasingDots'} 
              color={APP_GLOBAL_COLOR}
          />
        {/* <ActivityIndicator style={{ flex: 1 }} /> */}
      </View>
    );
  } else {
    return (
      <TouchableOpacity 
        onPress={props.onPress}
        style={{ flex: 1 }}>
          <Card
            containerStyle={{ flex: 1, marginHorizontal: normalize(2), padding: 0 }}
            wrapperStyle={{ flex: 1 }}
            >
              <View style={{ flex: 4 }}>
                <Image  
                  source={props.source[0]}
                  style={{ flex: 1, height: null, width: null }}
                  resizeMode="stretch"
                />
              </View>
              <View style={{ flex: 1.5, flexDirection: 'row', paddingHorizontal: normalize(5) }} >
                <View style={{ flex: 4, justifyContent: 'center' }}>
                  <Text  adjustsFontSizeToFit style={{ 
                      fontWeight: '700', 
                      fontSize: hp('1.9%'), 
                      textAlign: 'center',
                      marginBottom: normalize(4) }}
                        > {props.infos[1]} | {props.areaType ? props.areaType : null }  </Text>
                  <Text style={{ textAlign: 'center', fontSize: hp('1.7%') }}> {props.infos[0]} </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Image  
                    source={props.source[1]}
                    style={{ 
                      height: null, 
                      // paddingVertical: hp('3%'),
                      width: null, 
                      marginVertical: hp('1.7%'), 
                      marginHorizontal: normalize(3),
                      flex: 1,
                    }}
                    resizeMode="stretch"
                  />
                </View>
              </View>
          </Card>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageContainer: {
    flex: 4,
    flexDirection: 'row',
  },
  userImage: {
    flex: 1,
    height: null,
    width: null,
    borderRadius: normalize(10),
  },
  logoImage: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: normalize(50),
    width: normalize(50),
  },
  textContainer: {
    flex: 1,
    width: '95%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  name: {
    fontSize: normalize(13),
    color: 'black',
  },
  areaName: {
    fontSize: normalize(12),
    color: '#161616',
    width: '65%',
  },
  areaType: {
    fontSize: normalize(11),
    width: '35%',
    textAlign: 'right',
  },
});

export default profileView;
