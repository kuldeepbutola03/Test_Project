import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Badge, Button } from 'react-native-elements';
import { normalize, APP_GLOBAL_COLOR } from '../../../../Constant';

class TopSix_2 extends Component {
    convertToPercentage = (value) => {
        let RoundNumber;
        let percentageNumber;

        RoundNumber = Math.trunc(value);

        percentageNumber = ` ${RoundNumber}% `;

        return percentageNumber;

    }

    render() {
        const { source, logo, resourceGpr, logoName , logoCatName} = this.props;
        return (
            <View style={styles.container}>
                {/* <View style={styles.buttonContainer}>
                    {this.props.renderButton()}
                </View> */}
                <View style={styles.row}>
                    <View>
                        <Avatar
                            rounded
                            source={source[3]}
                            size={normalize(54)}//"large"
                            avatarStyle={{ borderColor: APP_GLOBAL_COLOR, borderWidth: 2, borderRadius: normalize(27) }}
                        />

                        <Badge
                            status="success"
                            badgeStyle={{ height: normalize(32), width: normalize(32), borderRadius: normalize(32 / 2) }}
                            containerStyle={{ position: 'absolute', top: 1, right: -20 }}
                            value={resourceGpr[3] ? this.convertToPercentage(resourceGpr[3]) : null}
                            textStyle={{ fontSize: 13, fontWeight: '700' }}
                        />

                        <Avatar
                            rounded
                            size={normalize(25)}
                            overlayContainerStyle={{ backgroundColor: '#fff' }}
                            imageProps={{ resizeMode: 'contain' }}
                            containerStyle={{ position: 'absolute', bottom: 1, left: -20 }}
                            source={logo[3]}
                        />
                        {/* <Text style = {{position: 'absolute',  top : normalize(70) , fontSize : normalize(8) }}>{logoName[3]}</Text> */}
                        {/* <Text style={{position: 'absolute',  bottom : normalize(70), fontSize : normalize(8 ) }}>{logoCatName[3]}</Text> */}
                    </View>
                    <View>
                        <Avatar
                            rounded
                            source={source[4]}
                            size={normalize(54)}//"large"
                            avatarStyle={{ borderColor: APP_GLOBAL_COLOR, borderWidth: 2, borderRadius: normalize(27) }}
                        />

                        <Badge
                            status="success"
                            badgeStyle={{ height: normalize(32), width: normalize(32), borderRadius: normalize(32 / 2) }}
                            containerStyle={{ position: 'absolute', top: 1, right: -20 }}
                            value={resourceGpr[4] ? this.convertToPercentage(resourceGpr[4]) : null}
                            textStyle={{ fontSize: 13, fontWeight: '700' }}

                        />

                        <Avatar
                            source={logo[4]}
                            rounded
                            size={normalize(25)}
                            overlayContainerStyle={{ backgroundColor: '#fff' }}
                            imageProps={{ resizeMode: 'contain' }}
                            containerStyle={{ position: 'absolute', bottom: 1, left: -20 }}
                            avatarStyle={{}}

                        />
                        {/* <Text style = {{position: 'absolute',  top : normalize(70) , fontSize : normalize(8) }}>{logoName[4]}</Text> */}
                        {/* <Text style={{position: 'absolute',  bottom : normalize(70), fontSize : normalize(8 ) }}>{logoCatName[4]}</Text> */}
                    </View>
                    <View>
                        <Avatar
                            rounded
                            source={source[5]}
                            size={normalize(54)}//"large"
                            avatarStyle={{ borderColor: APP_GLOBAL_COLOR, borderWidth: 2, borderRadius: normalize(27) }}
                        />

                        <Badge
                            status="success"
                            badgeStyle={{ height: normalize(32), width: normalize(32), borderRadius: normalize(32 / 2) }}
                            containerStyle={{ position: 'absolute', top: 1, right: -20 }}
                            value={resourceGpr[5] ? this.convertToPercentage(resourceGpr[5]) : null}
                            textStyle={{ fontSize: 13, fontWeight: '700' }}
                        />

                        <Avatar
                            source={logo[5]}
                            rounded
                            size={normalize(25)}
                            overlayContainerStyle={{ backgroundColor: '#fff' }}
                            imageProps={{ resizeMode: 'contain' }}
                            containerStyle={{ position: 'absolute', bottom: 1, left: -20 }}
                        />
                        {/* <Text style = {{position: 'absolute',  top : normalize(70) , fontSize : normalize(8) }}>{logoName[5]}</Text> */}
                        {/* <Text style={{position: 'absolute',  bottom : normalize(70), fontSize : normalize(8 ) }}>{logoCatName[5]}</Text> */}
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
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

export default TopSix_2;
