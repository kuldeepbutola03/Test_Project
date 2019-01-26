import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  Button,
  FlatList,
  PixelRatio,
} from 'react-native';
import CustomButton from '../ButtonMod/CustomButtom';
import ScoreView from './ScoreView';
import {Navigation} from 'react-native-navigation';
import {normalize} from '../../../../Constant';
// Navigation.push (this.props.componentId, {
//   component: {
//     name: 'FireDepartmentScreen',
//   },
//   options: {
//     topBar: {
//       visible: false,
//       drawBehind: true,
//       animate: false
//     }
//   }
// });

// homeButtonTapped = (props) => {
// alert('asdsadasad');
//     Navigation.pop(props.componentId);
// }

homeButton = props => {
  if (props.showHome) {
    return (
      <CustomButton
        style={{
          flexDirection: 'row',
          flex: 1,
        }}
        source={require ('../../../assets/home.png')}
        onPress={props.onPress}
      />
    );
  } else {
    return null;
  }
};

const menuButtons = props => {
  let flag = props.showHome;
return (

  <View style={props.style} backgroundColor={props.backgroundColor}>
    {/* //TopView */}
    <View
      style={cardViewStyle.headerView}
      backgroundColor="rgba(242,241,244,1)"
    >
      {flag && <View style={{flex: 1, backgroundColor: 'rgba(87,48,134,1)'}}>
        {homeButton (props)}
      </View>}
      <View style={cardViewStyle.textheaderView}>
        <Text adjustsFontSizeToFit numberOfLines={1} minimumFontScale={.8} style={cardViewStyle.textView}>{props.data.name}</Text>
        <Text style={cardViewStyle.textView2}>{props.data.area}</Text>
      </View>

    </View>

    {/* //bottomView */}
    <View style={cardBottomViewStyle.bottomView}>

      {/* first Half */}
      <View style={cardBottomViewStyle.profileView}>

        <View style={{flex: 0.5}}>
          <Image
            style={{
              flex: 1,
              margin: 10,
              height: null,
              width: null,
              borderRadius: 5,
            }}


            source={props.data.profilePic}
            resizeMode="cover"
          />
          <Image
            style={{
              position: 'absolute',
              bottom: 10 + 5,
              right: 15,
              // // borderRight: 10,
              // // marginVertical: 10,
              // // padding : 10,
              height: normalize(30),
              width: normalize(30),
              backgroundColor: 'transparent',
            }}
            source={props.data.profileCompPic}
            resizeMode="cover"
          />
        </View>

        <View
          style={{
            flex: 0.5,
            // backgroundColor : 'red'
            // alignContent : 'center'
          }}
        >
          <Text
            style={{
              marginTop: -6,
              marginLeft: 10,
              marginRight: 5,
              // margin: 5
              fontSize: normalize(12),
              fontWeight: 'bold',
              //   textAlign : 'center'
            }}
          >
            TOTAL: {props.data.totalCount}
          </Text>
          <Text
            style={{
              marginTop: 0,
              marginLeft: 10,
              marginRight: 5,
              fontSize: normalize(12),
              fontWeight: 'bold',
              //   textAlign : 'center'
            }}
          >
            UNIQUE: {props.data.uniqueCount}
          </Text>
        </View>
      </View>

      {/* second Half */}
      <View style={cardBottomViewStyle.profileDetails}>

        {/* score View */}
        <View style={cardDetailsViewStyle.detailsProfileLogo}>
          <ScoreView
            style={ratingView.scoreViewStyle}
            text={[props.data.score.gpr.name, props.data.score.gpr.score]}
            backgroundColor="#279FC4"
          />
          <ScoreView
            style={ratingView.scoreViewStyle}
            text={[props.data.score.agpr.name, props.data.score.agpr.score]}
            backgroundColor="#FAA21B"
          />
          <ScoreView
            style={ratingView.scoreViewStyle}
            text={[
              props.data.score.extraCount.name,
              props.data.score.extraCount.score,
            ]}
            backgroundColor="#9D3995"
          />
          <View style={ratingView.scoreViewStyle} pointerEvents={props.pointerEvents}>

            <CustomButton
              style={{flex: 1, flexDirection: 'row' }}
              source={props.isLiked == 1 ? require ('../../../assets/Flags/RedFlag.png') : require ('../../../assets/Flags/RedFlagLight.png')}
              onPress = {props.onPressLike}
            />

            <CustomButton
              style={{flex: 1, flexDirection: 'row' }}
              source={props.isLiked == 2 ? require ('../../../assets/Flags/blueFlag.png') : require ('../../../assets/Flags/blueFlagLight.png')}
              onPress = {props.onPressDislike}
              
            />

          </View>
        </View>

        {/* seperator view */}
        <View style={{height: 1, margin: 0}} backgroundColor="#B5B5B5" />

        {/* list View */}
        <View style={cardDetailsViewStyle.listView}>
          <FlatList
            data={props.data.data}
            renderItem={({item, index}) => (
              <View
                style={{
                  flex: 1,
                  padding: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={
                    index == 0 ? listTitleStyle.headerView : listTitleStyle.view
                  }
                >
                  {item.attributeName}
                </Text>
                <Text
                  style={
                    index == 0 ? listTitleStyle.headerView : listTitleStyle.view
                  }
                >
                  {item.attributeValue}
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </View>

  </View>);
};

const cardViewStyle = StyleSheet.create ({
  headerView: {
    flex: 0.15,
    // position: 'absolute',
    // backgroundColor: 'red',
    // backgroundColor: 'rgba(244,244,246,1)',
    justifyContent: 'center',
    // alignItems: 'center'
    // borderRadius: 10,
    flexDirection: 'row',
    // height: '20%',
  },

  textheaderView: {
    flex: 5,
    // position: 'absolute',
    // backgroundColor: 'red',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    // alignItems: 'center'
    // borderRadius: 10,
    // height: 50
    // marginLeft : 0,
  },
  buttonContainer: {
    // flex : 1,
    justifyContent: 'center',
    alignItems: 'center',
    // margin : 0,
    backgroundColor: 'transparent',
    width: 50,
  },

  textView: {
    // flex: 1,
    // position: 'absolute',
    backgroundColor: 'transparent',
    marginLeft: 10,
    fontSize : normalize(13),
    // fontSize: PixelRatio.get () <= 2 ? 14 : 15,
    //   fontWeight: 'bold',
  },
  textView2: {
    // flex: 1,
    // position: 'absolute',
    backgroundColor: 'transparent',
    marginLeft: 10,
    fontSize : normalize(12),
    // fontSize: PixelRatio.get () <= 2 ? 12 : 13,
    //   fontWeight: 'bold',
  },
});
const cardBottomViewStyle = StyleSheet.create ({
  bottomView: {
    flex: 0.85,
    // position: 'absolute',
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  profileView: {
    flex: 0.35,
    // position: 'absolute',
    backgroundColor: 'transparent',
  },
  profileDetails: {
    flex: 0.65,
    // position: 'absolute',
    backgroundColor: 'transparent',
  },
});

const cardDetailsViewStyle = StyleSheet.create ({
  detailsProfileLogo: {
    flex: 0.35,
    // position: 'absolute',
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  listView: {
    flex: 0.65,
    padding: 5,
    // position: 'absolute',
    backgroundColor: 'transparent',
  },
});

const ratingView = StyleSheet.create ({
  detailsProfileLogo: {
    flex: 1,
    // position: 'absolute',
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  listView: {
    flex: 1,
    // position: 'absolute',
    backgroundColor: 'transparent',
  },
  scoreViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    // height : 100,
    // width: 100//(Dimensions.get('window').width )/8
    // margin : 0
  },
});

const listTitleStyle = StyleSheet.create ({
  headerView: {
    flex: 1,
    fontSize: normalize(12),
    fontWeight: '600',
    marginRight: 20,
  },
  view: {
    flex: 1,
    // margin : 10,
    fontSize: normalize(12),
    // fontWeight: 'bold',
  },
});

export default menuButtons;
