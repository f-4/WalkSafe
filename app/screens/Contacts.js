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
import modalStyle from '../assets/styles/Modal.style';
import style from '../assets/styles/Contacts.style';
import axios from 'axios';
import Modal from 'react-native-modal';

export default class ModalTester extends Component {
  state = {
    visibleModal: null,
    newContact: {
      contactName: '',
      contactNumber: ''
    },
    contacts: [],
  }

  componentWillMount() {
    axios.get('http://127.0.0.1:3000/api/user/contacts')
      .then(res => {
        console.log('CONTACTS ENDPOINT1: ', res.data);
        this.setState({
          contacts: res.data
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  componentDidMount() {
    this._getContactLists();
  }

  _getContactLists = () => {
    axios.get('http://127.0.0.1:3000/api/user/contacts')
      .then(res => {
        console.log('CONTACTS ENDPOINT2: ', res.data);
        this.setState({
          contacts: res.data
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  _renderContacts = () => {
    return this.state.contacts.map((contact) => {
      return <View>
              <Text style={style.contactName} key={contact.id}>{contact.contact_name}</Text>
              <Text style={style.contactNumber} key={contact.phone_number}>{contact.phone_number}</Text>
            </View>
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
    // let id = this.state.newContact;
    // id.id = Math.floor(Math.random() * (10000000 - 1)) + 1;

    // this.setState({newContact: id});
    // this.setState({contacts: [...this.state.contacts, id]});
    // console.log('line 66', this.state.contacts);

    let newContact = this.state.newContact;
    console.log('SUBMIT USER', newContact);
    axios.post('http://127.0.0.1:3000/api/user/contacts', newContact)
      .then(res => {
        console.log(res);
        this._getContactLists();
      })
      .catch(console.error);
    this.setState({ visibleModal: null });
  }

  _setNameToState = (text) => {
    let name = this.state.newContact;
    name.contactName = text;
    this.setState({newContact: name});
  }

  _setNumberToState = (text) => {
    let number = this.state.newContact;
    number.contactNumber = text;
    this.setState({newContact: number});
  }

  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={modalStyle.addContactsButton}>
        <Text style={{color: 'black', fontSize: 16}}>{text}</Text>
      </View>
    </TouchableOpacity>
  )

  _renderModalContent = () => (
    <View style={modalStyle.modalContent}>
      <Text>Please add a contact</Text>
      <TextInput
        placeholder="Name"
        maxLength={40}
        onChangeText={(text) => this._setNameToState(text)}
      />
      <TextInput
        placeholder="Phonenumber"
        maxLength={11}
        onChangeText={(text) => this._setNumberToState(text)}
      />
    {this._renderButton('Add contact', () => this._handleContactSubmit())}
    </View>
  )

  render () {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={style.header}>
          <Text style={style.headerText}>My contacts</Text>
        </View>
        <View style={style.contactList}>
          {this._renderContacts()}
        </View>
        {this._renderButton('Add contact', () => this.setState({ visibleModal: 4 }))}
        <Text style={style.description}>Sometimes you need to keep the ones you care about updated of your location. Here you can create a list of contacts you want notified of your location so later you can notify them with just a press of a button.</Text>
        <Modal isVisible={this.state.visibleModal === 4}>
          {this._renderModalContent()}
        </Modal>
      </View>
    )
  }
}
