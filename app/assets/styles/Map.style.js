import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    paddingTop: 30
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
    marginTop: -70,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 10,
    paddingBottom: 10,
    zIndex: 1000
  },
  searchBar: {
    flexDirection: 'row',
    marginBottom: -50,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8,
    zIndex: 1000
  },
  searchInput: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingLeft: 2,
    paddingRight: 2
  },
});
