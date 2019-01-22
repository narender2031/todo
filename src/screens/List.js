import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import {Permissions, Constants, Contacts } from 'expo';


// App Components
import DefaultButton from '../constent/DefaultButton'
class List extends Component {
  state = {
    hasContactPermsiion: null,
  }
  
  static navigationOptions = {
    header: null,
  };

  
  componentDidMount = () => {
    const { status } =  Permissions.askAsync(Permissions.CONTACTS);
    this.setState({ hasCameraPermission: status === 'granted' });
    
  }

  getAllContacts = () => {
   
    const contact = {
      [Contacts.Fields.FirstName]: "Bird",
      [Contacts.Fields.LastName]: "Man",
      [Contacts.Fields.Company]: "Young Money",
    }
    Contacts.addContactAsync(contact)
    .catch(err => {
      console.log(err)
    })
    .then(data => {
      console.log(data)
    })
    // console.log(contacts)
    
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleHeadLine}>
          <Text style={styles.headLine}>Add Contents</Text>
        </View>
        <DefaultButton 
          title= "Import Contacts"
          onPress = {this.getAllContacts}
        />
      </View>
    )
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

export default List;