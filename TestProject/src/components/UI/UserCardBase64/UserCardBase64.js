import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Platform,
    Image
} from 'react-native';
import { normalize } from '../../../../Constant';
import Test from '../../../screens/LoginScreen/Test';

export default userCardBase64 = props => (
    <TouchableOpacity style={props.style} onPress = {props.onPress}>

        <View style={{ flex: 1 }}>
            <Image
                style={{
                    flex: 1,
                    // margin: 5,
                    height: null,
                    width: null,
                    borderRadius: props.borderRadius,
                }}
                // source={props.image}
                source={{
                    uri:
                      `data:image/png;base64,${props.image ? props.image : require('../../../assets/logoComp.png')}`,
                }}
                resizeMode="cover"
            />
            <Image
                style={{
                    position: 'absolute',
                    bottom:  normalize(4) ,
                    right:  normalize(4),
                    // // borderRight: 10,
                    // // marginVertical: 10,
                    // // padding : 10,
                    height: normalize(30),
                    width: normalize(30),
                    backgroundColor: 'transparent',
                }}
                source={{
                    uri:
                      `data:image/png;base64,${props.catImage ? props.catImage : require('../../../assets/logoComp.png')}`,
                }}
                // source={props.catImage ? props.catImage : require('../../../assets/logoComp.png')}
                resizeMode="cover"
            />
            {
                props.gpr && props.gpr >= 1 ?
                <View
                    style={{
                        position: 'absolute',
                        bottom: 5 ,
                        left: 5,
                        // // borderRight: 10,
                        // // marginVertical: 10,
                        // // padding : 10,
                        height: normalize(40),
                        width: normalize(40),
                        backgroundColor: 'transparent',
                        borderRadius: normalize(40) / 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor : props.gprColor
                    }}
                >
                    <Text style = {{color : 'white' , fontSize : normalize(15) , fontWeight : '600'}}>{props.gpr}%</Text>
                </View> : null
            }
        </View>
    </TouchableOpacity>

);



