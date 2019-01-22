import React from 'react'
import { createAppContainer, createSwitchNavigator, createStackNavigator} from 'react-navigation';
import MainTabNavigator from './MainTabNavigator'
import AuthScreen from '../screens/Auth'
import LoginScreen from '../screens/Login'

const AuthStack = createStackNavigator({
  auth: AuthScreen
})

const LoginStack  = createStackNavigator({
  Login: LoginScreen
})

export default createAppContainer(createSwitchNavigator({
  main: MainTabNavigator,
  auth: AuthStack,
  Login: LoginStack
},{
  initialRouteName: "Login"
}
))