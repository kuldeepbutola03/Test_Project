// import React, {Component} from 'react';
// import {View, StyleSheet, Text} from 'react-native';
// import Video from 'react-native-video';

// export default class Test extends Component {
//   render () {

//     return (
//       <View style={styles.container}>
//         <Video
//           source={{isNetwork:true ,uri : "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}} // Can be a URL or a local file.
//           ref={ref => {
//             this.player = ref;
//           }} // Store reference
//           // onBuffer={this.onBuffer} // Callback when remote video is buffering
//           // onError={this.videoError} // Callback when video cannot be loaded
//           resizeMode='cover'
//           style={styles.backgroundVideo}
//         />
//       </View>
//     );
//   }
// }

// var styles = StyleSheet.create ({
//   backgroundVideo: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0,
//     width:800,
//     height:800
//   },
//   container:{
//     justifyContent:'center',
//     alignItems:'center'
//   }
// });

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// import MapView , { PROVIDER_GOOGLE } from 'react-native-maps';

export default class Test extends Component {
  render() {
    return (

      <View><Text>Shubham</Text></View>
      
  //     <View style={styles.container}>
  //    <MapView
  //      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
  //      style={styles.map}
  //      region={{
  //        latitude: 37.78825,
  //        longitude: -122.4324,
  //        latitudeDelta: 0.015,
  //        longitudeDelta: 0.0121,
  //      }}
  //    >
  //    </MapView>
  //  </View>
  //     <View style={styles.container}>
  //       <RNCamera
  //           ref={ref => {
  //             this.camera = ref;
  //           }}
  //           style = {styles.preview}
  //           type={RNCamera.Constants.Type.back}
  //           flashMode={RNCamera.Constants.FlashMode.on}
  //           permissionDialogTitle={'Permission to use camera'}
  //           permissionDialogMessage={'We need your permission to use your camera phone'}
  //       />
  //       <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
  //       <TouchableOpacity
  //           onPress={this.takePicture.bind(this)}
  //           style = {styles.capture}
  //       >
  //           <Text style={{fontSize: 14}}> SNAP </Text>
  //       </TouchableOpacity>
  //       </View>
      // </View>
    );
  }

  // takePicture = async function() {
  //   if (this.camera) {
  //     const options = { quality: 0.5, base64: true };
  //     const data = await this.camera.takePictureAsync(options)
  //     console.log(data.uri);
  //   }
  // };
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: 'black'
//   },
//   preview: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center'
//   },
//   capture: {
//     flex: 0,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     padding: 15,
//     paddingHorizontal: 20,
//     alignSelf: 'center',
//     margin: 20
//   }
// });
