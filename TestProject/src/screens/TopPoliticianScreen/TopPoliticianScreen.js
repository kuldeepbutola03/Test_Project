import axios from 'axios';
import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { Image, SafeAreaView, SectionList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon, withBadge } from 'react-native-elements';
import firebase from 'react-native-firebase';
import KochavaTracker from 'react-native-kochava-tracker';
import { Navigation } from 'react-native-navigation';
import Permissions from 'react-native-permissions';
import { LANDING_TOP_SIX, PM_CABINETS } from '../../../Apis';
import { NavigationBarDefault } from '../../components/UI/NavigationBarDefault/NavigationBarDefault';
import Spinner from '../../components/UI/Spinner/Spinner';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Avatar } from 'react-native-elements';






export default class TopPoliticianScreen extends Component {
  state = {
    notifications: this.props.notifications,
    data: this.props.data,
    loading: true,
    landingTopSix: [],
    selectedThemeColor: this.props.color
    // refreshUI : this.props.refreshUI
  }

  componentDidMount() {

    firebase.analytics().setCurrentScreen("Screen", "Top_Politician_Screen");
    //firebase.analytics().logEvent("Trends_Screen");
    firebase.analytics().setUserProperty("Screen", "Top_Politician_Screen");
    firebase.analytics().logEvent("Content", { "Screen": "Top_Politician_Screen" });

    var eventMapObject = {};
    eventMapObject["screen_name"] = "Top_Politician_Screen";
    KochavaTracker.sendEventMapObject(KochavaTracker.EVENT_TYPE_LEVEL_COMPLETE_STRING_KEY, eventMapObject);

    this.getDataFromServer();


  }

  static propTypes = {
    componentId: PropTypes.string,
  };


  homeButtonTapped = () => {
    Navigation.pop(this.props.componentId);
  };

  getDataFromServer = () => {


    // var user_id = this.props.user_id;

    axios.get(PM_CABINETS)
      .then(response => {
        // alert(JSON.stringify(response));
        if (response.data) {
          let responseData = response.data;
          this.setState({ landingTopSix: responseData, loading: false })
        }

        // this.setState({ trendImages: responseData });
        // let mappedState = _.map(this.state.trendImages.imagesMap, (val, index) => {
        //   return { [index]: val }
        // })
        // this.setState({ imageList: mappedState, loading: false })
      })
      .catch(error => {
        console.log(error)
        this.setState({ loading: false })
      })



    // console.log('called')
    // var body = {
    //   userId: user_id
    // };
    // if (this.state.lat_lon) {
    //   body["latLngSeparatedByComma"] = this.state.lat_lon;
    // }
    // //alert(JSON.stringify(body));
    // axios.post(LANDING_TOP_SIX, body)
    //   .then(response => {
    //     let responseData = response.data;
    //     // if (typeof [responseData] === 'object') {
    //     let extraImage = responseData.extraImageFile3 ? responseData.extraImageFile3 : "Trends,Survey,Arena,Notifications,Rate Now, Profile, Male,Female, Select Your Profession,Student,Salaried,Entrepreneur, Retired, Housewife,Other, Select Your Age group, Teenager,Twenties,Thirties,Forties,Fifties,Sixty+";
    //     let menuArr = extraImage.split(',');

    //     // this check for e,r
    //     // const check = responseJson && responseJson.exitOrResultDay ? responseJson.exitOrResultDay : null;
    //     this.setState({ landingTopSix: responseData, menuName: menuArr, loading: false })
    //     // alert(responseData.resourceGPR_1);
    //     // }

    //   })
    //   .catch(error => {
    //     // alert('bbb');
    //     console.log(error)
    //   })

  }

