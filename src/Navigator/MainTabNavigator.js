import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import HomeScreen from '../screens/Home'
import ListScreen from '../screens/List'
import TabBarIcon from  '../constent/TabBarIcon'

const HomeStack = createStackNavigator({
  Home: HomeScreen
})

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  title: "Home",
  head: null,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

const ListStack = createStackNavigator({
  Todos: ListScreen
})

ListStack.navigationOptions = {
  tabBarLabel: 'Todos',
  title: "Todos",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-list${focused ? '' : '-outline'}`
          : 'md-list'
      }
    />
  ),
}

export default createBottomTabNavigator({
  HomeStack,
  ListStack
});