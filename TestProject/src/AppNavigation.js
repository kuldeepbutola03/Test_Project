import { Navigation } from 'react-native-navigation';
import { APP_GLOBAL_COLOR, getUserThemePointer, THEME_ARRAY } from '../Constant';
export const NAVIGATION_ROOT = 'RnavigationRoot';
import { Image } from 'react-native';
import styles from 'react-native-phone-input/lib/styles';

export function setectTabBarNaviagtion(selection) {
  Navigation.mergeOptions('tabbar', {
    bottomTabs: {
      currentTabIndex: selection
    }
  })
}

export default function homeScreen(userdata) {
  showHomeScreen(userdata);
  return;
  Navigation.setRoot({
    root: {
      stack: {
        id : 'a',
        children: [
          {
            component: {
              id: 'HomeScreen', // Optional, Auto generated if empty
              name: 'TutorialScreen',
              passProps: {
                data: this.state,
              },
              options: {
                topBar: {
                  visible: false,
                  drawBehind: true,
                  animate: false,
                },

                // fab: {
                //   id: 'asdsa',
                //   icon: require('./assets/TabBar/tab1.png'),
                //   visible: true,
                //   size: 500,
                //   backgroundColor: 'blue'
                // }


              },


            },

          },
        ],
        options: {
          fab: {
            id: "approval",
            visible: true,
            backgroundColor: "#000",
            clickColor: "#FFF",
            rippleColor: "#ddd",
            icon: require('./assets/TabBar/tab1.png'),
            iconColor: "#FFF",
            actions: [{
              id: "reject",
              backgroundColor: "#ffffff",
              icon: require('./assets/TabBar/tab2.png'),
            },
            {
              id: "accept",
              backgroundColor: "#e74c3c",
              icon: require('./assets/TabBar/tab3.png'),
            }
            ]
          }
        }
      },
    },
  });

  // setTimeout(function () {
  //   Navigation.mergeOptions("a", {
  //     fab: { id: "approval", visible: true }
  //   });
  // }, 20)

}

export function changeBottomTabsColor(color) {

  Navigation.mergeOptions("ReportScreen", {
    bottomTab: {
      text: 'Arena',

      icon: require('./assets/TabBar/tab1.png'),
      selectedIconColor: color,
      // selectedTextColor: 'blue',
      textColor: 'grey',
    }
  })
  Navigation.mergeOptions("SettingsScreen", {
    bottomTab: {
      selectedIconColor: color
    }
  })

  Navigation.mergeOptions("QuestionnaireScreen", {
    bottomTab: {
      selectedIconColor: color
    }
  })
  Navigation.mergeOptions("TrendScreen", {
    bottomTab: {
      selectedIconColor: color
    }
  })
}

const showHomeScreen = (userdata) => {


  getUserThemePointer().then(function (data) {
    var value = 0;
    if (data) {
      value = parseInt(data)

      // that.setState({ selectedTheme: index });
    }
    var color = THEME_ARRAY[value];
    // changeBottomTabsColor(color)
    Navigation.setRoot({
      root: {
//         externalComponent : {

// id : "TutorialScreen"
//         },
        stack: {
          id: NAVIGATION_ROOT,
          children: [
            {
              bottomTabs: {
                id : 'tabbar',
                children:
                  botomTabsScreen(userdata, color),
                options: { 
                  topBar: {
                    visible: false,
                    drawBehind: true,
                    animate: false,

                  },
                  bottomTabs: {
                    animate: false,
                    // backgroundColor : 'red',
                    titleDisplayMode: 'alwaysShow',
                    visible : false
                    
                  },


                },



              }


            }

          ],
        //   options: {
        //     fab: {
        //       id: "approval",
        //       visible: true,
        //       backgroundColor: "#000",
        //       clickColor: "#FFF",
        //       rippleColor: "#ddd",
        //       icon: require('./assets/TabBar/tab1.png'),
        //       iconColor: "#FFF",
        //       alignVertically : 'center',
        //       alignHorizontally : 'center',

        //       actions: [{
        //         id: "reject",
        //         backgroundColor: "#ffffff",
        //         icon: require('./assets/TabBar/tab2.png'),
        //       },
        //       {
        //         id: "accept",
        //         backgroundColor: "#e74c3c",
        //         icon: require('./assets/TabBar/tab3.png'),
        //       }
        //       ]
        //     }
        //   }
        }
      }

    });
  })


}

