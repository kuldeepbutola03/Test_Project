import axios from 'axios';
import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon, withBadge } from 'react-native-elements';
import firebase from 'react-native-firebase';
import KochavaTracker from 'react-native-kochava-tracker';
import { Navigation } from 'react-native-navigation';
import Permissions from 'react-native-permissions';
import { LANDING_TOP_SIX, GET_USER_DETAILS_EMAIL } from '../../../Apis';

import Spinner from '../../components/UI/Spinner/Spinner';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Avatar } from 'react-native-elements';
import { NavigationBarDefault } from '../../components/UI/NavigationBarDefault/NavigationBarDefault';
import { THEME_ARRAY, getUserThemePointer, saveUserThemePointer, refreshUserScreen, PROPS_ARRAY_NOTIFY_SCREEN, saveUserHomeScreen } from '../../../Constant';

import { changeBottomTabsColor } from '../../AppNavigation';
import TabBarNavigation from '../../components/UI/TabBarNavigation/TabBarNavigation';
import { TouchablePreview } from 'react-native-navigation/lib/dist/adapters/TouchablePreview';




export default class SettingsScreen extends Component {
    state = {
        notifications: this.props.notifications,
        data: this.props.data,
        loading: true,
        user_id: this.props.user_id,
        selectedTheme: 0,
        selectedIndexTab: this.props.selectedIndexTab ? this.props.selectedIndexTab : 0,
        menuNameArray: this.props.menuNameArray
        
    }

componentWillUnmount() {

    // PROPS_ARRAY_NOTIFICATION.push(this.refreshNotificationData);

    var index = PROPS_ARRAY_NOTIFY_SCREEN.indexOf(this.refreshUserScreenUI);
    if (index > -1) {
        PROPS_ARRAY_NOTIFY_SCREEN.splice(index, 1);
    }


}
componentDidMount() {
    PROPS_ARRAY_NOTIFY_SCREEN.push(this.refreshUserScreenUI);

    // PROPS_SHOW_PROFILE_SCREEN.push(this.profileScreen)
    // PROPS_ARRAY_NOTIFICATION.push(this.refreshNotificationData);
    // this.getDataFromServer(true)
    var screen = "Settings_Screen"
    firebase.analytics().setCurrentScreen("Screen", screen);
    //firebase.analytics().logEvent("Trends_Screen");
    firebase.analytics().setUserProperty("Screen", screen);
    firebase.analytics().logEvent("Content", { "Screen": screen });

    var eventMapObject = {};
    eventMapObject["screen_name"] = screen;
    KochavaTracker.sendEventMapObject(KochavaTracker.EVENT_TYPE_LEVEL_COMPLETE_STRING_KEY, eventMapObject);

    var that = this
    getUserThemePointer().then(function (data) {
        if (data) {
            var intValue = parseInt(data)
            that.setState({ selectedTheme: intValue })
            // that.setState({ selectedTheme: index });
        } else {
            that.setState({ selectedTheme: 0 })
        }
    })
    this.getUserDetails();




}
refreshUserScreenUI = (notifications, screen, purpose) => {
    //
    if (screen === 4 || screen < 0) {
        // if (purpose === 0) {
        //     this.setState({ data: notifications })
        // } else if (purpose === 1) {
        //     this.setState({ selectedThemeColor: notifications })
        // } else 
        if (purpose === 2) {
            this.setState({ notifications: notifications });
        } else if (purpose === 3) {
            this.profileScreen()
        } else if (purpose === 6) {
            this.setState({ selectedIndexTab: notifications });
        } else if (purpose === 7) {
            this.setState({ menuNameArray: notifications });
        }
    }
}
refreshNotificationData = (notifications) => {
    console.log('Reposrt');
    this.setState({ notifications: notifications });
}

