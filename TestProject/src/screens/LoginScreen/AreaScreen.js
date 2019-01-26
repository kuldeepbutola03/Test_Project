import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,

    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    SectionList
} from 'react-native';
// import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import { Navigation } from 'react-native-navigation';
import { PropTypes } from 'prop-types';
// import ButtonMod from '../../components/UI/ButtonMod/ButtonMod';
// import PhoneInput from 'react-native-phone-input';
// import HeaderText from '../../components/UI/HeaderText/HeaderText';
import { SEND_OTP, DEBUG, UPDATE_USER_AREA } from '../../../Apis';
import { authHeaders, normalize, getUserID } from '../../../Constant';
import Accordion from 'react-native-collapsible/Accordion';

import Loading from 'react-native-whc-loading';

export default class AreaScreen extends Component {
    static propTypes = {
        componentId: PropTypes.string,
    };

    state = {

        activeSections: [0, 1],

        data: [],
        originalData: []

    }
    user_id = 1;
    sectionSelected = -1;
    constructor(props) {
        super(props);
        // this.pushScreen = this.pushScreen.bind (this);
    }
    componentDidMount() {
        // alert(JSON.stringify(this.state.originalData));
        // "UP_Uttar Pradesh": [
        //     "Thana Atta"
        // ],
        // "DL_Delhi": [
        //     "Thana New Delhi"
        // ],
        // "TX_Texas": [
        //     "DallasUrban"
        // ]

        getUserID().then((value) => {
            this.user_id = value;
            // alert(value);
        }

        )

        var dict = this.props.data;
        var arr = [];

        for (var key in dict) {
            let data = dict[key];
            let itemCode = key.split("_");
            let code = itemCode[0];
            let item = itemCode[1];
            arr.push({ data: data, title: item, code: code });
        }

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



    _updateSections = activeSections => {
        this.setState({ activeSections });
    };


    //   returView = () => {
    //     for(let i = 0; i < section.data.length; i++){
    //         <Text style={{ margin: 5 }}>{section.data[i]}</Text>
    //     }
    //   }

    hitServerToUpdateData = (thisObject, idex, section, area) => {

        // alert(idex + "  " + JSON.stringify(section));
        let code = section["code"];
        // let area = section["code"];

        let body = JSON.stringify({
            userId: this.user_id,
            userState: code,
            userPolArea: area

        })

        this.refs.loading.show();
        // alert(body);
        // {
        //     "userId": "14",
        //         "userPolArea": "POLICE AREA",
        //             "userState": "Al"
        // }

        fetch(UPDATE_USER_AREA, {
            method: 'POST',
            headers: authHeaders(),
            body: body,
        }).then((response) => response.json())
            .then((responseJson) => {

                thisObject.refs.loading.close();
                setTimeout(function () {
                    // alert(responseJson.response);
                    Navigation.push(thisObject.props.componentId, {
                        component: {
                            id: 'Profile',
                            name: 'Profile',
                            passProps: {
                                email: null,
                                image: null,
                                name: null,
                                mobileNumber: thisObject.props.mobileNumber,
                                code: thisObject.props.code
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
                }, 1000);

            })
            .catch((error) => {
                this.refs.loading.close();
                console.error(error);
            });


    }

    render() {
        // let data = [];




        var { height, width } = Dimensions.get('window');
        const options = {
            behavior: Platform.OS === "ios" ? "padding" : "null"
        }
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        margin: 30,
                        width: width - 30,

                    }}
                    {...options}
                    enabled
                >
                    <SectionList style={{ flex: 1, width: Dimensions.get('window').width }}
                        renderItem={({ item, index, section }) =>
                            <View style={{ flex: 1 , height: 40, width: null, justifyContent: "center" }}>
                                <TouchableOpacity onPress={() => {
                                    this.hitServerToUpdateData(this, index, section, item);
                                }}>
                                    <Text style={{ margin: 5, marginLeft: 20 }} key={index}>{item}</Text>
                                    <View style={{ flex: 1, height: 1, backgroundColor: "grey" }}></View>
                                </TouchableOpacity>
                            </View>
                        }
                        renderSectionHeader={({ section }) => (

                            <SectionHeader section={section} sectionTapped={(value) => {
                                let idex = this.state.data.findIndex(obj => obj === value);

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




                    <Loading
                        ref="loading" />
                </KeyboardAvoidingView>
            </View>
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

            <Text style={{ fontWeight: 'bold', fontSize: 16, marginLeft: 10, marginRight: 10 }}>{this.props.section.title}</Text>
            <View style={{ bottom: 0, height: 1, backgroundColor: "grey" }}></View>
        </TouchableOpacity>
    }
}