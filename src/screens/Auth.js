import React , { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';

// app Components
import DefaultInput from  '../constent/DefaultInput'
import DefaultButton from '../constent/DefaultButton'

class Auth extends Component {

  static navigationOptions = {
    header: null,
  };

  state= {
    email: null,
    password: null,
    confirmPassword: null,
    errorMessage: null,
  }

  handleChangeEmail = (text) => {
   this.setState({
     email: text
   })
  }

  handleChangePassword =  (text) => {
    console.log(this.state.password)
    this.setState({
      password: text
    })

    this.setState({
      errorMessage: null
    })
  }

  handleChangeConfirmPassword = (text) => {
   this.setState({
     confirmPassword: text
   })
   this.setState({
    errorMessage: null
  })
  }

  handleSignUP = ( ) => {
    if(this.state.email){
      if(this.state.password === this.state.confirmPassword){
          const SignUp = {
            email: this.state.email,
            password: this.state.password,
            returnSecureToken: true
          }
          fetch("https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCRascAPya7jy5ocGQ95jTi7DdvXlnyJAc", {
            method: 'POST',
            body: JSON.stringify(SignUp),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .catch(err => {
            alert("Opps! Something Went Wrong")
            console.log(err)
          })
          .then(res => res.json())
          .then(parseRes => {
            if(parseRes.error){
              console.log(parseRes.error)
              alert("Something Went Wrong!")
            }else{
              console.log(parseRes)
              AsyncStorage.setItem('Auth:token', parseRes.idToken)
              .catch(err => {
                console.log(err)
                alert("Something Went Wrong!")
              })
              this.props.navigation.navigate('main')
            }
          })

      }else{
        this.setState({
          errorMessage: "Oops! Password don't match"
        })
      }
    }else{
     this.setState({
      errorMessage: "Oops! Email is Missing"
     })
    }
  } 

  handleLogInButton = () => {
    this.props.navigation.navigate('Login');
  }

  render() {
    let errorMessage = this.state.errorMessage 
    return (
      <View style={styles.container}>
          <View style={styles.titleHeadLine}>
            <Text style={styles.headLine}>Register</Text>
          </View>
          <View style={styles.errorMessageStyle}>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          </View>
          <View style={styles.inputContainer}>
            <DefaultInput 
              textContentType = "emailAddress"
              placeholder = "Email"
              value={this.state.email}
              onChangeText = {this.handleChangeEmail}
              style={styles.input}
              returnKeyLabel= "next"
            />
            <DefaultInput 
              placeholder = "Password"
              secureTextEntry= {true}
              value={this.state.password}
              onChangeText = {this.handleChangePassword}
              style={styles.input}
            />
            <DefaultInput 
              placeholder = "Confirm Password"
              secureTextEntry= {true}
              value={this.state.confirmPassword}
              onChangeText = {this.handleChangeConfirmPassword}
              style={styles.input}
            />
          </View>
          <View style= {styles.buttonContainer}>
            <DefaultButton 
              title = "SignUp"
              onPress={this.handleSignUP}
              style={styles.buttonStyle}
            />
          </View>
          <View style={styles.signInConatiner}>
            <Text>already have an account!</Text>
          </View>
          <View>
            <TouchableOpacity 
              onPress={this.handleLogInButton}
              style={styles.loginStyle}
              >
              <Text style={styles.loginButton}> LogIn </Text>
            </TouchableOpacity>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,

  },
  titleHeadLine: {
    marginBottom: 5,
  },
  headLine: {
    fontSize: 20,
    fontWeight: 'bold',    
  },
  inputContainer: {
    width: "80%",
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    letterSpacing: 1,
    marginBottom: 10,
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
    width: "50%",
    marginBottom: 10,
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginStyle: {
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginButton: {
    color: '#3498db',
    alignItems: 'center',
  },
  errorMessageStyle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  errorMessage: {
    color: "#e74c3c",
  }
})

export default Auth;