const botomTabsScreen = (userdata, color) => {
  return [
    {
      // stack: {
      //   id: 'NavTab1',
      //   children: [
      // {
      component: {
        id: "ReportScreen", // Optional, Auto generated if empty
        name: "ReportScreen",
        options: {
          topBar: {
            visible: false,
            drawBehind: true,
            animate: false,

          },
          bottomTab: {
            fontSize: 10,
            text: 'Arena',

            icon: require('./assets/TabBar/tab1.png'), //<Image source = {require('./assets/TabBar/tab1.png')}/>,
            selectedIconColor: color,
            // selectedTextColor: 'blue',
            textColor: 'grey',

          },

        },
        passProps: {
          data: userdata,
          notifications: [],
          user_id: userdata.userId,
          color: color
        }
      }
      //     }
      //   ]
      // }
    },
    {
      component: {
        id: "QuestionnaireScreen", // Optional, Auto generated if empty
        name: "QuestionnaireScreen",
        options: {
          // topBar: {
          //   visible: false,
          //   drawBehind: true,
          //   animate: false,

          // },
          bottomTab: {
            fontSize: 10,
            text: 'Survey',
            icon: require('./assets/TabBar/tab2.png'),
            selectedIconColor: color,
            textColor: 'grey',

            // iconInsets: {
            //   top: -10, // optional, default is 0.
            //   left: 0, // optional, default is 0.
            //   bottom: 10, // optional, default is 0.
            //   right: 0 // optional, default is 0.
            // }
          }
        },
        passProps: {
          notifications: [],
          surveyThreadID: null,
          user_id: userdata.userId,
          data: userdata,
          color: color
        }
      }
    },
    {
      component: {
        // id: "AboutAppScreen2", // Optional, Auto generated if empty
        name: "PoliceProfileScreen",
        options: {
          // topBar: {
          //   visible: false,
          //   drawBehind: true,
          //   animate: false,

          // },
          bottomTab: {
            fontSize: 10,
            text: 'Rate Now',
            icon: require('./assets/TabBar/tab3.png'),// <Image source = {require('./assets/TabBar/tab3.png')}/>,
            // selectedIconColor: APP_GLOBAL_COLOR,
            // textColor:'grey',
            iconInsets: {
              top: -10, // optional, default is 0.
              left: 0, // optional, default is 0.
              bottom: 10, // optional, default is 0.
              right: 0 // optional, default is 0.
            }
          }

        },
        passProps: {
          user_id: userdata.userId,
          userId: userdata.userId,
          // lat_long: this.data.lat_lon,
          isPolice: true,
          username: userdata.username,
          userLanguage: userdata.userLanguage,
          color: color,
          data : userdata
          // languageCode: this.state.firstAPIresponse ? this.state.firstAPIresponse.languageCodes : null,
          // language: menuName ? menuName[4] : null,
        }
      }
    }, {
      component: {
        // id: "QuestionnaireScreen", // Optional, Auto generated if empty
        id: 'TrendScreen',
        name: "TrendScreen",
        options: {
          // topBar: {
          //   visible: false,
          //   drawBehind: true,
          //   animate: false,

          // },
          bottomTab: {
            fontSize: 10,
            text: 'Trends',
            icon: require('./assets/TabBar/tab4.png'),
            selectedIconColor: color,
            textColor: 'grey',

          }
        },
        passProps: {
          notifications: [],
          data: userdata,
          color: color,
          user_id: userdata.userId,
        }
      }
    },
    {
      component: {
        id: "SettingsScreen", // Optional, Auto generated if empty
        name: "SettingsScreen",
        options: {
          // topBar: {
          //   visible: false,
          //   drawBehind: true,
          //   animate: false,

          // },
          bottomTab: {
            fontSize: 10,
            text: 'Settings',
            icon: require('./assets/TabBar/tab5.png'),
            selectedIconColor: color,
            textColor: 'grey',
            
          },


        },
        passProps: {
          notifications: [],
          data: userdata,
          user_id: userdata.userId,
          color: color
        }
      }
    }
  ]




}

createBottomTab = () => {

}
