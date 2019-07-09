import React from 'react'
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
    Platform
} from 'react-native'
import { Avatar, Divider } from 'react-native-elements'
import CustomButton from '../ButtonMod/CustomButtom'
import ScoreView from './ScoreView'
import { normalize, APP_GLOBAL_COLOR, APP_ALERT_MESSAGE } from '../../../../Constant'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import StarRating from 'react-native-star-rating'
import axios from 'axios'
import { GPR_FLAG } from '../../../../Apis'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Navigation } from 'react-native-navigation'
import RatingModal from '../ProfileCard/RatingModal'
import Permissions from 'react-native-permissions'

// homeButton = props => {
//     if (props.showHome) {
//         return (
//             <CustomButton
//                 style={{
//                     flexDirection: 'row',
//                     flex: 1,
//                 }}
//                 source={require('../../../assets/homez.png')}
//                 onPress={props.onPress}
//             />
//         );
//     } else {
//         return null;
//     }
// };


class CandidateCard extends React.Component {

    state = {
        starCount: this.props.oldRating ? this.props.oldRating : 0,
        submitted: this.props.oldRating ? true : false,

        // selectedColor: this.props.color
    };

    extraInd = 0
    constructor(props) {
        super(props);

        // console.log('data',this.props.data)
    }
    // shouldComponentUpdate(nextProps, newState) {
    //     // alert('aa')
    //     return true// this.props.name === nextProps.name; // use === to compare types too!
    // }
    // shouldComponentUpdate() {

