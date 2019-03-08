import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableOpacity
} from 'react-native';


import { Navigation } from 'react-native-navigation';
import Spinner from '../../components/UI/Spinner/Spinner';
import CustomButton from '../../components/UI/ButtonMod/CustomButtom';
import { PropTypes } from 'prop-types';
import TrendProfile from '../../components/UI/TrendProfile/TrendProfile';
import { TREND_, TREND_PDM, TREND_CDM, TREND_IMAGE } from '../../../Apis';
import { authHeaders, getUserID, APP_GLOBAL_COLOR } from '../../../Constant';
import axios from 'axios';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import _ from 'lodash';
import { normalize } from '../../../Constant';
import { sliderWidth, itemWidth } from './SliderEntry.style.js';
import { withTheme } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class TutorialScreen extends Component {
  //   locationLatLong = null;
  // //   user_Id = 1;

  state = {
    // trendImages: null,
    imageList: [require('../../assets/Tutorial/t_1.png'), require('../../assets/Tutorial/t_2.png'), require('../../assets/Tutorial/t_3.png')],
    activeSlide: 0,
    // loading: true,
  }

  componentDidMount() {
    // this.getDataFromServer(true)
    // getUserID().then((userId) => {
    //   this.user_Id = userId;
    //   this.getLocation()
    // })
  }

  static propTypes = {
    componentId: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  homeButtonTapped = () => {
    Navigation.pop(this.props.componentId);
  };

  showMobileScreen() {

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
        },
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
          layout={'default'} layoutCardOffset={18}
          ref={(c) => { this._carousel = c; }}
          data={this.state.imageList}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          shouldOptimizeUpdates
          onSnapToItem={(index) => {

            if (index === 3) {
              //   alert('ddd');
              this.showMobileScreen();
            } else {
              this.setState({ activeSlide: index });
            }


          }}
        />
        {this.pagination}
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
          backgroundColor: APP_GLOBAL_COLOR,
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
          <Image
            resizeMode='contain'
            resizeMethod="scale"
            style={{ height: '100%', width: '100%', marginTop: 0, borderRadius: 0 }}
            source={item}
          />
        {/* </View> */}
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView
        forceInset={{ bottom: 'always' }}
        style={styles.safeViewContainer} backgroundColor={APP_GLOBAL_COLOR}>

        {this.renderComponent()}
        <View style={{ flex: 0.1, backgroundColor: APP_GLOBAL_COLOR, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={this.handleTap} style={{ height: 40, width: '40%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }} >

            <Text style={{ fontWeight: 'bold', color: APP_GLOBAL_COLOR }}>{this.state.activeSlide !== 2 ? 'Skip to Login' : 'Login'}</Text>

          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  safeViewContainer: {
    flex: 1,
    backgroundColor: APP_GLOBAL_COLOR
  },

  imageContainer: {
    flex: 1,
    backgroundColor: 'transparent'
  },

  carouselContainer: {
    flex: 0.9,
    margin: 0,
  }

})

