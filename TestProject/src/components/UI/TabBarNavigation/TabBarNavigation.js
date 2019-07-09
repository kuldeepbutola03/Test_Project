import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { APP_GLOBAL_COLOR, THEME_ARRAY, refreshUserScreen } from '../../../../Constant';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SpinKit from 'react-native-spinkit';
import { Navigation } from 'react-native-navigation';
import { setectTabBarNaviagtion } from '../../../AppNavigation';

export default class TabBarNavigation extends Component {

    // color = this.props.color;

    render() {
        let { selectedIndex, color } = this.props

        let indexV = THEME_ARRAY.indexOf(color)
        // alert(indexV);
        let imageArr = [
            require('../../../assets/TabBar/CenterTab/r_1.png'),
            require('../../../assets/TabBar/CenterTab/r_2.png'),
            require('../../../assets/TabBar/CenterTab/r_3.png'),
            require('../../../assets/TabBar/CenterTab/r_4.png'),
            require('../../../assets/TabBar/CenterTab/r_5.png'),
            require('../../../assets/TabBar/CenterTab/r_6.png'),
            require('../../../assets/TabBar/CenterTab/r_7.png'),
        ]
        let imageTColor1 = [
            require('../../../assets/TabBar/OtherTabs/a_red_.png'),
            require('../../../assets/TabBar/OtherTabs/a_darkblue_.png'),
            require('../../../assets/TabBar/OtherTabs/a_purple_.png'),
            require('../../../assets/TabBar/OtherTabs/a_pink_.png'),
            require('../../../assets/TabBar/OtherTabs/a_blue_.png'),
            require('../../../assets/TabBar/OtherTabs/a_orange_.png'),
            require('../../../assets/TabBar/OtherTabs/a_green_.png')
        ]
        let imageTColor2 = [
            require('../../../assets/TabBar/OtherTabs/b_red_.png'),
            require('../../../assets/TabBar/OtherTabs/b_darkblue_.png'),
            require('../../../assets/TabBar/OtherTabs/b_purple_.png'),
            require('../../../assets/TabBar/OtherTabs/b_pink_.png'),
            require('../../../assets/TabBar/OtherTabs/b_blue_.png'),
            require('../../../assets/TabBar/OtherTabs/b_orange_.png'),
            require('../../../assets/TabBar/OtherTabs/b_green_.png')
        ]
        let imageTColor3 = [
            require('../../../assets/TabBar/OtherTabs/d_red_.png'),
            require('../../../assets/TabBar/OtherTabs/d_darkblue_.png'),
            require('../../../assets/TabBar/OtherTabs/d_purple_.png'),
            require('../../../assets/TabBar/OtherTabs/d_pink_.png'),
            require('../../../assets/TabBar/OtherTabs/d_blue_.png'),
            require('../../../assets/TabBar/OtherTabs/d_orange_.png'),
            require('../../../assets/TabBar/OtherTabs/d_green_.png')
        ]
        let imageTColor4 = [
            require('../../../assets/TabBar/OtherTabs/e_red_.png'),
            require('../../../assets/TabBar/OtherTabs/e_darkblue_.png'),
            require('../../../assets/TabBar/OtherTabs/e_purple_.png'),
            require('../../../assets/TabBar/OtherTabs/e_pink_.png'),
            require('../../../assets/TabBar/OtherTabs/e_blue_.png'),
            require('../../../assets/TabBar/OtherTabs/e_orange_.png'),
            require('../../../assets/TabBar/OtherTabs/e_green_.png')
        ]

        let selectedImageTab3 = imageArr[indexV]
        // alert(str);
        // let selectedTab1 = require(str)
        let selectedTab1 = imageTColor1[indexV]

        let selectedTab2 = imageTColor2[indexV]
        let selectedTab4 = imageTColor3[indexV]
        let selectedTab5 = imageTColor4[indexV]

        let unselectedTab1 = require('../../../assets/TabBar/tab1.png')

        let unselectedTab2 = require('../../../assets/TabBar/tab2.png')

        let unselectedTab4 = require('../../../assets/TabBar/tab4.png')
        let unselectedTab5 = require('../../../assets/TabBar/tab5.png')

        

        let sizeImage = 22;

        // "Trends,Survey,Arena,Notifications,Rate Now, Profile, Male,Female, Select Your Profession,Student,Salaried,Entrepreneur, Retired, Housewife,Other, Select Your Age group, Teenager,Twenties,Thirties,Forties,Fifties,Sixty+".split(',');
        var {menuNameArray} = this.props

        var arrayOfLayout = [
            // firstView
            <TouchableOpacity style={{ flex: 1 }} onPress={() => {

                refreshUserScreen(null, 0, 5)

                setectTabBarNaviagtion(0)
                
                // Navigation.mergeOptions('tabbar', {
                //     bottomTabs: {
                //         currentTabIndex: 0
                //     }
                // })
            }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={selectedIndex === 0 ? selectedTab1 : unselectedTab1} style={{ height: sizeImage, width: sizeImage }}
                    />
                    <Text style={{ fontSize: 10, color: selectedIndex === 0 ? 'black' : 'grey', marginTop: 2 }}>{menuNameArray[2]}</Text>
                </View>
            </TouchableOpacity>,

            // secondView
            <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                refreshUserScreen(null, 1, 5)
                setectTabBarNaviagtion(1)
            }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={selectedIndex === 1 ? selectedTab2 : unselectedTab2} style={{ height: sizeImage, width: sizeImage }}
                    />
                    <Text style={{ fontSize: 10, color: selectedIndex === 1 ? 'black' : 'grey' }}>{menuNameArray[1]}</Text>
                </View>
            </TouchableOpacity>,

            // third view
            <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                refreshUserScreen(null, 2, 5)
                setectTabBarNaviagtion(2)
            }}>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <View>
                        <Image source={selectedImageTab3} />
                        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 10, color: 'white' }}>{menuNameArray[4]}</Text>
                        </View>

                    </View>

                </View>
            </TouchableOpacity>,

            // fourth view
            <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                refreshUserScreen(null, 3, 5)
                setectTabBarNaviagtion(3)
            }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={selectedIndex === 3 ? selectedTab4 : unselectedTab4} style={{ height: sizeImage, width: sizeImage }}
                    />
                    <Text style={{ fontSize: 10, color: selectedIndex === 3 ? 'black' : 'grey' }}>{menuNameArray[0]}</Text>
                </View>
            </TouchableOpacity>,

            // fifth view
            <TouchableOpacity style={{ flex: 1 }} onPress={() => {

                setectTabBarNaviagtion(4)
            }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={selectedIndex === 4 ? selectedTab5 : unselectedTab5} style={{ height: sizeImage, width: sizeImage }}
                    />
                    <Text style={{ fontSize: 10, color: selectedIndex === 4 ? 'black' : 'grey' }}>Settings</Text>
                </View>
            </TouchableOpacity>
        ]


        let showView;

        let selectedTab = this.props.selectedIndexTab
        if (selectedTab === 1) {
            showView = [arrayOfLayout[1], arrayOfLayout[0], arrayOfLayout[2], arrayOfLayout[3], arrayOfLayout[4]];
        }else if (selectedTab === 3) {
            showView = [arrayOfLayout[3], arrayOfLayout[0], arrayOfLayout[2], arrayOfLayout[1], arrayOfLayout[4]];
        }else{
            showView = [arrayOfLayout[0], arrayOfLayout[1], arrayOfLayout[2], arrayOfLayout[3], arrayOfLayout[4]];
        }

        


        // if (selectedTab)

        return (
            <View style={styles.containerStyle}>
                {showView}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        height: 50,
        margin: 0,
        borderWidth: 1,

        borderColor: 'transparent',
        borderTopColor: 'lightgrey',
        // marginBotton : 0,

        flexDirection: 'row',
        backgroundColor: 'white'

    }
})

