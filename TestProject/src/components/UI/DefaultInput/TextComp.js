import React from 'react';
import { StyleSheet, TextInput,View } from 'react-native';


const textComp = props => (
 <View>
 <TextInput
   underlineColorAndroid="transparent"
   {...props}  // ye kar rakha hai to ho jayega , nhi hua to btana//OK samaj gaya aga
   style={[styles.input, props.style]}
   placeholder = { props.textCompOne}
 />
 <TextInput
   underlineColorAndroid="transparent"
   {...props}  // ye kar rakha hai to ho jayega , nhi hua to btana//OK samaj gaya aga
   style={[styles.input, props.style]}
   placeholder = {props.textCompTwo}
 />
 </View>
);

const styles = StyleSheet.create({
    input: {
      width: '80%',
      borderWidth: 10,
      borderColor:'red',
      borderColor: '#eee',
      padding: 5,
      marginTop: 8,
      marginBottom: 8,
    }
  });
  
  export default textComp;