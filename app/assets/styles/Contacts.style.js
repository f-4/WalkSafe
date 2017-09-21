import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    paddingTop: 40,
    paddingBottom: 5,
    paddingHorizontal: 16,
    backgroundColor: '#00bcd4',
  },
  headerText: {
    marginTop: -15,
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold'
  },
  headerElements: {
    marginTop: -15
  },
  contactList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingBottom: 8
  },
  contactName: {
    fontSize: 20,
    marginTop: 5,
    fontWeight: 'bold'
  },
  contactNumber: {
    fontSize: 10,
    marginTop: 12,
    marginLeft: 10
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  description: {
    marginHorizontal: 16,
    fontSize: 14
  },
  textInput: {
    width: 150,
    marginBottom: 15
  }
});
