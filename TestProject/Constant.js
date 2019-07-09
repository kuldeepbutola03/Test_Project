import React, { Component } from 'react';
import { Dimensions, Platform, PixelRatio, ImageStore, View } from 'react-native';
// import { AsyncStorage } from "react-native"
import AsyncStorage from '@react-native-community/async-storage';
// import AsyncStorage from '@react-native-community/async-storage';

import Geolocation from 'react-native-geolocation-service';

export const defaultUser = "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";
export const APP_GLOBAL_COLOR = '#a01414';
export const APP_ALERT_MESSAGE = 'Raajneeti - Message';
export const DEFAULT_USER_ID = "userIdInTheAppTest5";
export const DEFAULT_USER_DATA = "userDataInTheAppTest5";
export const DEFAULT_USER_THEME = "userThemeInTheAppTest5";
export const DEFAULT_USER_HOME_SCREEN = "userHomeScreenInTheAppTest5";

// export const DEFAULT_USER_AREA = "userDataInTheAppArea";
export const SHARE_LINK = 'https://raajneeti.in/sharing'// 'http://babbles.zone/share_raajneeti.html';

export const FCM_TOKEN = "fcmToken";

export const THEME_ARRAY = ['#a01414', 'rgba(28,37,65,1)', 'rgba(140,62,161,1)', 'rgba(222,60,135,1)', 'rgba(62,80,180,1)' , 'rgba(242,101,34,1)' , 'rgba(5,161,118,1)'];
// static let defaultThemeColor =  UIColor(red: 28.0/255.0 , green: 37/255.0, blue: 65/255.0, alpha: 1)
//     static let themeColor1 =  UIColor(red: 140.0/255.0 , green: 62/255.0, blue: 161/255.0, alpha: 1)
//     static let themeColor2 =  UIColor(red: 222.0/255.0 , green: 60/255.0, blue: 135/255.0, alpha: 1)
// static let themeColor3 =  UIColor(red: 62.0/255.0 , green: 80.0/255.0, blue: 180.0/255.0, alpha: 1)
// static let themeColor4 =  UIColor(red: 235.0/255.0 , green: 79.0/255.0, blue: 84.0/255.0, alpha: 1)
// static let themeColor5 =  UIColor(red: 41.0/255.0 , green: 128.0/255.0, blue: 185.0/255.0, alpha: 1)
// static let themeColor6 =  UIColor(red: 5/255.0 , green: 166/255.0, blue: 118/255.0, alpha: 1)
export const LANGUAGE_LIST_ARRAY = "Trends,Survey,Arena,Notifications,Rate Now, Profile, Male,Female, Select Your Profession,Student,Salaried,Entrepreneur, Retired, Housewife,Other, Select Your Age group, Teenager,Twenties,Thirties,Forties,Fifties,Sixty+".split(',');


export var PROPS_ARRAY_NOTIFY_SCREEN = []
export var PROPS_ARRAY_FOR_LOCATION = []
// export var PROPS_ARRAY_NOTIFICATION = []
// export var PROPS_ARRAY_THEME_CHANGE = []
// export var PROPS_ARRAY_PROFILE_CHANGE = []
// export var PROPS_SHOW_PROFILE_SCREEN = []

import firebase from 'react-native-firebase';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const unitIdFullScreen =
  Platform.OS === 'ios'
    // ? 'ca-app-pub-7743564213302746/3208115795'
    // : 'ca-app-pub-7743564213302746/1581686276';
    ? 'ca-app-pub-3940256099942544/8691691433'
    : 'ca-app-pub-3940256099942544/8691691433';

const unitId =
  Platform.OS === 'ios'
    // ? 'ca-app-pub-7743564213302746/2830037388'
    // : 'ca-app-pub-7743564213302746/4150857916';
    ? 'ca-app-pub-3940256099942544/2934735716'
    : 'ca-app-pub-3940256099942544/6300978111';
// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;//411;//320;

export function refreshUserScreen(notifications , screen , purpose) {

  //Purpose 0: profile , 1: theme , 2: notification , 
  // 3: navigate to profile edit , 
  // 4: location fetch for first time, 
  // 5: tabBartapped for perticular screen to open
  // 6: tab bar shift position
  // 7: language changed
  PROPS_ARRAY_NOTIFY_SCREEN.map(function (refreshUserScreenUI) {
    // if (propsObj.refreshNotificationData) {
      refreshUserScreenUI(notifications , screen , purpose)//.refreshNotificationData();
    // }
  })
}

export const saveUserHomeScreen = async (userId) => {
  AsyncStorage.setItem(DEFAULT_USER_HOME_SCREEN, userId.toString())
    .then(res => {
    })
    .catch(error => {
    })
}
// export function getUserIdFunc (callback : string ) {

// }
export const getUserHomeScreen = async () => {
  let userId = null;
  userId = await AsyncStorage.getItem(DEFAULT_USER_HOME_SCREEN).then((value) => {

    return value;
  });
  return userId;
}



//3
export const getToken = async () => {
  let userId = null;
  userId = await AsyncStorage.getItem(FCM_TOKEN).then((value) => {

    return value;
  });
  return userId;
}

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
  AsyncStorage.setItem(DEFAULT_USER_ID, userId.toString())
    .then(res => {
    })
    .catch(error => {
    })
}
// export function getUserIdFunc (callback : string ) {

