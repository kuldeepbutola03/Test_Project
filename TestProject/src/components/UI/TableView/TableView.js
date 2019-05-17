import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    Dimensions
} from 'react-native';
import { normalize } from '../../../../Constant';
import Circle from '../ResultPoll/Circle';




getImage = (value) => {
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
    const arr = Object.keys(val)
    const data = arr.map(function (item) {
        if (name == item) {
            return val[item]
        } else return null
    });

    return data[0]
}


tableView = (props) => {
    // alert(props.slide)
    if (props.type === "e") {
        if (props.activeSlide == 0) {
            return (
                <View style={{ flex: 1 }}>
                    <Image style={{ resizeMode: 'contain', height: '100%', width: '100%' }} source={props.item[0]} />
                </View>
            )
        } else if (props.activeSlide === 1 || (props.activeSlide === 2)) {
            // let minValue = 

            return (
                <View style={{ flex: 1, alignItems: 'center', }}>
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
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', flex: 1 }}>2014</Text>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', flex: 1 }}>Gain</Text>
                    </View>
                    <ScrollView style={{flex : 1 , width : Dimensions.get('window').width}}>
                        {props.item.map((val, index) => {
                            return (
                                <View key={index} style={styles.container}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                        {val.categoryLogoData ? <Image source={{ uri: "data:image/png;base64," + getImageData(val.groupName, props.logo) }} style={{ height: 20, width: 20 }} /> : null}
                                        <Text numberOfLines={1} style={val.categoryLogoData ? { fontSize: normalize(14), margin: 2 } : styles.text}>{val.groupName}</Text>
                                    </View>

                                    <Text style={styles.text}>{val.exitSeats}<Text style={{ fontSize: 8, padding: 10 }}>{'\n'}({getRange(val.exitSeats, val.totalSeats)})</Text></Text>

                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={styles.text}>{val.lastElectionSeats}</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
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
        if (props.activeSlide == 0) {
            return (
                <View style={{ flex: 1 }}>
                    <Image style={{ resizeMode: 'contain', height: '100%', width: '100%' }} source={props.item[0]} />
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
                            <Text style={styles.headerText}></Text>
                            <Text style={styles.headerText}>Leading</Text>
                            <Text style={styles.headerText}>Won</Text>
                            <Text style={styles.headerText}>Total</Text>
                            <Text style={styles.headerText}>2014</Text>
                            <Text style={styles.headerText}>Gain</Text>
                        </View>
                        {props.item.map((val, index) => {
                            return (
                                <View key={index} style={styles.container}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                        {val.categoryLogoData ? <Image source={{ uri: "data:image/png;base64," + getImageData(val.groupName, props.logo) }} style={{ height: 20, width: 20 }} /> : null}
                                        <Text numberOfLines={1} style={val.categoryLogoData ? { fontSize: normalize(14), margin: 2 } : styles.text}>{val.groupName}</Text>
                                    </View>
                                    <Text style={styles.text}>{val.leadingSeats}</Text>
                                    <Text style={styles.text}>{val.wonSeats}</Text>
                                    <Text style={styles.text}>{val.totalSeats}</Text>
                                    <Text style={styles.text}>{val.lastElectionSeats}</Text>

                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ textAlign: 'right', flex: 2, paddingRight: 5 }}>{Math.abs(val.plusMinusSymbol)}</Text>
                                        <View style={{ flex: 1, alignItems: 'flex-start' }}>
                                            <Image resizeMode='contain' source={getImage(val.plusMinusSymbol)} style={{ width: 15, height: 15, paddingLeft: 5 }} />
                                        </View>
                                    </View>
                                </View>
                            )
                        })}
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
        backgroundColor: 'white'
    },
    text: {
        flex: 1,
        textAlign: 'center',
        fontSize: normalize(14)
    },
    headerText: {
        textAlign: 'center',
        fontWeight: 'bold',
        flex: 1,
        fontSize: normalize(14)
    }
})

export default tableView;


