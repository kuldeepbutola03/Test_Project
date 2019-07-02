import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { APP_GLOBAL_COLOR } from '../../../../Constant';
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SpinKit from 'react-native-spinkit';

class Spinner extends Component {
    render() {
        return (
            <View style={styles.containerStyle}>
                <SpinKit 
                    isVisible 
                    size={hp('3%')}
                    type={'ChasingDots'} 
                    color={this.props.color ? this.props.color : APP_GLOBAL_COLOR}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        marginVertical: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Spinner;