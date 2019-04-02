import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Alert,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native';
import { Navigation } from 'react-native-navigation';

export default class SurveyList extends Component {

    state = {
        activeSurveyList: [{
            "surveyId": 1,
            "surveyDesc": "National Survey 3",
            "isSurveyTaken": "N"
        },
        {
            "surveyId": 2,
            "surveyDesc": "National Survey 2",
            "isSurveyTaken": "N"
        }]
    }

    goToSurvey = (datta) => {
        this.props.refresh(datta.surveyId, datta.surveyDesc);
        Navigation.pop(this.props.componentId);
    }

    getList = (data) => {
        // alert(JSON.stringify(item));
        return (
            <TouchableOpacity style={{ height: 40, backgroundColor: "white", flexDirection: 'row', alignItems : 'center',padding:10 }} onPress={() => {this.goToSurvey(data.item)}}>
                <Text style={{ marginRight:10 }}>{data.item.surveyDesc}</Text>
                {data.item.isSurveyTaken === "Y" ? <Image source={require("../../assets/Profile/tick.png")} style={{ height: 20, width: 20 }} /> : null}
            </TouchableOpacity>
        )
    }

    render() {

        return (
            <SafeAreaView
                forceInset={{ bottom: 'always' }}
                style={{ flex: 1, backgroundColor: 'rgba(210,210,208,1)' }}>

                <FlatList
                    // style={styles.bottomView}
                    // onRefresh={this._onRefresh}
                    // refreshing={this.state.refreshing}
                    data={this.props.activeSurveyList}
                    ItemSeparatorComponent={() => <View style={{ height: 2, backgroundColor: 'transparent' }} />}
                    // onEndReached={this._onEndReached}
                    // onEndReachedThreshold={0.1}
                    // scrollEventThrottle={400}
                    // ListFooterComponent={() => this.footer()}
                    renderItem={(data) => this.getList(data)}
                />

            </SafeAreaView>
        )
    }
}
