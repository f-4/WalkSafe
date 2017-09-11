import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
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
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 10,
    paddingBottom: 10
  },
  searchBar: {
    flexDirection: 'row',
    marginTop: 20,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8
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
