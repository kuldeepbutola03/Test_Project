import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, Dimensions } from 'react-native';
import { normalize } from '../../../../Constant';
// import Video from 'react-native-video';
// import ParsedText from 'react-native-parsed-text';
import HashTag from '../../../components/UI/HashTag/HashTag';
import CustomButton from '../ButtonMod/CustomButtom';
import { MOBILE_NUMBER_ } from '../../../../Apis';

const caseCard = props => {

  // picture={data.picture}
  //             name={data.name}
  //             place={data.place}
  //             details={data.details}
  //             caseId={data.caseId}
  //             video={data.video}
  //             height_Image = {data.height_Image}
  //             width_Image = {data.width_Image}
  //             Is_Liked = {data.Is_Liked}
  let data = props.data;
  const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  } = Dimensions.get('window');
  var imageheight = data.height_Image ? data.height_Image : 1;
  var imagewidth = data.width_Image ? data.width_Image : 1;

  // "height_Image": 200,
  //           "width_Image": 157,
  imageheight = imageheight ? (imageheight > 0 ? imageheight : 1) : 1;
  imagewidth = imagewidth ? (imagewidth > 0 ? imagewidth : 1) : 1

  var height = (SCREEN_WIDTH * imageheight) / imagewidth;

  var imageLike = (data.Is_Liked === 1) ? require('../../../assets/ReportImages/likeSelected.png') : require('../../../assets/ReportImages/likeUnSelected.png');

  var LikingCount = data.LikingCount ? data.LikingCount : 0;
  var ReplyCount = data.ReplyCount ? data.ReplyCount : 0;


  return (
    <View style={style.container}>

      {/* header */}
      <View style={{ flexDirection: 'row' }}>

        <View style={{ flex: 2, alignItems: 'center' }}>
          <Image
            style={{
              //   marginLeft: normalize (10),
              width: normalize(40),
              height: normalize(40),
              marginTop: normalize(5),
              marginBottom: normalize(5),
              borderRadius: normalize(40) / 2,
            }}
            source={props.picture}
          // source={require('../../../assets/user.png')}
          />
        </View>

        <View style={{ flex: 7, justifyContent: 'center' }}>
          {/* <ParsedText
          style={styles.text}
          parse={
            [
              // {type: 'url',                       style: styles.url, onPress: this.handleUrlPress},
              // {type: 'phone',                     style: styles.phone, onPress: this.handlePhonePress},
              // {type: 'email',                     style: styles.email, onPress: this.handleEmailPress},
              // {pattern: /Bob|David/,              style: styles.name, onPress: this.handleNamePress},
              {pattern: /\[(@[^:]+):([^\]]+)\]/i, style: styles.username, onPress: this.handleNamePress, renderText: this.renderText},
              // {pattern: /42/,                     style: styles.magicNumber},
              {pattern: /#(\w+)/,                 style: styles.hashTag},
            ]
          }
          childrenProps={{allowFontScaling: false}} */}
          {/* <View
            style={{
              textAlign: 'left',
              marginLeft: 5,
              // fontSize: normalize (12),
              fontWeight: 'bold',
            }}
          > */}
          <HashTag style={{ justifyContent: 'center', marginLeft: 5 }}>
            {data.name}
          </HashTag>
          {/* </View> */}
          {/* <HashTag hashTagString = "a askbdasdb @sakdasbdksabd bsa #kuldeep #bbbb sadas #cccc kjsndksadajk"/> */}
          {/* </ParsedText> */}
          {/* <Text
            style={{
              textAlign: 'left',
              marginLeft: 5,
              fontSize: normalize(10),
            }}
          >
            {props.place}
          </Text> */}
        </View>

        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: normalize(12),
            }}
          >
            {data.place}
            {/* {props.caseId} */}
          </Text>
        </View>

      </View>

      {/* middle */}
      <View style={{}}>
        {data.details &&
          <HashTag
            style={{
              marginBottom: 5,
              marginLeft: 5,
              marginRight: 5,
              textAlign: 'justify',
            }}
          >
            {data.details}
          </HashTag>}
        {data.picture &&
          <Image
            resizeMode='stretch' //"contain"
            // source={require ('../../../assets/1.png')}
            source={data.picture}
            style={{ flex: 1, height: height, width: '100%' }}
          />}
      </View>

      {/* footer */}
      <View style={{ height: normalize(35), flexDirection: 'row' }}>
        {/* <View style={{ flex: 0.4 }}> */}

        <TouchableOpacity style={{ justifyContent: 'flex-end', alignItems: 'center', width: "25%", flexDirection: 'row' }} onPress={() => {
          if (MOBILE_NUMBER_ === data.Mobile_Number) {
            alert("You can not like your own post");
          } else {
            if (data.Is_Liked === 1) {
              props.onPressDisLike(data);
            } else {
              props.onPressLike(data);
            }
          }


        }}>
          <Text>{LikingCount}</Text>
          <Image
            resizeMode="contain"
            style={{ width: 22, height: 22, marginRight: 5, marginLeft: 8 }}
            source={imageLike}
          />
        </TouchableOpacity>

        <TouchableOpacity style={{ justifyContent: 'flex-end', alignItems: 'center', width: "25%", flexDirection: 'row' }} onPress={() => props.onPressReply(data)}>
          <Text>{ReplyCount}</Text>
          <Image
            resizeMode="contain"
            style={{ width: 22, height: 22, marginRight: 5, marginLeft: 8 }}
            source={require('../../../assets/ReportImages/reply.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity style={{ justifyContent: 'flex-end', alignItems: 'center', width: "25%", flexDirection: 'row', marginRight: 5 }} onPress={() => props.moreButtonTapped(data)}>
          <Text></Text>
          <Image
            resizeMode="contain"
            style={{ width: 22, height: 22, marginRight: 5, marginLeft: 8 }}
            source={require('../../../assets/ReportImages/more.png')}
          />
        </TouchableOpacity>


        {/* <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#C0C0C0',
              borderRadius: 10,
              margin: 10,
            }}
          >
            <Text style={{ textAlign: 'center', padding: 2 }}>Comments</Text>
          </TouchableOpacity>
        </View> */}
        {/* <View style={{}}><Text>sad sadsada </Text></View> */}
      </View>

    </View >
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 1,
    marginBottom: 0,
    backgroundColor: 'white',
  },
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  url: {
    color: 'red',
    textDecorationLine: 'underline',
  },

  email: {
    textDecorationLine: 'underline',
  },

  text: {
    color: 'black',
    fontSize: 15,
  },

  phone: {
    color: 'blue',
    textDecorationLine: 'underline',
  },

  name: {
    color: 'red',
  },

  username: {
    color: 'green',
    fontWeight: 'bold'
  },

  magicNumber: {
    fontSize: 42,
    color: 'pink',
  },

  hashTag: {
    fontStyle: 'italic',
  },

});

export default caseCard;


