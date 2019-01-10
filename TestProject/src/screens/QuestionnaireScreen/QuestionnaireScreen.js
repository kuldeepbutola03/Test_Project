import React, { Component } from 'react';
import {

    StyleSheet,
    View,
    Text,

    Dimensions,
    SafeAreaView,

    ScrollView,

} from 'react-native';
import { PropTypes } from 'prop-types';
import { normalize, APP_GLOBAL_COLOR } from '../../../Constant';
import CustomButton from '../../components/UI/ButtonMod/CustomButtom';

import { Navigation } from 'react-native-navigation';
import CustomTextButton from '../../components/UI/ButtonMod/CustomTextButton';
// import { PropTypes } from 'prop-types';
import QuestionniareListView from '../../components/UI/QuestionView/QuestionniareListView'
export default class QuestionnireScreen extends Component {
    state = {
        state: true,
        questionniareData1: [
            { type: 'slider', number: '01', choice: ['abc', 'ced', 'asdasds', 'asdasddsa'], question: 'It is better to polite and rule-obedient rather than carefree' },
            { type: 'optional', number: '02', choice: ['abc', 'ced', 'asdasds', 'asdasddsa'], question: 'I enjoy meeting new people',isSelected: 0 },
            { type: 'multiple', number: '03', choice: ['Strong and determined', 'Enthusiastic and frendly', 'Caring and sharing', 'Questioning and careful'], question: 'Which of the following is MOST like you?', isSelected: -1 },
            { type: 'slider', number: '04', choice: ['abc', 'ced', 'asdasds', 'asdasddsa'], question: 'My manager defends me from unfair criticism', isSelected: 0 },
            { type: 'optional', number: '05', choice: ['abc', 'ced', 'asdasds', 'asdasddsa'], question: 'A big part of success is luck?', isSelected: -1  },
            { type: 'optional', number: '06', choice: ['abc', 'ced', 'asdasds', 'asdasddsa'], question: 'I Sometime lie a lot', isSelected: -1  },
           
        ],
        questionniareData2: [
            { type: 'slider', number: '01', choice: ['abc', 'ced', 'asdasds', 'asdasddsa'], question: 'It is better to polite and rule-obedient rather than carefree' },
            { type: 'optional', number: '02', choice: ['abc', 'ced', 'asdasds', 'asdasddsa'], question: 'I enjoy meeting new people',isSelected: 0 },
            { type: 'multiple', number: '03', choice: ['Strong and determined', 'Enthusiastic and frendly', 'Caring and sharing', 'Questioning and careful'], question: 'Which of the following is MOST like you?', isSelected: -1 },
            { type: 'slider', number: '04', choice: ['abc', 'ced', 'asdasds', 'asdasddsa'], question: 'My manager defends me from unfair criticism', isSelected: 0 },
            { type: 'optional', number: '05', choice: ['abc', 'ced', 'asdasds', 'asdasddsa'], question: 'A big part of success is luck?', isSelected: -1  },
            { type: 'optional', number: '06', choice: ['abc', 'ced', 'asdasds', 'asdasddsa'], question: 'I Sometime lie a lot', isSelected: -1  },
           
        ]

    }
    static propTypes = {
        componentId: PropTypes.string,
    };
    constructor(props) {
        super(props);

        
    };





    homeButtonTapped = () => {
        Navigation.pop(this.props.componentId);
    };

    stateBttnTapped = () => {
        // this._bttnNational._view.backgroundColor = "green";
        this.setState({
            state: true
        })
        _scrollView.scrollTo({ x: 0, animate: true })
        // {this.state ? APP_GLOBAL_COLOR : "transparent"}
    }
    nationalBttnTapped = () => {
        // this._bttnNational._view.backgroundColor = "green";
        this.setState({
            state: false
        })
        _scrollView.scrollTo({ x: Dimensions.get('window').width, animate: true })
    }

    onScrollEndSnapToEdge = () => {
        // y = event.nativeEvent.contentOffset.x;
        // const y = _scrollView.contentOffset.x;
        alert("assaasasas");
        if (y > 0) {
            this.setState({
                state: false
            })
        } else {
            this.setState({
                state: true
            })
        }

    }

