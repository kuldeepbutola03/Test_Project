import React, { Component } from 'react';
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
import ProfileCardSlider from '../ProfileCardSlider/PorfileCardSlider';

class ProfileCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
  }
})

export default ProfileCard;


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
              height: normalize(30),
              width: normalize(30),
              backgroundColor: 'transparent',
            }}
            source={props.data.profileCompPic}
            resizeMode="cover"
          />
        </View>
        <View style={{ flex: 0.5 }}>
          <Text
            style={{
              marginTop: -6,
              marginLeft: 10,
              marginRight: 5,
              fontSize: normalize(12),
              fontWeight: 'bold',
            }}> TOTAL: {props.data.totalCount} </Text>
          
          <Text
            style={{
              marginTop: 0,
              marginLeft: 10,
              marginRight: 5,
              fontSize: normalize(12),
              fontWeight: 'bold',
            }}> UNIQUE: {props.data.uniqueCount}
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
        </View>
        
        {/* seperator view */}
        <View style={{height: 1, margin: 0}} backgroundColor="#B5B5B5" />
        {/* list View */}
        <View style={cardDetailsViewStyle.listView}>
          <FlatList
            data={props.data.data}
            keyExtractor={this._keyExtractor}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    </View>
