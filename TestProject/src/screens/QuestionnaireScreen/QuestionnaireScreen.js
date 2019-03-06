import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { PropTypes } from 'prop-types';
import { normalize, APP_GLOBAL_COLOR, APP_ALERT_MESSAGE } from '../../../Constant';
import CustomButton from '../../components/UI/ButtonMod/CustomButtom';
import { Navigation } from 'react-native-navigation';
import CustomTextButton from '../../components/UI/ButtonMod/CustomTextButton';
import axios from 'axios';
import QuestionniareListView from '../../components/UI/QuestionView/QuestionniareListView'
import { GET_CURRENT_ACTIVE_SURVEY, SUBMIT_USER_SURVEY_QUESTION } from '../../../Apis';
import Loading from 'react-native-whc-loading';
import _ from 'lodash';

export default class QuestionnireScreen extends Component {
    state = {
        loading: true,
        state: true,
        questionniareData1: [
            { type: 'slider', number: '01', choice: ['abc', 'ced', 'asdasds', 'asdasddsa'], question: 'It is better to polite and rule-obedient rather than carefree' },
            { type: 'optional', number: '02', choice: ['abc', 'ced', 'asdasds', 'asdasddsa'], question: 'I enjoy meeting new people',isSelected: 0 },
            { type: 'multiple', number: '03', choice: ['Strong and determined', 'Enthusiastic and frendly', 'Caring and sharing', 'Questioning and careful'], question: 'Which of the following is MOST like you?', isSelected: -1 },
            { type: 'slider', number: '04', choice: ['abc', 'ced', 'asdasds', 'asdasddsa'], question: 'My manager defends me from unfair criticism', isSelected: 0 },
            { type: 'optional', number: '05', choice: ['abc', 'ced', 'asdasds', 'asdasddsa'], question: 'A big part of success is luck?', isSelected: -1  },
            { type: 'optional', number: '06', choice: ['abc', 'ced', 'asdasds', 'asdasddsa'], question: 'I Sometime lie a lot', isSelected: -1  },
        ],
        questionniareData2: [
            { type: 'slider', number: '01', choice: ['abc', 'ced', 'asdasds', 'asdasddsa'], question: 'It is better to polite and rule-obedient rather than carefree' },
            { type: 'optional', number: '02', choice: ['abc', 'ced', 'asdasds', 'asdasddsa'], question: 'I enjoy meeting new people',isSelected: 0 },
            { type: 'multiple', number: '03', choice: ['Strong and determined', 'Enthusiastic and frendly', 'Caring and sharing', 'Questioning and careful'], question: 'Which of the following is MOST like you?', isSelected: -1 },
            { type: 'slider', number: '04', choice: ['abc', 'ced', 'asdasds', 'asdasddsa'], question: 'My manager defends me from unfair criticism', isSelected: 0 },
            { type: 'optional', number: '05', choice: ['abc', 'ced', 'asdasds', 'asdasddsa'], question: 'A big part of success is luck?', isSelected: -1  },
            { type: 'optional', number: '06', choice: ['abc', 'ced', 'asdasds', 'asdasddsa'], question: 'I Sometime lie a lot', isSelected: -1  },
        ],
        questionnaire1: null,
        questionnaire2: {},
        isSurveyTaken1: 'N',
        isSurveyTaken2: 'N',
        surveyTitle: 'SURVEY'
    }

    static propTypes = {
        componentId: PropTypes.string,
    };

    constructor(props) {
        super(props);  
    };


