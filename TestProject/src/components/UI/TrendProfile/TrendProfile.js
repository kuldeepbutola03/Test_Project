import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  ScrollView,
  FlatList,
} from 'react-native';
import {normalize} from '../../../../Constant';
import CustomButton from '../ButtonMod/CustomButtom';
import UserCard from '../UserCard/UserCard';
import UserCardBase64 from '../UserCardBase64/UserCardBase64';
import Graph from '../Graph/Graph';
import Spinner from '../Spinner/Spinner';

export default (trendProfile = props => {

  _keyExtractor = (item, index) => index + "abc";
  console.log(props.data.data)
  return (
    <View style={props.style} backgroundColor={props.backgroundColor}>
      {/* //TopView */}
      <View
        style={topViewStyle.headerView}
        backgroundColor="rgba(242,241,244,1)"
      >
        <View style={{flex: 1, backgroundColor: 'rgba(87,48,134,1)'}}>
          <CustomButton
            style={{
              flexDirection: 'row',
              flex: 1,
            }}
            source={require ('../../../assets/homez.png')}
            onPress={props.onPress}
          />
        </View>

        <View style={topViewStyle.textheaderView}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            minimumFontScale={0.8}
            style={topViewStyle.textView}
          >
            {props.data.name}
          </Text>
            <Text style={topViewStyle.textView2}>{props.data.area}</Text>
        </View>

      </View>
      {/* secondViewStyle */}
        <View style={secondViewStyle.secondView}>
          <View style={secondInnerViewStyle.firstView}>
            <UserCard
              onPress={props.onPressProfile}
              style={secondInnerViewStyle.firstView_P1}
              borderRadius={normalize (15)}
              gpr={-10}
              gprColor="yellow"
              image = {props.image}
              catImage = {props.catImage}
            />
            <View style={secondInnerViewStyle.firstView_P2}>
              <View
                style={{
                  // position: 'absolute',
                  // bottom: 10 ,
                  // left: 10,
                  // // borderRight: 10,
                  // // marginVertical: 10,
                  // // padding : 10,
                  height: normalize (Dimensions.get ('window').width / 4),
                  width: normalize (Dimensions.get ('window').width / 4),
                  backgroundColor: 'rgba(87,48,134,1)',
                  borderRadius: normalize (Dimensions.get ('window').width / 4) /
                    2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontSize: normalize (20),
                    fontWeight: '600',
                  }}
                >
                  67%
                </Text>
              </View>
            </View>
          </View>
          {/* graph View */}
          <View style={secondInnerViewStyle.secondView}>
            <Graph
              header={false}
              footer
              timeAxis={props.timeFrame['6 Months']}
              percentage={props.percentage['6 Months']}
              totalCount={props.data.totalCount}
              uniqueCount={props.data.uniqueCount}
            />
          </View>

          <View style={secondInnerViewStyle.thirdView}>
            <FlatList
              horizontal={true}
              keyExtractor={this._keyExtractor}
            //   data={[
            //     {key: 50 , image : require('../../../assets/Extra/people4.png') , title : "Ascham Roger" , subTitle : "R.Type"}, 
            //     {key: 44 , image : require('../../../assets/Extra/people5.png') , title : "Harper Mila" , subTitle : "R.Type"}, 
            //     {key: 32 , image : require('../../../assets/Extra/people6.png') , title : "William" , subTitle : "R.Type"}, 
            //     {key: 15 , image : require('../../../assets/Extra/people7.png') , title : "Charlotte" , subTitle : "R.Type"}
            // ]}
            data={props.data.data}
              renderItem={({item, index}) => (
                <View
                  style={{
                    height: '100%',
                    width: Dimensions.get ('window').width / 3 - 6 / 3,
                  }}
                >
                  <UserCardBase64
                    onPress={props.onPressProfile}
                    style={{flex: 1, paddingLeft: 6}}
                    borderRadius={normalize (10)}
                    gpr={item.resourceGPR}
                    gprColor="red"
                    image = {item.resourceImageData}
                    catImage={item.resourceCategoryLogoData}
                  />
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text
                      adjustsFontSizeToFit
                      numberOfLines={1}
                      minimumFontScale={0.8}
                      style={{fontSize: normalize (11)}}
                    >
                      {item.resourceName}
                    </Text>
                    <Text
                      adjustsFontSizeToFit
                      numberOfLines={1}
                      minimumFontScale={0.8}
                      style={{fontSize: normalize (10)}}
                    >
                      {item.resourceType}
                    </Text>
                  </View>

                </View>
              )}
            />
          </View>
        </View>
      </View>
  );
});

const topViewStyle = StyleSheet.create ({
  headerView: {
    flex: 0.075,
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

  textView: {
    // flex: 1,
    // position: 'absolute',
    backgroundColor: 'transparent',
    marginLeft: 10,
    fontSize: normalize (13),
    // fontSize: PixelRatio.get () <= 2 ? 14 : 15,
    //   fontWeight: 'bold',
  },
  textView2: {
    // flex: 1,
    // position: 'absolute',
    backgroundColor: 'transparent',
    marginLeft: 10,
    fontSize: normalize (12),
    // fontSize: PixelRatio.get () <= 2 ? 12 : 13,
    //   fontWeight: 'bold',
  },
});

const secondViewStyle = StyleSheet.create ({
  secondView: {
    flex: 0.925,
    // position: 'absolute',
    backgroundColor: 'transparent',
    // flexDirection: 'row',
  },
});

const secondInnerViewStyle = StyleSheet.create ({
  firstView: {
    // flex: 0.925,
    // position: 'absolute',

    height: Dimensions.get ('window').width / 2,

    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  secondView: {
    flex: 2,
    // position: 'absolute',
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  thirdView: {
    flex: 1,
    height: Dimensions.get ('window').width / 3,
    // position: 'absolute',
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },

  firstView_P1: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 5,
  },
  firstView_P2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
