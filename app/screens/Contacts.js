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

import backArrow from '../components/icons/BackArrow';
import Info from '../components/icons/Info';
import Close from '../components/icons/Close';

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
      return <View style={style.contactList} key={contact.id}>
              <Text style={style.contactName}>{contact.contact_name}</Text>
              <Text style={style.contactNumber}>+{contact.phone_number}</Text>
            </View>
    })
  }

  _handleContactSubmit = () => {
    let newContact = this.state.newContact;
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
          <View>
            {this._renderButton('Add contact', () => this.setState({ visibleModal: 4 }))}
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
