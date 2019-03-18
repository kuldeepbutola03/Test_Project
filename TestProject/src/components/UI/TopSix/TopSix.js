import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Badge, Button } from 'react-native-elements';
import { normalize, APP_GLOBAL_COLOR } from '../../../../Constant';

class TopSix extends Component {
    render() {
        const { source, logo, resourceGpr, logoName , logoCatName} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <View style = {{justifyContent : 'center' , alignItems : 'center'}}>
                        
                        <Avatar
                            rounded
                            // source={{
                            //     uri: 'https://randomuser.me/api/portraits/men/41.jpg',
                            // }}
                            source={source[0]}
                            size={normalize(60)}//"large"
                            avatarStyle={{ borderColor: APP_GLOBAL_COLOR, borderWidth: 2, borderRadius: normalize(30) }}
                        />

                        <Badge
                            status="success"
                            badgeStyle={{ height: normalize(27), width: normalize(27), borderRadius: normalize(27 / 2) }}
                            containerStyle={{ position: 'absolute', top: 1, right: -20 }}
                            value={resourceGpr[0] ? resourceGpr[0].toFixed(1) : null}
                            textStyle={{ fontSize: 11 }}
                        />

                        <Avatar
                            // source={{
                            //     uri: 'https://randomuser.me/api/portraits/men/41.jpg',
                            // }}
                            source={logo[0]}
                            rounded
                            size={normalize(25)}
                            overlayContainerStyle={{ backgroundColor: '#fff' }}
                            imageProps={{ resizeMode: 'contain' }}
                            containerStyle={{ position: 'absolute', bottom: 1, left: -20 }}
                            avatarStyle={{}}
                        />
                        <Text style = {{position: 'absolute',  top : normalize(70) , fontSize : normalize(8) }}>{logoName[0]}</Text>
                        <Text style={{position: 'absolute',  bottom : normalize(70), fontSize : normalize(8 ) }}>{logoCatName[0]}</Text>
                    </View>
                    <View>
                        <Avatar
                            rounded 
                            // source={{
                            //     uri: 'https://randomuser.me/api/portraits/men/41.jpg',
                            // }}
                            source={source[1]}
                            size={normalize(60)}//"large"
                            avatarStyle={{ borderColor: APP_GLOBAL_COLOR, borderWidth: 2, borderRadius: normalize(30) }}
                        />

                        <Badge
                            status="success"
                            badgeStyle={{ height: normalize(27), width: normalize(27), borderRadius: normalize(27 / 2) }}
                            containerStyle={{ position: 'absolute', top: 1, right: -20 }}
                            value={resourceGpr[1] ? resourceGpr[1].toFixed(1) : null}
                            textStyle={{ fontSize: 11 }}
                        />

                        <Avatar
                            // source={{
                            //     uri: 'https://randomuser.me/api/portraits/men/41.jpg',
                            // }}
                            source={logo[1]}
                            rounded
                            size={normalize(25)}
                            overlayContainerStyle={{ backgroundColor: '#fff' }}
                            imageProps={{ resizeMode: 'contain' }}
                            containerStyle={{ position: 'absolute', bottom: 1, left: -20 }}
                        />
                        <Text style = {{position: 'absolute',  top : normalize(70) , fontSize : normalize(8) }}>{logoName[1]}</Text>
                        <Text style={{position: 'absolute',  bottom : normalize(70), fontSize : normalize(8 ) }}>{logoCatName[1]}</Text>
                    </View>
                    <View>
                        <Avatar
                            rounded
                            // source={{
                            //     uri: 'https://randomuser.me/api/portraits/men/41.jpg',
                            // }}
                            source={source[2]}
                            size={normalize(60)}//"large"
                            avatarStyle={{ borderColor: APP_GLOBAL_COLOR, borderWidth: 2, borderRadius: normalize(30) }}
                        />

                        <Badge
                            status="success"
                            badgeStyle={{ height: normalize(27), width: normalize(27), borderRadius: normalize(27 / 2) }}
                            containerStyle={{ position: 'absolute', top: 1, right: -20 }}
                            value={resourceGpr[2] ? resourceGpr[2].toFixed(1) : null}
                            textStyle={{ fontSize: 11 }}
                        />

                        <Avatar
                            // source={{
                            //     uri: 'https://randomuser.me/api/portraits/men/41.jpg',
                            // }}
                            source={logo[2]}
                            rounded
                            size={normalize(25)}
                            overlayContainerStyle={{ backgroundColor: '#fff' }}
                            imageProps={{ resizeMode: 'contain' }}
                            containerStyle={{ position: 'absolute', bottom: 1, left: -20 }}
                        />
                        <Text style = {{position: 'absolute',  top : normalize(70) , fontSize : normalize(8) }}>{logoName[2]}</Text>
                        <Text style={{position: 'absolute',  bottom : normalize(70), fontSize : normalize(8 ) }}>{logoCatName[2]}</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    {this.props.renderButton()}
                </View>
                <View style={styles.row}>
                    <View>
                        <Avatar
                            rounded
                            // source={{
                            //     uri: 'https://randomuser.me/api/portraits/men/41.jpg',
                            // }}
                            source={source[3]}
                            size={normalize(60)}//"large"
                            avatarStyle={{ borderColor: APP_GLOBAL_COLOR, borderWidth: 2, borderRadius: normalize(30) }}
                        />

                        <Badge
                            status="success"
                            badgeStyle={{ height: normalize(27), width: normalize(27), borderRadius: normalize(27 / 2) }}
                            containerStyle={{ position: 'absolute', top: 1, right: -20 }}
                            value={resourceGpr[3] ? resourceGpr[3].toFixed(1) : null}
                            textStyle={{ fontSize: 11 }}
                        />

                        <Avatar
                            // source={{
                            //     uri: 'https://randomuser.me/api/portraits/men/41.jpg',
                            // }}

                            rounded
                            size={normalize(25)}
                            overlayContainerStyle={{ backgroundColor: '#fff' }}
                            imageProps={{ resizeMode: 'contain' }}
                            containerStyle={{ position: 'absolute', bottom: 1, left: -20 }}
                            source={logo[3]}
                        />
                        <Text style = {{position: 'absolute',  top : normalize(70) , fontSize : normalize(8) }}>{logoName[3]}</Text>
                        <Text style={{position: 'absolute',  bottom : normalize(70), fontSize : normalize(8 ) }}>{logoCatName[3]}</Text>
                    </View>
                    <View>
                        <Avatar
                            rounded
                            // source={{
                            //     uri: 'https://randomuser.me/api/portraits/men/41.jpg',
                            // }}
                            source={source[4]}
                            size={normalize(60)}//"large"
                            avatarStyle={{ borderColor: APP_GLOBAL_COLOR, borderWidth: 2, borderRadius: normalize(30) }}
                        />

                        <Badge
                            status="success"
                            badgeStyle={{ height: normalize(27), width: normalize(27), borderRadius: normalize(27) }}
                            containerStyle={{ position: 'absolute', top: 1, right: -20 }}
                            value={resourceGpr[4] ? resourceGpr[4].toFixed(1) : null}
                            textStyle={{ fontSize: 11 }}

                        />

                        <Avatar
                            // source={{
                            //     uri: 'https://randomuser.me/api/portraits/men/41.jpg',
                            // }}
                            source={logo[4]}
                            rounded
                            size={normalize(25)}
                            overlayContainerStyle={{ backgroundColor: '#fff' }}
                            imageProps={{ resizeMode: 'contain' }}
                            containerStyle={{ position: 'absolute', bottom: 1, left: -20 }}
                            avatarStyle={{}}

                        />
                        <Text style = {{position: 'absolute',  top : normalize(70) , fontSize : normalize(8) }}>{logoName[4]}</Text>
                        <Text style={{position: 'absolute',  bottom : normalize(70), fontSize : normalize(8 ) }}>{logoCatName[4]}</Text>
                    </View>
                    <View>
                        <Avatar
                            rounded
                            // source={{
                            //     uri: 'https://randomuser.me/api/portraits/men/41.jpg',
                            // }}
                            source={source[5]}
                            size={normalize(60)}//"large"
                            avatarStyle={{ borderColor: APP_GLOBAL_COLOR, borderWidth: 2, borderRadius: normalize(30) }}
                        />

                        <Badge
                            status="success"
                            badgeStyle={{ height: normalize(27), width: normalize(27), borderRadius: normalize(27) }}
                            containerStyle={{ position: 'absolute', top: 1, right: -20 }}
                            value={resourceGpr[5] ? resourceGpr[5].toFixed(1) : null}
                            textStyle={{ fontSize: 11 }}
                        />

                        <Avatar
                            // source={{
                            //     uri: 'https://randomuser.me/api/portraits/men/41.jpg',
                            // }}
                            source={logo[5]}
                            rounded
                            size={normalize(25)}
                            overlayContainerStyle={{ backgroundColor: '#fff' }}
                            imageProps={{ resizeMode: 'contain' }}
                            containerStyle={{ position: 'absolute', bottom: 1, left: -20 }}
                        />
                        <Text style = {{position: 'absolute',  top : normalize(70) , fontSize : normalize(8) }}>{logoName[5]}</Text>
                        <Text style={{position: 'absolute',  bottom : normalize(70), fontSize : normalize(8 ) }}>{logoCatName[5]}</Text>
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

export default TopSix;