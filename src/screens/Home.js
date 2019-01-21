import React from 'react';
import { StyleSheet, Text, View} from 'react-native';


// App Component
import TodoForm from '../components/Form/TodoForm'
import TodoList from '../components/TodoList/TodoList'
import TodoDetails from '../components/TodoDetails//TodoDetails'
import EditTodoForm from '../components/EditTodoForm/EditTodoForm'

export default class App extends React.Component {

  static navigationOptions = {
    header: null,
  };


  state = {
    todos: [],
    selectedTodo: null,
    selectEditTodo: null,
  }

  getTodos = () => {
    fetch("https://basic-fact-185408.firebaseio.com/todos.json")
    .catch(err=> console.log(err))
    .then(res => res.json())
    .then(parseRes => {
        const todos = []
        for( let key in parseRes){
          todos.push({
            ...parseRes[key],
            id: key
          })
        }
        this.setState({
          todos: todos.reverse()
        })
    })
  }

  componentDidMount = () => {
    this.getTodos();

    this.setState({
      selectedTodo: null
    })
  }

  handelOnPressTodo = (key) => {
    console.log("Inside the HOme HandlePress")
    this.setState(prevState => {
      return {
        selectedTodo: prevState.todos.filter((todo) => {
          return todo.id === key
        })
      }
    })
    console.log("Leaving the HOme HandlePress")
  }
  
  handleCloseRequest = () => {
    this.setState({
      selectedTodo: null
    })
  }

  handleOnDeleteTodo = (key) => {
    fetch(`https://basic-fact-185408.firebaseio.com/todos/${key}.json`, {
        method: "DELETE",
    })
    .catch(err => console.log(err))
    .then(res => res.json())
    .then(parseRes => {
      console.log(parseRes)
      this.getTodos();

      this.setState({
        selectedTodo: null
      })
    })
  }

  handleOnEditTodo = (key) => {
    this.setState(prevState => {
      return {
        selectEditTodo: prevState.todos.filter((todo) => {
          return todo.id === key
        })
      }
    })
    this.setState({
      selectedTodo: null
    })
  }

  handleEditModalClose = () => {
    this.setState({
      selectEditTodo: null
    })
  }

  handleUpdateTodo = () => {
    this.setState({
      selectEditTodo: null
    })
    this.getTodos();
  }

  render() {
    let editForm = null;
    if(this.state.selectEditTodo){
      return (
        <EditTodoForm 
          selectedEditTodo = {this.state.selectEditTodo}
          onModalClose = {this.handleEditModalClose}
          updateTodoState = {this.handleUpdateTodo}
        />
      )
    }
    return (
      <View style={styles.container}>
        {editForm}
        <TodoDetails 
            selectedTodo = {this.state.selectedTodo}
            oncloseRequest = {this.handleCloseRequest}
            onDeleteTodo = {this.handleOnDeleteTodo}
            onEditTodo = {this.handleOnEditTodo}
        />
        <View style={styles.titleHeadLine}>
          <Text style={styles.headLine}>Add Todo</Text>
        </View>
        <TodoForm 
          addTodo={this.getTodos}
        />
        <TodoList 
          todoList={this.state.todos}
          handelOnPressTodo = {this.handelOnPressTodo}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: "100%",
    margin: 8,
    padding: 30,
    marginLeft: -5,
  },
  titleHeadLine: {
    marginBottom: 5,
  },
  headLine: {
    fontSize: 20,
    fontWeight: 'bold',    
  },
});
