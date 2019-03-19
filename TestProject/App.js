import { Navigation } from 'react-native-navigation';
import SplashScreen from 'react-native-splash-screen';
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
// import Orientation from 'react-native-orientation';
// Start App
import { AsyncStorage, Platform } from "react-native"
import { DEFAULT_USER_ID, getUserData, saveUserData, saveUserID } from './Constant';
// import { platform } from 'os';

// saveUserData(null);
// saveUserID(null);

// ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);

Navigation.events().registerAppLaunchedListener(() => {

  Navigation.setDefaultOptions({
   
      layout: {
        orientation: ['portrait']
      }
    
  })
  // if (Platform.OS === 'android') {
  //   Orientation.lockToPortrait();
  // // Orientation.lockToPortrait();
  //       Orientation.addOrientationListener((orr) => {
  //           // alert('aaaa');
  //           Orientation.lockToPortrait();
  //       })
  // }

  //   SplashScreen.hide()
  //   Navigation.setRoot ({
  //     root: {
  //       stack: {
  //         children: [
  //           {x1
  //             component: {
  //               id: "Test", // Optional, Auto generated if empty
  //               name: "Test",
  //               options: {
  //                 topBar: {
  //                   visible:false,
  //                     drawBehind:true,
  //                     animate:false
  //                 },
  //               },

  //             },
  //           },
  //         ],
  //       },
  //     },
  //   });
  // });
  // return;

  getUserData().then((data) => {
    SplashScreen.hide();
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
        // Navigation.events ().registerAppLaunchedListener (() => {
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
                    }
                  },
                  passProps: {
                    // email: null,

                    // name: thisObject.props.name,
                    // image: thisObject.props.image,
                    // username: username,
                    // mobileNumber: thisObject.props.mobileNumber,
                    // code: thisObject.props.code,
                    userId: data.userId,

                    // selectedAgeGroupCode: thisObject.selectedAgeGroupCode,
                    // description: thisObject.description,
                    // gender: thisObject.gender
                  },
                  // component: {
                  //   id: "MobileNumber", // Optional, Auto generated if empty
                  //   name: "MobileNumber",
                  //   options: {
                  //     topBar: {
                  //       visible:false,
                  //         drawBehind:true,
                  //         animate:false
                  //     },
                  //   },

                  // },
                },
              ],
            },
          },
        });
        // });
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