    render() {
        return <SafeAreaView
            forceInset={{ bottom: 'always' }}
            style={{ flex: 1, backgroundColor: 'rgba(210,210,208,1)' }}
        >

            <View
                style={topViewStyle.headerView}
                backgroundColor="rgba(242,241,244,1)"
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(87,48,134,1)' }}>
                    <CustomButton
                        style={{
                            flexDirection: 'row',
                            flex: 1,
                        }}
                        source={require('../../assets/home.png')}
                        onPress={this.homeButtonTapped}
                    />
                </View>

                <View style={topViewStyle.textheaderView}>
                    <Text adjustsFontSizeToFit numberOfLines={1} minimumFontScale={.8} style={topViewStyle.textView}>QUESTIONNAIRE</Text>
                    {/* <Text style={topViewStyle.textView2}>{data.area}</Text> */}
                </View>

            </View>

            <View style={{ width: "100%", height: 1 }} backgroundColor="gray" />
            {/* secondViewStyle */}
            <View style={secondViewStyle.secondView}>
                <CustomTextButton onPress={this.stateBttnTapped} style={{ flex: 1 }} textColor = {this.state.state ? "white" : "black"} bgColor={this.state.state ? APP_GLOBAL_COLOR : "transparent"} >STATE</CustomTextButton>
                <CustomTextButton onPress={this.nationalBttnTapped} style={{ flex: 1 }} textColor = {!this.state.state ? "white" : "black"} bgColor={!this.state.state ? APP_GLOBAL_COLOR : "transparent"} >NATIONAL</CustomTextButton>
            </View>

            <View style={{ width: "100%", height: 1 }} backgroundColor="white" />

            {/* thirdViewStyle */}
            <View style={thirdViewStyle.thirdView} >
                <ScrollView horizontal={true} pagingEnabled={true} scrollEnabled={false} ref={scrollView => {
                    _scrollView = scrollView;
                }}>

                    <View style={thirdViewStyle.innerViewSecond}>
                        <QuestionniareListView data={this.state.questionniareData1} onChangeData={(data, index) => {
                            // alert('asdsads');
                            // alert(JSON.stringify(index));
                            var d = [];
                            
                            this.state.questionniareData1.map ((object,indexIn ) => {
                                if (index == indexIn){
                                    d.push(data)
                                }else{
                                    d.push(object)
                                }
                                
                            })
                            // var items = this.state.questionniareData1
                            // items[index] = data;
                            // items.push(data)

                            
                            // alert(JSON.stringify(items));
                            // this._scrollView.refreshing = true
                            this.setState({questionniareData1 : d});
                            
                            
                        }
                        }>
                        </QuestionniareListView>
                    </View>

                    <View style={thirdViewStyle.innerViewSecond}>
                    <QuestionniareListView data={this.state.questionniareData2} onChangeData={(data, index) => {
                            // alert('asdsads');
                            // alert(JSON.stringify(index));
                            var d = [];
                            
                            this.state.questionniareData2.map ((object,indexIn ) => {
                                if (index == indexIn){
                                    d.push(data)
                                }else{
                                    d.push(object)
                                }
                                
                            })
                            this.setState({questionniareData2 : d});
                        }
                        }>
                        </QuestionniareListView>
                    </View>
                </ScrollView>
            </View>



        </SafeAreaView>
    }
}

const topViewStyle = StyleSheet.create({
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
        fontSize: normalize(13),
        // fontSize: PixelRatio.get () <= 2 ? 14 : 15,
        //   fontWeight: 'bold',
    },
    textView2: {
        // flex: 1,
        // position: 'absolute',
        backgroundColor: 'transparent',
        marginLeft: 10,
        fontSize: normalize(12),
        // fontSize: PixelRatio.get () <= 2 ? 12 : 13,
        //   fontWeight: 'bold',
    },
});

const secondViewStyle = StyleSheet.create({
    secondView: {
        flex: 0.075,
        // position: 'absolute',
        backgroundColor: 'transparent',
        flexDirection: 'row',
    },
});

const thirdViewStyle = StyleSheet.create({
    thirdView: {
        flex: 0.85,
        // position: 'absolute',
        backgroundColor: 'transparent',
        // flexDirection: 'row',
    },
    innerViewSecond: {
        flex: 1,
        // position: 'absolute',

        height: '100%',
        width: Dimensions.get('window').width,

        // backgroundColor: 'red',
        flexDirection: 'row',
    },
});


