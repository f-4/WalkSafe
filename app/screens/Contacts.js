import React, { Component } from 'react';
import {
  AsyncStorage,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  View
} from 'react-native';
import { HOST, PORT } from 'react-native-dotenv';
import modalStyle from '../assets/styles/Modal.style';
import style from '../assets/styles/Contacts.style';
import axios from 'axios';
import Modal from 'react-native-modal';
import Swipeout from 'react-native-swipeout';

import backArrow from '../components/icons/BackArrow';
import Info from '../components/icons/Info';
import Close from '../components/icons/Close';
import Delete from '../components/icons/Delete';
import Add from '../components/icons/Add';

// const swipeoutBtns = [
//   {
//     text: 'Button'
//   }
// ];

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
    AsyncStorage.multiGet(['userToken', 'userId'])
      .then((userData) => {
        console.log('What is the Contact userData', userData);
        let token = userData[0][1];
        let userId = userData[1][1];

        // Set all axios headers in this component to have default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // Set the initial userId state
        this.setState({
          userId: userId
        });
        // Retrieve contacts
        axios.get(`${HOST}:${PORT}/api/user/contacts`, {
          params: {
            userId: this.state.userId
          }
        })
          .then(res => {
            this.setState({
              contacts: res.data
            });
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });

  }

  componentDidMount() {
    this._getContactLists();
  }

  _getContactLists = () => {
    axios.get(`${HOST}:${PORT}/api/user/contacts`, {
      params: {
        userId: this.state.userId
      }
    })
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

  _deleteContact = (id) => {
    console.log('ORIGINAL', this.state.contacts);
    console.log('ID FROM DELETE', id);
    let contactIndex;
    let contactList = this.state.contacts;
    for (var i = 0; i < contactList.length; i++) {
      if (contactList[i].id === id) { contactIndex = i }
    }
    console.log('HARDCODED', contactIndex);
    // console.log('CONTACT ID', contactIndex);
    let removedContact = this.state.contacts.splice(contactIndex, 1);
    let newContactList = this.state.contacts;
    // console.log('REMOVED', this.state.contacts.splice(contactIndex, 1));
    // this.setState({
    //   contacts: newContactList
    // });
    //console.log('NEW LIST', removedContact[0].contact_name);
    this.setState({
      contacts: newContactList
    });
    let data = {
      user_id: this.state.userId,
      contact_name: removedContact[0].contact_name
    }
    axios.delete(`${HOST}:${PORT}/api/user/contacts`, { params: data })
      .then(res => {
        console.log(res);
      })
      .catch(console.error);
  }

  _renderContacts = () => {
    return this.state.contacts.map((contact) => {
      return <View style={style.contactList} key={contact.id}>
              <Text style={style.contactName}>{contact.contact_name}</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={style.contactNumber}>+{contact.phone_number}</Text>
                <View style={{borderLeftWidth: 1, paddingLeft: 10, marginLeft: 10}}>
                  <Text onPress={ () => this._deleteContact(contact.id)}>{ Delete }</Text>
                </View>
              </View>
            </View>
    })
  }

  _handleContactSubmit = () => {
    let newContact = this.state.newContact;
    console.log('What is the newContact object', this.state.newContact);
    axios.post(`${HOST}:${PORT}/api/user/contacts`, {
      contactName: this.state.newContact.contactName,
      contactNumber: this.state.newContact.contactNumber,
      userId: this.state.userId
    })
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
        <Text style={modalStyle.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  )

  _renderInfoModal = () => (
    <View style={modalStyle.modalContent}>
      <Text style={style.descriptionTitle}>Why do you need contacts?</Text>
      <Text style={style.description}>Sometimes you need to keep the ones you care about updated of your location. Here you can create a list of contacts you want notified of your location so later you can notify them with just a press of a button.</Text>
      {this._renderButton('Got it!', () => this.setState({ visibleModal: null }))}
    </View>
  )

  _renderModalContent = () => (
    <View style={modalStyle.modalContent}>
      <View style={modalStyle.closeModal}>
        <Text onPress={ () => this.setState({ visibleModal: null }) }>{ Close }</Text>
      </View>
      <Text style={style.descriptionTitle}>Please add a contact</Text>
      <TextInput
        placeholder="Name"
        maxLength={40}
        onChangeText={(text) => this._setNameToState(text)}
        style={style.textInput}
      />
      <TextInput
        placeholder="Phonenumber"
        maxLength={11}
        onChangeText={(text) => this._setNumberToState(text)}
        style={style.textInput}
      />
      {this._renderButton('Add contact', () => this._handleContactSubmit())}
    </View>
  )

  render () {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={style.header}>
          <Text style={style.headerText} onPress={ () => this.props.navigation.navigate('DrawerOpen')}>{ backArrow }</Text>
          <Text style={style.headerText}>My contacts</Text>
          <Text style={style.headerText} onPress={ () => this.setState({ visibleModal: 1 })}>{ Info }</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
          <View>
            {this._renderContacts()}
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 30}}>
            <Text onPress={ () => this.setState({ visibleModal: 4 }) }>{ Add }</Text>
          </View>
        </View>
        <Modal isVisible={this.state.visibleModal === 4}>
          {this._renderModalContent()}
        </Modal>
        <Modal isVisible={this.state.visibleModal === 1}>
          {this._renderInfoModal()}
        </Modal>
      </View>
    )
  }
}
