import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  StyleSheet,
  Button,
  TextInput
} from 'react-native';
import Modal from 'react-native-modal';

export default class ModalTester extends Component {
  state = {
    visibleModal: null,
    newContact: {
      id: null,
      name: '',
      number: ''
    },
    contacts: [
      {
        id: 1,
        name: 'Pedo Bear friend 1',
        number: '+123456789'
      },
      {
        id: 2,
        name: 'Pedo Bear friend 2',
        number: '+123456789'
      },
      {
        id: 3,
        name: 'Pedo Bear friend 3',
        number: '+123456789'
      },
    ]
  }

  _renderContacts = () => {
    return this.state.contacts.map((contact) => {
      return <View key={contact.id}><Text>{contact.name}</Text></View>
    })
  }

  _searchContacts = () => {
    // Contacts.getAll((err, contacts) => {
    //   if(err === 'denied'){
    //     // error
    //     console.log(error)
    //   } else {
    //     // contacts returned in []
    //     console.log(contacts);
    //   }
    // })
    console.log('I was clickedy-clicked');
  }

  _handleContactSubmit = () => {
    let id = this.state.newContact;
    id.id = Math.floor(Math.random() * (100000 - 1)) + 1;
    this.setState({ visibleModal: null });
    this.setState({newContact: id});
    this.setState({contacts: [...this.state.contacts, id]});
    console.log('line 66', this.state.contacts);
  }

  _setNameToState = (text) => {
    let name = this.state.newContact;
    name.name = text;
    this.setState({newContact: name});
  }

  _setNumberToState = (text) => {
    let number = this.state.newContact;
    number.number = text;
    this.setState({newContact: number})
  }

  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={style.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  )

  _renderModalContent = () => (
    <View style={style.modalContent}>
      <Text>Please add a contact</Text>
      <TextInput
        placeholder="Name"
        maxLength={40}
        onChangeText={(text) => this._setNameToState(text)}
      />
      <TextInput
        placeholder="Phonenumber"
        maxLength={11}
        dataDetectorTypes="phoneNumber"
        onChangeText={(text) => this._setNumberToState(text)}
      />
    {this._renderButton('Add contact', () => this._handleContactSubmit())}
    </View>
  )

  render () {
    return (
      <View>
        <Text>My contacts</Text>
        <View>
          <View>
            {this._renderContacts()}
          </View>
        </View>
        <Text>Sometimes you need to keep the ones you care about updated of your location. Here you can create a list of contacts you want notified of your location so later you can notify them with just a press of a button.</Text>
        {this._renderButton('Add contacts', () => this.setState({ visibleModal: 4 }))}
        <Modal isVisible={this.state.visibleModal === 4}>
          {this._renderModalContent()}
        </Modal>
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
