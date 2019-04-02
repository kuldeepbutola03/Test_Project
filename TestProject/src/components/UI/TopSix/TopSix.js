import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Badge, Button } from 'react-native-elements';
import { normalize, APP_GLOBAL_COLOR } from '../../../../Constant';

class TopSix extends Component {
    convertToPercentage = (value) => {
        let RoundNumber;
        let percentageNumber;

        RoundNumber = Math.trunc(value);

        percentageNumber = `${RoundNumber}%`;

        return percentageNumber;

    }

    render() {
        const { source, logo, resourceGpr, logoName , logoCatName} = this.props;
        return (
            <View style={styles.container}>
                {/* <View style={styles.row}> */}
                    {/* <View style = {{justifyContent : 'center' , alignItems : 'center'}}> */}
                    <View>
                        <Avatar
                            rounded
                            source={source[0]}
                            size={normalize(54)}//"large"
                            avatarStyle={{ borderColor: APP_GLOBAL_COLOR, borderWidth: 2, borderRadius: normalize(27) }}
                        />

                        <Badge
                           status="success"
                           badgeStyle={{ height: normalize(32), width: normalize(32), borderRadius: normalize(32 / 2) }}
                           containerStyle={{ position: 'absolute', top: 1, right: -20 }}
                           value={resourceGpr[0] ? this.convertToPercentage(resourceGpr[0]) : null}
                           textStyle={{ fontSize: 13, fontWeight: '700' }}
                        />

                        <Avatar
                            source={logo[0]}
                            rounded
                            size={normalize(25)}
                            overlayContainerStyle={{ backgroundColor: '#fff' }}
                            imageProps={{ resizeMode: 'contain' }}
                            containerStyle={{ position: 'absolute', bottom: 1, left: -20 }}
                            avatarStyle={{}}
                        />
                        {/* <Text style = {{position: 'absolute',  top : normalize(70) , fontSize : normalize(8) }}>{logoName[0]}</Text> */}
                        {/* <Text style={{position: 'absolute',  bottom : normalize(70), fontSize : normalize(8 ) }}>{logoCatName[0]}</Text> */}
                    </View>
                    <View>
                        <Avatar
                            rounded 
                            source={source[1]}
                            size={normalize(54)}//"large"
                            avatarStyle={{ borderColor: APP_GLOBAL_COLOR, borderWidth: 2, borderRadius: normalize(27) }}
                        />

                        <Badge
                            status="success"
                            badgeStyle={{ height: normalize(32), width: normalize(32), borderRadius: normalize(32 / 2) }}
                            containerStyle={{ position: 'absolute', top: 1, right: -20 }}
                            value={resourceGpr[1] ? this.convertToPercentage(resourceGpr[1]) : null}
                            textStyle={{ fontSize: 13, fontWeight: '700' }}
                        />

                        <Avatar
                            source={logo[1]}
                            rounded
                            size={normalize(25)}
                            overlayContainerStyle={{ backgroundColor: '#fff' }}
                            imageProps={{ resizeMode: 'contain' }}
                            containerStyle={{ position: 'absolute', bottom: 1, left: -20 }}
                        />
                        {/* <Text style = {{position: 'absolute',  top : normalize(70) , fontSize : normalize(8) }}>{logoName[1]}</Text> */}
                        {/* <Text style={{position: 'absolute',  bottom : normalize(70), fontSize : normalize(8 ) }}>{logoCatName[1]}</Text> */}
                    </View>
                    <View>
                        <Avatar
                            rounded
                            source={source[2]}
                            size={normalize(54)}//"large"
                            avatarStyle={{ borderColor: APP_GLOBAL_COLOR, borderWidth: 2, borderRadius: normalize(27) }}
                        />

                        <Badge
                            status="success"
                            badgeStyle={{ height: normalize(32), width: normalize(32), borderRadius: normalize(32 / 2) }}
                            containerStyle={{ position: 'absolute', top: 1, right: -20 }}
                            value={resourceGpr[2] ? this.convertToPercentage(resourceGpr[2]) : null}
                            textStyle={{ fontSize: 13, fontWeight: '700' }}
                        />

                        <Avatar
                            source={logo[2]}
                            rounded
                            size={normalize(25)}
                            overlayContainerStyle={{ backgroundColor: '#fff' }}
                            imageProps={{ resizeMode: 'contain' }}
                            containerStyle={{ position: 'absolute', bottom: 1, left: -20 }}
                        />
                        {/* <Text style = {{position: 'absolute',  top : normalize(70) , fontSize : normalize(8) }}>{logoName[2]}</Text> */}
                        {/* <Text style={{position: 'absolute',  bottom : normalize(70), fontSize : normalize(8 ) }}>{logoCatName[2]}</Text> */}
                    </View>
                {/* </View> */}
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        alignItems: 'center'
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

export default TopSix;