    // }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating,
        });
    }

    submitRating = () => {

        this.setState({ loading: true });
        const { userId, location, resourceId } = this.props.data;
        const { isFlagEnabled, resourceType, oldRating1, oldRating2 } = this.props;
        const { starCount, submitted } = this.state;



        if (isFlagEnabled === 'Y' && submitted === false) {
            if (starCount > 0) {
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
                            'You can Rate again after 24 hours',
                            [
                                { text: 'OK', onPress: () => { } },
                            ],
                            { cancelable: false },
                        );
                        // console.log(response.data);
                        let responseData = response.data;
                        this.props.updateResources({
                            resourceType: resourceType,
                            resourceGPR: responseData.resourceGPR,
                            rtnGprI: responseData.rtnGprI,
                            rtnGprO: responseData.rtnGprO,
                            totalFlagCount: responseData.totalFlagCount,
                            totalFlagUniqueCount: responseData.totalFlagUniqueCount,
                        })
                        // this.setState({ loading: false, submitted: true, starCount: star });
                    }).then(() => {
                        // Navigation.dismissModal(id)
                    })
                    .catch(error => {
                        console.error(error);
                        this.setState({ loading: false, submitted: false });
                    })
            } else {
                this.setState({ loading: false });
                alert("Please select the Rating")
            }
        } else {
            Alert.alert(
                APP_ALERT_MESSAGE,
                'You can Rate again after 24 hours',
                [
                    { text: 'OK', onPress: () => { Navigation.dismissModal(id) } },
                ],
                { cancelable: false },
            );
            // alert("You have already sent a feedback");
            this.setState({ loading: false })
        }
    }

    _keyExtractor = (item, index) => {
        this.extraInd = this.extraInd + 1;
        return index + this.extraInd + "abc"
    };

    // renderItem = ({ item, index }) => {
    //     if (index === 0) {
    //         return null;
    //     } else {
    //         return (
    //             <View
    //                 style={{
    //                     flex: 1,
    //                     padding: 5,
    //                     marginHorizontal: normalize(13),
    //                     width: '100%'
    //                 }}>
    //                 <View>
    //                     <Text style={index == 0 ? listTitleStyle.headerView : listTitleStyle.view}>
    //                         {item.attributeName}
    //                     </Text>
    //                 </View>
    //             </View>
    //         )
    //     }
    // }

    // renderItem2 = ({ item, index }) => {
    //     if (index === 0) {
    //         return null;
    //     } else {
    //         return (
    //             <View
    //                 style={{
    //                     flex: 1,
    //                     padding: 5,
    //                     marginHorizontal: normalize(13),
    //                     width: '100%'
    //                 }}>
    //                 <View style={{}}>
    //                     <Text
    //                         style={
    //                             index == 0 ? listTitleStyle.headerView : listTitleStyle.view
    //                         }
    //                     >
    //                         {item.attributeValue}
    //                     </Text>
    //                 </View>
    //             </View>
    //         )
    //     }
    // }

    renderItem3 = (item, index, props) => {// ({ item, index }) => {
        // alert(props.color);
        if (index === 0) {
            return null;
        } else {
            let bgClr = props.color
            return (
                <View
                    style={{
                        flex: 1,
                        width: '100%',
                        height: 40,
                        flexDirection: 'row',
                        borderWidth: 0.2
                    }}>

                    <View style={{ flex: 0.8, backgroundColor: bgClr, justifyContent: 'center', paddingHorizontal: normalize(3) }}>
                        <Text style={listTitleStyle.view}>{item.attributeName}</Text>
                    </View>

                    <View style={{ flex: 1.2, justifyContent: 'center', paddingLeft: normalize(5) }}>
                        <Text style={listTitleStyle.view1}>{item.attributeValue}</Text>
                    </View>

                </View>
            )
        }
    }

    renderSubmitIcon = () => {
        const { isFlagEnabled, share } = this.props;
        if (isFlagEnabled === 'Y' && this.state.submitted === false) {
            return (
                <TouchableHighlight onPress={() => this.submitRating()}>
                    <FontAwesome style={{ marginLeft: hp('1%') }} name="check-circle" size={27} color="green" />
                </TouchableHighlight>
            )
        } else {
            return (
                <TouchableWithoutFeedback onPress={() => { share(this.state.starCount, this.props.name) }}>
                    <FontAwesome style={{ marginLeft: hp('1%') }} name="share-alt" size={25} />
                </TouchableWithoutFeedback>
            )
        }
        // this.props.isFlagEnabled === 'N' ? true : false
    }

    getModal = () => {
        const { isFlagEnabled } = this.props;
        const { submitted } = this.state;

        // alert(submitted)

        // return;

        if (isFlagEnabled === 'Y' && submitted === false) {




        } else {
            Alert.alert(
                APP_ALERT_MESSAGE,
                'You have already sent a feedback!',
                [
                    { text: 'OK', onPress: () => { Navigation.dismissModal(id) } },
                ],
                { cancelable: false },
            );
            // alert("You have already sent a feedback");
            return;
        }


        Navigation.showModal({
            component: {
                name: "RatingModal",
                options: {
                    modalPresentationStyle: 'overFullScreen',
                    layout: {
                        backgroundColor: 'transparent'
                    },

                },
                passProps: {
                    submitRating: this.submitRating
                }
            }
        })
    }

    render() {
        // alert(JSON.stringify(this.props.data.data));
        // let flag = this.props.showHome;
        const { loading, submitted } = this.state;

        const { isFlagEnabled } = this.props;

        // alert(submitted)

        // return;

        var showRateLeader = (isFlagEnabled === 'Y' && submitted === false);


        // if (this.props.color != this.state.selectedColor) {
        //     alert('aaaa')
        //     this.setState({ selectedColor: this.props.color })
        // }

        return (
            <View style={[this.props.style, { shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, elevation: 5 }]} backgroundColor={this.props.backgroundColor}>

                <View style={{ flex: 1, }}>

                    <View style={styles.scoreRatingContainer}>

                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <View style={{ justifyContent: 'center', }}>
                                <Avatar
                                    rounded
                                    imageProps={{ resizeMode: 'cover' }}
                                    size={normalize(80)}
                                    containerStyle={{ marginHorizontal: 10 }}
                                    source={this.props.data.profilePic}

                                    avatarStyle={{ borderColor: 'grey', borderWidth: 1, borderRadius: normalize(80) / 2.0 }}
                                />

                                <Avatar
                                    rounded
                                    imageProps={{ resizeMode: 'cover' }}
                                    size={normalize(20)}
                                    containerStyle={{ position: 'absolute', bottom: 8, left: 8, backgroundColor: 'white' }}
                                    source={this.props.data.profileCompPic}
                                    avatarStyle={{ borderColor: 'grey', borderWidth: 1, borderRadius: normalize(20) / 2, backgroundColor: 'white' }}

                                />
                            </View>

                            <View style={{ flex: 1, justifyContent: 'center', height: '100%' }}>



                                {/* <Text style={{ marginVertical: 2 }}>Minister of Women and Child Developement and Minister of textile</Text> */}

                                <View style={styles.ratingContainer}>

                                    <View style={{ flex: 1 }}>
                                        <Text adjustsFontSizeToFit numberOfLines={1} minimumFontScale={.8} style={cardViewStyle.textView}>{this.props.data.name}</Text>
                                        <Text style={cardViewStyle.textView2}>{this.props.data.area.includes("null") ? this.props.data.area.replace(/null/g, "").replace("|", "") : this.props.data.area}</Text>
                                    </View>

                                    <View style={{ height: "90%", marginLeft: 4, width: 0.5, backgroundColor: 'grey' }} />

                                    <View style={{ width: Platform.isPad ? 140 : 70, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: Platform.isPad ? 12 : 8, marginBottom: 5 }}> Current Rating </Text>
                                        <ScoreView
                                            style={ratingView.scoreViewStyle}
                                            text={[this.props.data.score.gpr.name, this.props.data.score.gpr.score]}
                                            backgroundColor="rgb(78,163,89)"
                                            bottomText={false}
                                        />
                                    </View>

                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <StarRating
                                        // disabled={this.props.isFlagEnabled === 'N' ? true : false}
                                        disabled={!showRateLeader}
                                        maxStars={5}
                                        // starStyle={{ marginHorizontal: 1 }}
                                        rating={this.state.starCount}
                                        fullStarColor={'#FAA21B'}
                                        starSize={normalize(25)}
                                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                                    />
                                    <View style={{ width: 100, alignItems: "center", justifyContent: 'center' }}>
                                        {/* <View style={{ width: '100%', height: 60, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderTopWidth: 0.3, borderTopColor: 'grey' }}> */}
                                        {showRateLeader ? <TouchableOpacity onPress={() => {

                                            if (showRateLeader) {
                                                this.submitRating()

                                            }
                                        }} style={{ backgroundColor: showRateLeader ? this.props.color : 'lightgrey', width: 80, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}><Text style={{ color: 'white', fontSize: 12 }}> Rate Leader </Text></TouchableOpacity>
                                            :

                                            <TouchableOpacity onPress={() => { this.props.share(this.state.starCount, this.props.name) }} style={{ backgroundColor: 'lightgrey', width: 80, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}><Text style={{ color: 'black', fontSize: 12 }}> Share </Text></TouchableOpacity>

                                            // <TouchableOpacity onPress={() => { this.props.share(this.state.starCount, this.props.name) }}>
                                            //     <FontAwesome style={{ color: 'grey' }} name="share-alt" size={20} />
                                            // </TouchableOpacity>
                                        }
                                        {/* </View> */}
                                    </View>

                                    {/* <ScoreView
                                        style={ratingView.scoreViewStyle}
                                        text={[this.props.data.score.gpr.name, this.props.data.score.gpr.score]}
                                        backgroundColor="rgb(78,163,89)"
                                        bottomText={false}
                                    /> */}
                                </View>
                            </View>


                        </View>

                        {/* <View style={{ position: 'absolute', top: 0, left: 0, backgroundColor: 'transparent', height: 30, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5 }}>

                        <TouchableOpacity style={{ height: 20, width: 20, backgroundColor: 'clear', alignItems: 'center', justifyContent: 'center' }} onPress={() => { }}>
                            <View style={{ alignItems: 'center', justifyContent: 'flex-start', width: 20, height: 20, borderRadius: 10, backgroundColor: "white", borderColor: 'grey', borderWidth: 2 }}>
                                <Text style={{ fontSize: normalize(18), fontWeight: 'bold', color: "grey", fontStyle: 'italic', textAlign: 'center' }}>i</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { this.props.share(this.state.starCount, this.props.name) }}>
                            <FontAwesome style={{ color: 'grey' }} name="share-alt" size={20} />
                        </TouchableOpacity>

                    </View> */}

                    </View>


                    <View style={{ overflow: 'hidden', flex: 1, borderTopColor: 'grey', borderTopWidth: 0.3 }}>

                        <Text style={{ marginVertical: 5, fontSize: 12, marginHorizontal: 10 }}> Political Information </Text>

                        <View style={{ flex: 1, marginHorizontal: 10, }}>
                            <FlatList
                                data={this.props.data.data}
                                keyExtractor={this._keyExtractor}
                                renderItem={({ item, index }) => {
                                    return this.renderItem3(item, index, this.props)
                                }}
                                extraData={this.props.color}
                            />
                        </View>

                        {/* <View style={{ width: '100%', height: 60, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderTopWidth: 0.3, borderTopColor: 'grey' }}>
                            <TouchableOpacity onPress={() => {
                                if (showRateLeader) {
                                    this.getModal()
                                }
                            }} style={{ backgroundColor: showRateLeader ? this.props.color : 'lightgrey', width: 120, height: 40, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white', fontSize: 16 }}>Rate Leader</Text></TouchableOpacity>
                        </View> */}

                    </View>


                </View>

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
        // backgroundColor:'black'
    },

    scoreRatingContainer: {
        flex: 1,
        // flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxHeight: normalize(120),
    },

    scoreViewContainer: {
        // flex: 1, 
        flexDirection: 'row',
        // marginVertical: 40, 
        // justifyContent: 'space-around', 
        // alignItems: 'center', 
        // marginTop: normalize(10)
    },

    ratingContainer: {
        // flex: 0.2,
        // marginHorizontal: normalize(8),

        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
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
        fontWeight: 'bold',
        fontSize : Platform.isPad ? 20 : 12
        // marginLeft: normalize(13),
        // fontSize: normalize(16),
        // marginBottom: normalize(5)
        // paddingBottom: 5,
        // paddingLeft: 5
    },
    textView2: {
        backgroundColor: 'transparent',
        fontSize : Platform.isPad ? 20 : 12
        // marginLeft: normalize(13),
        // fontSize: normalize(12),
        // marginBottom: normalize(10)
        // paddingBottom: 5,
        // paddingLeft: 5
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
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'transparent',
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
        // flex: 1,
        fontSize: 12,// normalize(9),
        textAlignVertical: 'center',
        justifyContent: 'center',
        fontWeight: "500",
        color: 'white'//'rgb(96,108,120)'
        // paddingRight: normalize(7)
    },
    view1: {
        // flex: 1,
        fontSize: 12,// normalize(9),
        textAlignVertical: 'center',
        justifyContent: 'center',
        fontWeight: "500",
        color: 'rgb(96,108,120)'
        // paddingRight: normalize(7)
    },
});

export default CandidateCard;


