import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { BackHandler, Dimensions, Easing, Image, Linking, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Icon, withBadge } from 'react-native-elements';
import firebase from 'react-native-firebase';
// const { notifications } = this.state
import KochavaTracker from 'react-native-kochava-tracker';
import { Navigation } from 'react-native-navigation';
// import Dialog from 'react-native-dialog';
import Permissions from 'react-native-permissions';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import TextTicker from 'react-native-text-ticker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { DEBUG, GET_USER_DETAILS_EMAIL, GET_USER_NOTIFICATIONS, LANDING_CDM, LANDING_PDM, LANDING_RESOURCES, LANDING_TOP_SIX, UPDATE_USER_NOTIFICATIONS } from '../../../Apis';
import { APP_GLOBAL_COLOR, authHeaders, DEFAULT_USER_ID, normalize, saveUserData, showAdsTilesRectangle, refreshUserScreen } from '../../../Constant';
import MenuButtons from '../../components/UI/ProfileView/MenuButtons';
import ProfileView from '../../components/UI/ProfileView/ProfileView';
import Spinner from '../../components/UI/Spinner/Spinner';
import TableView from '../../components/UI/TableView/TableView';
import MyTopSix from '../../components/UI/TopSix/MyTopSix';
import { itemWidth, sliderWidth } from '../AboutAppScreen/SliderEntry.style';


export default class ResultExitScreen extends Component {

    state = {

        showAds: false,
        showAdsClose: false,

        scrollViewOffset: 0,
        showDialog: false,


        timer: null,
        timer2: null,
        timer3: null,
        timer4: null,
        timer5: null,

        counter: 0,
        // user_id: '1',

        landingTopSix: null,



        activeSlide: 0,


        // menuName: menuArr,
        width: 0,
        height: 0,
        // loadingFourth

        currLandPageSurvey: this.props.currLandPageSurvey,
        firstAPIresponse: this.props.firstAPIresponse,

        slideContent: this.props.slideContent,
        topSixContent: this.props.topSixContent,

        lat_lon: this.props.lat_lon
    };

    static propTypes = {
        componentId: PropTypes.string,
    };

    constructor(props) {
        let extraImage = "Trends,Survey,Arena,Notifications,Rate Now, Profile, Male,Female, Select Your Profession,Student,Salaried,Entrepreneur, Retired, Housewife,Other, Select Your Age group, Teenager,Twenties,Thirties,Forties,Fifties,Sixty+";
        let menuArr = extraImage.split(',');


        super(props);
       
    }



    tick = () => {

        console.log("tick start");
        // alert('aaa');
        // this.checkPermission();

        // this.getUserDetails();


    };
    tick2 = () => {
        // console.log("tick2")
        this.scroll1 && this.scroll1.scrollTo({
            x: this.state.scrollViewOffset === 0 ? Dimensions.get('window').width : 0,

            animate: true,
        });
        if (this.scroll2) {
            this.scroll2.scrollTo({
                x: this.state.scrollViewOffset === 0 ? Dimensions.get('window').width : 0,

                animate: true,
            });
        }
        this.setState({ scrollViewOffset: this.state.scrollViewOffset === 0 ? 1 : 0 });
    }
    tick3 = () => {
        if (!this.props.isLoading && this._carousel) {

            let sliderP = ((this.state.activeSlide + 1) >= this.props.slideContent.length) ? 0 : (this.state.activeSlide + 1);
            this._carousel.snapToItem(sliderP, true, false);
            // snapToItem(index: number, animated?: boolean, fireCallback?: boolean): void;
            this.setState({ activeSlide: sliderP });
        }
    }
    tick4 = () => {
        if (this.state.timer4) {
            console.log("startScroll stop")
            let timer = this.state.timer4;

            clearInterval(this.state.timer4);
            timer = null;
        }
        this.showTheAds()//.bind(this);
    }
    showTheAds = () => {
        this.setState({ showAds: true });

        var that = this;
        setTimeout(function () {
            that.setState({ showAdsClose: true });

            var thatIt = that;
            setTimeout(function () {
                thatIt.hideTheAds();
            }, (8 - 3) * 1000);

        }, 3 * 1000);


    }
    hideTheAds = () => {
        this.setState({ showAds: false, showAdsClose: false })
        this.startAdsStartTimer(60 * 1000);
    }