// }
export const getUserID = async () => {
  let userId = null;
  userId = await AsyncStorage.getItem(DEFAULT_USER_ID).then((value) => {

    return value;
  });
  return userId;

  // try {
  //   const value = await AsyncStorage.getItem('@storage_Key')
  //   if(value !== null) {
  //     // value previously stored
  //     return value;
  //   }
  // } catch(e) {
  //   // error reading value

  // }
  // return null;
}

export const saveUserThemePointer = async (userId) => {
  AsyncStorage.setItem(DEFAULT_USER_THEME, userId.toString())
    .then(res => {
    })
    .catch(error => {
    })
}
// export function getUserIdFunc (callback : string ) {

// }
export const getUserThemePointer = async () => {
  let userId = null;
  userId = await AsyncStorage.getItem(DEFAULT_USER_THEME).then((value) => {

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

}

export const getUserData = async () => {

  try {
    const retrievedItem = await AsyncStorage.getItem(DEFAULT_USER_DATA);
    const item = JSON.parse(retrievedItem);
    // console.log('true')
    return item;
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

// export const DEFAULT_USER_ID = "userIdInTheAppTest2";
// export const DEFAULT_USER_DATA = "userDataInTheAppTest2";


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


export const getCurrentLocation = (data) => {
  Geolocation.getCurrentPosition(
    (position) => {
      // const initialPosition = JSON.stringify(position);

      // let latlong = position.coords.latitude.toString() +  "," + position.coords.longitude.toString()
      let latlong = position.coords.latitude.toString() + "," + position.coords.longitude.toString()
      if (position.mocked) {
        if (position.mocked == true) {
          alert("you are using fake location");
          data(null);
          return;
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
    { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
  );
}

export const showAdsBanner = () => {
  const Banner = firebase.admob.Banner;
  const AdRequest = firebase.admob.AdRequest;
  const request = new AdRequest();

  // const unitId =
  //   Platform.OS === 'ios'
  //     ? 'ca-app-pub-7743564213302746/2830037388'
  //     : 'ca-app-pub-7743564213302746/4150857916';

  // Platform.OS === 'ios'
  //   ? 'ca-app-pub-3940256099942544/2934735716'
  //   : 'ca-app-pub-3940256099942544/6300978111';

  //alert(unitId);
  return (<View style={{ alignItems: 'center', justifyContent: 'center' }}>
    {/* <View> */}
    {/* <AdMobBanner
        adSize="smartBannerPortrait"
        adUnitID="ca-app-pub-3940256099942544/6300978111"
        didFailToReceiveAdWithError={this.bannerError}
        onAdFailedToLoad={error => console.error(error)} />
    </View> */}
    {/* <AdMobBanner
      adSize="fullBanner"
      adUnitID={unitId}
      testDevices={[AdMobBanner.simulatorId]}
      onAdFailedToLoad={error => console.error(error)}
    /> */}
    <Banner
      unitId={unitId}
      // size={'SMART_BANNER'}
      size={'banner'}
      // size={'medium_rectangle'}
      request={request.build()}
      onAdLoaded={() => {
        console.log('Advert loaded');
        // alert("onAdLoaded");
      }}
      onAdFailedToLoad={(sender) => {
        // alert("fail");
      }}
    />
  </View>);
}

export const showAdsTilesRectangle = () => {
  const Banner = firebase.admob.Banner;
  const AdRequest = firebase.admob.AdRequest;
  const request = new AdRequest();

  // spub-7743564213302746/4150857916';

  // Platform.OS === 'ios'
  //   ? 'ca-app-pub-3940256099942544/2934735716'
  //   : 'ca-app-pub-3940256099942544/6300978111';

  //alert(unitId);
  return (<View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
    {/* <View>
      <AdMobBanner
        adSize="smartBannerPortrait"
        adUnitID="ca-app-pub-7743564213302746/4150857916"
        didFailToReceiveAdWithError={this.bannerError}
        onAdFailedToLoad={error => console.error(error)} />
    </View> */}
    {/* <AdMobBanner
      adSize="smartBannerPortrait"
      adUnitID={unitId}
     // testDevices={[AdMobBanner.simulatorId]}
     didFailToReceiveAdWithError={this.bannerError}
      onAdFailedToLoad={error => console.error(error)} */}
    {/* /> */}
    <Banner
      unitId={unitId}
      // size={'SMART_BANNER'}
      size={'medium_rectangle'}
      // size={'SMART_BANNER'}
      // size={'banner'}
      request={request.build()}
      onAdLoaded={() => {
        console.log('Advert loaded');
        // alert("onAdLoaded");
      }}
      onAdFailedToLoad={(sender) => {
        // alert("fail");
      }}
    />
  </View>);
}

export const showAdsFullScreen = () => {

  const advert = firebase.admob().interstitial(unitIdFullScreen);
  const AdRequest = firebase.admob.AdRequest;
  const request = new AdRequest();
  advert.loadAd(request.build());
  // return advert;
  advert.on('onAdLoaded', () => {
    console.log('Advert ready to show.');
    advert.show();
  });
}
