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
import { normalize } from '../../../../Constant';
import { Card } from 'react-native-elements';

const profileView = props => {
  // console.log(props)
  let source = props.source;
  if (source == null) {
    return (
      <View style={[props.style, styles.container]}>
        <ActivityIndicator style={{ flex: 1 }} />
      </View>
    );
  } else {
    return (
      <TouchableOpacity 
        onPress={props.onPress}
        style={{ flex: 1 }}>
          <Card
            containerStyle={{ flex: 1, marginHorizontal: normalize(2), padding: 0, height: '100%' }}
            wrapperStyle={{ height: '100%'}}
            >
              <View style={{ flex: 4 }}>
                <Image  
                  source={props.source[0]}
                  style={{ flex: 1, height: null, width: null }}
                  resizeMode="stretch"
                />
              </View>
              <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: normalize(5) }} >
                <View style={{ flex: 4, justifyContent: 'center' }}>
                <Text numberOfLines={1} style={{ fontWeight: '700', fontSize: 13, marginBottom: normalize(2) }}> {props.infos[1]} | {props.areaType ? props.areaType : null }  </Text>
                  <Text> {props.infos[0]} </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Image  
                    source={props.source[1]}
                    style={{ flex: 1, height: null, width: null, marginVertical: normalize(4), marginHorizontal: normalize(3) }}
                    resizeMode="stretch"
                  />
                </View>
              </View>
          </Card>
      </TouchableOpacity>
      // <TouchableOpacity
      //   style={[props.style, styles.container]}
      //   onPress={props.onPress}
      // >
      //   <View style={styles.imageContainer}>
      //     <Image
      //       resizeMode="cover"
      //       style={styles.userImage}
      //       source={props.source[0]}
      //     />

      //     <Image style={styles.logoImage} source={props.source[1]} />
      //   </View>

      //   <View style={styles.textContainer}>
      //     <View style={{ flex: 1, justifyContent: 'center' }}>
      //       <Text numberOfLines={1} minimumFontScale={0.1} style={styles.name}>
      //         {props.infos[0]}
      //       </Text>
      //     </View>

      //     <View style={{ flexDirection: 'row', flex: 1, width: '100%' }}>
      //       <Text
      //         numberOfLines={1}
      //         minimumFontScale={0.1}
      //         style={styles.areaName}
      //       >
      //         {props.infos[1]}
      //       </Text>

      //       <Text
      //         numberOfLines={1}
      //         minimumFontScale={0.1}
      //         style={styles.areaType}
      //       >
      //         | {props.areaType ? props.areaType : null }
      //       </Text>

      //     </View>
      //   </View>

      // </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').width / 2 - 20 + 60,
    marginTop: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    // borderRadius: normalize(10),
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
    // top:144,
    // left:130,
    bottom: 10,
    right: 10,
    // borderRadius: normalize(8),
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