    componentWillUnmount() {
        clearInterval(this.state.timer);
        this.backHandler.remove();

        Linking.removeEventListener('url', this.handleOpenURL);
    }

    goBack = () => {
        if (this.props.componentId === "HomeScreen" || this.props.componentId === "Component10") {
            BackHandler.exitApp();
            return true;

        }
    }

    componentDidMount() {


        // firebase.analytics().setCurrentScreen("Home_Screen");
        // //firebase.analytics().logEvent("Home_Screen");
        // firebase.analytics().setUserProperty("Screen", "Home_Screen");
        // firebase.analytics().logEvent("Content", { "Screen": "Home_Screen" });

        // var eventMapObject = {};
        // eventMapObject["screen_name"] = "Home_Screen";
        // KochavaTracker.sendEventMapObject(KochavaTracker.EVENT_TYPE_LEVEL_COMPLETE_STRING_KEY, eventMapObject);



        // alert("aaa");

        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.goBack);
        // this.startTimer();
        this.startScroll(10 * 1000);
        this.startTopScroll(12 * 1000);
        this.startAdsStartTimer(2 * 1000);

        const check = this.props.firstAPIresponse && this.props.firstAPIresponse.exitOrResultDay ? this.props.firstAPIresponse.exitOrResultDay : null;

        if (!check) {
            this.startTimer(120 * 1000);
        } else if (check === 'e') {
            this.startTimer(120 * 1000);
        } else if (check === 'r') {
            this.startTimer(60 * 1000);
        }

