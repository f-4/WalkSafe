import { StyleSheet } from 'react-native';

const colors = {
  black: '#000',
  red: '#ea3a3d',
  gray: '#919191'
}

export default StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  text: {
    paddingLeft: 8,
    fontSize: 24,
    color: colors.gray
  }
});
