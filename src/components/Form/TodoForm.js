import React, { Component } from 'react'
import { View, StyleSheet }  from 'react-native'
import DefaultButton from '../../constent/DefaultButton'
import DefaultInput from '../../constent/DefaultInput'


class TodoForm extends Component {
  
  state = {
    title: null,
    description: null,
  }

  handleTitleChange = (text) => {
    this.setState({
     title: text
    });
  }

  handleDescriptionChange = (text) => {
    this.setState({
      description: text
    });
  }

  // _pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     base64: true,
  //     exif: true
  //   });
  //   console.log(result)

  //   this.setState({
  //     image: {
  //       uri: result.uri
  //     }
  //   })
  // }

  handleAddTodo = () => {
    if (this.state.title && this.state.description){
      
      const TodoData = {
        title: this.state.title,
        description:this.state.description
      }
  
      fetch("https://basic-fact-185408.firebaseio.com/todos.json", {
        method: "POST",
        body: JSON.stringify(TodoData)
      })
      .catch(err => console.log(err))
      .then(res => res.json())
      .then(parseRes => {
        console.log(parseRes)
        this.props.addTodo() 
        this.state.title = ''
      this.state.description = ''
      })
    }
  }



  render() {
    return (
      <View style={styles.todoFormStyle}>
        <View style={styles.inputContainer}>
          <DefaultInput 
            placeholder="Enter the title"
            value={this.state.title}
            style={styles.input}
            onChangeText = {this.handleTitleChange}
          />
          <DefaultInput 
            multiline = {true}
            numberOfLines = {4}
            value={this.state.description}
            placeholder="Add description "
            style={[styles.input]}
            onChangeText = {this.handleDescriptionChange}
          />
        </View>
        {/* <View style={styles.buttonContainer}>

          <DefaultButton 
            title = "Add Image"
            style={styles.buttonStyle}
            onPress={this._pickImage}
            
          />
        </View> */}
        <View style={styles.buttonContainer}>
          <DefaultButton 
            title = "Add Todo"
            style={styles.buttonStyle}
            onPress={this.handleAddTodo}
          />
        </View>

        {/* <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          {image &&
            <Image source={image} style={{ width: 100, height: 100 }} />}
        </View> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({

  todoFormStyle: {
    width: "100%"
  },
  inputContainer: {
    width: "100%",
    marginBottom: 8,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    letterSpacing: 1,
    marginBottom: 5,
  },
  multiLineInput: {
    borderBottomColor: '#000000'
  },
  titleHeadLine: {
    marginBottom: 5,
  },
  headLine: {
    fontSize: 20,
    fontWeight: 'bold',    
  },
  buttonContainer: {
    width: "100%",
    margin: 8,
    marginLeft: -1,

  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollViewContainer: {
    width: "100%",

  },
  scrollViewStyle: {
    marginTop: 20,
    backgroundColor: "#eee",
    width: '100%',
  }
});


export default TodoForm;