import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableWithoutFeedback, 
    LayoutAnimation, 
    UIManager,
    Platform, 
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Card } from 'react-native-elements';
import { widthPercentageToDP as wd, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { APP_GLOBAL_COLOR } from '../../../../../Constant';

class PictureQuestionView extends Component {
    constructor(props) {
        super(props);

 
        if (Platform.OS === 'android'){
          UIManager.setLayoutAnimationEnabledExperimental(true)
        }
    }
    
    render() {
        const { data } = this.props;
        let pictureSource = data.imageData ? 
            {  
                uri: "data:image/png;base64," + data.imageData , 
                priority: FastImage.priority.normal 
            } : null;
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                    this.props.onPress()
                }}>
                {/* style={styles.container}> */}
                <View style={styles.container}>
                    <FastImage 
                        resizeMode="contain"
                        style={styles.image}
                        source={pictureSource}
                    />
                    <View style={{ }}>
                        <Text style={styles.answerText}> {data.answerText} </Text>
                    </View>
                    {this.props.data.answerId === this.props.userAnswerId ? 
                        <AntDesign 
                            size={hp('3%')} 
                            color={APP_GLOBAL_COLOR} 
                            style={styles.icon}
                            name="checkcircle"/> : null
                    }
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // width: wd('39%'),
        marginBottom: hp('2%'),
        borderWidth: 1,
        borderColor: '#ddd',
        marginLeft: hp('1%'),
        marginRight: hp('1.5%'),
        position: 'relative',
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },

    image: {
        flex: 1,
        height: hp('23%'),
        width: null,
        marginBottom: hp('2%'),
    },

    answerText: {
        textAlign: 'center',
        marginLeft: hp('1%'),
        marginBottom: hp('1%'),
        fontSize: hp('2%')
    },

    icon: {
        position: 'absolute',
        top: hp('1%'),
        left: hp('1%')
    }
})

export default PictureQuestionView