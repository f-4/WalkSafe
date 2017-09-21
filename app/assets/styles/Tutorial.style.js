import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    backgroundImage: {
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'cover'
    },
    text: {
      textAlign: 'center',
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0)',
      fontSize: 32
    },
    buttonBackgroundLight: {
      marginTop: 'auto',
      marginBottom: 20,
      marginLeft: 'auto',
      marginRight: 20,
      backgroundColor: 'rgba(0,0,0,0)',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: 55,
      width: 55,
      borderRadius: 30,
      borderWidth: 3,
    },
    buttonBackgroundDark: {
      marginTop: 'auto',
      marginBottom: 20,
      marginLeft: 'auto',
      marginRight: 20,
      backgroundColor: 'rgba(0,0,0,0)',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: 55,
      width: 55,
      borderRadius: 30,
      borderWidth: 3,
      borderColor: '#fff'
    }
});
