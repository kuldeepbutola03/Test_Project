import { Dimensions, Platform, PixelRatio, ImageStore } from 'react-native';
import { AsyncStorage } from "react-native"

export const APP_GLOBAL_COLOR = "rgba(87,48,134,1)";

export const DEFAULT_USER_ID = "userIdInTheAppTest2";
export const DEFAULT_USER_DATA = "userDataInTheAppTest2";

import Geolocation from 'react-native-geolocation-service';

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

export function authHeadersMedia() {

  // const base64 = require('base-64');
  var headers = new Headers();
  // headers.append("Accept", "application/json");
  // headers.append("Content-Type", "application/json");
  headers.append("Content-Type", "multipart/form-data");
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
  // npm install react-native-image-base64 --save
  // react-native link react-native-image-base64
  // import ImgToBase64 from 'react-native-image-base64';
  // ImgToBase64.getBase64String('file://youfileurl', (err, base64string) => doSomethingWith(base64string));


  try {
    let dataString = JSON.stringify(data);
    await AsyncStorage.setItem(DEFAULT_USER_DATA, dataString);

    // var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
    // return jsonOfItem;
  } catch (error) {
    alert(error);
    console.log(error.message);
  }
}
// export function getUserIdFunc (callback : string ) {

// }
export const getUserData = async () => {

  try {
    const retrievedItem = await AsyncStorage.getItem(DEFAULT_USER_DATA);
    const item = JSON.parse(retrievedItem);
    return item;
  } catch (error) {
    console.log(error.message);
  }
  return
}


export const getCurrentLocation = (data) => {
  Geolocation.getCurrentPosition(
    (position) => {
       // const initialPosition = JSON.stringify(position);

        // let latlong = position.coords.latitude.toString() +  "," + position.coords.longitude.toString()
        let latlong = position.coords.latitude.toString() + "," + position.coords.longitude.toString()
        if (position.mocked) {
            if (position.mocked == true) {
                alert("you are using fake location");
                data( null);
            }
        }

        data(position.coords);
        
      },
    (error) => {
        // alert(error.message)
        data(error.message);
        // this.locationErrorMessage = error.message;
        // alert(locationErrorMessage)
        // this.showDialog();
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
);
}
