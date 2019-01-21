import React from 'react'
import { View, StyleSheet, Text,  TouchableOpacity  } from 'react-native'

export const ListingTodo = (props) => (
  <TouchableOpacity onPress={props.onItemPress}>
  <View style={styles.todoListStyle}>
    <Text style={styles.textstyle}>{props.Headtitle} {props.title}</Text>
    <Text style={styles.textstyle}>{props.HeadDescription} {props.description.length < 18 ? `${props.description}`: `${props.description.substring(0,20)}...`} </Text>
  </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  todoListStyle: {
    marginBottom: 10,
    backgroundColor: "#eee",
    margin: 8,
    paddingLeft: 5,
  },
  textstyle: {
    letterSpacing: 1,
    fontSize: 14,
    fontWeight: '400'
  },
})



