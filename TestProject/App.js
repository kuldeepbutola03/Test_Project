import {Navigation} from 'react-native-navigation';
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


// Register Screens

Navigation.registerComponent ('LoginScreen', () => LoginSceen);
Navigation.registerComponent ('MobileNumber', () => MobileNumber);
Navigation.registerComponent ('OtpScreen', () => OtpScreen);
Navigation.registerComponent ('RegistrationScreen', () => RegistrationScreen);
Navigation.registerComponent ('EmailScreen', () => EmailScreen);
Navigation.registerComponent ('Profile', () => Profile);
Navigation.registerComponent ('HomeScreen', () => HomeScreen);
Navigation.registerComponent ('DataScreen', () => DataScreen);
Navigation.registerComponent ('FireDepartmentScreen', () => FireDepartmentScreen);
Navigation.registerComponent ('PoliceProfileScreen', () => PoliceProfileScreen);
Navigation.registerComponent ('ReportScreen', () => ReportScreen);
Navigation.registerComponent ('LandingScreen', () => LandingScreen);
Navigation.registerComponent ('Test', () => Test);
Navigation.registerComponent ('TrendScreen', () => TrendScreen);
Navigation.registerComponent ('TrendDetailScreen', () => TrendDetailScreen);
Navigation.registerComponent ('QuestionnaireScreen', () => QuestionnaireScreen);

// Start App
import { AsyncStorage } from "react-native"
import { DEFAULT_USER_ID, getUserData } from './Constant';

getUserData().then((data) => {

// })

// AsyncStorage.getItem(DEFAULT_USER_ID).then((value) => {
    // let idName = value ? "HomeScreen" : "LandingScreen";



    if (data) {

      // let data = {
      //   image: null,
      //   name: null,
      //   email:  null,
      // };

      Navigation.events ().registerAppLaunchedListener (() => {
        Navigation.setRoot ({
          root: {
            stack: {
              children: [
                {
                  component: {
                    id: "HomeScreen", // Optional, Auto generated if empty
                    name: "HomeScreen",
                    options: {
                      topBar: {
                        visible:false,
                          drawBehind:true,
                          animate:false
                      },
                      popGesture:false
                    },
                    passProps:{
                      data : data
                    },
                    
                    sideMenu:{
                      enabled : false,
                      visible: false
                    }
                    
                  },
                },
              ],
            },
          },
        });
      });
    }else{
      
      Navigation.events ().registerAppLaunchedListener (() => {
        Navigation.setRoot ({
          root: {
            stack: {
              children: [
                {
                  component: {
                    id: "LandingScreen", // Optional, Auto generated if empty
                    name: "LandingScreen",
                    options: {
                      topBar: {
                        visible:false,
                          drawBehind:true,
                          animate:false
                      },
                    },
                    
                  },
                },
              ],
            },
          },
        });
      });
    }

    
    


  })




