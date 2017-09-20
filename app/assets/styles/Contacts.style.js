import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 60,
    marginBottom: 20,
    paddingTop: 40,
    paddingBottom: 5,
    paddingLeft: 8,
    backgroundColor: '#00bcd4',
  },
  headerText: {
    marginTop: -15,
    color: '#fff',
    fontSize: 22,
  },
  contactList: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 80
  },
  contactName: {
    fontSize: 20,
    marginTop: 5,
  },
  contactNumber: {
    fontSize: 10,
    marginBottom: 5
  },
  description: {
    marginHorizontal: 16,
    fontSize: 14
  }
});
