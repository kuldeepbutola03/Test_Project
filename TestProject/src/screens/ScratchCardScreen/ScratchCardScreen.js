import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ScratchView from 'react-native-scratch';
import { Navigation } from 'react-native-navigation';
import { normalize } from '../../../Constant';

// CALLBACK_URL
// String(255) Mandatory	Staging Environment: 
// "https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=<order_id>" 
// Production Environment: 
// "https://securegw.paytm.in/theia/paytmCallback?ORDER_ID=<order_id>"
// Merchant_id  ialDMt31687026429999
// Secret Key CwRKD3o#Yl&xzhFJ

// QSEmQb71240204557720
// wq_ohWz7fdb1&X3g
export default class ScratchCardScreen extends Component {

  fortuneList = [
    "Today it's up to you to create the peacefulness you long for.",
    "A friend asks only for your time not your money.",
    "If you refuse to accept anything but the best, you very often get it.",
    "A smile is your passport into the hearts of others.",
    "A good way to keep healthy is to eat more Chinese food.",
    "Your high-minded principles spell success.",
    "Hard work pays off in the future, laziness pays off now.",
    "Change can hurt, but it leads a path to something better.",
    "Enjoy the good luck a companion brings you.",
    "People are naturally attracted to you.",
    "Hidden in a valley beside an open stream- This will be the type of place where you will find your dream.",
    "A chance meeting opens new doors to success and friendship.",
    "You learn from your mistakes... You will learn a lot today.",
    "If you have something good in your life, don't let it go!",
    "What ever your goal is in life, embrace it visualise it, and for it will be yours.",
    "Your shoes will make you happy today.",
    "Be on the lookout for coming events; They cast their shadows beforehand.",
    "Land is always on the mind of a flying bird.",
    "The man or woman you desire feels the same about you.",
    "Meeting adversity well is the source of your strength.",
    "A dream you have will come true.",
    "Our deeds determine us, as much as we determine our deeds.",
    "Never give up. You're not a failure if you don't give up.",
    "You will become great if you believe in yourself.",
    "There is no greater pleasure than seeing your loved ones prosper.",
    "You will marry your lover.",
    "A very attractive person has a message for you.",
    "You already know the answer to the questions lingering inside your head.",
    "It is now, and in this world, that we must live.",
    "You must try, or hate yourself for not trying.",
    "You can make your own happiness.",
    "The greatest risk is not taking one.",
    "The love of your life is stepping into your planet this summer.",
    "Love can last a lifetime, if you want it to.",
    "Adversity is the parent of virtue.",
    "Serious trouble will bypass you.",
    "A short stranger will soon enter your life with blessings to share.",
    "Now is the time to try something new.",
    "Wealth awaits you very soon.",
    "If you feel you are right, stand firmly by your convictions.",
    "If winter comes, can spring be far behind?",
    "Keep your eye out for someone special.",
    "You are very talented in many ways.",
    "A stranger, is a friend you have not spoken to yet.",
    "A new voyage will fill your life with untold memories.",
    "You will travel too many exotic places in your lifetime.",
    "Your ability for accomplishment will follow with success.",
    "Nothing astonishes men so much as common sense and plain dealing.",
    "It’s amazing how much good you can do if you don’t care who gets the credit."
  ]

  randomNumber = Math.floor(Math.random() * this.fortuneList.length) - 1;
  // RandomNumber = RandomNumber < 0 ? 0 : RandomNumber;

  constructor(props) {
    super(props);
    this.state = {
      showCrossBttn: false
    }
  }
  //  componentDidMount() {
  componentWillMount() {

    // }, 100)
    
    // let object = this.props.children// .navigation// Navigation. .events(). .getPropsForId('HomeScreen');
    // console.log(object);

    // Navigation.mergeOptions(bottom)
  }

  componentWillUnmount() {

  }

  onImageLoadFinished = ({ id, success }) => {
    // Do something
    console.log('onImageLoadFinished');
  }

  onScratchProgressChanged = ({ value, id }) => {
    // Do domething like showing the progress to the user
    console.log('onScratchProgressChanged');
  }

  onScratchDone = ({ isScratchDone, id }) => {
    // Do something
    console.log('onScratchDone');
    this.setState({showCrossBttn : true})
  }

  onTouchStateChangedMethod = ({ id, touchState }) => {
    // Example: change a state value to stop a containing
    // FlatList from scrolling while scratching
    console.log('onTouchStateChangedMethod');
    // this.setState({ scrollEnabled: !touchState });
  }
  cancelTapped = () => {
    Navigation.dismissModal(this.props.componentId)
  }
  render() {

    
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: 'center', backgroundColor: 'rgba(.4,.5,.6,.6)' }}>
        <View style={{ height: normalize(200), width: normalize(200), backgroundColor: 'silver' , padding : 5 , alignItems : 'center' , justifyContent : 'center'}}>
          {/* <ScratchView></ScratchView> */}
          <Text style = {{fontSize : 12 , fontStyle : 'italic'}}>Fortune Cookie</Text>
          <Text style = {{marginTop : 10, fontSize : 18 , textAlign : 'center'}}>{this.fortuneList[this.randomNumber]}</Text>
          <ScratchView
            id={1} // ScratchView id (Optional)
            brushSize={50} // Default is 10% of the smallest dimension (width/height)
            threshold={50} // Report full scratch after 70 percentage, change as you see fit. Default is 50
            fadeOut={true} // Disable the fade out animation when scratch is done. Default is true
            placeholderColor="#AAACCC" // Scratch color while image is loading (or while image not present)
            // imageUrl= {require('../../assets/1.png')}//"https://media.wired.com/photos/5b899992404e112d2df1e94e/master/pass/trash2-01.jpg" // A url to your image (Optional)
            // resourceName= "1" // An image resource name (without the extension like '.png/jpg etc') in the native bundle of the app (drawble for Android, Images.xcassets in iOS) (Optional)
            // resizeMode="cover|contain|stretch" // Resize the image to fit or fill the scratch view. Default is stretch
            onImageLoadFinished={this.onImageLoadFinished} // Event to indicate that the image has done loading
            onTouchStateChanged={this.onTouchStateChangedMethod} // Touch event (to stop a containing FlatList for example)
            onScratchProgressChanged={this.onScratchProgressChanged} // Scratch progress event while scratching
            onScratchDone={this.onScratchDone} // Scratch is done event
          >
            <View>
              <Text> Scrach and win </Text>
              </View>
          </ScratchView>

          {
            this.state.showCrossBttn &&

            <TouchableOpacity style={{ width: 50, height: 50, position: 'absolute', right: 0, top: 0, justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.cancelTapped() }}>
              <Text style={{}}>X</Text>
            </TouchableOpacity>
          }
        </View></View>)
  }

}