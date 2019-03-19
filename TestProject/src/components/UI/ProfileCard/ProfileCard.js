import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableHighlight,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
  Image,
  TouchableOpacity,

} from 'react-native';
import { Avatar, Divider } from 'react-native-elements';
import CustomButton from '../ButtonMod/CustomButtom';
import ScoreView from './ScoreView';
import { normalize, APP_GLOBAL_COLOR, APP_ALERT_MESSAGE } from '../../../../Constant';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';
import axios from 'axios';
import { GPR_FLAG } from '../../../../Apis';

homeButton = props => {
  if (props.showHome) {
    return (
      <CustomButton
        style={{
          flexDirection: 'row',
          flex: 1,
        }}
        source={require('../../../assets/homez.png')}
        onPress={props.onPress}
      />
    );
  } else {
    return null;
  }
};


class menuButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 0,
      submitted: false,
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  submitRating = () => {
    this.setState({ loading: true });
    const { userId, location, resourceId } = this.props.data;
    const { isFlagEnabled, resourceType } = this.props;
    const { starCount, submitted } = this.state;

    if (isFlagEnabled === 'Y' && submitted === false) {
      axios.post(GPR_FLAG, {
        userLocationCoord: location,
        resourceMaster:
        {
          resourceId: resourceId
        },
        userMaster:
        {
          userId: userId
        },
        flagValue: starCount,
        customAreaId: this.props.customAreaId
      })
        .then(response => {
          // console.log(response.data);
          Alert.alert(
            APP_ALERT_MESSAGE,
            'Thanks for your Rating!',
            [
              { text: 'OK', onPress: () => { } },
            ],
            { cancelable: false },
          );
          console.log(response.data)
          let responseData = response.data;
          this.props.updateResources({
            resourceType: resourceType,
            resourceGPR: responseData.resourceGPR,
            rtnGprI: responseData.rtnGprI,
            rtnGprO: responseData.rtnGprO,
            totalFlagCount: responseData.totalFlagCount,
            totalFlagUniqueCount: responseData.totalFlagUniqueCount,
          })
          this.setState({ loading: false, submitted: true });
        })
        .catch(error => {
          console.error(error);
          this.setState({ loading: false, submitted: false });
        })
    } else {
      alert("You have already sent a feedback");
      this.setState({ loading: false })
    }


  }

  _keyExtractor = (item, index) => index + "abc";

  renderItem = ({ item, index }) => {
    if (index === 0) {
      return null;
    } else {
      return (
        <View
          style={{
            flex: 1,
            padding: 5,
            marginHorizontal: normalize(13),
            width: '100%'
          }}>
          <View>
            <Text
              style={
                index == 0 ? listTitleStyle.headerView : listTitleStyle.view
              }
            >
              {item.attributeName}
            </Text>
          </View>
        </View>
      )
    }
  }

  renderItem2 = ({ item, index }) => {
    if (index === 0) {
      return null;
    } else {
      return (
        <View
          style={{
            flex: 1,
            padding: 5,
            marginHorizontal: normalize(13),
            width: '100%'
          }}>
          <View style={{}}>
            <Text
              style={
                index == 0 ? listTitleStyle.headerView : listTitleStyle.view
              }
            >
              {item.attributeValue}
            </Text>
          </View>
        </View>
      )
    }
  }
  renderItem3 = ({ item, index }) => {
    if (index === 0) {
      return null;
    } else {
      return (
        <View
          style={{
            flex: 1,
            padding: 5,
            marginHorizontal: normalize(13),
            width: '100%',
            flexDirection : 'row'
          }}>
          <View style={{ flex: 1, width: '50%', marginRight: normalize(4) }}>
            <Text
              style={
                index == 0 ? listTitleStyle.headerView : listTitleStyle.view
              }
            >
              {item.attributeName}
            </Text>
          </View>
          <View style={{ flex: 1, width: '50%', marginRight: normalize(4), justifyContent: 'flex-end' }}>
            <Text
              style={
                index == 0 ? listTitleStyle.headerView : listTitleStyle.view
              }
            > 
              {item.attributeValue}
            </Text>
          </View>
        </View>
      )
    }
  }

  renderSubmitIcon = () => {
    const { isFlagEnabled } = this.props;
    if (isFlagEnabled === 'Y' && this.state.submitted === false) {
      return (
        <TouchableHighlight onPress={() => this.submitRating()}>
          <FontAwesome name="check-circle" size={25} color="green" />
        </TouchableHighlight>
      )
    } else {
      return (
        <TouchableWithoutFeedback onPress={() => { }}>
          <FontAwesome name="check-circle" size={25} color="#999" />
        </TouchableWithoutFeedback>
      )
    }
  }

  render() {
    console.log(this.props)

    // alert(JSON.stringify(this.props.data.data));
    let flag = this.props.showHome;
    const { loading } = this.state;
    return (
      <View style={this.props.style} backgroundColor={this.props.backgroundColor}>
        {/* //TopView */}
        {/* <View
            // style={cardViewStyle.headerView}
            backgroundColor="rgba(242,241,244,1)"
          >
            {flag && <View style={{flex: 1, backgroundColor: APP_GLOBAL_COLOR}}>
              {homeButton (this.props)}
          </View> */}
        {/* } */}
        {/* <View style={cardViewStyle.textheaderView}> */}
        {/* <Text adjustsFontSizeToFit numberOfLines={1} minimumFontScale={.8} style={cardViewStyle.textView}>{this.props.data.name}</Text> */}
        {/* <Text style={cardViewStyle.textView2}>{this.props.data.area === "PDM | null" ? "PDM" : this.props.data.area}</Text> */}
        {/* </View> */}
        {/* </View> */}
        <View style={{ flex: 1 }}>
          <View style={[styles.row, styles.firstRow]}>
            <View style={styles.scoreRatingContainer}>

              <View style={{}}>
                <Text adjustsFontSizeToFit numberOfLines={1} minimumFontScale={.8} style={cardViewStyle.textView}>{this.props.data.name}</Text>
                {/* <Text style={cardViewStyle.textView2}>{this.props.data.area === "PDM | null" ? "PDM" : this.props.data.area}</Text> */}
                <Text style={cardViewStyle.textView2}>{this.props.data.area.includes("null") ? this.props.data.area.replace(/null/g, "").replace("|", "") : this.props.data.area}</Text>
                {/* <Text style={cardViewStyle.textView2}>{"null | null".replace ("null", "").replace("|", "")}</Text> */}
              </View>

              <View style={styles.scoreViewContainer}>
                <ScoreView
                  style={ratingView.scoreViewStyle}
                  text={[this.props.data.score.gpr.name, this.props.resourceGPR]}
                  backgroundColor="#1d5270"
                  bottomText={false}
                />
                <ScoreView
                  style={ratingView.scoreViewStyle}
                  text={[this.props.data.score.agpr.name, this.props.rtnGprI]}
                  backgroundColor="#cc6633"
                  bottomText={false}
                />
                <ScoreView
                  style={ratingView.scoreViewStyle}
                  text={[
                    this.props.data.score.extraCount.name,
                    this.props.rtnGprO
                  ]}
                  backgroundColor="#630460"
                  bottomText={false}
                />
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 5 }}>

                <View style={{ flexDirection: 'row', flex: 1 }} backgroundColor="transparent" >
                  <Image source={require("../../../assets/flagIn.png")} resizeMode="cover" style={{ height: 20, width: 25, marginTop: 6 }} />
                  <Text
                    style={{
                      marginTop: 8,
                      // marginHorizontal: 20,
                      marginRight: 30,
                      marginLeft: 5,
                      fontSize: normalize(11.5),
                      fontWeight: 'bold',
                    }}> : {this.props.totalFlagCount}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', flex: 1 }} backgroundColor="transparent" >

                  <Image source={require("../../../assets/earth.png")} resizeMode="contain" style={{ height: 20, width: 25, marginTop: 6 }} />
                  <Text
                    style={{
                      marginTop: 8,
                      // marginHorizontal: 5,
                      marginRight: 5,
                      marginLeft: 5,
                      fontSize: normalize(11.5),
                      fontWeight: 'bold',
                    }}> : {this.props.totalFlagUniqueCount}
                  </Text>
                </View>
              </View>
            </View>

            {/* <View height={1} style={{ borderTopColor: '#999', borderTopWidth: 1, width: '100%' }} /> */}

            <View style={{ flex: 0.40, position: 'relative', alignItems: 'center' }}>
              <View style={{}}>
                <Avatar
                  rounded
                  imageProps={{ resizeMode: 'cover' }}
                  size={normalize(80)}
                  containerStyle={{ marginVertical: 8 }}
                  source={this.props.data.profilePic}
                />
                <Avatar
                  rounded
                  containerStyle={{
                    position: 'absolute',
                    bottom: 15,
                    left: 0,
                  }}
                  overlayContainerStyle={{
                    backgroundColor: '#fff'
                  }}
                  size={normalize(25)}
                  source={this.props.data.profileCompPic}
                  imageProps={{ resizeMode: 'contain' }}
                />
              </View>
              <View style={styles.ratingContainer}>
                <StarRating
                  disabled={this.props.isFlagEnabled === 'Y' || this.state.submitted === false ? false : true}
                  maxStars={5}
                  rating={this.state.starCount}
                  fullStarColor={'#FAA21B'}
                  starSize={25}
                  selectedStar={(rating) => this.onStarRatingPress(rating)}
                />
                {loading ?
                  <View style={{ marginTop: normalize(3) }}>
                    <ActivityIndicator size="small" color={APP_GLOBAL_COLOR} />
                  </View> :
                  <View>
                    {this.renderSubmitIcon()}
                  </View>
                }
              </View>
            </View>

          </View>
          <Divider />
          <View style={[styles.row, styles.thirdRow]}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1, width: '50%', marginRight: normalize(4) }}>
                {/* <FlatList
                  data={this.props.data.data}
                  keyExtractor={this._keyExtractor}
                  renderItem={this.renderItem}
                  showsVerticalScrollIndicator={false}
                /> */}
              </View>
              <View style={{ height: '100%', width: 1, backgroundColor: '#ddd' }} />
              <View style={{ flex: 1, width: '50%', marginRight: normalize(4), justifyContent: 'flex-end' }}>
                {/* <FlatList
                  data={this.props.data.data}
                  keyExtractor={this._keyExtractor}
                  renderItem={this.renderItem2}
                  showsVerticalScrollIndicator={false}  
                /> */}  
              </View>
              <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                <FlatList
                  data={this.props.data.data}
                  keyExtractor={this._keyExtractor}
                  renderItem={this.renderItem3}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>
          </View>
        </View>
        {this.props.onPressInfo && <TouchableOpacity style={{ position: 'absolute', right: 0, top: 0, height: 50, width: 50, backgroundColor: 'clear', alignItems: 'center', justifyContent: 'center' }} onPress={this.props.onPressInfo}>
          <View style={{ alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: 13, backgroundColor: APP_GLOBAL_COLOR }}>
            <Text style={{ fontSize: normalize(12), fontWeight: 'bold', color: 'white' }}>i</Text>
          </View>
        </TouchableOpacity>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    // flex: 1,
    marginVertical: normalize(5),
    backgroundColor: '#fff'
  },

  firstRow: {
    flex: 0.50,
    flexDirection: 'row',
  },

  secondRow: {
    flexDirection: 'row',
    flex: 2
  },

  thirdRow: {
    flexDirection: 'row',
    flex: 0.50,
  },

  scoreRatingContainer: {
    flex: 0.60,
    // justifyContent: 'center'
    justifyContent: 'space-around'
  },

  scoreViewContainer: {
    // flex: 1, 
    flexDirection: 'row',
    marginVertical: 4
    // justifyContent: 'space-around', 
    // alignItems: 'center', 
    // marginTop: normalize(10)
  },

  ratingContainer: {
    flex: 1,
    marginHorizontal: normalize(8),
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})

