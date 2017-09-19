import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    paddingTop: 22
  },
  map: {
    flex: 4
  },
  scrollView: {
    flex: 1
  },
  mapButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -120,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 10,
    paddingBottom: 10,
    zIndex: 1000
  },
  searchBar: {
    flexDirection: 'row',
    marginBottom: -90,
    marginHorizontal: 10,
    zIndex: 1000,
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: '#616163',
    shadowOffset: { height: 0, width: 0 },
  },
  searchInput: {
    height: 30,
    flex: 1,
    marginHorizontal: 10,
    paddingLeft: 2,
    paddingRight: 2,
    fontSize: 18,
    textAlign: 'center'
  },
  alert: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 45,
    borderRadius: 25,
    backgroundColor: '#ef1f1f',
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: '#616163',
    shadowOffset: { height: 0, width: 0 },
  },
  currentLocation: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 45,
    borderRadius: 25,
    marginBottom: 10,
    backgroundColor: '#fff',
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: '#616163',
    shadowOffset: { height: 0, width: 0 },
  },
  crimeView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 45,
    borderRadius: 25,
    backgroundColor: '#fff',
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: '#616163',
    shadowOffset: { height: 0, width: 0 },
  },
  buttonsLeft: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  }
});
