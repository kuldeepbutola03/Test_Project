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
import { APP_GLOBAL_COLOR } from '../../../../../Constant';
// import { normalize } from '../../../../../Constant';


export default choiceView = props => (

    <View style={{ ...props.style, flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => {
            // alert(props.index + ' ' + props.currentIndex);
            props.onChangeData(props.index);

        }} style={{ flex: 1, flexDirection: 'row' }}>



            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'flex-end' }} >
                {props.currentIndex == props.index &&
                    <View style={{ marginRight: 10, width: 20, height: 20, borderRadius: 10, backgroundColor: APP_GLOBAL_COLOR }} />
                }


            </View>
            <View style={{ flex: 8.5, padding: 5 }}>
                <Text>{props.value} </Text>
            </View>
        </TouchableOpacity>
    </View>

);



