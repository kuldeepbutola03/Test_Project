import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { withBadge, Icon, Avatar } from 'react-native-elements';
import { APP_GLOBAL_COLOR, THEME_ARRAY, showProfileEditScreen, refreshUserScreen } from '../../../../Constant';
import { Navigation } from 'react-native-navigation';
import { NAVIGATION_ROOT } from '../../../AppNavigation';


export class NavigationBarDefault extends React.Component {
    // export const NavigationBarDefault = props => {
    state = {
        _style: {
            fontSize: 5,
            width: null,
        },
        _adjusted: false
    }
    // onLayout = (event) => {
    //     const { adjustsFontSizeToFit, style, children } = this.props
    //     if (adjustsFontSizeToFit && style.width && typeof children === 'string') {

    //         if (!this.state._adjusted) {
    //             const { width } = event.nativeEvent.layout
    //             this.setState({
    //                 _style: {
    //                     fontSize: Math.min(style.fontSize, Math.floor(5 * style.width / width)),
    //                     width: style.width,
    //                 },
    //                 _adjusted: true,
    //             })
    //         }
    //     }
    //     else {
    //         this.setState({
    //             _style: {
    //                 fontSize: this.props.style.fontSize,
    //                 width: this.props.style.width,
    //             },
    //             _adjusted: true,
    //         })
    //     }
    // }

    showNotificationScreen = () => {
        // const { menuName } = this.state;
        var menuName = 'as'

        // alert(this.props.data.userId);

        Navigation.push(NAVIGATION_ROOT, {
            component: {
                name: 'NotificationScreen',
                options: {
                    topBar: {
                        visible: true,
                        // drawBehind: true,
                        animate: true,
                        buttonColor: 'white',// '#fff',
                        background: {
                            color: this.props.bgColor,
                        },
                        title: {
                            text: menuName ? menuName[3] : null,
                            fontSize: hp('2.5%'),
                            color: '#fff',
                        },
                        backButton: {
                            color: 'white'//'#fff'
                        }
                    },
                },
                passProps: {
                    color: this.props.bgColor,
                    notifications: this.props.notifications,
                    data: this.props.data
                    //   readNotification: this.readNotification,
                    //   updateNotifications: this.updateNotifications,
                }

            },
        });
    }

    showPM_Cabinets = () => {

        Navigation.push(NAVIGATION_ROOT, {
            component: {
                name: 'TopPoliticianScreen',
                options: {
                    topBar: {
                        visible: false,
                        drawBehind: true,
                        // animate: true,
                        // buttonColor: 'white',// '#fff',
                        // background: {
                        //     color: this.props.bgColor,
                        // },
                        // title: {
                        //     text: menuName ? menuName[3] : null,
                        //     fontSize: hp('2.5%'),
                        //     color: '#fff',
                        // },
                        // backButton: {
                        //     color: 'white'//'#fff'
                        // }
                    },
                },
                passProps: {
                    color: this.props.bgColor,
                    notifications: this.props.notifications,
                    data: this.props.data
                    //   readNotification: this.readNotification,
                    //   updateNotifications: this.updateNotifications,
                }

            },
        });

    }
    showCM_Cabinets = () => {

    }

    backTapped = () => {
        // Navigation.pop(this.props.component)
        // alert('asds');
        Navigation.pop(NAVIGATION_ROOT)
    }


    render() {

        return (

            <View style={{ height: hp('6%'), flexDirection: 'row', backgroundColor: this.props.bgColor }}>
                {/* <View style={{ flex  :1, backgroundColor: 'yellow' }}>
                    <Text>askd ka</Text>
                </View>
                <View style={{ flex  :1, backgroundColor: 'yellow' }}>
                    <Text>askd ka</Text>
                </View> */}

                {this.props.showBackButton &&
                    <TouchableOpacity style={{ width: hp('6%'), justifyContent: "center", alignItems: 'center' }} onPress={this.backTapped}>
                        <Image source={require('../../../assets/back.png')} />
                    </TouchableOpacity>
                }

                <View style={{ width: hp('6%'), justifyContent: "center", alignItems: 'center' }}>
                    <Avatar
                        rounded
                        source={this.props.imageSource}
                        size={hp('4%')}//"large"
                        avatarStyle={{ borderColor: 'white', borderWidth: 1, borderRadius: hp('4%') / 2.0 }}
                        onPress={() => {
                            if (this.props.imageSource !== require('../../../assets/UserSmall.png')) {
                                Navigation.push(NAVIGATION_ROOT, {

                                    component: {
                                        name: 'FullPicture',
                                        passProps: {
                                            data: this.props.imageSource.uri
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

                                })
                            }

                        }}
                    />
                </View>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', padding: 5 }}
                    onPress={() => {
                        refreshUserScreen(null, 4, 3)
                        // showProfileEditScreen();
                    }}
                >
                    <Text adjustsFontSizeToFit children={this.props.children} style={{ color: 'white' }} />
                </TouchableOpacity>
                {this.props.addButton &&
                    <View style = {{flexDirection : 'row'}}>
                        {/* this.props.onPressAddButton */}
                        <TouchableOpacity style={{ width: hp('6%'), justifyContent: "center", alignItems: 'center' }} onPress = {this.showPM_Cabinets}>
                            <Image style = {{width : 35 , height : 35}} source={require('../../../assets/Arena/PM_icon.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ width: hp('6%'), justifyContent: "center", alignItems: 'center' }} onPress = {this.showCM_Cabinets}>
                            
                            <Image style = {{width : 35 , height : 35}} source={require('../../../assets/Arena/CM_icon.png')} />
                        </TouchableOpacity>
                        
                    </View>
                }

                {this.props.notifications && <TouchableOpacity style={{ width: hp('6%'), justifyContent: "center", alignItems: 'center' }} onPress={this.showNotificationScreen}>
                    <Image style={{ height: hp('2.5%'), width: hp('2.5%') }} source={require('../../../assets/Profile/bellIcon.png')} />

                    {this.props.notifications.count > 0 &&
                        <View style={{ padding: 2, position: 'absolute', backgroundColor: 'red', right: (hp('6%') - hp('3%')) / 6, top: (hp('6%') - hp('3%')) / 6, borderRadius: 20 }}>
                            <Text style={{ color: 'white', fontSize: 10 }}> {this.props.notifications.count} </Text>
                        </View>
                    }
                </TouchableOpacity>}

            </View>
        )
    }
}


const styles = StyleSheet.create({
    text: {
        color: 'black',
        backgroundColor: 'transparent',
    }
});