import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  SafeAreaView,
  Image,
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

import Permissions from 'react-native-permissions';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class TrendScreen extends Component {
  locationLatLong = null;
  user_Id = 1;

  state = {
    trendImages: null,
    imageList: [],
    activeSlide: 0,
    loading: true,
  }

  componentDidMount() {
    // this.getDataFromServer(true)
    getUserID().then((userId) => {
      this.user_Id = userId;
      // this.getLocation()
      this.getDataFromServer(true);
    })
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

  handlePress = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'TrendDetailScreen',
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

  requestCheckPremission = () => {
    Permissions.check('location').then(response => {
      if (response === 'denied' || response === 'undetermined') {
        this._requestPermission();
      } else if (response === 'authorized') {
        this.getLocation();
      }
    })
  }

  _requestPermission = () => {
    Permissions.request('location').then(response => {
      this.setState({ location: response })
      // alert(response);
      // this.getLocation()
      if (response === 'denied' || response === 'undetermined') {
        this.getDataFromServer(true);
      }else{
        this.getLocation();
      }
    })
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const initialPosition = JSON.stringify(position);

        // let latlong = position.coords.latitude.toString() +  "," + position.coords.longitude.toString()
        let latlong = position.coords.latitude.toString() + "," + position.coords.longitude.toString()
        if (position.mocked) {
          if (position.mocked == true) {
            alert("you are using fake location");
            return;
          }
        }

        this.locationLatLong = latlong;
        this.getDataFromServer(true)
      },
      (error) => {
        // alert(error.message)
        this.getDataFromServer(true)
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
  }

  getDataFromServer = () => {
    axios.post(TREND_IMAGE, {
      userId: this.user_Id
    })
      .then(response => {

        // alert(JSON.stringify(response));
        let responseData = response.data;

        this.setState({ trendImages: responseData });

        let mappedState = _.map(this.state.trendImages.imagesMap, (val, index) => {
          return { [index]: val }
        })

        this.setState({ imageList: mappedState, loading: false })

      })
      .catch(error => {
        console.log(error)
        this.setState({ loading: false })
      })
  }

  homeButtonTapped = () => {
    Navigation.pop(this.props.componentId);
  };

  renderComponent = () => {
    const { loading } = this.state;

    if (loading) {
      return (
        <View style={{ flex: 12, justifyContent: 'center', alignItems: 'center' }}>
          <Spinner />
        </View>
      )
    } else if (!loading) {
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
            onSnapToItem={(index) => this.setState({ activeSlide: index })}
          />
          {this.pagination}
        </View>
      )
    }
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
          justifyContent: 'space-around'
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
    let data = "trendsImage" + (index + 1) + ".jpg";
    return (
      <View key={index + "abc"} style={styles.imageContainer}>
        {data === null ?
          <Image
            resizeMode="stretch"
            resizeMethod="scale"
            style={{ height: SCREEN_HEIGHT / 1.5, width: '100%', marginTop: normalize(30), borderRadius: 10 }}
            source={require('../../assets/info.jpg')}
          /> :
          <Image
            resizeMode="stretch"
            resizeMethod="scale"
            style={{ height: SCREEN_HEIGHT / 1.5, width: '100%', marginTop: normalize(30), borderRadius: 10 }}
            source={{ uri: `data:image/jpg;base64,${item[data]}` }}
          />
        }
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView
        forceInset={{ bottom: 'always' }}
        style={styles.safeViewContainer}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
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
          <View style={{ flex: 5, backgroundColor: 'rgba(255,255,255,1)', flexDirection: 'row', alignItems: 'center' }}>
            <Image
              style={{
                backgroundColor: APP_GLOBAL_COLOR,
                marginLeft: normalize(10),
                width: normalize(30),
                height: normalize(30),
                marginTop: normalize(5),
                marginBottom: normalize(5),
                borderRadius: normalize(30) / 2,
              }}
              source={this.props.image ? { uri: "data:image/png;base64," + this.props.image } : require('../../assets/UserSmall.png')}
            />

            <Text
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 5,
                fontSize: normalize(14),
                color: '#000',
              }}>
              {this.props.username}
            </Text>
          </View>
        </View>
        {this.renderComponent()}
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

export default TrendScreen;

