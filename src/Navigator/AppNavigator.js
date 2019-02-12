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


// const stackNavigator = createStackNavigator({
//   auth: AuthScreen,
//   Login: LoginScreen
// })


// Add DeepLink in your app 
// const SimpleApp = createAppContainer(createStackNavigator({
//   Home: { screen: HomeScreen },
//   Chat: {
//     screen: ChatScreen,
//     path: 'chat/:user',
//   },
// }));


// in Expo app : 
// just add this: 
// {
//   "expo": {
//     "scheme": "mychat"
//   }
// }

// const prefix = Expo.Linking.makeUrl('/');

// const MainApp = () => <SimpleApp uriPrefix={prefix} />;

export default createAppContainer(createSwitchNavigator({
  main: MainTabNavigator,
  auth: AuthStack,
  Login: LoginStack,
  
  // stackNavigator: stackNavigator
},{
  initialRouteName: "Login"
}
))