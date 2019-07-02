import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, Dimensions } from 'react-native';
import { normalize } from '../../../../Constant';
// import Video from 'react-native-video';
// import ParsedText from 'react-native-parsed-text';
import HashTag from '../../../components/UI/HashTag/HashTag';
import CustomButton from '../ButtonMod/CustomButtom';
import { MOBILE_NUMBER_ } from '../../../../Apis';

import FastImage from 'react-native-fast-image';
import moment from 'moment';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
const caseCard = props => {
  //             picture={data.picture}
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
  // "width_Image": 157,
  imageheight = imageheight ? (imageheight > 0 ? imageheight : 1) : 1;
  imagewidth = imagewidth ? (imagewidth > 0 ? imagewidth : 1) : 1;

  let isOp = (data.isOP === 'Y');
  // var height = ((SCREEN_WIDTH - (isOp ? 0 : normalize(80))) * imageheight) / imagewidth;
  var height = imageheight > imagewidth ? imagewidth : imageheight;

  var imageLike = (data.Is_Liked === 1) ? require('../../../assets/ReportImages/likeSelected.png') : require('../../../assets/ReportImages/likeUnSelected.png');

  var LikingCount = data.LikingCount ? data.LikingCount : 0;
  var ReplyCount = data.ReplyCount ? data.ReplyCount : 0;

  let picture = data.picture ? { ...data.picture, priority: FastImage.priority.normal } : require('../../../assets/Profile/Guest_.png');
  let userPicture = data.userThumbnailImageData ? { uri: "data:image/png;base64," + data.userThumbnailImageData, priority: FastImage.priority.normal } : require('../../../assets/Profile/Guest_.png');

  let updatedDate = moment(data.timestamp, 'DD-MM-YYYY hh:mm:ss').fromNow();
  // "20-06-2019 11:31:26",
  // data.userThumbnailImageData
  return (
    <View style={style.container}>
      <View style={style.container2}>

        {/* header */}
        <View style={{ flexDirection: 'row' }}>

          <View style={{ marginLeft: (isOp ? 0 : 40), width: hp('5%'), alignItems: 'center' }}>
            <FastImage
              style={{
                // marginRight: normalize(10),
                width: hp('4%'),// normalize(40),
                height: hp('4%'),// normalize(40),
                marginTop: normalize(5),
                marginBottom: normalize(5),
                borderRadius: hp('4%') / 2,// normalize(40) / 2,
              }}
              source={userPicture}
            // source={require('../../../assets/user.png')}
            />

          </View>

          <View style={{ flex: 7, justifyContent: 'center' }}>

            <View style={{ margin: 0, flexDirection: 'row' }}>
              <HashTag style={{ flex: 1, marginTop: 5, marginLeft: 6, marginRight: 6, fontSize: normalize(14) }}>
                {data.name}
              </HashTag>
              <Text style={{ alignSelf: 'center', marginRight: 0, fontSize: 10, color: 'grey' }}> {updatedDate} </Text>
            </View>
            <Text
              style={{
                marginTop: 0,
                // textAlign: 'left',
                marginLeft: 6,
                fontSize: normalize(9),
                color: 'grey'
              }}
            // textSize = {normalize(9)}
            >
              {data.place}
            </Text>
            {data.details &&
              <HashTag
                style={{
                  paddingBottom: 1,
                  marginTop: 2,
                  marginLeft: 5,
                  marginRight: 6,

                  // backgroundColor : 'green'
                  // textAlign: 'justify',
                  fontSize: normalize(10)
                }}
              // textSize = {normalize(10)}
              >
                {data.details}
              </HashTag>}
            {/* </View> */}
            {/* <HashTag hashTagString = "a askbdasdb @sakdasbdksabd bsa #kuldeep #bbbb sadas #cccc kjsndksadajk"/> */}
            {/* </ParsedText> */}



            {data.picture &&
              <View style={{ marginTop: 10 }}>
                <TouchableOpacity onPress={() => props.showFullPic(data.picture)}>
                  <FastImage
                    resizeMode='cover'// 'center' //"contain"
                    // source={require ('../../../assets/1.png')}
                    source={{ ...data.picture, priority: FastImage.priority.normal }}
                    style={{ flex: 1, height: null, width: '90%', aspectRatio: 2, backgroundColor: 'black' }}

                  /></TouchableOpacity>
              </View>
            }


            {/* likedislike */}
            <View style={{ width: '100%', height: normalize(35), flexDirection: 'row' }}>

              <TouchableOpacity style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginLeft: 0 }} onPress={() => {
                // if (MOBILE_NUMBER_ === data.Mobile_Number) {
                //   alert("You can not like your own post");
                // } else {
                //   if (data.Is_Liked === 1) {
                //     props.onPressDisLike(data);
                //   } else {
                //     props.onPressLike(data);
                //   }
                // }
                if (data.Is_Liked === 1) {
                  props.onPressDisLike(data);
                } else {
                  props.onPressLike(data);
                }
              }}>
                <Image
                  resizeMode="contain"
                  style={{ width: 15, height: 15, marginRight: 3, marginLeft: 8 }}
                  source={imageLike}
                />
                <Text style={{ fontSize: 12 }}>{LikingCount}</Text>

              </TouchableOpacity>

              {isOp && <TouchableOpacity style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginLeft: 20 }} onPress={() => props.onPressReply(data)}>
                <Image
                  resizeMode="contain"
                  style={{ width: 15, height: 15, marginRight: 3, marginLeft: 4 }}
                  source={require('../../../assets/ReportImages/reply.png')}
                />
                <Text style={{ fontSize: 12 }}>{ReplyCount}</Text>

              </TouchableOpacity>
              }

              <TouchableOpacity style={{ position: 'absolute', justifyContent: 'flex-end', alignItems: 'center', top: 0, bottom: 0, width: 50, flexDirection: 'row', right: 0 }} onPress={() => props.moreButtonTapped(data)}>

                <Image
                  resizeMode="contain"
                  style={{ width: 22, height: 22, marginRight: 5, marginLeft: 8 }}
                  source={require('../../../assets/ReportImages/more.png')}
                />
              </TouchableOpacity>

            </View>

            {/* <View style={{ flex: 1, height: 10 }} /> */}
          </View>



        </View>

        {/* middle */}
        {/* <View style={{ marginLeft: (isOp ? 0 : normalize(80)) }}>

        {data.picture &&
          <TouchableOpacity onPress={() => props.showFullPic(data.picture)}>
            <FastImage
              resizeMode='cover'// 'center' //"contain"
              // source={require ('../../../assets/1.png')}
              source={{ ...data.picture, priority: FastImage.priority.normal }}
              style={{ flex: 1, height: null, width: '100%', aspectRatio: 2, backgroundColor: 'black' }}

            /></TouchableOpacity>}
      </View> */}

        {/* footer */}

      </View >
    </View >
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 1,
    // marginBottom: 0,
    backgroundColor: 'transparent',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 3,
    // backgroundColor : 'grey'
  },
  container2: {
    flex: 1,
    marginBottom : 2,
    // marginBottom: 0,
    backgroundColor: 'white',
    borderRadius: 5
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


