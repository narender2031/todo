import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

const DefaultInput = (props) => (
  <TextInput 
    placeholder={props.placeholder}
    name={props.name}
    {...props}
    style={[StyleSheet.input, props.style]}
  />
)

styles = StyleSheet.create({
  input: {
    
  }
})

export default DefaultInput