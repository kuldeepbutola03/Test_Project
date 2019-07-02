// // import React, {Component} from 'react';
// // import {View, StyleSheet, Text} from 'react-native';
// // import Video from 'react-native-video';

// // export default class Test extends Component {
// //   render () {

// //     return (
// //       <View style={styles.container}>
// //         <Video
// //           source={{isNetwork:true ,uri : "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}} // Can be a URL or a local file.
// //           ref={ref => {
// //             this.player = ref;
// //           }} // Store reference
// //           // onBuffer={this.onBuffer} // Callback when remote video is buffering
// //           // onError={this.videoError} // Callback when video cannot be loaded
// //           resizeMode='cover'
// //           style={styles.backgroundVideo}
// //         />
// //       </View>
// //     );
// //   }
// // }

// // var styles = StyleSheet.create ({
// //   backgroundVideo: {
// //     position: 'absolute',
// //     top: 0,
// //     left: 0,
// //     bottom: 0,
// //     right: 0,
// //     width:800,
// //     height:800
// //   },
// //   container:{
// //     justifyContent:'center',
// //     alignItems:'center'
// //   }
// // });

// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';

// // import MapView , { PROVIDER_GOOGLE } from 'react-native-maps';

// export default class Test extends Component {
//   render() {
//     return (

//       <View><Text>asd</Text></View>
      
//   //     <View style={styles.container}>
//   //    <MapView
//   //      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
//   //      style={styles.map}
//   //      region={{
//   //        latitude: 37.78825,
//   //        longitude: -122.4324,
//   //        latitudeDelta: 0.015,
//   //        longitudeDelta: 0.0121,
//   //      }}
//   //    >
//   //    </MapView>
//   //  </View>
//   //     <View style={styles.container}>
//   //       <RNCamera
//   //           ref={ref => {
//   //             this.camera = ref;
//   //           }}
//   //           style = {styles.preview}
//   //           type={RNCamera.Constants.Type.back}
//   //           flashMode={RNCamera.Constants.FlashMode.on}
//   //           permissionDialogTitle={'Permission to use camera'}
//   //           permissionDialogMessage={'We need your permission to use your camera phone'}
//   //       />
//   //       <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
//   //       <TouchableOpacity
//   //           onPress={this.takePicture.bind(this)}
//   //           style = {styles.capture}
//   //       >
//   //           <Text style={{fontSize: 14}}> SNAP </Text>
//   //       </TouchableOpacity>
//   //       </View>
//       // </View>
//     );
//   }

//   // takePicture = async function() {
//   //   if (this.camera) {
//   //     const options = { quality: 0.5, base64: true };
//   //     const data = await this.camera.takePictureAsync(options)
//   //     console.log(data.uri);
//   //   }
//   // };
// }

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     height: 400,
//     width: 400,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
//  });

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     flexDirection: 'column',
// //     backgroundColor: 'black'
// //   },
// //   preview: {
// //     flex: 1,
// //     justifyContent: 'flex-end',
// //     alignItems: 'center'
// //   },
// //   capture: {
// //     flex: 0,
// //     backgroundColor: '#fff',
// //     borderRadius: 5,
// //     padding: 15,
// //     paddingHorizontal: 20,
// //     alignSelf: 'center',
// //     margin: 20
// //   }
// // });



// {
//     "customAreaId": 302,
//     "customAreaName": "Garhwal",
//     "customAreaState": null,
//     "resourceId1": 13961,
//     "resourceName1": "Bhuwan Chandra Khanduri",
//     "resourceCode1": "",
//     "resourceTypeRes1": "MP",
//     "resourceType2Res1": null,
//     "resourceType3Res1": null,
//     "resourceType4Res1": null,
//     "resourceImageFile1": "Garhwal_MP_BJP.jpg",
//     "resourceCategoryId1": 1334,
//     "resourceCategoryName1": "BJP",
//     "resourceCategoryLogo1": "BJP.png",
//     "resource1AttributesList": [
//         {
//             "attributeId": 1,
//             "resourceId": 13961,
//             "attributeName": "Our Ranking",
//             "attributeCode": "",
//             "attributeValue": "285 Out of 509"
//         },
//         {
//             "attributeId": 2,
//             "resourceId": 13961,
//             "attributeName": "Our Score",
//             "attributeCode": null,
//             "attributeValue": "5.28"
//         },
//         {
//             "attributeId": 4,
//             "resourceId": 13961,
//             "attributeName": "% of Funds Spent",
//             "attributeCode": "",
//             "attributeValue": "52.19%"
//         },
//         {
//             "attributeId": 5,
//             "resourceId": 13961,
//             "attributeName": "Educational Qualification",
//             "attributeCode": null,
//             "attributeValue": "Graduate"
//         },
//         {
//             "attributeId": 6,
//             "resourceId": 13961,
//             "attributeName": "Age",
//             "attributeCode": null,
//             "attributeValue": "84"
//         },
//         {
//             "attributeId": 7,
//             "resourceId": 13961,
//             "attributeName": "Debates Participated In",
//             "attributeCode": null,
//             "attributeValue": "12"
//         },
//         {
//             "attributeId": 8,
//             "resourceId": 13961,
//             "attributeName": "Private Member Bills",
//             "attributeCode": null,
//             "attributeValue": "5"
//         },
//         {
//             "attributeId": 9,
//             "resourceId": 13961,
//             "attributeName": "No. of Questions asked",
//             "attributeCode": null,
//             "attributeValue": "104"
//         },
//         {
//             "attributeId": 10,
//             "resourceId": 13961,
//             "attributeName": "Attendance %",
//             "attributeCode": null,
//             "attributeValue": "92%"
//         },
//         {
//             "attributeId": 3,
//             "resourceId": 13961,
//             "attributeName": "Total Funds Spent",
//             "attributeCode": "",
//             "attributeValue": "5.37 Crore"
//         }
//     ],
//     "resourceTotalFlagCount1": 0,
//     "resourceTotalFlagUniqueCount1": 0,
//     "resourceGPR1": 0,
//     "resourceGPRI1": 0,
//     "resourceGPRO1": 0,
//     "lastGprFlagValue1": null,
//     "resourceImageData1": ",
//     "isFlagEnabled1": "Y",
//     "resourceId2": 149,
//     "resourceName2": "Narendra Modi",
//     "resourceCode2": "GEN",
//     "resourceTypeRes2": "MP",
//     "resourceType2Res2": "PM",
//     "resourceType3Res2": null,
//     "resourceType4Res2": null,
//     "resourceImageFile2": "Varanasi_MP_BJP.jpg",
//     "resourceCategoryId2": 1334,
//     "resourceCategoryName2": "BJP",
//     "resourceCategoryLogo2": "BJP.png",
//     "resource2AttributesList": [],
//     "resourceTotalFlagCount2": 4,
//     "resourceTotalFlagUniqueCount2": 0,
//     "resourceGPR2": 3.3,
//     "resourceAGPR2": null,
//     "resourceGPRI2": null,
//     "resourceGPRO2": null,
//     "lastGprFlagValue2": 4,
//     "resourceImageData2": "",
//     "isFlagEnabled2": "Y"
// }