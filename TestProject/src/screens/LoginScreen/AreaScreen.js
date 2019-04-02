import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,

    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    SectionList,
    SafeAreaView,
    Image
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { PropTypes } from 'prop-types';
import firebase from 'react-native-firebase';
import { SEND_OTP, DEBUG, UPDATE_USER_AREA, LANDING_TOP_SIX } from '../../../Apis';
import { authHeaders, normalize, getUserID, saveUserData, APP_GLOBAL_COLOR, saveUserID } from '../../../Constant';
import Accordion from 'react-native-collapsible/Accordion';
import Loading from 'react-native-whc-loading';
import CustomButton from "../../components/UI/ButtonMod/CustomButtom";
import { SearchBar } from 'react-native-elements';
import axios from 'axios';

export default class AreaScreen extends Component {
    static propTypes = {
        componentId: PropTypes.string,
    };

    state = {

        activeSections: [0, 1],

        data: [],
        originalData: [],
        search: ''

    }
    // user_id = 1;
    sectionSelected = -1;
    constructor(props) {
        super(props);
        // this.pushScreen = this.pushScreen.bind (this);
    }

    componentDidMount() {
        // this.getDataFromServer(true)
        firebase.analytics().setCurrentScreen("Screen", "Area_Selection_Screen");
        //firebase.analytics().logEvent("Trends_Screen");
        firebase.analytics().setUserProperty("Screen", "Area_Selection_Screen");
        firebase.analytics().logEvent("Content", { "Screen": "Area_Selection_Screen" });



        // getUserID().then((value) => {
        //     this.user_id = value;
        //     // alert(value);
        // })

        var dict = this.props.data;
        var arr = [];

        for (var key in dict) {
            let data = dict[key];
            let itemCode = key.split("_");
            let code = itemCode[0];
            let item = itemCode[1];

            data.sort(function (a, b) {

                return a.localeCompare(b);
            })

            arr.push({ data: data, title: item, code: code });
        }

        arr.sort(function (a, b) {

            return a.title.localeCompare(b.title);
        })

        this.setState({ originalData: arr });
        let data = JSON.parse(JSON.stringify(arr));
        // alert(JSON.stringify(data));
        for (let i = 0; i < data.length; i++) {

            // if (this.state.sectionSelected !== i) {
            let object = data[i];
            // let object = data[0];
            object["data"] = [];
            // }
        }

        this.setState({ data: data })
    }


    resetToDefault() {
        let data = JSON.parse(JSON.stringify(this.state.originalData));
        for (let i = 0; i < data.length; i++) {



            let object = data[i];
            // let object = data[0];
            object["data"] = [];

        }
        this.setState({ data: data, search: '' });

    }

