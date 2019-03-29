import React, { Component } from 'react';
import { SafeAreaView, Text, FlatList, StyleSheet, View } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import { APP_GLOBAL_COLOR } from '../../../Constant';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import moment from 'moment';
import { GET_CURRENT_ACTIVE_SURVEY, GET_SURVEY_BY_ID } from '../../../Apis';

class NotificationScreen extends Component {
    state = {
        notifications: null
    }

    componentWillMount() {
        this.setState({
            notifications: this.props.notifications
        })
    }

    _keyExtractor = (item, index) => item.notificationLogId.toString();

    _renderItem = ({item, index}) => {

        const { readNotification, notifications, updateNotifications } = this.props;

        let Icons = [
            require('../../assets/trends.png'),
            require('../../assets/survey.png'),
            require('../../assets/timeline.png'),
        ];

        const checkType = () => {
            let source;

            if(item.type === 'survey' || item.type === 'Survey') {
                source = Icons[1];
            } else if(item.type === 'trends' || item.type === 'Trends') {
                source = Icons[0];
            } else if (item.type === 'timeline' || item.type === 'Timeline') {
                source = Icons[2]
            }

            return source;
        }

        let updatedDate = moment().calendar(item.notificationDateTime);

        return (
            <View
                style={{ backgroundColor: item.read ? '#fff' : '#eee' }}
            >
                <ListItem
                    leftAvatar={{ 
                        source: checkType(), 
                        imageProps: { resizeMode: 'contain' },
                        overlayContainerStyle: { 
                            backgroundColor: APP_GLOBAL_COLOR, 
                            padding: hp('1.3%')
                        },
                    }}
                    title={item.title}
                    subtitle={item.subtitle}
                    chevron
                    containerStyle={{ backgroundColor: item.read ? '#fff' : '#eee'}}
                    onPress={() => {
                        let newNotifications =  notifications;
                        newNotifications.notificationList[index].read = true;
                        let updatedNotification = Object.assign(newNotifications, {})
                        readNotification(index, notifications, item.type);
                        updateNotifications(item.notificationLogId)
                        this.setState({
                            notifications: updatedNotification
                        })
                    }}
                />
                <Text 
                    style={{ 
                        color: APP_GLOBAL_COLOR, 
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
            <SafeAreaView style={styles.containerStyle}>
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

    },
    readStyle: {},
    notRadStyle: { },

})

export default NotificationScreen;