import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    Dimensions,
    Platform
} from 'react-native';
import { normalize } from '../../../../Constant';
import Circle from '../ResultPoll/Circle';





function getImage (value) {
    if (value > 0) {
        let path = require('../../../assets/Extra/up.png')
        return path
    } else if (value < 0) {
        let path = require('../../../assets/Extra/down.png')
        return path
    } else if (value === 0) {
        let path = require('../../../assets/Extra/dash.png')
        return path
    }
}

getRange = (exit, total) => {
    let mininum = exit - (exit * (5 / 100));
    let maximum = exit + (exit * (5 / 100));

    let min = mininum < 0 ? 0 : mininum;
    let max = maximum >= total ? total : maximum;

    return Math.ceil(min) + " - " + Math.ceil(max)

}

getImageData = (name, val) => {
    let data = '';
    data = val[name]
    return data;
}


tableView = (props) => {
    // alert(props.slide)
    if (props.activeSlide > 3) {
        return (
            <View style={{ flex: 1 }}>
                <Image style={{ resizeMode: 'contain', height: '100%', width: '100%' }} source={props.item} />
            </View>
        )
    }
    if (props.type === "e") {
        if (props.activeSlide == 0 || props.activeSlide == 3) {
            return (
                <View style={{ flex: 1 }}>
                    <Image style={{ resizeMode: 'contain', height: '100%', width: '100%' }} source={props.item[0]} />
                </View>
            )
        } else if (props.activeSlide === 1 || (props.activeSlide === 2)) {
            // let minValue = 

            return (
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginVertical: 5,
                        // paddingVertical: 5,
                        // marginBottom:5,
                        // marginTop: 0,
                        // backgroundColor: 'white'
                    }}>

                        <Text style={{ textAlign: 'center', fontWeight: 'bold', flex: 2 }}></Text>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', flex: 0.6 }}>2014</Text>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', flex: 0.6 }}>Gain</Text>
                    </View>
                    <ScrollView style={{ flex: 1, width: Dimensions.get('window').width, paddingHorizontal: 5 }}>
                        {props.item.map((val, index) => {
                            let data = this.getImageData(val.groupName, props.logo);
                            // data = data === "" ? null : "data:image/png;base64," + data;

                            return (
                                <View key={index} style={styles.container}>
                                    <View style={{ flex: 1.4, flexDirection: 'row', alignItems: 'center' }}>
                                        {<Image source={{ uri: "data:image/png;base64," + data }} style={{ height: 20, width: 20 }} />}
                                        <Text adjustsFontSizeToFit minimumFontScale={.08} numberOfLines={Platform.OS === 'ios' ? 1 : 0} style={data ? { fontSize: normalize(14), margin: 2 } : styles.name}>{val.groupName}</Text>
                                    </View>

                                    <View style={{ flex: 0.6, alignItems: 'center', justifyContent: 'center', }}>
                                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 16 }}>{val.exitSeats}</Text>
                                            <Text style={{ position: 'absolute', fontSize: 8, bottom: -10, }}>({getRange(val.exitSeats, val.totalSeats)})</Text>
                                        </View>

                                    </View>


                                    <View style={{ flex: 0.6, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={styles.text}>{val.lastElectionSeats}</Text>
                                    </View>

                                    <View style={{ flex: 0.6, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ textAlign: 'right', flex: 2, paddingRight: 5 }}>{Math.abs(val.plusMinusSymbol)}</Text>
                                        <View style={{ flex: 1, alignItems: 'flex-start' }}>
                                            <Image resizeMode='contain' source={getImage(val.plusMinusSymbol)} style={{ width: 15, height: 15, paddingLeft: 5 }} />
                                        </View>
                                    </View>

                                </View>
                            )
                        })}
                    </ScrollView>
                </View>
            )
        } else {
            return <Circle Width={props.Width} Height={props.Height + (props.item.length <= 4 ? (props.item.length <= 2 ? props.Height / 2 : props.Height / 8) : 0)} data={props.item} />
            // return <Circle Width={props.Width} Height={props.Height} data={props.item} />
        }

    } else if (props.type === "r") {
        if (props.activeSlide == 0 || props.activeSlide == 3) {
            return (
                <View style={{ flex: 1 }}>
                    <Image style={{ resizeMode: 'contain', height: '100%', width: '100%' }} source={props.item[1]} />
                </View>
            )
        } else
            if (props.activeSlide !== 3) {
                return (
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginVertical: 5,
                            // paddingVertical: 5,
                            // marginBottom:5,
                            // marginTop: 0,
                            // backgroundColor: 'white'
                        }}>
                            <Text style={styles.headerTextName}></Text>
                            <Text style={styles.headerTextR}>Leads</Text>
                            <Text style={styles.headerTextR}>Won</Text>
                            <Text style={styles.headerTextR}>Total</Text>
                            <Text style={styles.headerTextR}>2014</Text>
                            <Text style={styles.headerTextR}>Gain</Text>
                        </View>
                        <ScrollView style={{ flex: 1, width: Dimensions.get('window').width, paddingHorizontal: 5 }}>
                            {props.item.map((val, index) => {
                                let data = this.getImageData(val.groupName, props.logo);
                                // data = data === "" ? null : "data:image/png;base64," + data;
                                return (

                                    <View key={index} style={styles.container}>
                                        <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
                                            {<Image source={{ uri: "data:image/png;base64," + data }} style={{ height: 20, width: 20 }} />}
                                            <Text adjustsFontSizeToFit minimumFontScale={.08} numberOfLines={Platform.OS === 'ios' ? 0 : 0} style={data ? { fontSize: normalize(11), margin: 2 } : styles.nameR}>{val.groupName}</Text>
                                        </View>
                                        <View style = {{flex : 1,alignItems: 'center', justifyContent: 'center' }}>
                                            <Text >{val.leadingSeats}</Text>
                                        </View>
                                        <View style = {{flex : 1,alignItems: 'center', justifyContent: 'center' }}>
                                        <Text >{val.wonSeats}</Text>
                                        </View>
                                        <View style = {{flex : 1,alignItems: 'center', justifyContent: 'center' }}>
                                        <Text >{val.leadingSeats + val.wonSeats >  val.totalSeats ? val.totalSeats :  val.leadingSeats + val.wonSeats}</Text>
                                        </View>
                                        <View style = {{flex : 1,alignItems: 'center', justifyContent: 'center' }}>
                                        <Text >{val.lastElectionSeats}</Text>
                                        </View>

                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ textAlign: 'right', flex: 2, paddingRight: 5, fontSize : 11 }}>{Math.abs(val.plusMinusSymbol)}</Text>
                                            <View style={{ flex: 1, alignItems: 'flex-start' }}>
                                                <Image resizeMode='contain' source={getImage(val.plusMinusSymbol)} style={{ width: 15, height: 15, paddingLeft: 5 }} />
                                            </View>
                                        </View>
                                    </View>
                                )
                            })}</ScrollView>
                    </View>
                )
            } else {
                return <Circle Width={props.Width} Height={props.Height + (props.item.length <= 4 ? (props.item.length <= 2 ? props.Height / 2 : props.Height / 4) : 0)} data={props.item} />
            }

    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 5,
        // marginBottom: 5,
        // marginTop: 0,
        paddingVertical: 5,

        backgroundColor: 'white',

    },

    text: {
        flex: 1,
        textAlign: 'center',
        fontSize: normalize(14)
    },
    textR: {
        flex: 1,
        textAlign: 'center',
        fontSize: normalize(11)
    },
    name: {
        flex: 1,
        textAlign: 'left',
        fontSize: normalize(14),
        // paddingLeft:5
    },
    nameR: {
        flex: 1,
        textAlign: 'left',
        fontSize: normalize(11),
        // paddingLeft:5
    },
    headerText: {
        textAlign: 'center',
        fontWeight: 'bold',
        flex: 1,
        fontSize: normalize(14)
    },
    headerTextR: {
        textAlign: 'center',
        fontWeight: 'bold',
        flex: 1,
        fontSize: normalize(11)
    },
    headerTextName: {
        textAlign: 'center',
        fontWeight: 'bold',
        flex: 2,
        fontSize: normalize(14)
    }
})

export default tableView;


