import { Navigation } from 'react-native-navigation';

import LoginSceen from './src/screens/LoginScreen/LoginScreen';
import Profile from './src/screens/Profile/Profile';
import MobileNumber from './src/screens/LoginScreen/MobileNumber';
import OtpScreen from './src/screens/LoginScreen/OtpScreen';
import EmailScreen from './src/screens/LoginScreen/EmailScreen';
import RegistrationScreen from './src/screens/LoginScreen/RegistrationScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import Test from './src/screens/LoginScreen/Test';
import DataScreen from './src/screens/DataScreen/DataScreen';
import FireDepartmentScreen from './src/screens/PoliceProfile/FireDepartmentScreen';
import PoliceProfileScreen from './src/screens/PoliceProfile/PoliceProfileScreen';
import ReportScreen from './src/screens/ReportScreen/ReportScreen';
import LandingScreen from './src/screens/LandingScreen/LandingScreen';
import TrendScreen from './src/screens/TrendScreen/TrendScreen';
import TrendDetailScreen from './src/screens/TrendScreen/TrendDetailScreen';
import QuestionnaireScreen from './src/screens/QuestionnaireScreen/QuestionnaireScreen';

import AreaScreen from './src/screens/LoginScreen/AreaScreen';
import ComposeScreen from './src/screens/ReportScreen/ComposeScreen';
import Sharing from './src/components/UI/Sharing/Sharing';
import ReportReplyScreen from './src/screens/ReportScreen/ReportReplyScreen';
// Register Screens
import AboutAppScreen from './src/screens/AboutAppScreen/AboutAppScreen';

import TutorialScreen from './src/screens/AboutAppScreen/TutorialScreen';

import TcScreen from './src/screens/LoginScreen/TcScreen';
import NotificationScreen from './src/screens/NotificationScreen/NotificationScreen';
import SurveyList from './src/screens/QuestionnaireScreen/SurveyList';

Navigation.registerComponent('LoginScreen', () => LoginSceen);
Navigation.registerComponent('MobileNumber', () => MobileNumber);
Navigation.registerComponent('OtpScreen', () => OtpScreen);
Navigation.registerComponent('RegistrationScreen', () => RegistrationScreen);
Navigation.registerComponent('EmailScreen', () => EmailScreen);
Navigation.registerComponent('Profile', () => Profile);
Navigation.registerComponent('HomeScreen', () => HomeScreen);
Navigation.registerComponent('DataScreen', () => DataScreen);
Navigation.registerComponent('FireDepartmentScreen', () => FireDepartmentScreen);
Navigation.registerComponent('PoliceProfileScreen', () => PoliceProfileScreen);
Navigation.registerComponent('ReportScreen', () => ReportScreen);
Navigation.registerComponent('LandingScreen', () => LandingScreen);
Navigation.registerComponent('Test', () => Test);
Navigation.registerComponent('TrendScreen', () => TrendScreen);
Navigation.registerComponent('TrendDetailScreen', () => TrendDetailScreen);
Navigation.registerComponent('QuestionnaireScreen', () => QuestionnaireScreen);
Navigation.registerComponent('AreaScreen', () => AreaScreen);
Navigation.registerComponent('ReportReplyScreen', () => ReportReplyScreen);
Navigation.registerComponent('Sharing', () => Sharing);
Navigation.registerComponent('ComposeScreen', () => ComposeScreen);
Navigation.registerComponent('AboutAppScreen', () => AboutAppScreen);

Navigation.registerComponent('TutorialScreen', () => TutorialScreen);
Navigation.registerComponent('TcScreen', () => TcScreen);
Navigation.registerComponent('NotificationScreen', () => NotificationScreen);
Navigation.registerComponent('SurveyList', () => SurveyList);
// import Orientation from 'react-native-orientation';
// Start App
import { AsyncStorage, Platform , Linking} from "react-native"
import { DEFAULT_USER_ID, getUserData, saveUserData, saveUserID } from './Constant';
// import { platform } from 'os';

// saveUserData(null);
// saveUserID(null);

// ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);

// Import
import KochavaTracker from 'react-native-kochava-tracker';


/////


// // // Configure


