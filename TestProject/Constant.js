import { Dimensions, Platform, PixelRatio, ImageStore } from 'react-native';
import { AsyncStorage } from "react-native"

export const APP_GLOBAL_COLOR = "rgba(87,48,134,1)";

export const DEFAULT_USER_ID = "userIdInTheAppTest3";
export const DEFAULT_USER_DATA = "userDataInTheAppTest3";

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;//411;//320;

export function normalize(size) {
  const newSize = size * scale
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  }
};


export function authHeaders() {

  // const base64 = require('base-64');
  var headers = new Headers();
  // headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");
  // headers.append("Content-Type", "application/x-www-form-urlencoded"); 
  // Authorization: 'Basic '+btoa('username:password'),
  // headers.append("Authorization", "Basic " + base64.encode("admin:admin@1234"));
  return headers;

}

export const saveUserID = async (userId) => {
  AsyncStorage.setItem(DEFAULT_USER_ID, userId.toString());

}
// export function getUserIdFunc (callback : string ) {

// }
export const getUserID = async () => {
  let userId = null;
  userId = await AsyncStorage.getItem(DEFAULT_USER_ID).then((value) => {

    return value;
  });
  return userId;
}


export const saveUserData = async (data) => {
  
  try {
    let dataString = JSON.stringify(data);
    await AsyncStorage.setItem(DEFAULT_USER_DATA, dataString);

    // var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
    // return jsonOfItem;
} catch (error) {
  alert(error);
  console.log(error.message);
}

// let path = data.image.uri ? data.image.uri : data.image.url;
// ImageStore
//   ImageStore.getBase64ForTag(path , (base64Data) => {
//     //          console.log(base64Data);
//     // this.setState({ pictureBase64: `data:image/jpg;base64,${base64Data}` });
//     alert(base64Data);
//     // var data2 = data;
//     // // data2.push({aa:"sada"});

//     // // alert(JSON.stringify(data2));
//     // data2["image"] = 'data:image/png;base64,' + base64Data;

//     // let dataString = JSON.stringify(data2);

//     // alert(dataString);
//     // AsyncStorage.setItem(DEFAULT_USER_DATA, dataString);

//   }, (reason) => {
//     alert(JSON.stringify(reason));
//     console.log(reason);});
}
// export function getUserIdFunc (callback : string ) {

// }
export const getUserData = async () => {

  try {
    const retrievedItem =  await AsyncStorage.getItem(DEFAULT_USER_DATA);
    const item = JSON.parse(retrievedItem);
    return item;
  } catch (error) {
    console.log(error.message);
  }
  return
}
