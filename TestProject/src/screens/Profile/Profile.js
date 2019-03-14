import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Keyboard
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
// import ImagePicker from 'react-native-image-crop-picker';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import ButtonMod from '../../components/UI/ButtonMod/ButtonMod';
import EditButton from '../../components/UI/EditButton/EditButton';
import { Navigation } from 'react-native-navigation';
import { PropTypes } from 'prop-types';
import { saveUserData, defaultUser, authHeaders, getUserID } from '../../../Constant';
import { UPDATE_USER } from '../../../Apis';
import Share, { ShareSheet, Button } from 'react-native-share';
import Loading from 'react-native-whc-loading';

export default class Profile extends Component {

  static propTypes = {
    componentId: PropTypes.string,
  };

  constructor(props) {
    super(props);

    // alert(this.props.userId);
    this.state = {
      image: this.props.image,
      name: this.props.name ? this.props.name : "",
      email: this.props.email ? this.props.email : "",
      username: this.props.username ? this.props.username : "",
      selectedAgeGroupCode: this.props.selectedAgeGroupCode ? this.props.selectedAgeGroupCode : "",
      gender: this.props.gender ? this.props.gender : "",
      userId: this.props.userId,
      description: this.props.description ? this.props.description : "",
      editable: !(this.props.username && this.props.username.length > 0),
      visible: false,
      visibleGender: false
    }
  }

  componentDidMount() {
    // alert(this.props.username);

    // if (this.props.username && this.props.username.length > 0) {
    //   this.setState({
    //     editable: false
    //   });
    // }


    // getUserID((user_id) => {
    //   alert(user_id);
    // })
    // alert(JSON.stringify(this.props))
  }


  toHomeScreen = () => {

    const { name, username } = this.state;
    console.log(this.state.image)
    let usernameRegex = /^[a-zA-Z0-9]+$/;

    let validUsername = username.match(usernameRegex);

    if (name.length < 1) {
      alert('Please fill in your name');
      return;
    } else if (username.length < 1) {
      alert('Please fill in your username');
      return
    } else if (!validUsername) {
      alert('Your handle can only contain alphabets and numbers');
    } else {
      // saveUserData(this.state);
      this.updateDetails();
    }
  }

