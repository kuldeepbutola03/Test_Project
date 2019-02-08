import React, { Component } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import { PropTypes } from 'prop-types';

export default class HashTag extends Component {

    // export default HashTag = props => (
    fetchText = (props) => {

        var tokens = props.hashTagString.split(/#(\S*)/g);
        for (var i = 0; i < tokens.length; i = i + 1) {
            if (i % 2 === 0) {
                <Text style={{ color: 'red' }}>{tokens[i]}</Text>

            } else {
                // <TouchableOpacity onPress={() => props.sendValue(tokens[i])}>
                <Text>{tokens[i]}</Text>
                // </TouchableOpacity>

            }

        }

    }
    render() {
        return (
            <View style={{ flexDirection: 'row', padding: 5 }}>
                
                {this.fetchText(this.props)}
            </View >
        )
    }

}

// {/* <Text style={{ fontWeight: 'bold' }}>
                    // asdasd
                    // {/* <TouchableOpacity> */}
                        // <Text style={{ color: 'red' }}>sadasdds ads a</Text>
                    // {/* </TouchableOpacity> */}
                // </Text>
                // <Text>sadf</Text><Text>sadf</Text><Text>kkk</Text> */}