  renderComponent = () => {
    const { loading } = this.state;

    if (loading) {
      return (
        <View style={{ flex: 12, justifyContent: 'center', alignItems: 'center' }}>
          <Spinner color={this.state.selectedThemeColor} />

        </View>
      )
    } else {

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


      // const resourceImageData_1 = this.state.landingTopSix && this.state.landingTopSix.resourceImageData_1 ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceImageData_1 } : null
      // const resourceImageData_2 = this.state.landingTopSix && this.state.landingTopSix.resourceImageData_2 ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceImageData_2 } : null
      // const resourceImageData_3 = this.state.landingTopSix && this.state.landingTopSix.resourceImageData_3 ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceImageData_3 } : null
      // const resourceImageData_4 = this.state.landingTopSix && this.state.landingTopSix.resourceImageData_4 ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceImageData_4 } : null
      // const resourceImageData_5 = this.state.landingTopSix && this.state.landingTopSix.resourceImageData_5 ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceImageData_5 } : null
      // const resourceImageData_6 = this.state.landingTopSix && this.state.landingTopSix.resourceImageData_6 ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceImageData_6 } : null

      // const resourceImageData_1_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceImageData_1 } : null
      // const resourceImageData_2_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceImageData_2 } : null
      // const resourceImageData_3_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceImageData_3 } : null
      // const resourceImageData_4_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceImageData_4 } : null
      // const resourceImageData_5_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceImageData_5 } : null
      // const resourceImageData_6_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceImageData_6 } : null

      // const resourceCategoryLogoData_1 = this.state.landingTopSix && this.state.landingTopSix.resourceCategoryLogoData_1 ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceCategoryLogoData_1 } : null
      // const resourceCategoryLogoData_2 = this.state.landingTopSix && this.state.landingTopSix.resourceCategoryLogoData_2 ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceCategoryLogoData_2 } : null
      // const resourceCategoryLogoData_3 = this.state.landingTopSix && this.state.landingTopSix.resourceCategoryLogoData_3 ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceCategoryLogoData_3 } : null
      // const resourceCategoryLogoData_4 = this.state.landingTopSix && this.state.landingTopSix.resourceCategoryLogoData_4 ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceCategoryLogoData_4 } : null
      // const resourceCategoryLogoData_5 = this.state.landingTopSix && this.state.landingTopSix.resourceCategoryLogoData_5 ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceCategoryLogoData_5 } : null
      // const resourceCategoryLogoData_6 = this.state.landingTopSix && this.state.landingTopSix.resourceCategoryLogoData_6 ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.resourceCategoryLogoData_6 } : null

      // const resourceCategoryLogoData_1_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceCategoryLogoData_1 } : null
      // const resourceCategoryLogoData_2_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceCategoryLogoData_2 } : null
      // const resourceCategoryLogoData_3_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceCategoryLogoData_3 } : null
      // const resourceCategoryLogoData_4_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceCategoryLogoData_4 } : null
      // const resourceCategoryLogoData_5_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceCategoryLogoData_5 } : null
      // const resourceCategoryLogoData_6_ = this.state.landingTopSix ? { uri: 'data:image/png;base64,' + this.state.landingTopSix.areaTopSixResources2.resourceCategoryLogoData_6 } : null

      // const resourceName_1 = this.state.landingTopSix ? this.state.landingTopSix.resourceName_1 : "";
      // const resourceName_2 = this.state.landingTopSix ? this.state.landingTopSix.resourceName_2 : "";
      // const resourceName_3 = this.state.landingTopSix ? this.state.landingTopSix.resourceName_3 : "";
      // const resourceName_4 = this.state.landingTopSix ? this.state.landingTopSix.resourceName_4 : "";
      // const resourceName_5 = this.state.landingTopSix ? this.state.landingTopSix.resourceName_5 : "";
      // const resourceName_6 = this.state.landingTopSix ? this.state.landingTopSix.resourceName_6 : "";

      // const resourceName_1_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceName_1 : "";
      // const resourceName_2_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceName_2 : "";
      // const resourceName_3_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceName_3 : "";
      // const resourceName_4_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceName_4 : "";
      // const resourceName_5_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceName_5 : "";
      // const resourceName_6_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceName_6 : "";

      // const resourceCategoryName_1 = this.state.landingTopSix ? this.state.landingTopSix.resourceCategoryName_1 : "";
      // const resourceCategoryName_2 = this.state.landingTopSix ? this.state.landingTopSix.resourceCategoryName_2 : "";
      // const resourceCategoryName_3 = this.state.landingTopSix ? this.state.landingTopSix.resourceCategoryName_3 : "";
      // const resourceCategoryName_4 = this.state.landingTopSix ? this.state.landingTopSix.resourceCategoryName_4 : "";
      // const resourceCategoryName_5 = this.state.landingTopSix ? this.state.landingTopSix.resourceCategoryName_5 : "";
      // const resourceCategoryName_6 = this.state.landingTopSix ? this.state.landingTopSix.resourceCategoryName_6 : "";

      // const resourceCategoryName_1_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceCategoryName_1 : "";
      // const resourceCategoryName_2_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceCategoryName_2 : "";
      // const resourceCategoryName_3_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceCategoryName_3 : "";
      // const resourceCategoryName_4_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceCategoryName_4 : "";
      // const resourceCategoryName_5_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceCategoryName_5 : "";
      // const resourceCategoryName_6_ = this.state.landingTopSix ? this.state.landingTopSix.areaTopSixResources2.resourceCategoryName_6 : "";



      // const resourceCategoryName_A = [
      //   resourceCategoryName_1,
      //   resourceCategoryName_2,
      //   resourceCategoryName_3,
      //   resourceCategoryName_4,
      //   resourceCategoryName_5,
      //   resourceCategoryName_6];

      // const resourceCategoryName_A_2 = [
      //   resourceCategoryName_1_,
      //   resourceCategoryName_2_,
      //   resourceCategoryName_3_,
      //   resourceCategoryName_4_,
      //   resourceCategoryName_5_,
      //   resourceCategoryName_6_];

      // const resourceName_A = [resourceName_1,
      //   resourceName_2,
      //   resourceName_3,
      //   resourceName_4,
      //   resourceName_5,
      //   resourceName_6];

      // const resourceName_A_2 = [resourceName_1_,
      //   resourceName_2_,
      //   resourceName_3_,
      //   resourceName_4_,
      //   resourceName_5_,
      //   resourceName_6_];
      // const resourceCategoryLogoData_A = [
      //   resourceCategoryLogoData_1,
      //   resourceCategoryLogoData_2,
      //   resourceCategoryLogoData_3,
      //   resourceCategoryLogoData_4,
      //   resourceCategoryLogoData_5,
      //   resourceCategoryLogoData_6];
      // const resourceCategoryLogoData_A_2 = [
      //   resourceCategoryLogoData_1_,
      //   resourceCategoryLogoData_2_,
      //   resourceCategoryLogoData_3_,
      //   resourceCategoryLogoData_4_,
      //   resourceCategoryLogoData_5_,
      //   resourceCategoryLogoData_6_];

      // const resourceImageData_A = [
      //   resourceImageData_1,
      //   resourceImageData_2,
      //   resourceImageData_3,
      //   resourceImageData_4,
      //   resourceImageData_5,
      //   resourceImageData_6];

      // const resourceImageData_A_2 = [
      //   resourceImageData_1_,
      //   resourceImageData_2_,
      //   resourceImageData_3_,
      //   resourceImageData_4_,
      //   resourceImageData_5_,
      //   resourceImageData_6_];
      // const resourceGPR_A_1 = [
      //   resourceGPR_1,
      //   resourceGPR_2,
      //   resourceGPR_3,
      //   resourceGPR_4,
      //   resourceGPR_5,
      //   resourceGPR_6];
      // const resourceGPR_A_2 = [
      //   resourceGPR_1_,
      //   resourceGPR_2_,
      //   resourceGPR_3_,
      //   resourceGPR_4_,
      //   resourceGPR_5_,
      //   resourceGPR_6_,];

      // const resource = {
      //   [
      //     [resourceGPR_1_,
      //   ],
      //   [

      // 
      // }

      // var list = [
      //   { title: 'Top MP', data: [resourceCategoryName_A, resourceName_A, resourceImageData_A, resourceCategoryLogoData_A, resourceGPR_A_1, ""] },
      //   { title: 'Local MP', data: [resourceCategoryName_A_2, resourceName_A_2, resourceImageData_A_2, resourceCategoryLogoData_A_2, resourceGPR_A_2, ""] }
      // ]

      var list = [
        { title: '', data: this.state.landingTopSix },
        // { title: '', data: this.state.landingTopSix },
        // { title: 'Local MP', data: [resourceCategoryName_A_2, resourceName_A_2, resourceImageData_A_2, resourceCategoryLogoData_A_2, resourceGPR_A_2, ""] }
      ]

      return (
        <SectionList
          renderItem={({ item, index, section: { title, data } }) => {

            console.log(title)
            console.log(data)

            return (<View style={{ flexDirection: 'row' }}>
              <View style={{ padding: 5 }}>
                <Avatar
                  rounded
                  source={{ uri: 'data:image/png;base64,' + data[index].resourceImageData }}
                  size={hp('7%')}//"large"
                  avatarStyle={{ borderColor: 'white', borderWidth: 2, borderRadius: hp('7%') / 2.0 }}
                />

                {/* {props.resourceGpr ? <Badge
                    status="success"
                    badgeStyle={{ height: normalize(28), width: normalize(28), borderRadius: normalize(28 / 2) }}
                    containerStyle={{ position: 'absolute', top: 1, right: -20 }}
                    value={props.resourceGpr ? this.convertToPercentage(props.resourceGpr) : null}
                    textStyle={{ fontSize: 12, fontWeight: '700' }}
                /> : null} */}

                <Avatar
                  source={{ uri: 'data:image/png;base64,' + data[index].resourceCategoryMaster.resourceCategoryLogoData }}
                  rounded
                  size={hp('3%')}
                  overlayContainerStyle={{ backgroundColor: '#fff' }}
                  imageProps={{ resizeMode: 'contain' }}
                  containerStyle={{ position: 'absolute', right: 1, top: 1 }}
                  avatarStyle={{}}
                />
              </View>
              <View style={{ flex: 1, padding: 5, justifyContent: 'center' }}>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'grey' }}>{data[index].resourceName}</Text>
                <Text style={{ fontSize: 12, color: 'grey' }}>{data[index].resourceCategoryMaster.resourceCategoryName}</Text>
              </View>

              <View style={{ width: hp('7%'), padding: 5, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 1, height: '90%', backgroundColor: 'rgba(210,210,208,1)' }} />
                <View style={{ flex: 1, padding: 2, alignItems: "center", }}>
                  <Text style={{ fontSize: 10, color: 'grey' }}> RANK </Text>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {/* <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'grey' }}>{data[4][index] ? data[4][index] : '0'}</Text> */}
                  </View>
                </View>
              </View>

              <View style={{ width: hp('7%'), padding: 5, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 1, height: '90%', backgroundColor: 'rgba(210,210,208,1)' }} />
                <View style={{ flex: 1, padding: 2, alignItems: "center", }}>
                  <Text style={{ fontSize: 10, color: 'grey' }}> GPR </Text>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'grey' }}> {item.calResourceGpr} </Text>
                  </View>
                </View>
              </View>
            </View>)
          }
          }
          renderSectionHeader={({ section: { title } }) => (
            <View style={{ backgroundColor: 'white', paddingTop: 5 }}>
              <Text style={{ fontWeight: 'bold', marginLeft: 5 }}>{title}</Text>
            </View>
          )}
          sections={list}
          keyExtractor={(item, index) => item + index}
        />
      )

    }
  }







  showFullPic = (data) => {
    // console.log(data); 
    // alert(data)
    Navigation.push(this.props.componentId, {
      component: {
        name: 'FullPicture',
        passProps: {
          data: data
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
    });
  }

  render() {
    // console.log(this.state)
    // console.log(this.props)
    const { notifications } = this.state;
    const BadgedIcon = withBadge(notifications.count)(Icon);


    return (
      <SafeAreaView
        forceInset={{ bottom: 'always' }}
        style={styles.safeViewContainer}>
        <NavigationBarDefault
          bgColor={this.state.selectedThemeColor}
          imageSource={this.state.data.image ? { uri: "data:image/png;base64," + this.state.data.image } : require('../../assets/UserSmall.png')}
        >{this.state.data.username}</NavigationBarDefault>

        <View style={{ flex: 1, padding: 10 }}>
          <View style={{ flex: 1, borderRadius: 5, backgroundColor: 'white' }}>

            {/* header */}
            <TouchableOpacity onPress={() =>
              this.homeButtonTapped()
            }>
              <View style={{ height: 40, flexDirection: 'row', alignItems: 'center' }}>

                <Image source={require('../../assets/Profile/backGrey.png')} style={{ height: 20, width: 20, marginLeft: 10 }} />
                {/* <Text style={{ marginLeft: 20, color: 'grey' }} children='Leaders'></Text> */}
              </View>
            </TouchableOpacity>


            {/* seperater */}
            <View style={{ height: 1, backgroundColor: 'rgba(210,210,208,1)' }}>
            </View>

            <View style={{ flex: 1 }}>
              {this.renderComponent()}
            </View>
          </View>

        </View>



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