const cardViewStyle = StyleSheet.create({
  headerView: {
    flex: 0.15,
    justifyContent: 'center',
    flexDirection: 'row',
  },

  textheaderView: {
    flex: 5,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: 50,
  },

  textView: {
    backgroundColor: 'transparent',
    // marginLeft: normalize(13),
    fontSize: normalize(18),
    // marginBottom: normalize(5)
    paddingBottom: 5,
    paddingLeft: 5
  },
  textView2: {
    backgroundColor: 'transparent',
    // marginLeft: normalize(13),
    fontSize: normalize(12),
    // marginBottom: normalize(10)
    paddingBottom: 5,
    paddingLeft: 5
  },
});

const cardBottomViewStyle = StyleSheet.create({
  bottomView: {
    flex: 0.85,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  profileView: {
    flex: 0.35,
    backgroundColor: 'transparent',
  },
  profileDetails: {
    flex: 0.65,
    backgroundColor: 'transparent',
  },
});

const cardDetailsViewStyle = StyleSheet.create({
  detailsProfileLogo: {
    flex: 0.35,
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

const ratingView = StyleSheet.create({
  detailsProfileLogo: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  listView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scoreViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

const listTitleStyle = StyleSheet.create({
  headerView: {
    flex: 1,
    fontSize: normalize(12),
    fontWeight: '600',
    marginRight: 20,
  },
  view: {
    flex: 1,
    fontSize: normalize(12),
    paddingRight: normalize(7)
  },
});

export default menuButtons;
