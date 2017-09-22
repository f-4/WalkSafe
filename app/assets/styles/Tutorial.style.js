import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    backgroundImage: {
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'cover'
    },
    textContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingVertical: 40,
      paddingHorizontal: 25
    },
    headline: {
      marginTop: 50,
      marginBottom: 30,
      textAlign: 'center',
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0)',
      fontSize: 36,
      fontWeight: 'bold'
    },
    text: {
      textAlign: 'center',
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0)',
      fontSize: 26
    },
    openAppContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      marginBottom: 40,
      backgroundColor: 'rgba(0,0,0,0)',
      borderWidth: 5,
      borderColor: '#fff',
      borderRadius: 3
    },
    openApp: {
      textAlign: 'center',
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0)',
      fontSize: 20,
      fontWeight: 'bold'
    }
});