        this.serverHitForFourthResponse()



    }


    serverHitForFourthResponse = () => {
        // console.log('called')
        var body = {
            userId: this.props.user_id
        };
        if (this.props.lat_lon) {
            body["latLngSeparatedByComma"] = this.props.lat_lon;
        }
        //alert(JSON.stringify(body));
        axios.post(LANDING_TOP_SIX, body)
            .then(response => {
                let responseData = response.data;
                // console.log(responseData)
                //alert(JSON.stringify(responseData));
                let extraImage = responseData.extraImageFile3 ? responseData.extraImageFile3 : "Trends,Survey,Arena,Notifications,Rate Now, Profile, Male,Female, Select Your Profession,Student,Salaried,Entrepreneur, Retired, Housewife,Other, Select Your Age group, Teenager,Twenties,Thirties,Forties,Fifties,Sixty+";
                let menuArr = extraImage.split(',');


                this.setState({ landingTopSix: responseData, menuName: menuArr })
                refreshUserScreen(menuArr , -1 , 7)
                
            })
            .catch(error => {
                // alert('bbb');
                console.log(error)
            })
    }

    handleCancel = () => {
        this.setState({ showDialog: false });
        // alert(this.areaCode);
    };


    startTimer(time) {
        console.log("timer started")
        if (this.state.timer) {
            console.log("timer stop")
            let timer = this.state.timer;

            clearInterval(this.state.timer);
            timer = null;
        }

        let timer = setInterval(this.tick, time); //60 * 1000
        this.setState({ timer: timer });
    }

    startScroll(time) {
        console.log("startScroll started")
        if (this.state.timer2) {
            console.log("startScroll stop")
            let timer = this.state.timer2;

            clearInterval(this.state.timer2);
            timer2 = null;
        }


        let timer2 = setInterval(this.tick2, time); //60 * 1000
        this.setState({ timer2: timer2 });
    }
    startTopScroll(time) {
        console.log("startScroll started")
        if (this.state.timer3) {
            console.log("startScroll stop")
            let timer = this.state.timer3;

            clearInterval(this.state.timer3);
            timer3 = null;
        }

        let timer3 = setInterval(this.tick3, time); //60 * 1000
        this.setState({ timer3: timer3 });
    }

    startAdsStartTimer(time) {
        console.log("startScroll started")
        if (this.state.timer4) {
            console.log("startScroll stop")
            let timer = this.state.timer4;

            clearInterval(this.state.timer4);
            timer = null;
        }

        let timer4 = setInterval(this.tick4, time); //60 * 1000
        this.setState({ timer4: timer4 });
    }

    profileViewAfterLoading = data => {

        if (this.props.isLoading) {
            return (
                <View style={styles.profileContainer}>
                    <ProfileView
                        style={{ marginLeft: 1, marginRight: 0.5 }}
                        infos={null}
                        source={null}
                        // onPress={this.toPoliceProfileScreen}
                        areaType={null}
                    />
                    {/* <ProfileView
              style={{ marginLeft: 0.5, marginRight: 1 }}
              infos={null}
              source={null}
              onPress={this.toFireDepartmentScreen}
              areaType={null}
            /> */}
                </View>
            );
        }
        else {


            return (
                <View style={{ flex: 1, width: "100%", backgroundColor: 'white', alignItems: 'center' }}>
                    {/* <View style={{ height: 20, width: '100%', backgroundColor: 'rgb(82,196,30)' }}>
            <Text style={{ textAlign: 'center', fontSize: 10, textAlignVertical: 'center', color: 'white',flex:1, fontWeight:'bold' }}>Election 2019</Text>
          </View> */}
                    <Carousel
                        layout={'default'}
                        layoutCardOffset={18}
                        ref={(c) => { this._carousel = c }}
                        data={this.props.slideContent}
                        renderItem={this._renderItem.bind(this)}
                        sliderWidth={sliderWidth}
                        itemWidth={itemWidth}
                        shouldOptimizeUpdates
                        onSnapToItem={(index) => {

                            // if (index === 3) {
                            // alert(index);
                            //   this.showMobileScreen();
                            // } else {
                            this.setState({ activeSlide: index });
                            // }

                        }}
                    />
                    {this.pagination}
                </View>
            )
        }
    }

    onLayout = (e) => {
        this.setState({
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height,
        })
    }

    _renderItem({ item, index }) {
        const { width, height } = this.state;
        const {  firstAPIresponse } = this.props;
        // console.log(this.state.slideContent);
        let type = firstAPIresponse.exitOrResultDay;
        return (
            <View key={index} style={{ flex: 0.8, }} onLayout={this.onLayout}>
                <TableView logo={firstAPIresponse.categoryLogoData ? firstAPIresponse.categoryLogoData : {}} type={type} Width={width} Height={height} activeSlide={index} item={item} />
            </View>
        );
    }

    get pagination() {
        const { activeSlide } = this.state;
        return (
            <Pagination
                dotsLength={this.props.slideContent.length}
                activeDotIndex={activeSlide}
                containerStyle={{
                    backgroundColor: 'transparent',
                    // backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    position: 'absolute',
                    bottom: 0,
                    width: "100%",

                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    // justifyContent: 'space-around'


                }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: 'black' //rgba(255, 255, 255, 0.92)'
                }}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    }

    renderSurveyButton = () => {
        const { menuName, landingTopSix } = this.state;
        const {currLandPageSurvey} = this.props;
        if (landingTopSix) {
            if (currLandPageSurvey) {
                let firstKey = Object.keys(currLandPageSurvey)[0];
                // console.log(currLandPageSurvey[firstKey])
                return (
                    <Button
                        title={currLandPageSurvey[firstKey]}
                        buttonStyle={{ backgroundColor: '#a01414', width: '90%', alignSelf: 'center' }}
                        onPress={() => {
                            Navigation.push(this.props.componentId, {
                                component: {
                                    name: 'QuestionnaireScreen',
                                    options: {
                                        topBar: {
                                            visible: false,
                                            drawBehind: true,
                                            animate: false,
                                        },
                                    },
                                    passProps: {
                                        surveyThreadID: firstKey,
                                        user_id: this.state.user_id,
                                        lat_lon: this.state.lat_lon,
                                        // surveyType: 'L',
                                        surveyTitle: currLandPageSurvey[firstKey],
                                        componentId: this.props.componentId,
                                        menuName: menuName ? menuName : null,

                                        notifications: this.state.notifications,
                                        readNotification: this.readNotification,
                                        updateNotifications: this.updateNotifications,
                                    }
                                },
                            });
                        }}
                    />
                )
            } else {
                return (
                    <Button
                        title="No Active Survey"
                        buttonStyle={{ width: '90%', alignSelf: 'center' }}
                        disabled />
                )
            }
        } else return null;
    }

    gotoProfile = () => {

        const { menuName } = this.state;

        let languageCode = this.props.firstAPIresponse ? this.props.firstAPIresponse.languageCodes : null;

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

    getShow = () => {
        if (this.props.firstAPIresponse && this.props.firstAPIresponse.exitOrResultDay === "r") {
            if (this.state.landingTopSix && this.state.landingTopSix.areaTopSixResources2)
                if (this.state.landingTopSix.areaTopSixResources2.resourceGPR_6 === 0) {
                    return "leading"
                } else {
                    return "won"
                }
        }

        return null;
    }

    // swipe = () => {
    //   this.scroll.scrollTo({ x: wd, y: 0, animated: true });
    // };

    getDuration(len) {

        return (len * 20) + 10000
    }

    render() {
        // let menuImageName = [
        //     require('../../assets/trends.png'),
        //     require('../../assets/survey.png'),
        //     require('../../assets/timeline.png'),
        // ];

        const wd = Dimensions.get('window').width;

        // if (this.state.landingTopSix) {
        //   let keys = this.state.landingTopSix.keys;
        //   if (!keys.contains("areaTopSixResources2")) {
        //     return (<View></View>);
        //   }
        // }


        // const resourceGPR_1 = this.state.landingTopSix ? this.state.landingTopSix.resourceGPR_1 : 40;
        // const resourceGPR_2 = this.state.landingTopSix ? this.state.landingTopSix.resourceGPR_2 : 20;
        // const resourceGPR_3 = this.state.landingTopSix ? this.state.landingTopSix.resourceGPR_3 : 10;
        // const resourceGPR_4 = this.state.landingTopSix ? this.state.landingTopSix.resourceGPR_4 : 30;
        // const resourceGPR_5 = this.state.landingTopSix ? this.state.landingTopSix.resourceGPR_5 : 55;
        // const resourceGPR_6 = this.state.landingTopSix ? this.state.landingTopSix.resourceGPR_6 : 70;

        // const resourceGPR_1_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceGPR_1 : 40;
        // const resourceGPR_2_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceGPR_2 : 20;
        // const resourceGPR_3_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceGPR_3 : 10;
        // const resourceGPR_4_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceGPR_4 : 30;
        // const resourceGPR_5_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceGPR_5 : 55;
        // const resourceGPR_6_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceGPR_6 : 70;

        // const resourceGPR_A_1 = [
        //     resourceGPR_1,
        //     resourceGPR_2,
        //     resourceGPR_3,
        //     resourceGPR_4,
        //     resourceGPR_5,
        //     resourceGPR_6];
        // const resourceGPR_A_2 = [
        //     resourceGPR_1_,
        //     resourceGPR_2_,
        //     resourceGPR_3_,
        //     resourceGPR_4_,
        //     resourceGPR_5_,
        //     resourceGPR_6_,];

        const resourceImageData_1 = this.state.landingTopSix && this.state.landingTopSix.resourceImageData_1 ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceImageData_1 } : null
        const resourceImageData_2 = this.state.landingTopSix && this.state.landingTopSix.resourceImageData_2 ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceImageData_2 } : null
        const resourceImageData_3 = this.state.landingTopSix && this.state.landingTopSix.resourceImageData_3 ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceImageData_3 } : null
        const resourceImageData_4 = this.state.landingTopSix && this.state.landingTopSix.resourceImageData_4 ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceImageData_4 } : null
        const resourceImageData_5 = this.state.landingTopSix && this.state.landingTopSix.resourceImageData_5 ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceImageData_5 } : null
        const resourceImageData_6 = this.state.landingTopSix && this.state.landingTopSix.resourceImageData_6 ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceImageData_6 } : null

        const resourceImageData_1_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceImageData_1 } : null
        const resourceImageData_2_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceImageData_2 } : null
        const resourceImageData_3_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceImageData_3 } : null
        const resourceImageData_4_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceImageData_4 } : null
        const resourceImageData_5_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceImageData_5 } : null
        const resourceImageData_6_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceImageData_6 } : null

        const resourceImageData_A = [
            resourceImageData_1,
            resourceImageData_2,
            resourceImageData_3,
            resourceImageData_4,
            resourceImageData_5,
            resourceImageData_6];

        const resourceImageData_A_2 = [
            resourceImageData_1_,
            resourceImageData_2_,
            resourceImageData_3_,
            resourceImageData_4_,
            resourceImageData_5_,
            resourceImageData_6_];

        const resourceCategoryLogoData_1 = this.state.landingTopSix && this.state.landingTopSix.resourceCategoryLogoData_1 ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceCategoryLogoData_1 } : null
        const resourceCategoryLogoData_2 = this.state.landingTopSix && this.state.landingTopSix.resourceCategoryLogoData_2 ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceCategoryLogoData_2 } : null
        const resourceCategoryLogoData_3 = this.state.landingTopSix && this.state.landingTopSix.resourceCategoryLogoData_3 ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceCategoryLogoData_3 } : null
        const resourceCategoryLogoData_4 = this.state.landingTopSix && this.state.landingTopSix.resourceCategoryLogoData_4 ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceCategoryLogoData_4 } : null
        const resourceCategoryLogoData_5 = this.state.landingTopSix && this.state.landingTopSix.resourceCategoryLogoData_5 ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceCategoryLogoData_5 } : null
        const resourceCategoryLogoData_6 = this.state.landingTopSix && this.state.landingTopSix.resourceCategoryLogoData_6 ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceCategoryLogoData_6 } : null

        const resourceCategoryLogoData_1_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceCategoryLogoData_1 } : null
        const resourceCategoryLogoData_2_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceCategoryLogoData_2 } : null
        const resourceCategoryLogoData_3_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceCategoryLogoData_3 } : null
        const resourceCategoryLogoData_4_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceCategoryLogoData_4 } : null
        const resourceCategoryLogoData_5_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceCategoryLogoData_5 } : null
        const resourceCategoryLogoData_6_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceCategoryLogoData_6 } : null


        const esourceCategoryLogoData_A = [
            resourceCategoryLogoData_1,
            resourceCategoryLogoData_2,
            resourceCategoryLogoData_3,
            resourceCategoryLogoData_4,
            resourceCategoryLogoData_5,
            resourceCategoryLogoData_6];
        const esourceCategoryLogoData_A_2 = [
            resourceCategoryLogoData_1_,
            resourceCategoryLogoData_2_,
            resourceCategoryLogoData_3_,
            resourceCategoryLogoData_4_,
            resourceCategoryLogoData_5_,
            resourceCategoryLogoData_6_];

        const resourceName_1 = this.state.landingTopSix ? this.state.landingTopSix.resourceName_1 : "";
        const resourceName_2 = this.state.landingTopSix ? this.state.landingTopSix.resourceName_2 : "";
        const resourceName_3 = this.state.landingTopSix ? this.state.landingTopSix.resourceName_3 : "";
        const resourceName_4 = this.state.landingTopSix ? this.state.landingTopSix.resourceName_4 : "";
        const resourceName_5 = this.state.landingTopSix ? this.state.landingTopSix.resourceName_5 : "";
        const resourceName_6 = this.state.landingTopSix ? this.state.landingTopSix.resourceName_6 : "";

        const resourceName_1_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceName_1 : "";
        const resourceName_2_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceName_2 : "";
        const resourceName_3_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceName_3 : "";
        const resourceName_4_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceName_4 : "";
        const resourceName_5_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceName_5 : "";
        const resourceName_6_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceName_6 : "";

        const resourceName_A = [resourceName_1,
            resourceName_2,
            resourceName_3,
            resourceName_4,
            resourceName_5,
            resourceName_6];

        const resourceName_A_2 = [resourceName_1_,
            resourceName_2_,
            resourceName_3_,
            resourceName_4_,
            resourceName_5_,
            resourceName_6_];


        const resourceCategoryName_1 = this.state.landingTopSix ? this.state.landingTopSix.resourceCategoryName_1 : "";
        const resourceCategoryName_2 = this.state.landingTopSix ? this.state.landingTopSix.resourceCategoryName_2 : "";
        const resourceCategoryName_3 = this.state.landingTopSix ? this.state.landingTopSix.resourceCategoryName_3 : "";
        const resourceCategoryName_4 = this.state.landingTopSix ? this.state.landingTopSix.resourceCategoryName_4 : "";
        const resourceCategoryName_5 = this.state.landingTopSix ? this.state.landingTopSix.resourceCategoryName_5 : "";
        const resourceCategoryName_6 = this.state.landingTopSix ? this.state.landingTopSix.resourceCategoryName_6 : "";

        const resourceCategoryName_1_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceCategoryName_1 : "";
        const resourceCategoryName_2_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceCategoryName_2 : "";
        const resourceCategoryName_3_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceCategoryName_3 : "";
        const resourceCategoryName_4_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceCategoryName_4 : "";
        const resourceCategoryName_5_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceCategoryName_5 : "";
        const resourceCategoryName_6_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceCategoryName_6 : "";


        const resourceCategoryName_A = [resourceCategoryName_1,
            resourceCategoryName_2,
            resourceCategoryName_3,
            resourceCategoryName_4,
            resourceCategoryName_5,
            resourceCategoryName_6];

        const resourceCategoryName_A_2 = [resourceCategoryName_1_,
            resourceCategoryName_2_,
            resourceCategoryName_3_,
            resourceCategoryName_4_,
            resourceCategoryName_5_,
            resourceCategoryName_6_];

        // const { menuName } = this.state;



        // console.log(this.state)
        const check = this.props.firstAPIresponse && this.props.firstAPIresponse.exitOrResultDay ? this.props.firstAPIresponse.exitOrResultDay : null;
        

        getImage = (name) => {
            let data = this.props.firstAPIresponse && this.props.firstAPIresponse.categoryLogoData ? this.props.firstAPIresponse.categoryLogoData : null
            let image = data[name];
            return image
        }

        getTopSix = () => {
            const contentSix = this.props.topSixContent;

            // if (check === 'e' || check === 'r') {

            return (
                this.state.landingTopSix && !this.props.isLoading ?
                    (<View style={{ flexDirection: 'row' }}>

                        {contentSix.map((val, i) => {
                            let total = val.leadingSeats + val.wonSeats > val.totalSeats ? val.totalSeats : val.leadingSeats + val.wonSeats

                            return (
                                <View key={i} style={{ width: wd / 3, flex: 1, padding: normalize(8) }}>
                                    <MyTopSix
                                        source={{ uri: "data:image/png;base64," + getImage(val.groupName) }}
                                        check={check}
                                        logo={null}
                                        logoName={val.groupName}
                                        logoCatName={resourceCategoryName_A[i]}
                                        resourceGpr={check === 'e' ? val.exitSeats : total}
                                        renderButton={this.renderSurveyButton}
                                    /></View>
                            )
                        })}

                    </View>
                    ) :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: wd }}>
                        <Spinner />
                    </View>

            )




        }

        return (
            <SafeAreaView
                forceInset={{ bottom: 'always' }}
                style={{ flex: 1, backgroundColor: 'rgba(210,210,208,1)' }}
            >




                {/* //Second half */}
                {this.profileViewAfterLoading(this.state)}



                {/* //Third half */}
                <View
                    style={{
                        flex: 1,
                        width: '100%',
                        backgroundColor: 'white',
                        borderTopColor: 'grey',
                        // height: hp('50%'),
                        flexDirection: 'column'
                    }}>

                   
                    {!this.props.isLoading && (!check ?
                        <Text style={styles.landingTopSixHeader}> {this.state.landingTopSix && this.state.landingTopSix.extraImageFile1} </Text> :
                        <TextTicker style={styles.landingTopSixHeader}
                            
                            loop
                            bounce={false}
                            repeatSpacer={50}
                            // marqueeDelay={1000}
                            scrollingSpeed={100}
                            easing={Easing.linear}
                        >{this.props.firstAPIresponse && this.props.firstAPIresponse.nationalTicker}</TextTicker>
                    )}

                    <View style={{ position: 'absolute', width: 40, height: 35, top: 0, right: 0 }}>
                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }} onPress={() => {

                            // this.tick();
                            if (!check) {
                                this.setState({ landingTopSix: null });
                                // this.serverHitForFirstApi();
                                this.serverHitForFourthResponse();
                            } else {
                                // let arr = Object.assign(this.state.slideContent, []);
                                // arr[1] = [];
                                // arr[2] = [];
                                // arr[3] = [];
                                this.setState({ landingTopSix: null });

                                this.props.isLoading = true

                                this.props.serverHitForFirstApi();
                                this.serverHitForFourthResponse();

                            }

                        }
                        }>
                            <Image source={require('../../assets/Home_1_2/refresh.png')} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        pagingEnabled
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{
                            flex: 1,
                            width: '100%',
                            backgroundColor: 'white',
                            borderTopColor: 'grey',
                            height: hp('25%'),
                            flexDirection: 'row',
                        }}
                        contentContainerStyle={{ justifyContent: 'center' }}
                        ref={ref => {
                            this.scroll1 = ref;
                        }}
                    >

                        {getTopSix()}

                        {/* {this.state.landingTopSix && !this.state.isLoading ?
              (<View style={{ flexDirection: 'row' }}>

                {resourceImageData_A.map((val, i) => {
                  return (
                    <View key={i} style={{ width: wd / 3, flex: 1, padding: normalize(8) }}>
                      <MyTopSix
                        source={val}
                        check={check}
                        logo={esourceCategoryLogoData_A[i]}
                        logoName={resourceName_A[i]}
                        logoCatName={resourceCategoryName_A[i]}
                        resourceGpr={resourceGPR_A_1[i]}
                        renderButton={this.renderSurveyButton}
                      /></View>
                  )
                })}

              </View>
              ) :
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: wd }}>
                <Spinner />
              </View>
            } */}

                        {/* {this.state.landingTopSix && !this.state.isLoading ?
              (<View style={{ flexDirection: 'row' }}>

                {contentSix.map((val, i) => {
                  return (
                    <View key={i} style={{ width: wd / 3, flex: 1, padding: normalize(8) }}>
                      <MyTopSix
                        source={val.categoryLogoData}
                        check={check}
                        logo={null}
                        logoName={val.groupName}
                        logoCatName={resourceCategoryName_A[i]}
                        resourceGpr={check === 'e' ? val.exitSeats : val.totalSeats}
                        renderButton={this.renderSurveyButton}
                      /></View>
                  )
                })}

              </View>
              ) :
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: wd }}>
                <Spinner />
              </View>
            } */}

                    </ScrollView>
                    <View style={styles.buttonContainer}>

                        {!check && !this.props.isLoading && this.renderSurveyButton()}

                        {!this.props.isLoading && (!check ?
                            <Text style={styles.landingTopSixHeader}> {this.state.landingTopSix && this.state.landingTopSix.areaTopSixResources2.extraImageFile1} </Text> :
                            <TextTicker style={styles.landingTopSixHeader}
                                
                                loop
                                bounce={false}
                                repeatSpacer={50}
                                easing={Easing.linear}
                                scrollingSpeed={100}
                                marqueeDelay={1000}>{this.props.firstAPIresponse && this.props.firstAPIresponse.stateTicker}</TextTicker>
                        )}
                    </View>

                    

                    <ScrollView
                        pagingEnabled
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={!check ? true : false}
                        style={{
                            flex: 1,
                            width: '100%',
                            backgroundColor: 'white',
                            borderTopColor: 'grey',
                            height: hp('25%'),
                            flexDirection: 'row'
                        }}
                        contentContainerStyle={{ justifyContent: 'center' }}
                        ref={ref => {
                            if (!check) {
                                this.scroll2 = ref;
                            }

                        }}
                    >
                        {this.state.landingTopSix && !this.props.isLoading ?
                            (<View style={{ flexDirection: 'row' }}>
                                {resourceImageData_A_2.map((val, i) => {
                                    return (
                                        <View key={i} style={{ width: wd / 3, flex: 1, padding: normalize(8) }}>
                                            <MyTopSix
                                                source={val}
                                                show={this.getShow()}
                                                ind={i}
                                                check={check}
                                                logo={esourceCategoryLogoData_A_2[i]}
                                                logoName={resourceName_A_2[i]}
                                                logoCatName={resourceCategoryName_A_2[i]}
                                                resourceGpr={null}
                                                renderButton={this.renderSurveyButton}
                                            /></View>
                                    )
                                })}
                            </View>
                            ) :
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: wd }}>
                                <Spinner />
                            </View>
                        }
                    </ScrollView>
                    {this.state.showAds &&
                        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>

                            {showAdsTilesRectangle()}

                            {this.state.showAdsClose && <View style={{ position: 'absolute', width: 50, height: 50, right: 0, top: 0 }}>
                                <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.hideTheAds()}>
                                    <Image style={{ width: 30, height: 30 }} source={require('../../assets/close.png')} />
                                </TouchableOpacity>
                            </View>
                            }

                        </View>}
                </View>





                {/* //Forth half */}
                <View style={styles.bottomContainer} />
                {/* </View> */}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    seperator: {
        width: 1,
        backgroundColor: 'white',
    },

    bottomContainer: {
        // height: normalize(60),
        // flexDirection: 'row',
        height: hp('4%'),
        backgroundColor: 'white'
    },

    profileContainer: {
        alignItems: 'center',
        paddingTop: 0,
        flexDirection: 'row',
        backgroundColor: '#fff',
        aspectRatio: Platform.isPad ? 2.1 : 1.6
        // height: hp('24%'),
        // flex: 1,
    },

    buttonContainer: {
        // marginHorizontal: hp('2%'),
        marginVertical: hp('0.8%')
    },

    landingTopSixHeader: {
        textAlign: 'center',
        fontSize: normalize(12), //hp('1.5%'),
        fontWeight: '700',
        marginVertical: hp('1.4%')
    }
});

const stylesTopView = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#a01414',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: hp('8%'),
        display: 'flex'
    },
});