  /**
   * The first arg is the options object for customization (it can also be null or omitted for default options),
   * The second arg is the callback which sends object: response (more info in the API Reference)
   */
  imagePicker = () => {

    ImagePicker.showImagePicker({ title: 'Select an Image', quality: 0.3, allowsEditing: false }, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        alert(JSON.stringify(response.error))

        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response.data;

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // console.log(source)

        this.setState({
          image: source,
        });
      }
    });
    // ImagePicker.openCamera({
    //   multiple: true
    // }).then(image => {
    //   console.log(image);
    // });

  };

  updateDetails = () => {

    this.refs.loading.show();

    let imgName = "IMG" + (+new Date());

    let body = {};

    if (!this.state.editable) {

      body = JSON.stringify({
        userId: this.state.userId,
        userImageData: this.state.image,
        userImageName: imgName,
        userFirstName: this.state.name,
        // userGender: this.state.gender,
        // userAgeGroup: this.state.ageGroup,
        // userDesciption: this.state.description
      });
      // alert(body);

    } else {

      body = JSON.stringify({
        userId: this.state.userId,
        userName: this.state.username,
        userImageData: this.state.image,
        userImageName: imgName,
        userFirstName: this.state.name,
        // userGender: this.state.gender,
        // userAgeGroup: this.state.ageGroup,
        // userDesciption: this.state.description
      });
    }
    // alert(body);

    fetch(UPDATE_USER, {
      method: 'POST',
      headers: authHeaders(),
      body: body,
    }).then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        // alert(JSON.stringify(responseJson));
        saveUserData(this.state);

        this.refs.loading.close();

        // Navigation.push(this.props.componentId, {
        //   component: {
        //     id: "HomeScreen",
        //     name: 'HomeScreen',
        //     passProps: {
        //       data: this.state
        //     },
        //     options: {
        //       topBar: {
        //         visible: false,
        //         drawBehind: true,
        //         animate: false,
        //       },
        //       popGesture: false
        //     },
        //     sideMenu: {
        //       enabled: false,
        //       visible: false
        //     }
        //   }
        // });

        Navigation.setRoot ({
          root: {
            stack: {
              children: [
                {
                  component: {
                    id: "HomeScreen", // Optional, Auto generated if empty
                    name: "HomeScreen",
                    options: {
                      topBar: {
                        visible:false,
                          drawBehind:true,
                          animate:false
                      },
                      popGesture:false
                    },
                    passProps:{
                      data : this.state
                    },
                    
                    sideMenu:{
                      enabled : false,
                      visible: false
                    }
                    
                  },
                },
              ],
            },
          },
        });

      })
      .catch((error) => {
        console.error(error);
        // alert("Please try again !");
        this.refs.loading.close();
        // alert("Some Error Occured !");
      });

  }

  onCancel() {
    // console.log("CANCEL")
    this.setState({ visible: false });
  }

  onCancelGender() {
    this.setState({ visibleGender: false })
  }

  scroller = () => {
    // this.scroll.scrollToEnd({animated:true});
  }

  getAgeGroup = () => {
    switch (this.state.selectedAgeGroupCode) {
      case ">60": return 'Above 60';
        break;
      case "51-60": return '51 to 60';
        break;
      case "41-50": return '41 to 50';
        break;
      case "31-40": return '31 to 40';
        break;
      case "21-30": return '21 to 30';
        break;
      case "<20": return 'Teenager';
        break;
      default: return "";
    }
  }


  render() {

    var { height, width } = Dimensions.get('window');

    const options = {
      behavior: Platform.OS === 'ios' ? 'padding' : 'null',
    };

    const BUTTONS = [
      { ageGroup: 'Above 60', ageGroupCode: '>60' },
      { ageGroup: '51 to 60', ageGroupCode: '51-60' },
      { ageGroup: '41 to 50', ageGroupCode: '41-50' },
      { ageGroup: '31 to 40', ageGroupCode: '31-40' },
      { ageGroup: '21 to 30', ageGroupCode: '21-30' },
      { ageGroup: 'Teenager', ageGroupCode: '<20' },
    ];

    const G_BUTTONS = [
      "Male", "Female"
    ];

    return (
      <SafeAreaView forceInset={{ bottom: 'always' }} style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'clear',
            width: width,
          }}
          ref={ref => this.scroll = ref}
          // onContentSizeChange={this.scroller}  
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <KeyboardAvoidingView
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'clear',
              width: width,
              // height: height
            }}
            {...options}
            enabled
          >

            <View style={{ marginTop: 10 }}>
              <Image source={{ uri: "data:image/png;base64," + (this.state.image ? this.state.image : defaultUser) }} style={styles.uploadAvatar} />
              <EditButton onPress={this.imagePicker} />
            </View>

            <DefaultInput placeholder="Username" value={this.state.username} editable={this.state.editable} onChangeText={(text) => this.setState({ username: text })} />
            <DefaultInput placeholder="Name" value={this.state.name} onChangeText={(text) => this.setState({ name: text })} />

            <TouchableOpacity onPress={() => this.setState({ visibleGender: true })} style={{ width: '65%' }} >
              <View pointerEvents='none'>
                <DefaultInput style={{ width: '100%' }} placeholder="Gender" value={this.state.gender} editable={false} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.setState({ visible: true })} style={{ width: '65%' }} >
              <View pointerEvents='none'>
                <DefaultInput style={{ width: '100%' }} placeholder="Age group" value={this.getAgeGroup()} editable={false} />
              </View>
            </TouchableOpacity>

            <DefaultInput style={{ height: 100 }} placeholder="About me" multiline value={this.state.description} onChangeText={(text) => this.setState({ description: text })} />

            <ButtonMod onPress={this.toHomeScreen} color="#a01414">
              Submit
          </ButtonMod>
            {/* <View style={{ height: 100 }} /> */}

          </KeyboardAvoidingView>
        </ScrollView>

        <ShareSheet visible={this.state.visible} onCancel={() => { this.onCancel() }} >

          <Button>Select Your Age Group</Button>

          {BUTTONS.map((item) => {
            return (
              <Button
                onPress={() => {
                  this.onCancel()
                  setTimeout(() => {
                    this.setState({ selectedAgeGroupCode: item.ageGroupCode })
                  }, 300);
                }}>{item.ageGroup}</Button>
            )
          })}

        </ShareSheet>

        <ShareSheet visible={this.state.visibleGender} onCancel={() => this.onCancelGender()} >

          <Button>Select Your Gender</Button>

          {G_BUTTONS.map((item) => {
            return (
              <Button
                onPress={() => {
                  this.onCancelGender()
                  setTimeout(() => {
                    this.setState({ gender: item })
                  }, 300);
                }}>{item}</Button>
            )
          })}

        </ShareSheet>

        <Loading ref="loading" />
        
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  uploadAvatar: {
    margin: 20,
    height: 200,
    width: 200,
    borderRadius: 100,
    backgroundColor: '#F2F2F2',
  },
  keyboard: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 10,
    width: Dimensions.get('window').width,
  },
});