    static propTypes = {
    componentId: PropTypes.string,
};


homeButtonTapped = () => {
    Navigation.pop(this.props.componentId);
};

profileScreen = () => {
    let extraImage = "Trends,Survey,Arena,Notifications,Rate Now, Profile, Male,Female, Select Your Profession,Student,Salaried,Entrepreneur, Retired, Housewife,Other, Select Your Age group, Teenager,Twenties,Thirties,Forties,Fifties,Sixty+";
    let menuName = extraImage.split(',');

    // let menuName = 
    let languageCode = {
        "hi": "Hindi",
        "en": "English"
    };// this.state.firstAPIresponse ? this.state.firstAPIresponse.languageCodes : null;

    let body = {
        image: this.state.data.image,
        firstName: this.state.data.firstName,
        lastName: this.state.data.lastName,
        // email: this.props.email ? this.props.email : "",
        username: this.state.data.username,
        selectedAgeGroupCode: this.state.data.selectedAgeGroupCode,
        gender: this.state.data.gender,
        userId: this.state.data.userId,
        description: this.state.data.description,
        userDesignation: this.state.data.userDesignation,
        userLanguage: this.state.data.userLanguage,

        refreshUI: this.refreshUI,

        languageCode: languageCode,
        language: menuName ? menuName[5] : null,
        male: menuName ? menuName[6] : null,
        female: menuName ? menuName[7] : null,
        selProfession: menuName ? menuName[8] : null,
        student: menuName ? menuName[9] : null,
        salaried: menuName ? menuName[10] : null,
        entrepreneur: menuName ? menuName[11] : null,
        retired: menuName ? menuName[12] : null,
        housewife: menuName ? menuName[13] : null,
        other: menuName ? menuName[14] : null,
        selAgeGroup: menuName ? menuName[15] : null,
        teenager: menuName ? menuName[16] : null,
        twenties: menuName ? menuName[17] : null,
        thirties: menuName ? menuName[18] : null,
        fourties: menuName ? menuName[19] : null,
        fifties: menuName ? menuName[20] : null,
        aboveSixty: menuName ? menuName[21] : null,

        color: THEME_ARRAY[this.state.selectedTheme]
    };

    Navigation.push(this.props.componentId, {
        component: {
            name: 'Profile',
            passProps: body,
            options: {
                topBar: {
                    visible: false,
                    drawBehind: true,
                    animate: false,
                },
            }
        }
    });
}

refreshUI = (data) => {
    var dict = { ...this.state.data, ...data }
    // dict.

    this.setState({ data: dict });
    // refreshUserProfile(dict);
    refreshUserScreen(dict, -1, 0)
}

getLanguage = (lang) => {
    if (lang === 'en') {
        return 'English'
    } else if (lang === 'hi') {
        return 'Hindi'
    }
    return 'ENG'
}

getUserDetails = () => {

    // let body = null;
    // that = this;
    let body = {
        userId: this.state.user_id,
    };

    axios.post(GET_USER_DETAILS_EMAIL, body)
        .then(response => {

            if (response) {
                let responseJson = response.data;
                let dict = {};
                dict["image"] = responseJson.userImageData;
                dict["username"] = responseJson.userName;
                dict["firstName"] = responseJson.userFirstName;
                dict["lastName"] = responseJson.userLastName;

                dict["selectedAgeGroupCode"] = responseJson.userAgeGroup;
                dict["gender"] = responseJson.userGender;
                dict["userDesignation"] = responseJson.userDesignation;

                dict["userId"] = responseJson.userId;
                dict["description"] = responseJson.userDescription;

                dict["userLanguage"] = responseJson.userLanguage;

                dict["userPolArea"] = responseJson.userPolArea;
                dict["userState"] = responseJson.userState;


                //                 "userId": 6,
                // "userFirstName": "Kmama",
                // "userLastName": "Bmama",
                // "userName": "Kkkbbbb",
                // "userEmail": null,
                // "userFb": null,
                // "userMobile": 8375057836,
                // "userCountryCode": "+91",
                // "userOtp": "186904",
                // "isUserValidated": "N",
                // "isEnabled": "N",
                // "userPassword": null,
                // "userVerificationToken": null,
                // "userImageName": "IMG1560237111493.jpg",
                // "userImageData": null,
                // "latLngSeparatedByComma": null,
                // "userInitCoord": "30.646636301161042,79.63306043254627",
                // "userPolArea": "Badrinath",
                // "userFirArea": "Garhwal",
                // "userState": "Uttarakhand",
                // "blueTickVerified": null,
                // "phoneVerified": null,
                // "pictureVerified": null,
                // "inPersonVerified": null,
                // "userGender": "Male",
                // "userAgeGroup": "51-60",
                // "userDesignation": " Retired",
                // "userDescription": "WT####ksk",
                // "userLanguage": "en",
                // "pushNotificationToken": "asdasdasdasdasdads",
                // "userDevice": null,
                // "landResSurveyFlag": null,
                // "areaStateMap": null,
                // "fetchRecords": null,
                // "sortMethod": null

                this.setState({ data: dict, loading: false });
                // refreshUserProfile(dict);
                refreshUserScreen(dict, -1, 0)
                // saveUserData(this.state.data);
            }

        })
        .catch(error => {
            // alert('bbb');
            console.log(error)
        })
    // fetch(GET_USER_DETAILS_EMAIL, {
    //   method: 'POST',
    //   headers: authHeaders(),
    //   body: body,
    // }).then((response) => response.json())

    //   .then((responseJson) => {
    //     if (responseJson) {
    //       let dict = {};
    //       dict["image"] = responseJson.userImageData;
    //       dict["username"] = responseJson.userName;
    //       dict["firstName"] = responseJson.userFirstName;
    //       dict["lastName"] = responseJson.userLastName;
    //       dict["selectedAgeGroupCode"] = responseJson.userAgeGroup;
    //       dict["gender"] = responseJson.userGender;
    //       dict["userId"] = responseJson.userId;
    //       dict["description"] = responseJson.userDescription;
    //       dict["userDesignation"] = responseJson.userDesignation;
    //       dict["userLanguage"] = responseJson.userLanguage;

    //       this.setState({ data: dict });
    //       saveUserData(this.state.data);
    //     }

    //     // this.serverHitForSecondResponse();
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
}

showFullPic = (data) => {
    // console.log(data); 
    // alert(data)
    Navigation.push(this.props.componentId, {
        component: {
            name: 'FullPicture',
            passProps: {
                data: data
            },
            options: {
                topBar: {
                    visible: true,
                    background: {
                        // color:'transparent',
                        translucent: true
                    }
                    // drawBehind
                    // drawBehind: true,
                    // animate: false,
                },
            }
        }
    });
}




renderComponent = () => {
    const { loading } = this.state;

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Spinner />

            </View>
        )
    } else {

        var { selectedTheme, selectedIndexTab } = this.state
        var that = this
        var address = ` ${this.state.data.userPolArea},  ${this.state.data.userState} `

        var homeScreens =
            [
                {
                    image: require('../../assets/Settings/arena_s.png'),
                    title: 'Arena',
                    sel: require('../../assets/TabBar/tab1.png')
                },
                {
                    image: require('../../assets/Settings/survey_s.png'),
                    title: 'Survey',
                    sel: require('../../assets/TabBar/tab2.png')

                }, {
                    image: require('../../assets/Settings/rateNow_s.jpeg'),
                    title: 'Rate Now',
                    sel: require('../../assets/TabBar/tab3.png')
                }
            ]

        var whatsNew = [
            require('../../assets/IntroImages/intro1.jpg'),
            require('../../assets/IntroImages/intro2.jpg'),
            require('../../assets/IntroImages/intro3.jpg'),
            require('../../assets/IntroImages/intro4.jpg'),
            require('../../assets/IntroImages/intro5.jpg'),
            require('../../assets/IntroImages/intro6.jpg'),
        ]

        let arrayOfWhatsNew = whatsNew.map(function (image, index) {



            return (
                <View style={{ padding: 4 }}>

                    <Image style={{ height: hp('15%'), aspectRatio: .75 }}
                        source={image}
                    />
                    {/* <Avatar
                            // rounded

                            source={image}//{this.state.data.image ? { uri: "data:image/png;base64," + this.state.data.image } : require('../../assets/UserSmall.png')}
                            size="large"

                            // size = {devicePixelRatio = 2}
                            avatarStyle={{ borderColor: 'white' }}
                            // backgroundColor = 'red'
                            overlayContainerStyle={{ backgroundColor: 'transparent' }}
                            // title={index === 2 ? 'Rate Now' : ''}
                            onPress={() => {
                                // that.themeColorSelected
                                // alert(index)

                                // var color = THEME_ARRAY[index]
                                // that.setState({ selectedTheme: index });

                                // refreshUserScreen(index, -1, 6)
                                // saveUserThemePointer(index);



                            }}
                        /> */}
                </View>
            )
        })


        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                {/* 
                    <TouchableOpacity style={{ position: 'absolute', top: 20, right: 20, height: 40, width: 40 }}
                        onPress={() => {
                            this.profileScreen()
                        }
                        }
                    >
                        <Image source={require('../../assets/Profile/editIcon.png')} style={{ height: 20, width: 20, alignSelf: 'center' }} />
                    </TouchableOpacity>

                    <Text style={{ marginTop: 40, marginBottom: 10, fontSize: 14 }}> {this.state.data.firstName} {this.state.data.lastName} </Text>
                    <Avatar
                        rounded
                        source={this.state.data.image ? { uri: "data:image/png;base64," + this.state.data.image } : require('../../assets/UserSmall.png')}
                        size={hp('15%')}//"large"
                        avatarStyle={{ borderColor: 'white', borderWidth: 2, borderRadius: hp('15%') / 2.0 }}
                    />
                    <Text style={{ marginTop: 10, fontSize: 14 }}> {this.state.data.username} </Text>
                    <Text style={{ margin: 10, fontSize: 14 }}> {this.state.data.description} </Text>

                    <View style={{ flexDirection: 'row', padding: 30, marginTop: 0 }}>
                        <Image source={require('../../assets/TabBar/tab1.png')} />
                        <Text style={{ marginTop: 10, fontSize: 14, fontWeight: 'bold' }}> {address} </Text>
                       

                    </View>

                    <View style={{ flexDirection: 'row', padding: 10, marginTop: 10 }}>

                        <Text style={{ fontSize: 14, fontWeight: 'bold', padding: 5 }}> Age: <Text style={{ fontSize: 11, fontWeight: '400' }}>{this.state.data.selectedAgeGroupCode}</Text> </Text>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', padding: 5 }}> Gender: <Text style={{ fontSize: 11, fontWeight: '400' }}>{this.state.data.gender}</Text> </Text>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', padding: 5 }}> Proffession: <Text style={{ fontSize: 11, fontWeight: '400' }}>{this.state.data.userDesignation}</Text> </Text>
                    </View> */}

                {/* seperator */}
                {/* <View style={{ height: 1, width: '100%', marginTop: 10, backgroundColor: 'grey' }} />

                    <Text style={{ fontSize: 14, fontWeight: 'bold', margin: 10 }}> Language: <Text style={{ fontSize: 14, fontWeight: '400' }}> {this.getLanguage(this.state.data.userLanguage)} </Text></Text> */}

                {/* theme */}
                <Text style={{ fontSize: 14, fontWeight: 'bold', margin: 15 }}> Theme </Text>
                <View style={{ flexDirection: 'row' }}>
                    {
                        THEME_ARRAY.map(function (color, index) {


                            return (
                                <View style={{ padding: 4 }}>

                                    <Avatar
                                        rounded
                                        // source={this.state.data.image ? { uri: "data:image/png;base64," + this.state.data.image } : require('../../assets/UserSmall.png')}
                                        size={hp('4%')}//"large"
                                        avatarStyle={{ borderColor: 'white', borderWidth: (selectedTheme === index ? 2 : 0), borderRadius: hp('4%') / 2.0 }}

                                        // backgroundColor = 'red'

                                        overlayContainerStyle={{ backgroundColor: color }}
                                        onPress={() => {
                                            // that.themeColorSelected
                                            // alert(index)
                                            var color = THEME_ARRAY[index]
                                            that.setState({ selectedTheme: index });

                                            refreshUserScreen(color, -1, 1)
                                            saveUserThemePointer(index);


                                            // changeBottomTabsColor(color)
                                            // Navigation.setDefaultOptions({

                                            //     bottomTab: {
                                            //         // fontSize: 12,
                                            //         // text: 'Survey',
                                            //         // icon: require('./assets/TabBar/tab2.png'),
                                            //         selectedIconColor: THEME_ARRAY[index],
                                            //     }

                                            // });
                                        }}
                                    />
                                </View>
                            )
                        })
                    }
                </View>

                {/* Home page */}
                <Text style={{ fontSize: 14, fontWeight: 'bold', margin: 15 }}> Home Page </Text>
                <View style={{ flexDirection: 'row' }}>
                    {
                        homeScreens.map(function (image, index) {

                            var isSelectedHomePage = index === selectedIndexTab
                            let alpha = isSelectedHomePage ? .5 : 0
                            let bgCC = `rgba(10,220,230,${alpha})`
                            // alert(bgCC);
                            return (
                                <View style={{ padding: 4 }}>

                                    <View>
                                        <TouchablePreview onPress={() => {
                                            if (selectedIndexTab === 3) {
                                                return
                                            }
                                            that.setState({ selectedIndexTab: index });
                                            refreshUserScreen(index, -1, 6);
                                            saveUserHomeScreen(index);

                                        }}>
                                            <Image style={{ height: hp('15%'), aspectRatio: .75 }}
                                                source={image.image}
                                            />
                                            <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: bgCC }} />
                                        </TouchablePreview>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 5 }}>
                                        <Image style={{ aspectRatio: 1, width: 15 }}
                                            source={image.sel}
                                        />
                                        <Text style={{ fontSize: 11 }}> {image.title} </Text>
                                    </View>
                                    {/* <Avatar 
                                            // rounded

                                            source={image}//{this.state.data.image ? { uri: "data:image/png;base64," + this.state.data.image } : require('../../assets/UserSmall.png')}
                                            size={hp('4%')}//"large"
                                            avatarStyle={{ borderColor: 'white', borderWidth: (isSelectedHomePage ? 2 : 0), borderRadius: hp('4%') / 2.0 }}
                                            // backgroundColor = 'red'
                                            overlayContainerStyle={{ backgroundColor: 'transparent' }}
                                            title={index === 2 ? 'Rate Now' : ''}
                                            onPress={() => {
                                                // that.themeColorSelected
                                                // alert(index)

                                                // var color = THEME_ARRAY[index]
                                                // that.setState({ selectedTheme: index });

                                                refreshUserScreen(index, -1, 6)
                                                // saveUserThemePointer(index);



                                            }}
                                        /> */}
                                </View>
                            )
                        })
                    }
                </View>


                {/* What's new */}
                <Text style={{ fontSize: 14, fontWeight: 'bold', margin: 15 }}> What's New </Text>
                <TouchableOpacity onPress={() => {
                    Navigation.push(this.props.componentId, {
                        component: {
                            name: 'WhatsNewScreen',
                            passProps: {
                                color: THEME_ARRAY[this.state.selectedTheme]
                            },
                            options: {
                                topBar: {
                                    visible: false,
                                    drawBehind: true,
                                    animate: false,
                                },
                            }
                        }
                    });
                }}
                >
                    <View style={{ flexDirection: 'row' }}>
                        {

                            [arrayOfWhatsNew[0], arrayOfWhatsNew[1], arrayOfWhatsNew[2]]
                        }
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {

                            [arrayOfWhatsNew[3], arrayOfWhatsNew[4], arrayOfWhatsNew[5]]
                        }
                    </View>
                </TouchableOpacity>



            </View >



        )
    }
}

themeColorSelected = (index) => {

}

render() {
    return (
        <SafeAreaView
            forceInset={{ bottom: 'always' }}
            style={styles.safeViewContainer}>

            <NavigationBarDefault
                imageSource={this.state.data.image ? { uri: "data:image/png;base64," + this.state.data.image } : require('../../assets/UserSmall.png')}
                bgColor={THEME_ARRAY[this.state.selectedTheme]}
                notifications={this.state.notifications}
                data={this.props.data}
                showBackButton={this.props.notFirstScreen}
                
            >{this.state.data.username}</NavigationBarDefault>

            <ScrollView>
                {this.renderComponent()}
            </ScrollView>
            <TabBarNavigation color={THEME_ARRAY[this.state.selectedTheme]} selectedIndex={4} selectedIndexTab={this.state.selectedIndexTab} menuNameArray= {this.state.menuNameArray}/>
        </SafeAreaView>
    )
}
}

const styles = StyleSheet.create({
    safeViewContainer: {
        flex: 1,
        backgroundColor: 'rgba(210,210,208,1)'
    },
    imageContainer: {
        flex: 1,
    },
    carouselContainer: {
        flex: 12,
        margin: 0,
    }
})


