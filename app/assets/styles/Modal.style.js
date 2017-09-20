import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addContactsButton: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    padding: 12,
    marginTop: 30,
    marginBottom: 20,
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 3,
    borderColor: 'rgba(0, 0, 0, 0.9)',
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
