import React, {Component} from 'react';
import {View, StyleSheet, SafeAreaView, Text, ScrollView} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {PropTypes} from 'prop-types';
import CustomButton from '../../components/UI/ButtonMod/CustomButtom';
import {normalize} from '../../../Constant';
import CaseCard from '../../components/UI/CaseCard/CaseCard';
import Draggable from 'react-native-draggable';

export default class ReportScreen extends Component {
  state = {
    case: [
      {
        picture: require ('../../assets/1.png'),
        name: 'Ron Burgundy',
        place: 'Las Vegas',
        details: 'News Room Reporter : A chauvinistic host of a top-rated American news programme is threatened with the arrival of an ambitious female reporter which starts a bitter battle of the sexes.',
        caseId: 'HB345',
        video:null // "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      },
      {
        picture: require ('../../assets/2.png'),
        name: 'Bo Burnaham',
        place: 'Washington DC',
        details: null,
        caseId: null,
        video:null //"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
      },
    ],
    iconSrc : require('../../assets/report.png')
  };

  static propTypes = {
    componentId: PropTypes.string,
  };

  homeButtonTapped = () => {
    Navigation.pop (this.props.componentId);
  };

  render () {
    return (
      <SafeAreaView
        forceInset={{bottom: 'always'}}
        style={{flex: 1, backgroundColor: 'rgba(210,210,208,1)'}}
      >

        <View style={styles.headerView} backgroundColor="rgba(242,241,244,1)">

          <View style={{flex: 1, backgroundColor: 'rgba(87,48,134,1)'}}>
            <CustomButton
              source={require ('../../assets/home.png')}
              style={{
                flexDirection: 'row',
                flex: 1,
              }}
              onPress={this.homeButtonTapped}
            />
          </View>
          <View style={styles.textheaderView}>
            <Text style={styles.textView}>Reports</Text>
          </View>

        </View>

        <ScrollView style={styles.bottomView}>

          {this.state.case.map (data => (
            <CaseCard
              picture={data.picture}
              name={data.name}
              place={data.place}
              details={data.details}
              caseId={data.caseId}
              video={data.video}
            />
          ))}

        </ScrollView>

        {/* <Draggable
          reverse={false}
          renderShape='image'
          // backgroundColor="#000000"
          offsetX={0}
          offsetY={0}
          imageSource={this.state.iconSrc}
          renderSize={60}
        /> */}

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create ({
  headerView: {
    flex: 0.07,
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 5,
    backgroundColor: 'white',
  },
  textheaderView: {
    flex: 5,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  textView: {
    backgroundColor: 'transparent',
    marginLeft: 10,
    fontSize: normalize (14),
  },
  bottomView: {
    flex: 0.93,
  },
});
