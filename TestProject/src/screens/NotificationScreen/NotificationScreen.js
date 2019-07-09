import React, { Component } from 'react';
import { SafeAreaView, Text, FlatList, StyleSheet, View } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import { APP_GLOBAL_COLOR, refreshUserScreen } from '../../../Constant';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import moment from 'moment';
//import { GET_CURRENT_ACTIVE_SURVEY, GET_SURVEY_BY_ID } from '../../../Apis';
import { Navigation } from 'react-native-navigation';
import { UPDATE_USER_NOTIFICATIONS } from '../../../Apis';

class NotificationScreen extends Component {
    state = {
        notifications: this.props.notifications
    }

    
    toReportScreen = (notifications) => {
        const { menuName } = this.state;

        Navigation.push(this.props.componentId, {
            component: {
                name: 'ReportScreen',
                options: {
                    topBar: {
                        visible: false,
                        drawBehind: true,
                        animate: false,
                    },
                },
                passProps: {
                    // coordinates: this.state.coordinates,
                    // data: this.state.data,
                    // refreshUI: this.refreshUI,
                    // userLanguage: this.state.data.userLanguage,
                    // languageCode: this.state.firstAPIresponse ? this.state.firstAPIresponse.languageCodes : null,
                    // user_id: this.state.user_id,
                    // lat_lon: this.state.lat_lon,
                    // // languageCode: this.state.firstAPIresponse ? this.state.firstAPIresponse.languageCodes : null,
                    // menuName: menuName,

                    // notifications: this.state.notifications,
                    // readNotification: this.readNotification,
                    // updateNotifications: this.updateNotifications,


                    data: this.props.data,
                    notifications: notifications,
                    user_id: this.props.data.userId,
                    color: this.props.color,
                    notFirstScreen: true

                },
            },
        });
    };

    toReportReplyScreen = (surveyThreadId) => {
        // console.log('toReportReplyScreen----yyy');
        // console.log(surveyThreadId);
        // const { menuName } = this.state;
        if (surveyThreadId) {
            let dict = { threadId: surveyThreadId, Message_Id: '' };
            Navigation.push(this.props.componentId, {
                component: {
                    name: 'ReportReplyScreen',
                    options: {
                        topBar: {
                            visible: false,
                            drawBehind: true,
                            animate: false,
                        },
                    },
                    passProps: {
                        // coordinates: this.state.coordinates,
                        color : this.props.color,
                        data: dict,
                        // data2: this.state.data,
                        userData: this.props.data,
                        // refreshUI: this.refreshUI,
                        userLanguage: this.props.data.userLanguage,
                        // languageCode: this.state.firstAPIresponse ? this.state.firstAPIresponse.languageCodes : null,
                        user_id: this.props.data.userId,
                        // lat_lon: this.state.lat_lon,
                        // // languageCode: this.state.firstAPIresponse ? this.state.firstAPIresponse.languageCodes : null,
                        // menuName: menuName,
                        // notifications: this.state.notifications,
                        // readNotification: this.readNotification,
                        // updateNotifications: this.updateNotifications,
                    },
                },
            });
        }

    };

