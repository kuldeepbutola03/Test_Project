import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Badge, Button } from 'react-native-elements';
import { normalize, APP_GLOBAL_COLOR } from '../../../../Constant';

convertToPercentage = (value) => {
    let RoundNumber;
    let percentageNumber;
    RoundNumber = Math.trunc(value);
    percentageNumber = `${RoundNumber} `;
    return percentageNumber;
}

myTopSix = (props) => {

    return (
        <View style={styles.container}>
            <View>
                <Avatar
                    rounded
                    source={props.source}
                    size={normalize(54)}//"large"
                    avatarStyle={{ borderColor: APP_GLOBAL_COLOR, borderWidth: 2, borderRadius: normalize(27) }}
                />

                {props.resourceGpr ? <Badge
                    status="success"
                    badgeStyle={{ height: normalize(28), width: normalize(28), borderRadius: normalize(28 / 2) }}
                    containerStyle={{ position: 'absolute', top: 1, right: -20 }}
                    value={props.resourceGpr ? this.convertToPercentage(props.resourceGpr) : null}
                    textStyle={{ fontSize: 12, fontWeight: '700' }}
                /> : null}

                <Avatar
                    source={props.logo}
                    rounded
                    size={normalize(20)}
                    overlayContainerStyle={{ backgroundColor: '#fff' }}
                    imageProps={{ resizeMode: 'contain' }}
                    containerStyle={{ position: 'absolute', bottom: 1, left: -20 }}
                    avatarStyle={{}}
                />

                {props.show && props.show === "leading" && props.ind === 0 && <Text style={{ backgroundColor: APP_GLOBAL_COLOR, color: 'white', fontSize: 9, textAlign: 'center', borderRadius: 8, fontWeight: 'bold', position: 'absolute', bottom: -1, left: 5 }}>    Leading    </Text> }
                {props.show && props.show === "won" && props.ind === 0 && <Text style={{ backgroundColor: "green",alignSelf:'center', color: 'white', fontSize: 9, textAlign: 'center', borderRadius: 8, fontWeight: 'bold', position: 'absolute', bottom: -1, left: 15 }}>    Won    </Text> }
            </View>
            {props.check && <Text style={{ fontSize: normalize(9), marginTop: 15, textAlign: 'center' }} adjustsFontSizeToFit numberOfLines={1} minimumFontScale = {.08}>{props.logoName}</Text>}
            {/* <Text style={{position: 'absolute',  bottom : normalize(70), fontSize : normalize(8 ) }}>{logoCatName[0]}</Text> */}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        alignItems: 'center',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    buttonContainer: {
        marginVertical: normalize(20),
    }
})

export default myTopSix;
