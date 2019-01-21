import React from 'react'
import { View, Button, StyleSheet} from 'react-native'

const  DefaultButton  = (props) => (
  <View>
    <Button 
      title={props.title}
      {...props}
      style={[styles.buttonStyle, props.style]}
    />
  </View>
)
 
styles = StyleSheet.create({
  buttonStyle: {

  }
})

export default DefaultButton;