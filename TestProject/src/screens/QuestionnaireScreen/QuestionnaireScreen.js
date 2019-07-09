import axios from 'axios';
import _ from 'lodash';
import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { Alert, Dimensions, Image, LayoutAnimation, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import firebase from 'react-native-firebase';
import KochavaTracker from 'react-native-kochava-tracker';
import { Navigation } from 'react-native-navigation';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SpinKit from 'react-native-spinkit';
import Loading from 'react-native-whc-loading';
import { GET_CURRENT_ACTIVE_SURVEY, GET_SURVEY_BY_ID, SUBMIT_USER_SURVEY_QUESTION } from '../../../Apis';
import { APP_ALERT_MESSAGE, APP_GLOBAL_COLOR, normalize, PROPS_ARRAY_NOTIFY_SCREEN, PROPS_ARRAY_FOR_LOCATION } from '../../../Constant';
import CustomTextButton from '../../components/UI/ButtonMod/CustomTextButton';
import { NavigationBarDefault } from '../../components/UI/NavigationBarDefault/NavigationBarDefault';
import QuestionniareListView from '../../components/UI/QuestionView/QuestionniareListView';
import TabBarNavigation from '../../components/UI/TabBarNavigation/TabBarNavigation';

export default class QuestionnireScreen extends Component {
    state = {
        surveyThreadID: this.props.surveyThreadID,
        surveyIdFromList: null,
        loading: true,
        state: false,
        questionniareData1: [
            { type: 'slider', number: '01', choice: ['abc', 'ced', 'asdasds', 'asdasddsa'], question: 'It is better to polite and rule-obedient rather than carefree' },
            { type: 'optional', number: '02', choice: ['abc', 'ced', 'asdasds', 'asdasddsa'], question: 'I enjoy meeting new people', isSelected: 0 },
            { type: 'multiple', number: '03', choice: ['Strong and determined', 'Enthusiastic and frendly', 'Caring and sharing', 'Questioning and careful'], question: 'Which of the following is MOST like you?', isSelected: -1 },
            { type: 'slider', number: '04', choice: ['abc', 'ced', 'asdasds', 'asdasddsa'], question: 'My manager defends me from unfair criticism', isSelected: 0 },
            { type: 'optional', number: '05', choice: ['abc', 'ced', 'asdasds', 'asdasddsa'], question: 'A big part of success is luck?', isSelected: -1 },
            { type: 'optional', number: '06', choice: ['abc', 'ced', 'asdasds', 'asdasddsa'], question: 'I Sometime lie a lot', isSelected: -1 },
        ],
        questionniareData2: [
            { type: 'slider', number: '01', choice: ['abc', 'ced', 'asdasds', 'asdasddsa'], question: 'It is better to polite and rule-obedient rather than carefree' },
            { type: 'optional', number: '02', choice: ['abc', 'ced', 'asdasds', 'asdasddsa'], question: 'I enjoy meeting new people', isSelected: 0 },
            { type: 'multiple', number: '03', choice: ['Strong and determined', 'Enthusiastic and frendly', 'Caring and sharing', 'Questioning and careful'], question: 'Which of the following is MOST like you?', isSelected: -1 },
            { type: 'slider', number: '04', choice: ['abc', 'ced', 'asdasds', 'asdasddsa'], question: 'My manager defends me from unfair criticism', isSelected: 0 },
            { type: 'optional', number: '05', choice: ['abc', 'ced', 'asdasds', 'asdasddsa'], question: 'A big part of success is luck?', isSelected: -1 },
            { type: 'optional', number: '06', choice: ['abc', 'ced', 'asdasds', 'asdasddsa'], question: 'I Sometime lie a lot', isSelected: -1 },
        ],
        questionnaire1: null,
        questionnaire2: {},
        isSurveyTaken1: 'N',
        isSurveyTaken2: 'N',
        surveyTitle: 'Survey',
        notifications: this.props.notifications,
        positionRight: -30,
        selectedThemeColor: this.props.color,

        data: this.props.data,

        serverHitCount: 0,

        selectedIndexTab: this.props.selectedIndexTab,
        menuNameArray: this.props.menuNameArray
    }



    static propTypes = {
        componentId: PropTypes.string,
    };

    constructor(props) {
        super(props);
    };

    showScratchCard = () => {
        Navigation.showModal({
            stack: {
                children: [{
                    component: {
                        name: 'ScratchCardScreen',
                        passProps: {
                            text: 'stack with one child'
                        },
                        options: {
                            //                         formSheet = "formSheet",
                            // pageSheet = "pageSheet",
                            // overFullScreen = "overFullScreen",
                            // overCurrentContext = "overCurrentContext",
                            // currentContext = "currentContext",
                            // popOver = "popOver",
                            // fullScreen = "fullScreen",
                            // none = "none"
                            modalPresentationStyle: Platform.OS === 'ios' ? 'overFullScreen' : "overCurrentContext",
                            layout: {
                                backgroundColor: 'transparent'
                            },
                            topBar: {
                                visible: Platform.OS != 'ios',
                                // title: {
                                //     text: 'Modal'
                                // },
                                animate: false,
                                background: {
                                    color: 'rgba(0,0,0,.5)'
                                }

                            }
                        }
                    }
                }]
            }
        });
    }


    getSurvey = (mount) => {
        const { surveyType, notification } = this.props;

        if (this.state.surveyIdFromList) {
            this.refreshDataWithId(this.state.surveyIdFromList, '');
            return;
        }
        if (this.state.surveyThreadID) {
            this.refreshDataWithId2(this.state.surveyThreadID, '', this)
            return;
        }

        var targetLocation = PROPS_ARRAY_FOR_LOCATION.slice(-1).pop()
        let latlong = null;
        if (targetLocation) {
            latlong = targetLocation.location.latitude.toString() + "," + targetLocation.location.longitude.toString()
        }

        if (notification) {
            var body = {
                surveyId: "5",
                userId: "15",
                // userCurrentCoord: "48.92100020832678,-112.2370634060909"
            }

            if (latlong) {
                body['userCurrentCoord'] = latlong
            }
            axios.post(GET_SURVEY_BY_ID, body).then(response => {
                let responseData = response.data;
                if (responseData.isNationalLevel === 'N') {
                    this.setState({
                        questionniareData1: responseData.surveyQuestionList,
                        questionnaire1: responseData,
                        isSurveyTaken1: responseData.isSurveyTaken,
                        state: true
                    })

                    var body1 = {
                        isNationalLevel: !this.state.state ? 'N' : 'Y',
                        userId: this.props.user_id,
                        // userCurrentCoord: "48.92100020832678,-112.2370634060909"
                    }

                    if (latlong) {
                        body1['userCurrentCoord'] = latlong
                    }

                    axios.post(GET_CURRENT_ACTIVE_SURVEY, body1)
                        .then(response => {
                            let responseData_2 = response.data;
                            // this.setState({
                            //     questionniareData1: responseData.surveyQuestionList,
                            //     // loading: false, 
                            //     questionnaire1: responseData,
                            //     isSurveyTaken1: responseData.isSurveyTaken,
                            //     surveyTitle: responseData.surveyDesc ? (responseData.surveyDesc === '' ? responseData.surveyDesc : this.state.surveyTitle) : this.state.surveyTitle
                            // })

                            this.setState({
                                questionniareData2: responseData_2.surveyQuestionList,
                                loading: false,
                                questionnaire2: responseData_2,
                                isSurveyTaken2: responseData_2.isSurveyTaken,
                            })
                            this.refs.scrollview.scrollTo({ x: 1, animate: true });

                        })
                        .catch(error => {
                            console.error(error)
                        })

                } else {
                    this.setState({
                        questionniareData2: responseData.surveyQuestionList,
                        questionnaire2: responseData,
                        isSurveyTaken2: responseData.isSurveyTaken
                    })

                    var body2 = {
                        isNationalLevel: 'Y',
                        userId: this.props.user_id,
                        // userCurrentCoord: "48.92100020832678,-112.2370634060909"
                    }

                    if (latlong) {
                        body2['userCurrentCoord'] = latlong
                    }

                    axios.post(GET_CURRENT_ACTIVE_SURVEY, body2)
                        .then(response => {
                            let responseData_2 = response.data;
                            this.setState({
                                questionniareData2: responseData.surveyQuestionList,
                                // loading: false, 
                                questionnaire2: responseData,
                                isSurveyTaken2: responseData.isSurveyTaken,
                                // surveyTitle: responseData.surveyDesc ? (responseData.surveyDesc === '' ? this.state.surveyTitle : responseData.surveyDesc) : this.state.surveyTitle
                            })

                            this.setState({
                                state: false,
                                questionniareData2: responseData_2.surveyQuestionList,
                                loading: false,
                                questionnaire2: responseData_2,
                                isSurveyTaken2: responseData_2.isSurveyTaken,
                                surveyTitle: responseData_2.surveyDesc ? (responseData_2.surveyDesc === '' ? responseData_2.surveyDesc : this.state.surveyTitle) : this.state.surveyTitle
                            })
                            this.refs.scrollview.scrollTo({ x: 0, animate: true });
                        })
                        .catch(error => {
                            console.error(error)
                        })
                }
            })
        } else {
            if (mount) {
                if (surveyType) {

                    var body3 = {
                        isNationalLevel: surveyType,
                        userId: this.props.user_id,
                        // userCurrentCoord: "48.92100020832678,-112.2370634060909"
                    }

                    if (latlong) {

                        body3['userCurrentCoord'] = latlong
                    }

                    axios.post(GET_CURRENT_ACTIVE_SURVEY, body3)
                        .then(response => {
                            let responseData = response.data;

                            this.setState({
                                questionniareData2: responseData.surveyQuestionList,
                                questionnaire2: responseData,
                                isSurveyTaken2: responseData.isSurveyTaken
                            })

                            var body4 = {
                                isNationalLevel: 'N',
                                userId: this.props.user_id,
                                // userCurrentCoord: "48.92100020832678,-112.2370634060909"
                            }

                            if (latlong) {
                                body4['userCurrentCoord'] = latlong
                            }

                            axios.post(GET_CURRENT_ACTIVE_SURVEY, body4)
                                .then(response_2 => {
                                    let responseData_2 = response_2.data;
                                    this.setState({
                                        questionniareData1: responseData_2.surveyQuestionList,
                                        loading: false,
                                        questionnaire1: responseData_2,
                                        isSurveyTaken1: responseData_2.isSurveyTaken,
                                        surveyTitle: responseData_2.surveyDesc ? (responseData_2.surveyDesc === '' ? this.state.surveyTitle : responseData_2.surveyDesc) : this.state.surveyTitle
                                    })
                                    this.refs.scrollview.scrollTo({ x: 0, animate: true });
                                    // console.log(this.state)
                                    this.refs.loading.close();
                                    
                                    setTimeout(() => {
                                        var that = this
                                        if (this.state.questionnaire2 && this.state.questionnaire2.activeSurveyList && this.state.questionnaire2.activeSurveyList.length > 0) {
                                            Alert.alert(
                                                APP_ALERT_MESSAGE,
                                                'Thanks for submitting the survey. Please press the survey button for more',
                                                [
                                                    { text: 'OK', onPress: () => { 
                                                        that.showScratchCard()

                                                    } },
                                                ],
                                                { cancelable: false },
                                            );
                                        } else {
                                            Alert.alert(
                                                APP_ALERT_MESSAGE,
                                                'Thanks for submitting the survey',
                                                [
                                                    { text: 'OK', onPress: () => { 
                                                        that.showScratchCard()
                                                    } },
                                                ],
                                                { cancelable: false },
                                            );
                                        }

                                    }, 200)
                                })
                                .catch(error => {
                                    console.error(error)
                                })
                        })
                        .catch(error => {
                            console.error(error)
                        })
                    this.setState({
                        state: true
                    })

                } else {

                    var body5 = {
                        isNationalLevel: 'N',
                        userId: this.props.user_id,
                        // userCurrentCoord: "48.92100020832678,-112.2370634060909"
                    }

                    if (latlong) {
                        body5['userCurrentCoord'] = latlong
                    }
                    axios.post(GET_CURRENT_ACTIVE_SURVEY, body5)

                        .then(response => {
                            let responseData = response.data;
                            this.setState({
                                questionniareData1: responseData.surveyQuestionList,
                                questionnaire1: responseData,
                                isSurveyTaken1: responseData.isSurveyTaken,
                                surveyTitle: responseData.surveyDesc

                            })

                            axios.post(GET_CURRENT_ACTIVE_SURVEY, {
                                isNationalLevel: 'Y',
                                userId: this.props.user_id,

                            })
                                .then(response_2 => {
                                    let responseData_2 = response_2.data;
                                    this.setState({
                                        questionniareData2: responseData_2.surveyQuestionList,
                                        loading: false,
                                        questionnaire2: responseData_2,
                                        isSurveyTaken2: responseData_2.isSurveyTaken,
                                    })

                                    this.refs.loading.close()
                                    setTimeout(() => {

                                        if (this.state.questionnaire2 && this.state.questionnaire2.activeSurveyList && this.state.questionnaire2.activeSurveyList.length > 0) {
                                            Alert.alert(
                                                APP_ALERT_MESSAGE,
                                                'Thanks for submitting the survey. Please press the survey button for more',
                                                [
                                                    { text: 'OK', onPress: () => { } },
                                                ],
                                                { cancelable: false },
                                            );
                                        } else {
                                            Alert.alert(
                                                APP_ALERT_MESSAGE,
                                                'Your feedback has been sent successfully!',
                                                [
                                                    { text: 'OK', onPress: () => { } },
                                                ],
                                                { cancelable: false },
                                            );
                                        }

                                    }, 200)
                                })
                                .catch(error => {
                                    console.error(error)
                                })
                        })
                        .catch(error => {
                            console.error(error)
                        })
                }
            } else {
                if (surveyType) {

                    var body6 = {
                        isNationalLevel: surveyType,
                        userId: this.props.user_id,
                        // userCurrentCoord: "48.92100020832678,-112.2370634060909"
                    }

                    if (latlong) {
                        body6['userCurrentCoord'] = latlong
                    }

                    axios.post(GET_CURRENT_ACTIVE_SURVEY, body6)
                        .then(response => {
                            let responseData = response.data;
                            console.log(responseData);
                            this.setState({
                                questionniareData2: responseData.surveyQuestionList,
                                questionnaire2: responseData,
                                isSurveyTaken2: responseData.isSurveyTaken,
                                // surveyTitle: responseData.surveyDesc
                            })

                            var body7 = {
                                isNationalLevel: 'N',
                                userId: this.props.user_id,
                                // userCurrentCoord: "48.92100020832678,-112.2370634060909"
                            }

                            if (latlong) {
                                body7['userCurrentCoord'] = latlong
                            }

                            axios.post(GET_CURRENT_ACTIVE_SURVEY, body7)
                                .then(response_2 => {
                                    let responseData_2 = response_2.data;
                                    this.setState({
                                        questionniareData1: responseData_2.surveyQuestionList,
                                        loading: false,
                                        questionnaire1: responseData_2,
                                        isSurveyTaken1: responseData_2.isSurveyTaken,
                                    })
                                    console.log(this.props.user_id);
                                    console.log(responseData_2);
                                    this.refs.scrollview.scrollTo({ x: 0, animate: true });
                                })
                                .catch(error => {
                                    console.error(error)
                                })
                        })
                        .catch(error => {
                            console.error(error)
                        })
                    this.setState({
                        state: true
                    })

                } else {
                    // let body1 = {
                    //     isNationalLevel: 'N',
                    //     userId: this.props.user_id,
                    //     userCurrentCoord: this.props.lat_lon,

                    // };

                    var body8 = {
                        isNationalLevel: 'N',
                        userId: this.props.user_id,
                        // userCurrentCoord: "48.92100020832678,-112.2370634060909"
                    }

                    if (latlong) {
                        body8['userCurrentCoord'] = latlong
                    }

                    axios.post(GET_CURRENT_ACTIVE_SURVEY, body8)
                        .then(response => {
                            let responseData = response.data;
                            console.log(responseData);
                            this.setState({
                                questionniareData1: responseData.surveyQuestionList,
                                // loading: false, 
                                questionnaire1: responseData,
                                isSurveyTaken1: responseData.isSurveyTaken,
                                // surveyTitle: responseData.surveyDesc ? (responseData.surveyDesc === '' ? this.state.surveyTitle : responseData.surveyDesc) : this.state.surveyTitle
                            })

                            // let body2 = {
                            //     isNationalLevel: 'Y',
                            //     userId: this.props.user_id,
                            //     userCurrentCoord: this.props.lat_lon,
                            // };
                            var body9 = {
                                isNationalLevel: 'Y',
                                userId: this.props.user_id,
                                // userCurrentCoord: "48.92100020832678,-112.2370634060909"
                            }

                            if (latlong) {
                                body9['userCurrentCoord'] = latlong
                            }

                            axios.post(GET_CURRENT_ACTIVE_SURVEY, body9)
                                .then(response_2 => {
                                    let responseData_2 = response_2.data;
                                    console.log(responseData_2);
                                    if (this.setState.questionniareData2) {
                                        this.refs.loading.close();
                                    }


                                    this.setState({
                                        state: true,
                                        questionniareData2: responseData_2.surveyQuestionList,
                                        loading: false,
                                        questionnaire2: responseData_2,
                                        isSurveyTaken2: responseData_2.isSurveyTaken,
                                        surveyTitle: responseData_2.surveyDesc ? (responseData_2.surveyDesc === '' ? this.state.surveyTitle : responseData_2.surveyDesc) : this.state.surveyTitle

                                    })
                                })
                                .catch(error => {
                                    console.error(error)
                                })
                        })
                        .catch(error => {
                            console.error(error)
                        })
                }
            }
        }
    }

    getLanguageCode(language) {
        if (language === 'hi') {
            let menu = "सर्वे"
            return menu;

        }

        return "Survey"

    }
    componentWillUnmount() {

        // PROPS_ARRAY_NOTIFICATION.push(this.refreshNotificationData);

        var index = PROPS_ARRAY_NOTIFY_SCREEN.indexOf(this.refreshUserScreenUI);
        if (index > -1) {
            PROPS_ARRAY_NOTIFY_SCREEN.splice(index, 1);
        }

    }

    componentDidMount() {
        // this.refreshDataWithId('2', 'sadsa');
        if (this.props.notFirstScreen) {
            this.getSurvey();
        }

        // this.getNotifications();
        const { surveyTitle } = this.props;

        if (this.props.surveyTitle) {
            this.setState({ surveyTitle: `${this.getLanguageCode(this.props.userLanguage)} - ${surveyTitle ? surveyTitle.toUpperCase() : ''}` })
        }

        firebase.analytics().setCurrentScreen("Screen", "Questionnaire_Screen");
        //firebase.analytics().logEvent("Trends_Screen");
        firebase.analytics().setUserProperty("Screen", "Questionnaire_Screen");
        firebase.analytics().logEvent("Content", { "Screen": "Questionnaire_Screen" });



        var eventMapObject = {};
        eventMapObject["screen_name"] = "Questionnaire_Screen";
        KochavaTracker.sendEventMapObject(KochavaTracker.EVENT_TYPE_LEVEL_COMPLETE_STRING_KEY, eventMapObject);


        PROPS_ARRAY_NOTIFY_SCREEN.push(this.refreshUserScreenUI);
    }
    refreshUserScreenUI = (notifications, screen, purpose) => {
        //
        if (screen === 1 || screen < 0) {
            if (purpose === 0) {
                this.setState({ data: notifications })
            } else if (purpose === 1) {
                this.setState({ selectedThemeColor: notifications })
            } else if (purpose === 2) {
                this.setState({ notifications: notifications });
            } else if (purpose === 6) {
                this.setState({ selectedIndexTab: notifications });
            } else if (purpose === 4) {

                if (!this.props.notFirstScreen) {

                    this.getSurvey();
                }
            } else if (purpose === 7) {
                this.setState({ menuNameArray: notifications });
            }

        }
    }

    homeButtonTapped = () => {
        // Navigation.pop(this.props.componentId);
        Navigation.popToRoot(this.props.componentId);

        // Navigation.popTo("HomeScreen");
    };

    stateBttnTapped = () => {
        const { questionnaire1, questionniareData1, questionniareData2, questionnaire2 } = this.state;

        this.setState({
            state: false
        })

        this.refs.scrollview.scrollTo({ x: Dimensions.get('window').width, animate: true });
        if (questionnaire1) {
            this.setState({ surveyTitle: questionnaire1.surveyDesc ? questionnaire1.surveyDesc : 'Survey' })
        }

        if (!questionniareData1) {
            Alert.alert(
                APP_ALERT_MESSAGE,
                `There are currently no active surveys for ${questionnaire2.userCurrentState}`,
                [
                    { text: 'OK', onPress: () => { } },
                ],
                { cancelable: false },
            );
        }

        // this.setState({ loading: true })
        // axios.post(GET_CURRENT_ACTIVE_SURVEY, {
        //     isNationalLevel : 'N',
        //     userId : this.props.user_id,

        // })
        // .then(response => {
        //     let responseData = response.data;
        //     this.setState({ 
        //         questionniareData1: responseData.surveyQuestionList, 
        //         loading: false, 
        //         questionnaire2: responseData,
        //         isSurveyTaken: responseData.isSurveyTaken
        //     })
        //     console.log(responseData)
        // })
        // .catch(error => {
        //     console.error(error)
        // })
    }

    nationalBttnTapped = () => {

        

        const { surveyTitle } = this.props;
        const { questionnaire2 } = this.state;

        this.setState({
            state: true
        });
        this.refs.scrollview.scrollTo({ x: 0, animate: true });

        if (this.props.surveyTitle) {
            this.setState({ surveyTitle: `${this.getLanguageCode(this.props.userLanguage)} - ${surveyTitle ? surveyTitle.toUpperCase() : ''}` })
            // this.setState({ surveyTitle:  `SURVEY - ${surveyTitle.toUpperCase()}` })
        } else {
            if (questionnaire2) {
                this.setState({ surveyTitle: questionnaire2.surveyDesc ? questionnaire2.surveyDesc : 'Survey' })
            }
        }
    }

    onScrollEndSnapToEdge = () => {
        // y = event.nativeEvent.contentOffset.x;
        // const y = _scrollView.contentOffset.x;
        alert("assaasasas");
        if (y > 0) {
            this.setState({
                state: false
            })
        } else {
            this.setState({
                state: true
            })
        }

    }

    updateQuestionaire = (survey) => {
        // this.showScratchCard()
        // return;
        const { surveyType } = this.props;
        this.refs.loading.show();

        if (survey === 'N') {
            let authSubmit = [];

            this.state.questionniareData1.map((question, index) => {
                if (question.userAnswerId === null) {
                    authSubmit.push(false)
                } else {
                    authSubmit.push(true)
                }
            })

            let submit = _.includes(authSubmit, false);

            if (submit) {
                Alert.alert(
                    APP_ALERT_MESSAGE,
                    'Please answer all questions in the survey!',
                    [
                        { text: 'OK', onPress: () => { } },
                    ],
                    { cancelable: false },
                );
                this.refs.loading.close();
            } else if (!submit) {
                axios.post(SUBMIT_USER_SURVEY_QUESTION, {
                    surveyId: this.state.questionnaire1.surveyId,
                    userId: this.props.user_id,
                    userCurrentCoord: this.props.lat_lon,
                    surveyQuestionList: this.state.questionniareData1

                })
                    .then(response => {
                        let responseData = response.data;
                        this.getSurvey(true);
                    })
                    .catch(error => {
                        this.refs.loading.close()
                        console.log(error)
                    })
            }
        } else if (survey === 'L') {
            let authSubmit = [];

            this.state.questionniareData2.map((question, index) => {

                if (question.userAnswerId === null) {
                    authSubmit.push(false)
                } else {
                    authSubmit.push(true)
                }
            })

            let submit = _.includes(authSubmit, false);
            console.log(submit)
            console.log(this.state.questionniareData2)
            console.log(authSubmit)
            if (submit) {
                Alert.alert(
                    APP_ALERT_MESSAGE,
                    'Please answer all questions in the survey!',
                    [
                        { text: 'OK', onPress: () => { } },
                    ],
                    { cancelable: false },
                );
                this.refs.loading.close();
            } else if (!submit) {
                axios.post(SUBMIT_USER_SURVEY_QUESTION, {
                    surveyId: this.state.questionnaire2.surveyId,
                    userId: this.props.user_id,
                    userCurrentCoord: this.props.lat_lon,
                    surveyQuestionList: this.state.questionniareData2

                })
                    .then(response => {
                        let responseData = response.data;
                        this.getSurvey(true);
                    })
                    .catch(error => {
                        this.refs.loading.close();
                        console.log(error)
                    })
            }
        } else if (survey === 'Y') {
            let authSubmit = [];

            this.state.questionniareData2.map((question, index) => {
                console.log(question.userAnswerId)
                if (question.userAnswerId === null) {
                    authSubmit.push(false)
                } else {
                    authSubmit.push(true)
                }
            })

            let submit = _.includes(authSubmit, false);
            console.log(submit)
            console.log(this.state.questionniareData2)
            console.log(authSubmit)

            if (submit) {
                Alert.alert(
                    APP_ALERT_MESSAGE,
                    'Please answer all questions in the survey!',
                    [
                        { text: 'OK', onPress: () => { } },
                    ],
                    { cancelable: false },
                );
                this.refs.loading.close();
            } else if (!submit) {
                axios.post(SUBMIT_USER_SURVEY_QUESTION, {
                    surveyId: this.state.questionnaire2.surveyId,
                    userId: this.props.user_id,
                    userCurrentCoord: this.props.lat_lon,
                    surveyQuestionList: this.state.questionniareData2

                })
                    .then(response => {
                        let responseData = response.data;
                        this.getSurvey(true);
                    })
                    .catch(error => {
                        this.refs.loading.close();
                        console.log(error)
                    })
            }
        }
    }

    renderTitle = () => {
        const { surveyTitle } = this.state;
        return (
            <View style={topViewStyle.textheaderView}>
                <Text adjustsFontSizeToFit numberOfLines={1} minimumFontScale={.8} style={topViewStyle.textView}> {surveyTitle} </Text>
            </View>
        )
    }

    // getNotifications = () => {
    //     axios.post(GET_USER_NOTIFICATIONS, {
    //         userId: this.props.user_id
    //     }).then((response) => {
    //         let responseData = response.data;
    //         console.log(responseData)
    //         this.setState({
    //             notifications: responseData
    //         })
    //     }).catch(error => {
    //         console.log(error)
    //     })
    // }

    updateNotifications = (notificationLogId, notification) => {
        this.props.updateNotifications(notificationLogId, notification);
        let updatedNotification = Object.assign(notification, {});
        this.setState({ notifications: updatedNotification });
    }

    // readNotification = (index, notifications, screen) => {
    //     this.props.readNotification(index,notifications,screen);
    //     let updatedNotification = Object.assign(notifications, {});
    //     this.setState({notifications : updatedNotification});
    // }
    //     const { count } = this.state.notifications;
    //     let counted;
    //     let newNotifications = notifications;

    //     if (count > 0) {
    //         counted = count - 1;
    //     } else {
    //         counted = count;
    //     }

    //     newNotifications.notificationList[index].read = true;
    //     newNotifications.count = counted;

    //     let updatedNotification = Object.assign(newNotifications, {});
    //     console.log(updatedNotification)
    //     this.setState({
    //         notifications: updatedNotification
    //     })

    //     if (screen === 'survey' || screen === 'Survey') {
    //         this.toQuesScreen(notifications)
    //     } else if (screen === 'trends' || screen === 'Survey') {
    //         // this.toTrendScreen()
    //     } else if (screen === 'timeline' || screen === 'Survey') {
    //         // this.toReportScreen()
    //     }
    // }

    // updateNotifications = (notificationLogId) => {
    //     // console.log('called')
    //     axios.post(UPDATE_USER_NOTIFICATIONS, {
    //         notificationLogId: notificationLogId.toString(),
    //         read: "Y",
    //         userId: this.props.user_id
    //         // notificationLogId: notificationLogId.toString(),
    //         // read: 'Y',
    //         // userId: this.state.user_id
    //     }).then((response) => {
    //         let responseData = response.data;
    //         console.log('_________')
    //         console.log(responseData)
    //         console.log('_________')
    //         this.getNotifications()

    //     }).catch(error => {
    //         console.log(error)
    //     })
    // }

    showNotificationScreen = () => {
        this.showScratchCard();
        return;

        const { menuName } = this.props;
        Navigation.push(this.props.componentId, {
            component: {
                name: 'NotificationScreen',
                options: {
                    topBar: {
                        visible: true,
                        // drawBehind: true,
                        animate: true,
                        buttonColor: '#fff',
                        background: {
                            color: APP_GLOBAL_COLOR,
                        },
                        title: {
                            text: menuName ? menuName[3] : null,
                            // text: 'Hello',
                            fontSize: hp('2.5%'),
                            color: '#fff',
                        },
                        backButton: {
                            color: '#fff'
                        }
                    },
                },
                passProps: {
                    // notifications: this.state.notifications,
                    // readNotification: this.readNotification,
                    // updateNotifications: this.updateNotifications,
                    notifications: this.state.notifications,
                    readNotification: this.props.readNotification,
                    updateNotifications: this.updateNotifications,
                }

            },
        });
    }

    toQuesScreen = () => {
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
                    user_id: this.props.user_id,
                    lat_lon: this.props.lat_lon,
                    userLanguage: this.props.userLanguage,
                }
            },
        });
    };


    renderComponent = () => {
        const { loading, notifications } = this.state;
        // const BadgedIcon = withBadge(notifications.count)(Icon);
        if (loading) {
            return (

                <View style={{ flex: 1 }}>
                    <NavigationBarDefault
                        imageSource={this.state.data.image ? { uri: "data:image/png;base64," + this.state.data.image } : require('../../assets/UserSmall.png')}
                        bgColor={this.state.selectedThemeColor}


                        notifications={notifications}
                        data={this.props.data}
                        showBackButton={this.props.notFirstScreen}

                    >{this.state.data.username}</NavigationBarDefault>
                    <View
                        style={topViewStyle.headerView}
                        backgroundColor="rgba(242,241,244,1)">
                        {/* <View style={{ flex: 1, backgroundColor: APP_GLOBAL_COLOR }}>
                            <CustomButton
                                style={{
                                    flexDirection: 'row',
                                    flex: 1,
                                }}
                                source={require('../../assets/homez.png')}
                                onPress={this.homeButtonTapped}
                            />
                        </View> */}
                        {this.renderTitle()}
                    </View>
                    <View style={{ width: "100%", height: 1 }} backgroundColor="gray" />
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
                        <SpinKit
                            isVisible
                            size={hp('4%')}
                            type={'ChasingDots'}
                            color={this.state.selectedThemeColor}
                        />
                    </View>
                </View>
            )
        } else if (!loading) {
            return (
                <View style={{ flex: 1 }}>
                    <Loading
                        ref="loading" />
                    <NavigationBarDefault
                        imageSource={this.state.data.image ? { uri: "data:image/png;base64," + this.state.data.image } : require('../../assets/UserSmall.png')}
                        bgColor={this.state.selectedThemeColor}

                        notifications={notifications}
                        data={this.props.data}
                        showBackButton={this.props.notFirstScreen}

                    >{this.state.data.username}</NavigationBarDefault>

                    <View style={{ width: "100%", height: 1 }} backgroundColor="white" />
                    {/* secondViewStyle */}
                    <View style={secondViewStyle.secondView}>

                        <CustomTextButton
                            onPress={this.nationalBttnTapped}
                            style={{ flex: 1 }}
                            textColor={this.state.state ? "white" : "black"}
                            bgColor={this.state.state ? this.state.selectedThemeColor : "transparent"} >
                            {"National"}
                            {/* {this.state.questionnaire2 ? this.state.questionnaire2.userCurrentState.toUpperCase() : "NATIONAL"} */}
                        </CustomTextButton>
                        <CustomTextButton
                            onPress={this.stateBttnTapped}
                            style={{ flex: 1 }}
                            textColor={!this.state.state ? "white" : "black"}
                            bgColor={!this.state.state ? this.state.selectedThemeColor : "transparent"} >
                            {
                                (this.state.questionnaire1 && this.state.questionnaire2.userCurrentState) ? this.state.questionnaire2.userCurrentState.toUpperCase() : "State"}
                        </CustomTextButton>
                    </View>
                    <View
                        style={topViewStyle.headerView}
                        backgroundColor="rgba(242,241,244,1)">

                        {this.renderTitle()}

                    </View>


                    <View style={{ width: "100%", height: 1 }} backgroundColor="white" />

                    {/* thirdViewStyle */}
                    <View style={thirdViewStyle.thirdView} >
                        <ScrollView horizontal={true} pagingEnabled={true} scrollEnabled={false}
                            ref="scrollview"
                        >
                            <View style={thirdViewStyle.innerViewSecond}>
                                <QuestionniareListView
                                    color={this.state.selectedThemeColor}
                                    userLanguage={this.props.userLanguage}
                                    data={this.state.questionniareData2}
                                    survey={this.props.surveyType ? 'L' : 'Y'}
                                    isSurveyTaken={this.state.isSurveyTaken2}
                                    updateQuestionaire={this.updateQuestionaire}
                                    hideMoreSurveyOnScroll={() => this.hideMoreSurveyOnScroll()}
                                    onChangeData={(data, index) => {
                                        var d = [];
                                        this.state.questionniareData2.map((object, indexIn) => {
                                            if (index == indexIn) {
                                                d.push(data)
                                            } else {
                                                d.push(object)
                                            }
                                        })
                                        this.setState({ questionniareData2: d });
                                    }}>
                                </QuestionniareListView>
                            </View>
                            <View style={thirdViewStyle.innerViewSecond}>
                                <QuestionniareListView
                                    color={this.state.selectedThemeColor}
                                    userLanguage={this.props.userLanguage}
                                    data={this.state.questionniareData1}
                                    updateQuestionaire={this.updateQuestionaire}
                                    isSurveyTaken={this.state.isSurveyTaken1}
                                    survey={"N"}
                                    hideMoreSurvey={() => this.hideMoreSurveyOnScroll()}
                                    onChangeData={(data, index) => {
                                        var d = [];
                                        this.state.questionniareData1.map((object, indexIn) => {
                                            if (index === indexIn) {
                                                d.push(data)
                                            } else {
                                                d.push(object)
                                            }
                                        })
                                        this.setState({ questionniareData1: d });
                                    }}>
                                </QuestionniareListView>

                            </View>
                        </ScrollView>
                    </View>
                    {!this.props.notFirstScreen && <TabBarNavigation color={this.state.selectedThemeColor} selectedIndex={1} selectedIndexTab={this.state.selectedIndexTab} menuNameArray= {this.state.menuNameArray}/>}
                </View>
            )
        }
    }

    refreshDataWithId = (surveyId, surveyDesc) => {

        // this.props.surveyId = surveyId;
        if (this.state.surveyIdFromList !== surveyId) {
            this.setState({ loading: true, surveyIdFromList: surveyId });
            this.refreshDataWithId2(surveyId, surveyDesc, this);
        } else {
            let that = this;
            setTimeout(function () {
                that.refreshDataWithId2(surveyId, surveyDesc, that);
            }, 500);
        }
    }

    refreshDataWithId2 = (surveyId, surveyDesc, thatObj) => {

        var targetLocation = PROPS_ARRAY_FOR_LOCATION.slice(-1).pop()
        let latlong = null;
        if (targetLocation) {
            latlong = targetLocation.location.latitude.toString() + "," + targetLocation.location.longitude.toString()
        }

        var body = {
            surveyId: surveyId,
            userId: this.props.user_id,
            // userCurrentCoord: "48.92100020832678,-112.2370634060909"
        }

        if (latlong) {
            body['userCurrentCoord'] = latlong
        }

        axios.post(GET_SURVEY_BY_ID, body).then(response => {
            let responseData = response.data;
            // if(responseData.isNationalLevel === 'Y') {

            // this.props.surveyTitle = surveyDesc;
            // let abc = 'asd';
            thatObj.setState({
                questionniareData2: responseData.surveyQuestionList,
                questionnaire2: responseData,
                isSurveyTaken2: responseData.isSurveyTaken,
                state: true,

                // state: false,
                loading: false,
                questionnaire1: null,
                // questionnaire2: {},
                isSurveyTaken1: 'N',
                // isSurveyTaken2: 'N',
                // surveyTitle: 'SURVEY',
                // questionnaire2.surveyDesc
                surveyTitle: responseData.surveyDesc ? (responseData.surveyDesc === '' ? this.state.surveyTitle : responseData.surveyDesc) : this.state.surveyTitle
            })

            var body2 = {
                isNationalLevel: 'N',
                userId: this.props.user_id,
                // userCurrentCoord: "48.92100020832678,-112.2370634060909"
            }

            if (latlong) {
                body2['userCurrentCoord'] = latlong
            }

            axios.post(GET_CURRENT_ACTIVE_SURVEY, body2)
                .then(response => {
                    let responseData_2 = response.data;
                    // alert(JSON.stringify(responseData_2));
                    thatObj.refs.loading.close()

                    thatObj.setState({
                        loading: false,

                        questionniareData1: responseData_2.surveyQuestionList,
                        // loading: false, 
                        questionnaire1: responseData_2,
                        isSurveyTaken1: responseData_2.isSurveyTaken,
                        // surveyTitle: responseData_2.surveyDesc ? (responseData_2.surveyDesc === '' ? this.state.surveyTitle : responseData_2.surveyDesc) : this.state.surveyTitle
                    })

                    // this.setState({
                    //     questionniareData2: responseData_2.surveyQuestionList,
                    //     loading: false,
                    //     questionnaire2: responseData_2,
                    //     isSurveyTaken2: responseData_2.isSurveyTaken,
                    // })
                    this.refs.scrollview.scrollTo({ x: 0, animate: true });
                })
                .catch(error => {
                    this.refs.loading.close()
                    console.error(error)
                })
        }).catch(error => {
            this.refs.loading.close()
            console.error(error)
        });
    }

    moreSurveys = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'SurveyList',
                passProps: {
                    activeSurveyList: this.state.questionnaire2 && this.state.questionnaire2.activeSurveyList ? this.state.questionnaire2.activeSurveyList : "",
                    refresh: this.refreshDataWithId
                },
                options: {
                    topBar: {
                        title: {
                            text: 'Select Survey',
                            color: "white"
                        },
                        background: {
                            color: this.state.selectedThemeColor
                        },
                        backButton: {
                            color: "white"
                        }
                    },
                }
            }
        });
    }

    hideMoreSurveyOnScroll = () => {
        if (this.state.positionRight === -30) {
            this.hideMoreSurvey();
        }
    }

    hideMoreSurvey = () => {
        LayoutAnimation.spring();
        this.setState({
            positionRight: this.state.positionRight == -30 ? -150 : -30
        })
    }

    render() {
        // console.log(this.state);
        // console.log(this.props);
        const { height, width } = Dimensions.get('window');
        return (
            <SafeAreaView
                // forceInset={{ bottom: 'always' }}
                style={{ flex: 1, backgroundColor: 'rgba(210,210,208,1)' }}>
                {/* // 'rgba(210,210,208,1)' }}> */}

                {this.renderComponent()}

                {this.state.questionnaire2 && this.state.questionnaire2.activeSurveyList && this.state.questionnaire2.activeSurveyList.length > 0 &&
                    <TouchableOpacity onPress={() => this.hideMoreSurvey()} style={{ flexDirection: 'row', position: 'absolute', bottom: 100, right: this.state.positionRight, alignItems: 'center' }}>
                        <View style={{ position: 'absolute', left: 36 - 10, right: 0, top: 0, bottom: 0, backgroundColor: '#ff0000' }} />

                        <Image source={this.state.positionRight === -150 ? require('../../assets/Extra/next.png') : require('../../assets/Extra/next1.png')} style={{ height: 30, width: 36 }} />
                        <View style={{ marginLeft: -7.5, height: 30, justifyContent: 'center', width: (150 + 7.5 - 7.5) }}>
                            <Text style={{ marginLeft: 20, margin: 0, fontSize: 13, color: 'white', fontWeight: 'bold' }} onPress={() => this.moreSurveys()}>More Survey</Text>
                        </View>
                    </TouchableOpacity>
                }

                {/* {this.state.questionnaire2 && this.state.questionnaire2.activeSurveyList && this.state.questionnaire2.activeSurveyList.length > 0 &&
                    <Draggable
                        reverse={false}
                        renderShape='image'
                        backgroundColor={APP_GLOBAL_COLOR}
                        offsetX={SCREEN_WIDTH / 2 - 10}
                        offsetY={SCREEN_HEIGHT / 2 - 120}
                        imageSource={require("../../assets/Extra/more_.png")}
                        renderSize={50}
                        // pressDrag={() => console.log('called here')}
                        pressInDrag={() => this.moreSurveys()}
                    // pressOutDrag={()=>console.log('out press')}
                    > */}
                {/* <Image source = {require('../../assets/1.png')} styles = {{flex : 1}} /> */}
                {/* </Draggable> */}
                {/* } */}
            </SafeAreaView>

        )
    }
}


const topViewStyle = StyleSheet.create({
    headerView: {
        height: 30,
        // flex: 0.075,
        justifyContent: 'center',
        flexDirection: 'row',
        // backgroundColor: 'rgba(210,210,208,1)'
    },

    textheaderView: {
        flex: 5,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },

    textView: {
        backgroundColor: 'transparent',
        marginLeft: 10,
        fontSize: 12,
    },
    textView2: {
        backgroundColor: 'transparent',
        marginLeft: 10,
        fontSize: normalize(12),
    },
});

const secondViewStyle = StyleSheet.create({
    secondView: {
        // flex: 0.075,
        height: 40,
        backgroundColor: 'transparent',
        flexDirection: 'row',
    },
});

const thirdViewStyle = StyleSheet.create({
    thirdView: {
        flex: 1,
        backgroundColor: '#fff',
    },
    innerViewSecond: {
        flex: 1,
        height: '100%',
        width: Dimensions.get('window').width,
        flexDirection: 'row',
    },
});


