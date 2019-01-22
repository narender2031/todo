import React from 'react'
import { View, Text, StyleSheet, Modal } from 'react-native';

import DefaultInput from '../../constent/DefaultInput'
import DefaultButton from '../../constent/DefaultButton'

class EditTodoForm extends React.Component{
  constructor(props){
    super(props);

   const selectedTodo = props.selectedEditTodo[0]

   this.state = {
     title: selectedTodo.title || '',
     description: selectedTodo.description || '',
     id: selectedTodo.id
   }

  }

  handleTitleChange = (text) => {
    this.setState(prevState => {
      return {
        title: text
      }
    })
  }

  handleDescriptionChange = (text) => {
    this.setState(prevState => {
      return {
        description: text
      }
    })
  }

  handleFormUpdate = () => {
    fetch("https://basic-fact-185408.firebaseio.com/todos/"+this.state.id+".json?auth="+this.props.idToken, {
      method: "PATCH",
      body: JSON.stringify(this.state)
    })
    .catch(err => console.log(err))
    .then(res => res.json())
    .then(parseRes => {
      console.log(parseRes)
      this.state.title = null,
      this.state.description = null,
      this.state.id = null
      this.props.updateTodoState();
    
    })
  }

  handleCancel = () => {
    this.props.updateTodoState();
  }

  render() {
    return (
      <Modal 
        style={styles.editModalContainer}
        visible={this.props.selectedEditTodo != null}
        onRequestClose={() => this.props.hancleCloseModal()}
        >
        <View style={styles.editFormContainer}>
          <View style={styles.titleHeadLine}>
            <Text style={styles.headLine}>Edit Todo</Text>
          </View>
          <View style={styles.inputContainer}>
            <DefaultInput 
              placeholder='title'
              onChangeText={this.handleTitleChange}
              value={this.state.title}
              style={[styles.input]}
            />
            <DefaultInput 
              placeholder='description'
              value={this.state.description}
              multiline = {true}
              numberOfLines = {4}
              onChangeText={this.handleDescriptionChange}
              style={[styles.input]}
            />
          </View>
          <View style={styles.buttonContainer}>
            <DefaultButton 
              title= 'update Todo'
              onPress = {this.handleFormUpdate}
              style={styles.buttonStyle}
            />
          </View>
          <View style={styles.buttonContainer}>
            <DefaultButton 
              title= 'Cancel'
              onPress = {this.handleCancel}
              style={styles.buttonStyle}
            />
          </View>
        </View>
      </Modal>
    )
  }
}



const styles = StyleSheet.create({
  editModalContainer : {
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    width: '100%'
  },
  editFormContainer: {
    flex: 1,
    margin: 10,

  },
  titleHeadLine: {
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  headLine: {
    fontSize: 20,
    fontWeight: 'bold', 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    letterSpacing: 1,
    marginBottom: 5,
  },
  inputContainer: {
    marginBottom: 8,
  } ,
  buttonContainer: {
    justifyContent: 'flex-start',
    margin: 8,
  },
  buttonStyle: {
    marginBottom: 5,
    width: "100%",
  },
})


export default EditTodoForm;