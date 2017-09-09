import { StyleSheet } from 'react-native';

const colors = {
  black: '#000',
  red: '#ea3a3d',
  gray: '#919191'
}

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5
  },
  avatar: {
    backgroundColor: colors.red,
    minWidth: '100%',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 8
  },
  profileImg: {
    height:50,
    width: 50,
    borderRadius: 25
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  userEmail: {
    fontSize: 16
  },
  text: {
    paddingLeft: 8,
    fontSize: 24,
    color: colors.gray
  }
});