    toQuesScreen = (surveyThreadID, updatedNotification) => {
        const { menuName } = this.state;

        // let notification = updatedNotification ? updatedNotification : this.state.notifications;
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
                    // user_id: this.state.user_id,
                    // lat_lon: this.state.lat_lon,
                    // userLanguage: this.state.data.userLanguage,
                    // // languageCode: this.state.firstAPIresponse ? this.state.firstAPIresponse.languageCodes : null,
                    // menuName: menuName,
                    // surveyThreadID: surveyThreadID,

                    // notifications: notification,
                    // readNotification: this.readNotification,
                    // updateNotifications: this.updateNotifications,

                    notifications: updatedNotification,
                    surveyThreadID: surveyThreadID,
                    user_id: this.props.data.userId,
                    data: this.props.data,
                    color: this.props.color,
                    notFirstScreen: true
                }
            },
        });
    };

    toTrendScreen = (notification) => {
        // const { menuName } = this.state;

        Navigation.push(this.props.componentId, {
            component: {
                name: 'TrendScreen',//'ScratchCardScreen',// 
                options: {
                    topBar: {
                        visible: false,
                        drawBehind: true,
                        animate: false,
                    },
                },
                passProps: {
                    //   resourceIdPDM: this.state.firstAPIresponse ? this.state.firstAPIresponse.firResourceId : 1,
                    //   resourceIdCDM: this.state.firstAPIresponse ? this.state.firstAPIresponse.polResourceId : 1,
                    // image: this.state.data.image,
                    // username: this.state.data.username,
                    // data: this.state.data,
                    // refreshUI: this.refreshUI,
                    // userLanguage: this.state.data.userLanguage,
                    // languageCode: this.state.firstAPIresponse ? this.state.firstAPIresponse.languageCodes : null,
                    // user_id: this.state.user_id,
                    // menuName: menuName,

                    // notifications: this.state.notifications,
                    // readNotification: this.readNotification,
                    // updateNotifications: this.updateNotifications,

                    notifications: notification,
                    data: this.props.data,
                    color: this.props.color,
                    user_id: this.props.data.userId,
                    notFirstScreen: true
                    
                }
            },
        });
    };

    readNotification = (index, notifications, screen) => {
        // const { count } = this.state.notifications;
        // let counted;
        let newNotifications = notifications;

        // if (count > 0) {
        //   counted = count - 1;
        // } else {
        //   counted = count;
        // }

        // newNotifications.notificationList[index].read = true;
        // newNotifications.count = counted;

        let updatedNotification = Object.assign(newNotifications, {});

        // console.log(updatedNotification)
        refreshUserScreen(updatedNotification, -1, 2)
        this.setState({
            notifications: updatedNotification
        })
        // alert(JSON.stringify(notifications[index]));
        if (screen.toString().toLowerCase() === 'survey' || screen === 'Survey') {
            let obj = newNotifications.notificationList[index];
            let surveyThreadID = obj["surveyThreadId"];
            this.toQuesScreen(surveyThreadID, updatedNotification);
        } else if (screen.toString().toLowerCase() === 'trends') {
            this.toTrendScreen(notifications)
        } else if (screen.toString().toLowerCase() === 'timeline') {
            this.toReportScreen(notifications)
        } else if (screen.toString().toLowerCase() === 'message') {
            let obj = newNotifications.notificationList[index];
            this.toReportReplyScreen(obj.surveyThreadId);
        }
    }

    updateNotifications = (notificationLogId, notification) => {
        // console.log('called')
        // return;
        axios.post(UPDATE_USER_NOTIFICATIONS, {
            notificationLogId: notificationLogId.toString(),
            read: "Y",
            userId: this.state.user_id
            // notificationLogId: notificationLogId.toString(),
            // read: 'Y',
            // userId: this.state.user_id
        }).then((response) => {
            // let responseData = response.data;
            // console.log('_________')
            // console.log(responseData)
            // console.log('_________')
            // this.getNotifications()

        }).catch(error => {
            console.log(error)
        })
    }

    // requestToGetNotifications = () => {
    //     let userid = this.props.data.userId;
    //     // console.log(userid)
    //     axios.post(GET_USER_NOTIFICATIONS, {
    //       userId: userid
    //     }).then((response) => {
    //       let responseData = response.data;
    //       // alert(JSON.stringify(responseData));
    //       // this.setState({
    //       //   notifications: responseData
    //       // })
    //       refreshUserScreen(responseData, -1, 2)
    
    //       // this.refreshNotificationData(responseData)
    //     }).catch(error => {
    //       console.log(error)
    //     })
    //   }

    _keyExtractor = (item, index) => item.notificationLogId.toString();

    _renderItem = ({ item, index }) => {

        // const { readNotification, updateNotifications } = this.props;

        let Icons = [
            require('../../assets/trends.png'),
            require('../../assets/survey.png'),
            require('../../assets/timeline.png'),
        ];

        const checkType = () => {
            let source;

            if (item.type.toString().toLowerCase() === 'survey' || item.type === 'Survey') {
                source = Icons[1];
            } else if (item.type.toString().toLowerCase() === 'trends') {
                source = Icons[0];
            } else if (item.type.toString().toLowerCase() === 'timeline' || item.type.toString().toLowerCase() === 'message') {
                source = Icons[2]
            }

            return source;
        }

        // alert(item.notificationDateTime);
        let updatedDate = moment(item.notificationDateTime, 'YYYY-MM-DDThh:mm:ssZ').fromNow();

        // let updatedDate = moment().calendar(item.notificationDateTime);
        // let updatedDate = new Date(item.notificationDateTime).toDateString();

        return (
            <View
                style={{ backgroundColor: item.read ? '#fff' : '#eee' }}
            >
                <ListItem
                    leftAvatar={{
                        source: checkType(),
                        imageProps: { resizeMode: 'contain' },
                        overlayContainerStyle: {
                            backgroundColor: this.props.color,
                            padding: hp('1.3%')
                        },
                    }}
                    title={item.title}
                    subtitle={item.subtitle}
                    chevron
                    containerStyle={{ backgroundColor: item.read ? '#fff' : '#eee' }}
                    onPress={() => {
                        let newNotifications = this.state.notifications;
                        let obj = newNotifications.notificationList[index];


                        if (obj.read != true) {
                            obj.read = true;
                            let counted = newNotifications.count;
                            if (counted > 0) {
                                counted = counted - 1;
                            }
                            newNotifications.count = counted;

                            let updatedNotification = Object.assign(newNotifications, {})

                            this.setState({
                                notifications: updatedNotification
                            })
                            this.updateNotifications(item.notificationLogId, updatedNotification);
                        }
                        this.readNotification(index, newNotifications, item.type);


                    }}
                />
                <Text
                    style={{
                        color: this.props.color,
                        marginLeft: hp('8%'),
                        fontWeight: '900',
                        marginBottom: hp('1%')
                        // marginTop: hp('1%')
                    }}
                > {updatedDate}
                </Text>
                <Divider />
            </View>
        )
    }

    render() {
        const { notifications } = this.state;
        console.log(this.state.notifications)
        return (
            <SafeAreaView style={styles.containerStyle} >
                <FlatList
                    data={notifications.notificationList}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: '#fff',
        // paddingTop: Platform.OS === 'ios' ? 0 : 0

    },
    readStyle: {},
    notRadStyle: {},

})

export default NotificationScreen;