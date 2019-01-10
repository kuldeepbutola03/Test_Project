import { Dimensions, Platform, PixelRatio } from 'react-native';
import { AsyncStorage } from "react-native"

export const APP_GLOBAL_COLOR = "rgba(87,48,134,1)";

export const DEFAULT_USER_ID = "userIdInTheApp";

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

export const saveUserID = async (userId) => {
  AsyncStorage.setItem(DEFAULT_USER_ID, userId);
  // try {
  //   await AsyncStorage.setItem('USER_ID',JSON.stringify(userId));
  // } catch (error) {
  //   // Error saving data
  // }
}

export const getUserID = async () => {

  AsyncStorage.getItem(DEFAULT_USER_ID).then((value) => alert (value) )

  // try {
  //   AsyncStorage.getItem('USER_ID', (err, result) => {
  //     console.log(result);
  //     return result;
      
  //   });


  //   // const value = await AsyncStorage.getItem('USER_ID');
  //   // if (value !== null) {
  //   //   // We have data!!
  //   //   console.log(value);
  //   //   return value.user;
  //   // }
  //  } catch (error) {
  //    // Error retrieving data
  //    return null;
  //  }
  //  return null;
}

// export function saveUserID(userId) {
//   try {
//     // await
//      AsyncStorage.setItem('USER_ID', userId);
//   } catch (error) {
//     // Error saving data
//   }
// };
// export function getUserID () {

//   // return   AsyncStorage.getItem('USER_ID');
//   try {
//     // const value = await AsyncStorage.getItem('USER_ID');
//     const value =  AsyncStorage.getItem('USER_ID');
//     if (value !== null) {
//       // We have data!!
//       console.log(value);
//     }
//     return value;
//    } catch (error) {
//      // Error retrieving data
//      return null;
//    }
// };