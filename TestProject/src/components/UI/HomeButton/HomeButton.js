import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';
import { normalize } from 'path';

homeButton = props => {
    <CustomButton
        style={{
            flexDirection: 'row',
            flex: 1,
        }}
        source={require ('../../../assets/home.png')}
        onPress={props.onPress}
    />
};

class ButtonHome extends Component {
    render() {
        return (
            <View
                style={cardViewStyle.headerView}
                backgroundColor="rgba(242,241,244,1)"
                >
                {flag && <View style={{flex: 1, backgroundColor: 'rgba(87,48,134,1)'}}>
                    {homeButton(this.props.onPress)}
                </View>}
                <View style={cardViewStyle.textheaderView}/>
            </View>
        )
    }
}

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
      fontSize : normalize(13)
      // fontSize: PixelRatio.get () <= 2 ? 14 : 15,
      //   fontWeight: 'bold',
    },
  });


export default ButtonHome;