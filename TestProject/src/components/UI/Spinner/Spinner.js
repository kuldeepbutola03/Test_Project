import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { APP_GLOBAL_COLOR } from '../../../../Constant';

class Spinner extends Component {
    render() {
        return (
            <View style={styles.containerStyle}>
                <ActivityIndicator color={APP_GLOBAL_COLOR} size="small" />
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