Navigation.events().registerAppLaunchedListener(() => {

  Navigation.setDefaultOptions({

    layout: {
      orientation: ['portrait']
    }

  });

  var configMapObject = {}
  if (Platform.OS === 'ios') {
    configMapObject[KochavaTracker.PARAM_IOS_APP_GUID_STRING_KEY] = "koraajneeti-ios-iocima";
    
  } else {
    configMapObject[KochavaTracker.PARAM_ANDROID_APP_GUID_STRING_KEY] = "koraajneeti-t9c";
  }
  // configMapObject[KochavaTracker.PARAM_WINDOWS_APP_GUID_STRING_KEY] = "_YOUR_WINDOWS_APP_GUID";
  KochavaTracker.configure(configMapObject);


  getUserData().then((data) => {
    // SplashScreen.show();
    // SplashScreen.hide();
    if (data) {
      if (data.username || data.userName) {
        // Navigation.events ().registerAppLaunchedListener (() => {
        Navigation.setRoot({
          root: {
            stack: {
              children: [
                {
                  component: {
                    id: "HomeScreen", // Optional, Auto generated if empty
                    name: "HomeScreen",
                    options: {
                      topBar: {
                        visible: false,
                        drawBehind: true,
                        animate: false,
                      },
                      popGesture: false
                    },
                    passProps: {
                      data: data
                    },

                    sideMenu: {
                      enabled: false,
                      visible: false
                    },


                  },
                },
              ],
            },
          },
        });
        // });
      } else {
        let languageArry = "Trends,Survey,Arena,Notifications,Rate Now, Profile, Male,Female, Select Your Profession,Student,Salaried,Entrepreneur, Retired, Housewife,Other, Select Your Age group, Teenager,Twenties,Thirties,Forties,Fifties,Sixty+";
        let menuArr = languageArry.split(',');


        Navigation.setRoot({
          root: {
            stack: {
              children: [
                {
                  component: {
                    id: 'Profile',
                    name: 'Profile',
                    options: {
                      topBar: {
                        visible: false,
                        animate: false,
                        drawBehind: true,

                      }
                    },

                    passProps: {
                      // email: null,

                      // name: thisObject.props.name,
                      // image: thisObject.props.image,
                      // username: username,
                      // mobileNumber: thisObject.props.mobileNumber,
                      // code: thisObject.props.code,
                      ...data,
                      // userId: data.userId,

                      language: menuArr ? menuArr[5] : null,
                      male: menuArr ? menuArr[6] : null,
                      female: menuArr ? menuArr[7] : null,
                      selProfession: menuArr ? menuArr[8] : null,
                      student: menuArr ? menuArr[9] : null,
                      salaried: menuArr ? menuArr[10] : null,
                      entrepreneur: menuArr ? menuArr[11] : null,
                      retired: menuArr ? menuArr[12] : null,
                      housewife: menuArr ? menuArr[13] : null,
                      other: menuArr ? menuArr[14] : null,
                      selAgeGroup: menuArr ? menuArr[15] : null,
                      teenager: menuArr ? menuArr[16] : null,
                      twenties: menuArr ? menuArr[17] : null,
                      thirties: menuArr ? menuArr[18] : null,
                      fourties: menuArr ? menuArr[19] : null,
                      fifties: menuArr ? menuArr[20] : null,
                      aboveSixty: menuArr ? menuArr[21] : null,



                      email: null,
                      // firstName: data.firstName,
                      // lastName: data.lastName,
                      // image: thisObject.props.image,
                      // username: username,
                      // mobileNumber: thisObject.props.mobileNumber,
                      // code: thisObject.props.code,
                      // userId: thisObject.props.userId,
                      // selectedAgeGroupCode: thisObject.props.selectedAgeGroupCode,
                      // description: thisObject.props.description,
                      // userDesignation: thisObject.props.designation,
                      // gender: thisObject.props.gender,

                      // userLanguage: 'en',
                      // language: menuArr ? menuArr[5] : null,
                      // male: menuArr ? menuArr[6] : null,
                      // female: menuArr ? menuArr[7] : null,
                      // selProfession: menuArr ? menuArr[8] : null,
                      // student: menuArr ? menuArr[9] : null,
                      // salaried: menuArr ? menuArr[10] : null,
                      // entrepreneur: menuArr ? menuArr[11] : null,
                      // retired: menuArr ? menuArr[12] : null,
                      // housewife: menuArr ? menuArr[13] : null,
                      // other: menuArr ? menuArr[14] : null,
                      // selAgeGroup: menuArr ? menuArr[15] : null,
                      // teenager: menuArr ? menuArr[16] : null,
                      // twenties: menuArr ? menuArr[17] : null,
                      // thirties: menuArr ? menuArr[18] : null,
                      // fourties: menuArr ? menuArr[19] : null,
                      // fifties: menuArr ? menuArr[20] : null,
                      // aboveSixty: menuArr ? menuArr[21] : null,
                    },
                  },


                },
              ],
            },
          },
        });

      }
    }
    else {
      // Navigation.events ().registerAppLaunchedListener (() => {
      Navigation.setRoot({
        root: {
          stack: {
            children: [
              {
                component: {
                  id: "AboutAppScreen", // Optional, Auto generated if empty
                  name: "AboutAppScreen",
                  options: {
                    topBar: {
                      visible: false,
                      drawBehind: true,
                      animate: false,

                    },


                  },


                },


              },

            ],
          },
        },

      });
      // });
    }
  })


});