    updateSearch = searchText => {
        var search = searchText;
        // this.setState({ search });
        if (search === '') {
            this.sectionSelected = -1;
            this.resetToDefault();
            // this.setState({search : search });
            return;
        }
        this.sectionSelected = -2;



        let data = JSON.parse(JSON.stringify(this.state.originalData));
        var objectNew = [];
        for (let i = 0; i < data.length; i++) {



            let object = data[i]
            let dataArray = object["data"];

            const newData = dataArray.filter(function (item) {
                //applying filter for the inserted text in search bar
                const itemData = item ? item.toUpperCase() : ''.toUpperCase();
                const textData = search.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            // let object = data[0];
            // object["data"] = newData;

            // objectNew.push({data : newData , })
            if (newData.length > 0) {
                objectNew.push({ data: newData, title: object["title"], code: object["code"] });
            }

        }


        this.setState({ data: objectNew, search: searchText });

    };

    _updateSections = activeSections => {
        this.setState({ activeSections });
    };

    hitServerToUpdateData = (thisObject, idex, section, area) => {

        // alert(idex + "  " + JSON.stringify(section));
        let code = section["code"];
        // let area = section["code"];

        let body = JSON.stringify({
            userId: this.props.userId,
            userState: code,
            userPolArea: area

        })

        this.refs.loading.show();

        fetch(UPDATE_USER_AREA, {
            method: 'POST',
            headers: authHeaders(),
            body: body,
        }).then((response) => response.json())
            .then((responseJson) => {
                let username = this.props.username;
                let responseData = this.props.responseData;
                let data = {
                    email: responseData.userEmail,
                    image: responseData.userImageData,
                    name: responseData.userFirstName,
                    username: responseData.userName,
                    mobileNumber: this.props.mobileNumber,
                    code: this.props.code
                }

                // axios.post(LANDING_TOP_SIX, {
                //     userId: responseData.userId,
                // })
                // .then(response_2 => {

                let languageArry = "Trends,Survey,Arena,Notifications,Rate Now, Profile, Male,Female, Select Your Profession,Student,Salaried,Entrepreneur, Retired, Housewife,Other, Select Your Age group, Teenager,Twenties,Thirties,Forties,Fifties,Sixty+";
                let menuArr = languageArry.split(',');
                // let responseData_2 = response_2.data;
                // let menuArr = responseData_2.extraImageFile3.split(',');
                saveUserID(this.props.userId);
                

                thisObject.refs.loading.close();

                let dict = {
                    email: null,
                    firstName: thisObject.props.firstName,
                    lastName: thisObject.props.lastName,
                    image: thisObject.props.image,
                    username: username,
                    mobileNumber: thisObject.props.mobileNumber,
                    code: thisObject.props.code,
                    userId: thisObject.props.userId,
                    selectedAgeGroupCode: thisObject.props.selectedAgeGroupCode,
                    description: thisObject.props.description,
                    userDesignation: thisObject.props.userDesignation,
                    gender: thisObject.props.gender,
                    userLanguage: thisObject.props.userLanguage
                };

                saveUserData(dict);

                setTimeout(function () {
                    Navigation.push(thisObject.props.componentId, {
                        component: {
                            id: 'Profile',
                            name: 'Profile',
                            passProps: {

                                ...dict,

                                language: menuArr ? menuArr[5] : null,
                                male: menuArr ? menuArr[6] : null,
                                female: menuArr ? menuArr[7] : null,
                                selProfession: menuArr ? menuArr[8] : null,
                                student: menuArr ? menuArr[9] : null,
                                salaried: menuArr ? menuArr[10] : null,
                                entrepreneur: menuArr ? menuArr[11] : null,
                                retired: menuArr ? menuArr[12] : null,
                                housewife: menuArr ? menuArr[13] : null,
                                other: menuArr ? menuArr[14] : null,
                                selAgeGroup: menuArr ? menuArr[15] : null,
                                teenager: menuArr ? menuArr[16] : null,
                                twenties: menuArr ? menuArr[17] : null,
                                thirties: menuArr ? menuArr[18] : null,
                                fourties: menuArr ? menuArr[19] : null,
                                fifties: menuArr ? menuArr[20] : null,
                                aboveSixty: menuArr ? menuArr[21] : null,
                            },
                            options: {
                                topBar: {
                                    visible: false,
                                    animate: false,
                                    drawBehind: true
                                }
                            }
                        },
                    });
                }, 500);
                // })
                // .catch(error => {
                //     console.log(error)
                // })
            })
            .catch((error) => {
                this.refs.loading.close();
                console.error(error);
            });


    }

    goHome = () => {

    }

    homeButtonTapped = () => {
        Navigation.pop(this.props.componentId);
    };



    render() {
        var { height, width } = Dimensions.get('window');

        let heightOfImage = (285 * width) / 640;

        const options = {
            behavior: Platform.OS === "ios" ? "padding" : "null"
        }

        return (
            <SafeAreaView
                forceInset={{ bottom: 'always' }}
                style={{ flex: 1 }}
                backgroundColor="white"
            >
                <KeyboardAvoidingView
                    style={{ flex: 1 }}

                    enabled
                    {...options}
                >


                    <View style={styles.headerView} backgroundColor={APP_GLOBAL_COLOR}>

                        <View style={{ flex: 1, backgroundColor: 'clear' }}>
                            <CustomButton
                                source={require('../../assets/back.png')}
                                style={{
                                    flexDirection: 'row',
                                    flex: 1,
                                    margin: normalize(5)
                                }}
                                onPress={this.homeButtonTapped}
                            />
                        </View>
                        <View style={styles.textheaderView}>
                            <Text style={styles.textView}>Select your constituency</Text>
                        </View>



                    </View>
                    <SearchBar
                        placeholder=""
                        onChangeText={this.updateSearch}
                        value={this.state.search}
                        lightTheme={true}
                    />

                    <SectionList style={{ flex: 1, width: Dimensions.get('window').width }}
                        renderItem={({ item, index, section }) =>
                            <View style={{ flex: 1, height: 40, width: null, justifyContent: "center" }}>
                                <TouchableOpacity onPress={() => {
                                    this.hitServerToUpdateData(this, index, section, item);
                                }}>
                                    <Text style={{ margin: 5, marginLeft: 30 }} key={index}>{item}</Text>
                                    <View style={{ flex: 1, height: 1, backgroundColor: "grey" }}></View>
                                </TouchableOpacity>
                            </View>
                        }
                        renderSectionHeader={({ section }) => (

                            <SectionHeader showSeperator={true} section={section} sectionTapped={(value) => {
                                let idex = this.state.data.findIndex(obj => obj === value);

                                if (this.sectionSelected === -2) {

                                    return;
                                }
                                if (idex === this.sectionSelected) {
                                    // this.setState({sectionSelected : -1})

                                    this.sectionSelected = -1
                                    // alert("asd" + idex);
                                } else {
                                    this.sectionSelected = idex

                                    // alert(idex);
                                }

                                let data = JSON.parse(JSON.stringify(this.state.originalData));
                                for (let i = 0; i < data.length; i++) {


                                    if (this.sectionSelected === i) {
                                        // alert(this.state.sectionSelected);
                                    } else {
                                        let object = data[i];
                                        // let object = data[0];
                                        object["data"] = [];
                                    }
                                }

                                this.setState({ data: data });

                            }
                            } />
                        )}
                        sections={this.state.data}
                        keyExtractor={(item, index) => item + index}
                    />


                    <View style={{
                        width: '100%', height: heightOfImage, justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image style={{ flex: 1 }} resizeMode='contain' source={require('../../assets/Login/loginBg.png')} />
                    </View>

                    <Loading
                        ref="loading" />
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    phoneInput: {
        width: '70%',
        height: 50,
        margin: 10,
        padding: 5,
    },

    textheaderView: {
        flex: 5,
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },

    headerView: {
        // flex: 0.07,
        justifyContent: 'center',
        flexDirection: 'row',
        elevation: 5,
        backgroundColor: 'white',
        height: Dimensions.get('window').height * 0.07
    },
    textView: {
        position: 'absolute',
        backgroundColor: 'transparent',
        left: 15,
        fontSize: normalize(17),
        fontWeight: 'bold',
        color: 'white'
    },
});


class SectionHeader extends Component {
    constructor(props) {
        super(props);
        // this.pushScreen = this.pushScreen.bind (this);
    }
    render() {
        return <TouchableOpacity style={{ flex: 1, height: 50, width: null, justifyContent: "center", backgroundColor: "white" }} onPress={() => {
            // alert(this.props.index);
            this.props.sectionTapped(this.props.section);
            // if (this.state.sectionSelected == section) {
            //     this.setState({ sectionSelected: -1 });
            // } else {
            //     this.setState({ sectionSelected: section });
            // }
        }
        }>

            <Text style={{ fontWeight: '600', fontSize: 15, marginLeft: 20, marginRight: 10 }}>{this.props.section.title}</Text>
            {this.props.showSeperator && <View style={{ bottom: 0, height: 0.8, backgroundColor: "grey" }}></View>}
        </TouchableOpacity>
    }
}