import React, { Component } from 'react'
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native'

import { ListingTodo } from './ListingTodo'

class TodoList extends Component {
  
  render() {

    let title = <Text style={styles.title}>Title: </Text>
    let description = <Text style={styles.title}>Description: </Text>
    let todoList = null;
    if(this.props.todoList){
      todoList = <FlatList
      data={this.props.todoList}
      renderItem={(info) => (
        <ListingTodo 
          title = {info.item.title}
          description = {info.item.description}
          Headtitle = {title}
          HeadDescription = {description}
          key = {info.item.id}
          onItemPress = {() => this.props.handelOnPressTodo(info.item.id)}
        />
        
      )}
        keyExtractor={(item) => item.id}
      />
    }
    
    
    return (
      <View style={styles.scrollViewContainer}>
        <View style={styles.titleHeadLine}>
          <Text style={styles.headLine}>Todos</Text>
        </View>
        <View style={styles.scrollViewContainer}>
          {todoList}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    width: "100%",
    flex: 1,
  },
  scrollViewStyle: {
    marginTop: 20,
    width: '100%',
  },
  todoListStyle: {
    marginBottom: 10,
    backgroundColor: "#eee",
    margin: 8,
  },
  textstyle: {
    letterSpacing: 1,
    fontSize: 14,
    fontWeight: '400'
  },
  titleHeadLine: {
    marginBottom: 10,
  },
  headLine: {
    fontSize: 20,
    fontWeight: 'bold',    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});


export default TodoList;