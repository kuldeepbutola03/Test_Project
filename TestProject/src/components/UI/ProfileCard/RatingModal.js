import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import StarRating from 'react-native-star-rating'
import { normalize } from "../../../../Constant";
import { Navigation } from "react-native-navigation";

function dismiss(id){
    Navigation.dismissModal(id)
}

export default function ratingModal(props) {

    let [star, setStar] = React.useState(0)
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container} >
            <View style={styles.modal}>
                <StarRating
                    // disabled={this.props.isFlagEnabled === 'N' ? true : false}
                    maxStars={5}
                    starStyle={{ marginHorizontal: 2, }}
                    rating={star}
                    fullStarColor={'#FAA21B'}
                    starSize={normalize(40)}
                    selectedStar={(rating) => setStar(rating)}
                />

                <TextInput
                    placeholder="Comments"
                    style={styles.textInput}
                    multiline
                    textAlignVertical='top'
                />

                <TouchableOpacity style={styles.button} onPress={() => props.submitRating(star,props.componentId)}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{height:25,width:25,borderRadius:25/2,position:'absolute',top:-4,right:-4,backgroundColor:'rgb(128,69,156)',justifyContent:'center',alignItems:'center'}} onPress={() => Navigation.dismissModal(props.componentId)}>
                    <Text style={[styles.buttonText,{fontSize:16,}]}>x</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    modal: {
        height: '50%',
        maxHeight: normalize(220),
        width: '80%',
        maxWidth: 300,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
    },
    textInput : {
        height: 100, 
        width: "80%", 
        borderRadius: 5, 
        backgroundColor: 'rgb(224,225,226)', 
        padding: 10, 
        marginVertical: 10
    },
    button:{
        backgroundColor: "rgb(128,69,156)", 
        height: 30, 
        width: 100, 
        borderRadius: 5, 
        alignItems: 'center', 
        justifyContent: 'center', 
        alignSelf: 'center'
    },
    buttonText : {
        color: 'white', 
        fontSize: 14, 
        fontWeight: '500'
    }
})