    getSurvey = (mount) => {
        const { surveyType } = this.props;
        if(mount) {
            if(surveyType) {
                axios.post(GET_CURRENT_ACTIVE_SURVEY, {
                    isNationalLevel : surveyType,
                    userId : this.props.user_id,
                    userCurrentCoord: this.props.lat_lon
                })
                .then(response => {
                    let responseData = response.data;

                    this.setState({ 
                        questionniareData2: responseData.surveyQuestionList, 
                        questionnaire2: responseData,
                        isSurveyTaken2: responseData.isSurveyTaken
                    })
    
                    axios.post(GET_CURRENT_ACTIVE_SURVEY, {
                        isNationalLevel : 'N',
                        userId : this.props.user_id,
                        userCurrentCoord: this.props.lat_lon
                    })
                    .then(response_2 => {
                        let responseData_2 = response_2.data;
                        this.setState({ 
                            questionniareData1: responseData_2.surveyQuestionList, 
                            loading: false, 
                            questionnaire1: responseData_2,
                            isSurveyTaken1: responseData_2.isSurveyTaken,
                            surveyTitle: responseData_2.surveyDesc
                        })
                        this.refs.scrollview.scrollTo({ x: Dimensions.get('window').width, animate: true });
                        // console.log(this.state)
                        this.refs.loading.close();
                        setTimeout(() => {
                            Alert.alert(
                                APP_ALERT_MESSAGE,
                                'Your feedback has been sent successfully!',
                                [
                                  {text: 'OK', onPress: () => { }},
                                ],
                                {cancelable: false},
                            );
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
                    state: false
                })
                
            } else {
                axios.post(GET_CURRENT_ACTIVE_SURVEY, {
                    isNationalLevel : this.state.state ? 'N' : 'Y',
                    userId : this.props.user_id,
                    userCurrentCoord: this.props.lat_lon
                })

                .then(response => {
                    let responseData = response.data;
                    this.setState({ 
                        questionniareData1: responseData.surveyQuestionList, 
                        questionnaire1: responseData,
                        isSurveyTaken1: responseData.isSurveyTaken,
                        surveyTitle: responseData.surveyDesc

                    })
    
                    axios.post(GET_CURRENT_ACTIVE_SURVEY, {
                        isNationalLevel : 'Y',
                        userId : this.props.user_id,
                        
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
                            Alert.alert(
                                APP_ALERT_MESSAGE,
                                'Your feedback has been sent successfully!',
                                [
                                  {text: 'OK', onPress: () => { }},
                                ],
                                {cancelable: false},
                            );
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
            if(surveyType) {
                axios.post(GET_CURRENT_ACTIVE_SURVEY, {
                    isNationalLevel : surveyType,
                    userId : this.props.user_id,
                    userCurrentCoord: this.props.lat_lon,
                    
                })
                .then(response => {
                    let responseData = response.data;
                    this.setState({ 
                        questionniareData2: responseData.surveyQuestionList, 
                        questionnaire2: responseData,
                        isSurveyTaken2: responseData.isSurveyTaken,
                        // surveyTitle: responseData.surveyDesc
                    })
    
                    axios.post(GET_CURRENT_ACTIVE_SURVEY, {
                        isNationalLevel : 'N',
                        userId : this.props.user_id,
                        userCurrentCoord: this.props.lat_lon
                    })
                    .then(response_2 => {
                        let responseData_2 = response_2.data;
                        this.setState({ 
                            questionniareData1: responseData_2.surveyQuestionList, 
                            loading: false, 
                            questionnaire1: responseData_2,
                            isSurveyTaken1: responseData_2.isSurveyTaken,
                        })
                        console.log(this.props.user_id)
                        console.log(responseData_2)
                        this.refs.scrollview.scrollTo({ x: Dimensions.get('window').width, animate: true });
                    })
                    .catch(error => {
                        console.error(error)
                    })
                })
                .catch(error => {
                    console.error(error)
                })
                this.setState({
                    state: false
                })
                
            } else {
                axios.post(GET_CURRENT_ACTIVE_SURVEY, {
                    isNationalLevel : this.state.state ? 'N' : 'Y',
                    userId : this.props.user_id,
                    userCurrentCoord: this.props.lat_lon,
                    
                })
                .then(response => {
                    let responseData = response.data;
                    this.setState({ 
                        questionniareData1: responseData.surveyQuestionList, 
                        // loading: false, 
                        questionnaire1: responseData,
                        isSurveyTaken1: responseData.isSurveyTaken,
                        surveyTitle: responseData.surveyDesc
                    })
    
                    axios.post(GET_CURRENT_ACTIVE_SURVEY, {
                        isNationalLevel : 'Y',
                        userId : this.props.user_id,
                        userCurrentCoord: this.props.userCurrentCoord,
                    })
                    .then(response_2 => {
                        let responseData_2 = response_2.data;
                        this.setState({ 
                            questionniareData2: responseData_2.surveyQuestionList, 
                            loading: false, 
                            questionnaire2: responseData_2,
                            isSurveyTaken2: responseData_2.isSurveyTaken,
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

    componentDidMount() {
        this.getSurvey();
        const { surveyTitle } = this.props;

        if(this.props.surveyTitle) {
            this.setState({ surveyTitle: `SURVEY - ${surveyTitle.toUpperCase()}`})
        }
    }

    homeButtonTapped = () => {
        Navigation.pop(this.props.componentId);
    };

    stateBttnTapped = () => {
        const { questionnaire1 } = this.state;

        this.setState({
            state: true
        })

        this.refs.scrollview.scrollTo({ x: 0, animate: true });
        if(questionnaire1) {
            this.setState({ surveyTitle: questionnaire1.surveyDesc })
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
            state: false
        })
        this.refs.scrollview.scrollTo({ x: Dimensions.get('window').width, animate: true });

        if(this.props.surveyTitle) {
            this.setState({ surveyTitle: `SURVEY - ${surveyTitle.toUpperCase()}`})
            // this.setState({ surveyTitle:  `SURVEY - ${surveyTitle.toUpperCase()}` })
        } else {
            if(questionnaire2) {
                this.setState({ surveyTitle: questionnaire2.surveyDesc })
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
        const { surveyType } = this.props;
        this.refs.loading.show();

        if(survey === 'N') {
            let authSubmit = [];

            this.state.questionniareData1.map((question, index) => {
                if(question.userAnswerId === null ) {
                    authSubmit.push(false)
                } else {
                    authSubmit.push(true)
                }
            })

            let submit = _.includes(authSubmit, false);

            if(submit) {
                Alert.alert(
                    APP_ALERT_MESSAGE,
                    'Please answer all questions in the survey!',
                    [
                      {text: 'OK', onPress: () => { }},
                    ],
                    {cancelable: false},
                );
                this.refs.loading.close();
            } else if(!submit) {
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
                    console.log(error)
                })
            }
        } else if(survey === 'L') {
            let authSubmit = [];

            this.state.questionniareData2.map((question, index) => {

                if(question.userAnswerId === null ) {
                    authSubmit.push(false)
                } else {
                    authSubmit.push(true)
                }
            })

            let submit = _.includes(authSubmit, false);
            console.log(submit)
            console.log(this.state.questionniareData2)
            console.log(authSubmit)
            if(submit) {
                Alert.alert(
                    APP_ALERT_MESSAGE,
                    'Please answer all questions in the survey!',
                    [
                      {text: 'OK', onPress: () => { }},
                    ],
                    {cancelable: false},
                );
                this.refs.loading.close()
            } else if(!submit) {
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
                    console.log(error)
                })
            }
        } else if(survey === 'Y') {
            let authSubmit = [];

            this.state.questionniareData2.map((question, index) => {
                console.log(question.userAnswerId)
                if(question.userAnswerId === null ) {
                    authSubmit.push(false)
                } else {
                    authSubmit.push(true)
                }
            })

            let submit = _.includes(authSubmit, false);
            console.log(submit)
            console.log(this.state.questionniareData2)
            console.log(authSubmit)

            if(submit) {
                Alert.alert(
                    APP_ALERT_MESSAGE,
                    'Please answer all questions in the survey!',
                    [
                      {text: 'OK', onPress: () => { }},
                    ],
                    {cancelable: false},
                );
                this.refs.loading.close();
            } else if(!submit) {
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

    renderComponent = () => {
        const { loading } = this.state;
        if(loading) {
            return (
                <SafeAreaView 
                    forceInset={{ bottom: 'always' }} 
                    style={{ flex: 1 , backgroundColor: 'rgba(210,210,208,1)' }}>
                    <View
                        style={topViewStyle.headerView}
                        backgroundColor="rgba(242,241,244,1)">
                        <View style={{ flex: 1, backgroundColor: APP_GLOBAL_COLOR }}>
                            <CustomButton
                                style={{
                                    flexDirection: 'row',
                                    flex: 1,
                                }}
                                source={require('../../assets/homez.png')}
                                onPress={this.homeButtonTapped}
                            />
                        </View>
                        {this.renderTitle()}
                    </View>
                    <View style={{ width: "100%", height: 1 }} backgroundColor="gray" />
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
                        <ActivityIndicator color={APP_GLOBAL_COLOR} size="small" />
                    </View>
                </SafeAreaView>
            )
        } else if(!loading) {
            return (
                <SafeAreaView
                    forceInset={{ bottom: 'always' }}
                    style={{ flex: 1, backgroundColor: 'rgba(210,210,208,1)' }}>
                    <Loading
                        ref="loading" />
                    <View
                        style={topViewStyle.headerView}
                        backgroundColor="rgba(242,241,244,1)">
                        <View style={{ flex: 1, backgroundColor: APP_GLOBAL_COLOR }}>
                            <CustomButton
                                style={{
                                    flexDirection: 'row',
                                    flex: 1,
                                }}
                                source={require('../../assets/homez.png')}
                                onPress={this.homeButtonTapped}
                            />
                        </View>
                        {this.renderTitle()}
                    </View>
                    <View style={{ width: "100%", height: 1 }} backgroundColor="gray" />
                    
                    {/* secondViewStyle */}
                    <View style={secondViewStyle.secondView}>
                        <CustomTextButton 
                            onPress={this.stateBttnTapped} 
                            style={{ flex: 1 }} 
                            textColor = {this.state.state ? "white" : "black"} 
                            bgColor={this.state.state ? APP_GLOBAL_COLOR : "transparent"} > 
                                {this.state.questionnaire1.userCurrentState ? this.state.questionnaire1.userCurrentState.toUpperCase() : "STATE" } 
                        </CustomTextButton>
                        <CustomTextButton onPress={this.nationalBttnTapped} style={{ flex: 1 }} textColor = {!this.state.state ? "white" : "black"} bgColor={!this.state.state ? APP_GLOBAL_COLOR : "transparent"} >NATIONAL</CustomTextButton>
                    </View>

                    <View style={{ width: "100%", height: 1 }} backgroundColor="white" />

                    {/* thirdViewStyle */}
                    <View style={thirdViewStyle.thirdView} >
                        <ScrollView horizontal={true} pagingEnabled={true} scrollEnabled={false} 
                            ref="scrollview"
                        >

                            <View style={thirdViewStyle.innerViewSecond}>
                                <QuestionniareListView 
                                    data={this.state.questionniareData1} 
                                    updateQuestionaire={this.updateQuestionaire}
                                    isSurveyTaken={this.state.isSurveyTaken1}
                                    survey={"N"}
                                    onChangeData={(data, index) => {
                                        var d = [];
                                        this.state.questionniareData1.map ((object,indexIn ) => {
                                            if (index === indexIn){
                                                d.push(data)
                                            }else{
                                                d.push(object)
                                            } 
                                        })
                                        this.setState({questionniareData1 : d});
                                    }}>
                                </QuestionniareListView>
                            </View>
                            <View style={thirdViewStyle.innerViewSecond}>
                                <QuestionniareListView 
                                    data={this.state.questionniareData2} 
                                    survey={this.props.surveyType ? 'L' : 'Y'}
                                    isSurveyTaken={this.state.isSurveyTaken2}
                                    updateQuestionaire={this.updateQuestionaire}
                                    onChangeData={(data, index) => {
                                        var d = [];
                                        this.state.questionniareData2.map ((object,indexIn ) => {
                                            if (index == indexIn){
                                                d.push(data)
                                            } else{
                                                d.push(object)
                                            }  
                                        })
                                        this.setState({questionniareData2 : d});
                                    }}>
                                </QuestionniareListView>
                            </View>
                        </ScrollView>
                    </View>
                </SafeAreaView>
            )
        }
    }

    render() {
        return this.renderComponent()
    }
}


const topViewStyle = StyleSheet.create({
    headerView: {
        flex: 0.075,
        justifyContent: 'center',
        flexDirection: 'row',
    },

    textheaderView: {
        flex: 5,
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },

    textView: {
        backgroundColor: 'transparent',
        marginLeft: 10,
        fontSize: normalize(13),
    },
    textView2: {
        backgroundColor: 'transparent',
        marginLeft: 10,
        fontSize: normalize(12),
    },
});

const secondViewStyle = StyleSheet.create({
    secondView: {
        flex: 0.075,
        backgroundColor: 'transparent',
        flexDirection: 'row',
    },
});

const thirdViewStyle = StyleSheet.create({
    thirdView: {
        flex: 0.85,
        backgroundColor: '#fff',
    },
    innerViewSecond: {
        flex: 1,
        height: '100%',
        width: Dimensions.get('window').width,
        flexDirection: 'row',
    },
});


