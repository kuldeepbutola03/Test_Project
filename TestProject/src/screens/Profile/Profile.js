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
  Keyboard,
  Text,
  Modal,
  TouchableHighlight,
  TextInput
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
// import ImagePicker from 'react-native-image-crop-picker';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import ButtonMod from '../../components/UI/ButtonMod/ButtonMod';
import EditButton from '../../components/UI/EditButton/EditButton';
import { Navigation } from 'react-native-navigation';
import { PropTypes } from 'prop-types';
import { saveUserData, defaultUser, authHeaders, getUserID, APP_GLOBAL_COLOR, normalize } from '../../../Constant';
import { UPDATE_USER } from '../../../Apis';
import axios from 'axios';
import Share, { ShareSheet, Button } from 'react-native-share';
import Loading from 'react-native-whc-loading';
import { CheckBox } from 'react-native-elements';
import CustomButton from '../../components/UI/ButtonMod/CustomButtom';

export default class Profile extends Component {

  static propTypes = {
    componentId: PropTypes.string,
  };

  constructor(props) {
    super(props);

    // alert(JSON.stringify(this.props));
    this.state = {
      image: this.props.image,
      firstName: this.props.firstName ? this.props.firstName : "",
      lastName: this.props.lastName ? this.props.lastName : "",
      email: this.props.email ? this.props.email : "",
      username: this.props.username ? this.props.username : "",
      selectedAgeGroupCode: this.props.selectedAgeGroupCode ? this.props.selectedAgeGroupCode : "",
      gender: this.props.gender ? this.props.gender : "Male",
      userId: this.props.userId,
      description: this.props.description ? this.props.description : "",
      userDesignation: this.props.userDesignation ? this.props.userDesignation : "",
      userLanguage: this.props.userLanguage ? this.props.userLanguage : "en",
      languageCode: this.props.languageCode,
      editable: !(this.props.username && this.props.username.length > 0),
      visible: false,
      visibleGender: false,
      visibleProfession: false,
      warningVisible: false,
      maleChecked: this.props.gender === "Male",
    }
  }

  componentDidMount() {
  }

  backTapped = () => {
    Navigation.pop(this.props.componentId);
  }

