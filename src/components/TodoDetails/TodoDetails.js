import React from 'react'
import { Modal, View, Text, StyleSheet, Button, ScrollView } from 'react-native'

const TodoDeatils = (props) => {
  let modalContent = null;
  let id = null;
  if(props.selectedTodo){
    id = props.selectedTodo[0].id;
    let title = <Text style={styles.titleHead}>Title: </Text>
    let description = <Text style={styles.titleHead}>Description: </Text>
    modalContent = props.selectedTodo.map(todo => {

      return (
        <View key={todo.id} style={styles.container}>
          <View style={styles.titleContainer}>
            <Text>
              {title}
              {todo.title}
            </Text>
          </View>
          <View style={styles.descriptionContainer}>
            <ScrollView>
              <Text>
                {description}
                {todo.description}
              </Text>
            </ScrollView>
          </View>
        </View>
      )
    })
  }

return (
  <Modal 
    onRequestClose={props.oncloseRequest} 
    animationType="slide"
    visible={props.selectedTodo !== null}
    >
    {modalContent}
    <View style={styles.buttonContainer}>
      <View style={styles.actionButtonStyle}>
        <Button 
          title = "close"
          onPress = {props.oncloseRequest}
        />
      </View>
      <View style={styles.actionButtonStyle} >
        <Button 
          title="Delete Todo"
          onPress={() => props.onDeleteTodo(id)}
        />
      </View>
      <View style={styles.actionButtonStyle} >
        <Button 
          title="Edit Todo"
          onPress={() => props.onEditTodo(id)}
        />
      </View>
    </View>
  </Modal>
)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    margin: 8,
    paddingTop: 10,

  },
  titleHead: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    margin: 8,
    paddingTop: 10,
  },
  actionButtonStyle: {
    marginBottom: 5,
    width: "100%",
  },
  titleContainer: {
    width: '100%',
    marginBottom: 5,
    backgroundColor: '#eee',
    padding: 20,
    justifyContent: 'flex-start',

  },
  descriptionContainer: {
    flex: 1,
    width: '100%',
    marginBottom: 5,
    backgroundColor: '#eee',
    padding: 20,
    justifyContent: 'flex-start',

  }
})

export default TodoDeatils;