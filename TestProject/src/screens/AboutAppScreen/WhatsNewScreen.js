import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { Navigation } from 'react-native-navigation';


import { PropTypes } from 'prop-types';




import Carousel, { Pagination } from 'react-native-snap-carousel';


import { sliderWidth, itemWidth } from './SliderEntry.style.js';


import firebase from 'react-native-firebase';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

import KochavaTracker from 'react-native-kochava-tracker';
import { TouchablePreview } from 'react-native-navigation/lib/dist/adapters/TouchablePreview';
import { NAVIGATION_ROOT } from '../../AppNavigation.js';

export default class WhatsNewScreen extends Component {
  //   locationLatLong = null;
  // //   user_Id = 1;



  constructor(props) {
    super(props);

    let array = Platform.isPad ?
      [
        require('../../assets/IntroImages/intro1.jpg'),
        require('../../assets/IntroImages/intro2.jpg'),
        require('../../assets/IntroImages/intro3.jpg'),
        require('../../assets/IntroImages/intro4.jpg'),
        require('../../assets/IntroImages/intro5.jpg'),
        require('../../assets/IntroImages/intro6.jpg'),
      ]
      :
      [
        require('../../assets/IntroImages/intro1.jpg'),
        require('../../assets/IntroImages/intro2.jpg'),
        require('../../assets/IntroImages/intro3.jpg'),
        require('../../assets/IntroImages/intro4.jpg'),
        require('../../assets/IntroImages/intro5.jpg'),
        require('../../assets/IntroImages/intro6.jpg'),
      ];
    this.state = {
      // trendImages: null,
      imageList: array,
      activeSlide: 0,
      pushNotificationToken: null,
      // loading: true,
    }
  }

  componentDidMount() {
    
    // this.getDataFromServer(true)
    var screenName = 'WhatsNew_Screen'
    firebase.analytics().setCurrentScreen("Screen", screenName);
    //firebase.analytics().logEvent("Trends_Screen");
    firebase.analytics().setUserProperty("Screen", screenName);
    firebase.analytics().logEvent("Content", { "Screen": screenName });

    var eventMapObject = {};
    eventMapObject["screen_name"] = screenName;
    KochavaTracker.sendEventMapObject(KochavaTracker.EVENT_TYPE_LEVEL_COMPLETE_STRING_KEY, eventMapObject);

    // this.createNotificationListeners();
  }




  

  showAlert(title, body) {
    return;
    Alert.alert(
      title, body,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

  static propTypes = {
    componentId: PropTypes.string,
  };

  homeButtonTapped = () => {
    Navigation.pop(this.props.componentId);
  };

  showMobileScreen() {

    //   Navigation.push(this.props.componentId, {
    //     component: {
    //       name: 'FirstScreen',
    //       options: {
    //         topBar: {
    //           visible: false,
    //           animate: false,
    //           drawBehind: true,
    //         },
    //         layout: {
    //           orientation: ['portrait']
    //         },
    //       },
    //       passProps: {
    //         pushNotificationToken: this.state.pushNotificationToken
    //       }
    //     },
    //   });
    // // };
    // return;
    // alert('aaaaa');
    Navigation.push(this.props.componentId, {
      component: {
        name: 'MobileNumber',
        options: {
          topBar: {
            visible: false,
            animate: false,
            drawBehind: true,
          },
          layout: {
            orientation: ['portrait']
          },
        },
        passProps: {
          pushNotificationToken: this.state.pushNotificationToken
        }
      },
    });
  };


  handleTap = () => {
    this.showMobileScreen()
  }



  renderComponent = () => {
    return (
      <View style={styles.carouselContainer}>
        <Carousel
          layout={'default'} layoutCardOffset={0}
          ref={(c) => { this._carousel = c; }}
          data={this.state.imageList}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          // sliderHeight = {50}
          // sliderHeight={Dimensions.get('window').height}
          itemWidth={itemWidth}
          shouldOptimizeUpdates
          onSnapToItem={(index) => {

            if (index === 3) {
              //   alert('ddd');
              // this.showMobileScreen();
            } else {
              this.setState({ activeSlide: index });
            }

          }}
          
        />
        {/* {this.pagination} */}
      </View>
    )

  }


  get pagination() {
    const { activeSlide, imageList } = this.state;
    return (
      <Pagination
        dotsLength={imageList.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          backgroundColor: this.props.color,
          // backgroundColor: 'rgba(0, 0, 0, 0.75)',
          width: SCREEN_WIDTH,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center'
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: 'rgba(255, 255, 255, 0.92)'
        }}
        inactiveDotStyle={{
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  _renderItem({ item, index }) {
    // let data = "trendsImage"+(index+1)+".jpg";
    return (
      <View key={index + "abc"} style={styles.imageContainer}>
        {/* <View style={{ width: '100%' , backgroundColor : 'yellow'}}> */}
        <TouchablePreview onPress = {() => {
          // alert('asd')
          // Navigation.pop(this.props.componentId)
          Navigation.pop(NAVIGATION_ROOT);
        }}>
        <Image
          resizeMode='contain'
          resizeMethod="scale"
          style={{ height: '100%', width: '100%', marginTop: 0, borderRadius: 0 }}
          source={item}
        />
        </TouchablePreview>
        {/* </View> */}
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView
        forceInset={{ bottom: 'always' }}
        style={styles.safeViewContainer}>

        {this.renderComponent()}
        {/* <View style={{ flex: 0.1, backgroundColor: this.props.color, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={this.handleTap} style={{ height: 40, width: '40%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }} >

            <Text style={{ fontWeight: 'bold', color: this.props.color }}>{this.state.activeSlide !== 2 ? ' Skip to Login ' : ' Login '}</Text>

          </TouchableOpacity>
        </View> */}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  safeViewContainer: {
    flex: 1,
    // backgroundColor: this.props.color
  },

  imageContainer: {
    flex: 1,
    backgroundColor: 'transparent'
  },

  carouselContainer: {
    flex: 1,
    margin: 0,
  }

})