  toHomeScreen = () => {

    const { firstName, username } = this.state;
    console.log(this.state.image)
    let usernameRegex = /^[a-zA-Z0-9]+$/;

    let validUsername = username.match(usernameRegex);

    if(username.length < 1) {
      alert('Please fill in your username');
    } else {
      this.updateDetails();
    }
    // if (firstName.length < 1) {
    //   alert('Please fill in your name');
    //   return;
    // } else if (username.length < 1) {
    //   alert('Please fill in your username');
    //   return
    // } else if (!validUsername) {
    //   alert('Your handle can only contain alphabets and numbers');
    // } else {
    //   // saveUserData(this.state);
    //   this.updateDetails();
    // }
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

    let imgName = "IMG" + (+new Date()) + '.JPG';

    let body = {};

    if (!this.state.editable) {

      body = JSON.stringify({
        userId: this.state.userId,
        userImageData: this.state.image,
        userImageName: imgName,
        userFirstName: this.state.firstName,
        userLastName: this.state.lastName,
        userGender: this.state.maleChecked ? "Male" : "Female",
        userAgeGroup: this.state.selectedAgeGroupCode,
        userDescription: this.state.description,
        userDesignation: this.state.userDesignation,
        userLanguage : this.state.userLanguage

      });
      // alert(body);

    } else {

      body = JSON.stringify({
        userId: this.state.userId,
        userName: this.state.username,
        userImageData: this.state.image,
        userImageName: imgName,
        userFirstName: this.state.firstName,
        userLastName: this.state.lastName,
        userGender: this.state.maleChecked ? "Male" : "Female",
        userAgeGroup: this.state.selectedAgeGroupCode,
        userDescription: this.state.description,
        userDesignation: this.state.userDesignation,
        userLanguage : this.state.userLanguage
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
        this.state.gender = this.state.maleChecked ? "Male" : "Female";
        saveUserData(this.state);

        this.refs.loading.close();

        if (this.props.refreshUI) {
          // setTimeout(() => {
          // var data = this.state;
          // data.userLanguage = 'hi';
          this.props.refreshUI(this.state);
          // }, 300);

          this.backTapped();
          return;
        }

        Navigation.setRoot({
          root: {
            stack: {
              children: [
                {
                  component: {

                    name: "HomeScreen",
                    options: {
                      topBar: {
                        visible: false,
                        drawBehind: true,
                        animate: false
                      },
                      popGesture: false
                    },
                    passProps: {
                      data: this.state,
                      refresh: true
                    },



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

  onCancelProfession() {
    this.setState({ visibleProfession: false })
  }

  scroller = () => {
    // this.scroll.scrollToEnd({animated:true});
  }

  getAgeGroup = () => {

    switch (this.state.selectedAgeGroupCode) {

      case "<20": return 'Teenager';
        break;

      case "21-30": return 'Twenties';
        break;

      case "31-40": return 'Thirties';
        break;

      case "41-50": return 'Fourties';
        break;

      case "51-60": return 'Above Sixties';
        break;

      case ">60": return 'Above 60';
        break;

      default: return "";
    }
  }

  getLanguages = () => {
    // let values = Object.values(this.state.languageCode);

    let keys = Object.keys(this.state.languageCode);
    const { userLanguage } = this.state;
    // let select = userLanguage ? userLanguage : "en";
    // alert(userLanguage);
    return (
      keys.map((items, index) => {
        // alert(items)
        return (
          <TouchableOpacity
            style={{ marginTop: 2, height: 40, justifyContent: 'flex-start', paddingLeft: 10, flexDirection: 'row', alignItems: 'center' }}
            onPress={() => this.setState({ userLanguage: items })}
          >
            <Text>{this.state.languageCode[items]}</Text>{userLanguage === items && <Image style={{ height: 15, width: 15, margin: 5 }} source={require("../../assets/Profile/tick.png")} />}
          </TouchableOpacity>
        )
      })
    )
  }

  BUTTONS = [
    { ageGroup: this.props.teenager, ageGroupCode: '<20' },
    { ageGroup: this.props.twenties, ageGroupCode: '21-30' },
    { ageGroup: this.props.thirties, ageGroupCode: '31-40' },
    { ageGroup: this.props.fourties, ageGroupCode: '41-50' },
    { ageGroup: this.props.fifties, ageGroupCode: '51-60' },
    { ageGroup: this.props.aboveSixty, ageGroupCode: '>60' },
  ];

  render() {

    var { height, width } = Dimensions.get('window');

    const options = {
      behavior: Platform.OS === 'ios' ? 'padding' : 'null',
    };



    const G_BUTTONS = [
      this.props.male, this.props.female
    ];

    const P_BUTTONS = [
      // "Student","Salaried", "Doctor", "Engineer", "Teacher", "Others"
      this.props.student,
      this.props.salaried,
      this.props.entrepreneur,
      this.props.retired,
      this.props.housewife,
      this.props.other,
      // "Student",
      // "Salaried" ,
      // "Entrepreneur",
      // "Retired",
      // "Housewife",
      // "Other"
    ]

    const { languageCodes } = this.state;

    return (
      <SafeAreaView forceInset={{ bottom: 'always' }} style={{ flex: 1, backgroundColor: "white" }}>

        <View style={styles.headerView} backgroundColor={APP_GLOBAL_COLOR}>

          <View style={{ flex: 1, backgroundColor: 'clear' }}>
            {this.props.refreshUI && <CustomButton
              source={require('../../assets/back.png')}
              style={{
                flexDirection: 'row',
                flex: 1,
                margin: normalize(5)
              }}
              onPress={this.backTapped}
            />}
          </View>
          <View style={{ flex: 2.5, backgroundColor: 'clear', flexDirection: 'row', alignItems: 'center' }}>
            
          </View>
          <View style={styles.textheaderView}>
            <Text style={styles.textView}>{this.props.language}</Text>
          </View>

        </View>



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

            <View style={{ flexDirection: "row", marginTop: 10 }}>

              <View style={{ flex: 1, alignItems: 'center', marginTop: 10 }}>
                <Image source={{ uri: "data:image/png;base64," + (this.state.image ? this.state.image : defaultUser) }} style={styles.uploadAvatar} />
                <EditButton onPress={this.imagePicker} />
              </View>

              <View style={{ flex: 2, justifyContent: 'space-around', alignItems: 'center' }}>

                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="First Name"
                  style={{
                    width: '90%',
                    // borderWidth: 2,
                    borderColor: APP_GLOBAL_COLOR,
                    // padding: 5,
                    // marginTop: 8,
                    // marginBottom: 8,
                    borderBottomWidth: 1,
                    height: 40,
                    borderRadius: 20,
                    textAlign: 'center'
                  }}
                  value={this.state.firstName} onChangeText={(text) => this.setState({ firstName: text })}

                />

                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="Last Name"
                  style={{
                    width: '90%',
                    // borderWidth: 2,
                    borderColor: APP_GLOBAL_COLOR,
                    // padding: 5,
                    borderBottomWidth: 1,
                    // marginTop: 8,
                    // marginBottom: 8,
                    height: 40,
                    borderRadius: 20,
                    textAlign: 'center'
                  }}
                  value={this.state.lastName} onChangeText={(text) => this.setState({ lastName: text })}
                />

                <Text style={{ marginTop: 5, color: APP_GLOBAL_COLOR, fontSize: 12 }}>Give your Profile a name</Text>

                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="UserName"

                  style={{
                    width: '90%',
                    // borderWidth: 2,
                    borderBottomWidth: 1,
                    borderColor: APP_GLOBAL_COLOR,
                    // padding: 2,
                    // marginTop: 8,
                    // marginBottom: 8,
                    height: 40,
                    borderRadius: 20,
                    textAlign: 'center'
                  }}
                  value={this.state.username} editable={this.state.editable} onChangeText={(text) => this.setState({ username: text })}
                />


                <View style={{ flexDirection: 'row' }}>
                  <CheckBox
                    center
                    title={this.props.male}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    onPress={() => this.setState(prevState => ({
                      maleChecked: true,

                      // gender : this.state.maleChecked === true ? "Male" : "Female"

                    }))}
                    checked={this.state.maleChecked}
                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, marginHorizontal: 0 }}
                  />
                  <CheckBox
                    center
                    title={this.props.female}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    onPress={() => this.setState(prevState => ({
                      maleChecked: false,
                      // femaleChecked : !this.state.femaleChecked,
                      // gender : this.state.maleChecked === true ? "Female" : "Male"
                    }))}
                    checked={!this.state.maleChecked}
                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, marginHorizontal: 0 }}
                  />
                </View>

                {/* <DefaultInput placeholder="First Name" value={this.state.name} onChangeText={(text) => this.setState({ name: text })} />
  <DefaultInput placeholder="Last Name" value={this.state.name} onChangeText={(text) => this.setState({ name: text })} />
  <DefaultInput placeholder="@Username" value={this.state.username} editable={this.state.editable} onChangeText={(text) => this.setState({ username: text })} /> */}
              </View>

            </View>

            {/* <View style={{ marginTop: 10 }}>
              <Image source={{ uri: "data:image/png;base64," + (this.state.image ? this.state.image : defaultUser) }} style={styles.uploadAvatar} />
              <EditButton onPress={this.imagePicker} />
            </View>

            <DefaultInput placeholder="Username" value={this.state.username} editable={this.state.editable} onChangeText={(text) => this.setState({ username: text })} onBlur={this.hideMessage} onFocus={this.showMessage} />
            {!this.props.username && this.state.warningVisible && <Text style={{ color: APP_GLOBAL_COLOR }}>This cannot be changed once decided</Text>}

            <DefaultInput placeholder="First Name" value={this.state.firstName} onChangeText={(text) => this.setState({ firstName: text })} />
            <DefaultInput placeholder="Last Name" value={this.state.lastName} onChangeText={(text) => this.setState({ lastName: text })} /> */}


            <DefaultInput style={{ height: 100, width: '85%' }} placeholder="About me" multiline value={this.state.description} onChangeText={(text) => this.setState({ description: text })} />

            {/* <TouchableOpacity onPress={() => this.setState({ visibleGender: true })} style={{ width: '65%' }} >
              <View pointerEvents='none'>
                <DefaultInput style={{ width: '100%' }} placeholder="Gender" value={this.state.gender} editable={false} />
              </View>
            </TouchableOpacity> */}

            {/* <View style={{ flexDirection: 'row' }}>
              <CheckBox
                center
                title='Male'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                onPress={() => this.setState({ checked: !this.state.checked })}
                checked={this.state.checked}
                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, }}
              />
              <CheckBox
                center
                title='Female'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                onPress={() => this.setState({ checked: !this.state.checked })}
                checked={!this.state.checked}
                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
              />
            </View> */}


            <TouchableOpacity onPress={() => this.setState({ visibleProfession: true })} style={{ width: '85%' }} >
              <View pointerEvents='none'>
                <DefaultInput style={{ width: '100%' }} placeholder="Profession" value={this.state.userDesignation} editable={false} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.setState({ visible: true })} style={{ width: '85%' }} >
              <View pointerEvents='none'>
                <DefaultInput style={{ width: '100%' }} placeholder="Age group" value={this.getAgeGroup()} editable={false} />
              </View>
            </TouchableOpacity>


            {this.state.languageCode && <View style={{ width: '100%', marginTop: 5 }}>

              <View style={{ width: '100%', backgroundColor: APP_GLOBAL_COLOR, height: 40, justifyContent: 'center' }}>
                <Text style={{ marginLeft: 10, color: 'white', fontWeight: 'bold' }}>Choose Your Language</Text>
              </View>


              {this.getLanguages()}



              {/* <TouchableOpacity style={{ marginTop: 2, height: 40, justifyContent: 'flex-start', paddingLeft: 10, flexDirection: 'row', alignItems: 'center' }} onPress={() => { this.setState({ hindi: true, english: false }) }}><Text>हिंदी</Text>{this.state.hindi && <Image style={{ height: 15, width: 15, marginLeft: 5 }} source={require("../../assets/Profile/tick.png")} />}</TouchableOpacity> */}

            </View>}

            {/* <View style={{ height: 100 }} /> */}

            <ButtonMod onPress={this.toHomeScreen} color="#a01414">
              Submit
          </ButtonMod>
            <View style={{ height: 10 }} />
          </ScrollView>
        </KeyboardAvoidingView>


        <ShareSheet visible={this.state.visible} onCancel={() => { this.onCancel() }} >
          <View style={{ backgroundColor: 'white', height: 50, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: APP_GLOBAL_COLOR }}>{this.props.selAgeGroup}</Text>
          </View>

          {this.BUTTONS.map((item) => {
            return (
              <Button
                onPress={() => {
                  this.onCancel()
                  setTimeout(() => {
                    this.setState({ selectedAgeGroupCode: item.ageGroupCode })
                  }, 300);
                }}
              >{item.ageGroup}</Button>
            )
          })}

        </ShareSheet>


        {/* <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <SafeAreaView forceInset={{ bottom: 'always' }} style={{ flex: 1, backgroundColor: "white", }}>
            <View style={{ margin: 10 }}>

              {P_BUTTONS.map((item) => {
                // let items = item;
                return (
                  <TouchableOpacity
                    style={{ marginTop: 2, height: 40, justifyContent: 'flex-start', paddingLeft: 10, flexDirection: 'row', alignItems: 'center' }}
                    onPress={() => {this.toggleProfession(item)}}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                );
              })}

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </SafeAreaView>
        </Modal> */}

        <ShareSheet visible={this.state.visibleProfession} onCancel={() => { this.onCancelProfession() }} >

          <View style={{ backgroundColor: 'white', height: 50, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: APP_GLOBAL_COLOR }}>{this.props.selProfession}</Text>
          </View>

          {P_BUTTONS.map((item) => {
            return (
              <Button
                onPress={() => {
                  this.onCancelProfession()
                  setTimeout(() => {
                    this.setState({ userDesignation: item })
                  }, 300);
                }}>{item}</Button>
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



      </SafeAreaView >
    );
  }
}

const styles = StyleSheet.create({
  headerView: {
    // flex: 0.07,
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 5,
    backgroundColor: 'white',
    height: Dimensions.get('window').height * 0.07
  },
  textheaderView: {
    flex: 2.5,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  textView: {
    position: 'absolute',
    backgroundColor: 'transparent',
    right: 15,
    fontSize: normalize(17),
    fontWeight: 'bold',
    color: 'white'
  },
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
    marginLeft: 5,
    height: 100,
    width: 100,
    borderRadius: 50,
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
