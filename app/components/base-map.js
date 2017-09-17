'use strict';
/* eslint no-console: 0 */
import React, { Component } from 'react';
import Mapbox, { MapView } from 'react-native-mapbox-gl';
import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  Button,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import { MAPBOX_ACCESS_TOKEN, HOST, PORT } from 'react-native-dotenv';
import axios from 'axios';
import Communications from 'react-native-communications';
import SendSMS from 'react-native-sms';
import mapStyle from '../assets/styles/Map.style';

import searchIcon from './icons/Search';
import menuIcon from './icons/Menu';
import locationIcon from './icons/Location';
import alertIcon from './icons/Alert';
import noViewIcon from './icons/NoView';
import viewCrimes from './icons/ViewCrimes';


const accessToken = MAPBOX_ACCESS_TOKEN;
Mapbox.setAccessToken(accessToken);

export default class BaseMap extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    center: {
      latitude: 34.0522,
      longitude: -118.2437
    },
    zoom: 14,
    userTrackingMode: Mapbox.userTrackingMode.none,
    annotations: [],
    hideCrimes: false,
    hiddenCrimes: [],
    searchText: '',
    currentLocation: {
      latitude: 0,
      longitude: 0
    },
    userLocation: {
      latitude: 0,
      longitude: 0
    }
  };

  onPressSearchButton = () => {
    if (this.state.searchText.length > 0) {
      axios.get(`${HOST}:${PORT}/map/search`, {
        params: {
          address: this.state.searchText
        }
      })
        .then(res => {
          // Coordinates received are in reverse order
          const coordinates = res.data.center.reverse();
          const address = res.data.place_name.split(',');

          // Add/update marker on searched location
          this.setState({
            annotations: [...this.state.annotations, {
              coordinates: coordinates,
              type: 'point',
              id: 'search',
              title: address[0],
              subtitle: address.slice(1).join(','),
              rightCalloutAccessory: {
              source: {
                uri: 'http://www.provmed.com/img/map-icon.png'
              },
              height: 15,
              width: 15,
              },
            }]
          });
          // Move map view to searched location
          this._map.setCenterCoordinate(...coordinates);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  onCrimesToggleClick = () => {
    if (!this.state.hideCrimes) {
      // Filter only crime points
      const crimes = this.state.annotations.filter(annotation => {
        return annotation.type === 'point' && annotation.title !== 'Marked Unsafe' && annotation.id !== 'search'
      });
      console.log('CRIMES', crimes)
      // Stash away crimes and filter from annotations
      this.setState({
        hideCrimes: !this.state.hideCrimes,
        hiddenCrimes: crimes,
        annotations: this.state.annotations.filter(annotation => {
          return annotation.title === 'Marked Unsafe' || annotation.id === 'search' || annotation.type !== 'point'
        })
      });
    } else {
      this.setState({
        hideCrimes: !this.state.hideCrimes,
        annotations: this.state.annotations.concat(this.state.hiddenCrimes),
        hiddenCrimes: []
      }, () => {
        // Retrieve nearby crimes at current location
        this.retrieveNearbyCrimes();
      });
    }
  };

  onRegionDidChange = (location) => {
    this.setState({
      currentZoom: location.zoomLevel,
      currentLocation: {
        latitude: location.latitude,
        longitude: location.longitude
      }
    }, () => {
      // Retrieve nearby crimes of new location
      this.retrieveNearbyCrimes();
    });
    console.log('onRegionDidChange', location);
  };
  onRegionWillChange = (location) => {
    console.log('onRegionWillChange', location);
  };
  onUpdateUserLocation = (location) => {
    console.log('onUpdateUserLocation', location);
    // Save coordinates of user's location
    this.setState({
      userLocation: {
        longitude: location.longitude,
        latitude: location.latitude
      }
    })

  };
  onOpenAnnotation = (annotation) => {
    console.log('onOpenAnnotation', annotation);
  };
  onRightAnnotationTapped = (selectedPoint) => {
    console.log('onRightAnnotationTapped', selectedPoint);
    // If selected marker is searched location marker
    if (selectedPoint.id === 'search') {
      // Retrieve walking directions from current location to searched location
      axios.get(`${HOST}:${PORT}/map/directions`, {
        params: {
          start: `${this.state.userLocation.longitude},${this.state.userLocation.latitude}`,
          end: `${selectedPoint.longitude},${selectedPoint.latitude}`
        }
      })
        .then(res => {
          // Map coordinates into [lat, lon] from [lon, lat]
          const coordinates = res.data.geometry.coordinates.map(coordinate => {
            return coordinate.reverse();
          });
          // Render array of coordinates into map
          this.setState({
            annotations: [...this.state.annotations, {
              coordinates: coordinates,
              type: 'polyline',
              strokeColor: '#00FB00',
              strokeWidth: 4,
              strokeAlpha: .5,
              id: 'directions'
            }]
          });
        });
    } else {
      // Else remove selected marker
      this.setState({
        annotations: this.state.annotations.filter(point => {
          return point.subtitle !== selectedPoint.subtitle;
        })
      });
    }
  };
  onLongPress = (location) => {
    console.log('onLongPress', location);
    // Add Marked Unsafe marker on long press
    this.setState({
      annotations: [...this.state.annotations, {
        coordinates: [location.latitude, location.longitude],
        type: 'point',
        title: 'Marked Unsafe',
        subtitle: new Date().toLocaleString('en-US'),
        annotationImage: {
          source: { uri: 'http://www.freeiconspng.com/uploads/emergency-alert-icon-alert-icon-8.png' },
          height: 25,
          width: 25
        },
        rightCalloutAccessory: {
          source: {
            uri: 'https://openclipart.org/image/2400px/svg_to_png/16155/milker-X-icon.png'
          },
          height: 15,
          width: 15,
        },
        id: `${location.latitude}, ${location.longitude}`
      }]
    });
  };
  onTap = (location) => {
    console.log('onTap', location);
  };
  onChangeUserTrackingMode = (userTrackingMode) => {
    this.setState({ userTrackingMode });
    console.log('onChangeUserTrackingMode', userTrackingMode);
  };

  componentWillMount() {
    this._offlineProgressSubscription = Mapbox.addOfflinePackProgressListener(progress => {
      console.log('offline pack progress', progress);
    });
    this._offlineMaxTilesSubscription = Mapbox.addOfflineMaxAllowedTilesListener(tiles => {
      console.log('offline max allowed tiles', tiles);
    });
    this._offlineErrorSubscription = Mapbox.addOfflineErrorListener(error => {
      console.log('offline error', error);
    });
  };

  componentWillUnmount() {
    this._offlineProgressSubscription.remove();
    this._offlineMaxTilesSubscription.remove();
    this._offlineErrorSubscription.remove();
  };

  retrieveNearbyCrimes = () => {
    // If hideCrimes is false
    if (!this.state.hideCrimes) {
      const latitude = this.state.currentLocation.latitude;
      const longitude = this.state.currentLocation.longitude;

      // Retrieve nearby crimes
      axios.get(`${HOST}:${PORT}/map/crimes`, {params: {
          lat: latitude,
          lon: longitude
      }})
        .then(res => {
          const latRange = [latitude - 1, latitude + 1];
          const lonRange = [longitude - 1, longitude + 1];
          console.log('latRange', latRange)
          console.log('lonRange', lonRange)
          // Retrieve only nearby crimes within 1 degree of current location
          const nearbyCrimes = this.state.annotations.filter(annotation => {
            return annotation.type === 'point' && annotation.coordinates[0] <= latRange[1] && annotation.coordinates[0] >= latRange[0] && annotation.coordinates[1] <= lonRange[1] && annotation.coordinates[1] >= lonRange[0]
          });

          // Retrieve other annotations
          const otherAnnotations = this.state.annotations.filter(annotation => {
            return annotation.title === 'Marked Unsafe' || annotation.id === 'search' || annotation.type !== 'point'
          });

          // Retrieve id of nearby crimes
          const crimesId = nearbyCrimes.map(crime => {
            return crime.id;
          });

          // Filter out existing crimes using id
          const newCrimes = res.data.filter(crime => {
            return !crimesId.includes(crime.id);
          });

          // Add new crimes
          this.setState({
            annotations: [...otherAnnotations, ...newCrimes]
          });
        });
    }
  }

  sendLocationToContacts = () => {
    SendSMS.send({
  		body: `Hey! Just wanted to let you know I'm currently at ${this.state.currentLocation.latitude}, ${this.state.currentLocation.longitude}`,
  		recipients: ['0123456789', '9876543210'],
  		successTypes: ['sent', 'queued']
  	}, (completed, cancelled, error) => {
  		console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
  	});
  }

  addNewMarkers = () => {
    // Treat annotations as immutable and create a new one instead of using .push()
    this.setState({
      annotations: [ ...this.state.annotations, {
        coordinates: [40.73312,-73.989],
        type: 'point',
        title: 'This is a new marker',
        id: 'foo'
      }, {
        'coordinates': [[40.749857912194386, -73.96820068359375], [40.741924698522055,-73.9735221862793], [40.735681504432264,-73.97523880004883], [40.7315190495212,-73.97438049316406], [40.729177554196376,-73.97180557250975], [40.72345355209305,-73.97438049316406], [40.719290332250544,-73.97455215454102], [40.71369559554873,-73.97729873657227], [40.71200407096382,-73.97850036621094], [40.71031250340588,-73.98691177368163], [40.71031250340588,-73.99154663085938]],
        'type': 'polygon',
        'fillAlpha': 1,
        'fillColor': '#000000',
        'strokeAlpha': 1,
        'id': 'new-black-polygon'
      }]
    });
  };

  updateMarker2 = () => {
    // Treat annotations as immutable and use .map() instead of changing the array
    this.setState({
      annotations: this.state.annotations.map(annotation => {
        if (annotation.id !== 'marker2') { return annotation; }
        return {
          coordinates: [40.714541341726175,-74.00579452514648],
          'type': 'point',
          title: 'New Title!',
          subtitle: 'New Subtitle',
          annotationImage: {
            source: { uri: 'https://cldup.com/7NLZklp8zS.png' },
            height: 25,
            width: 25
          },
          id: 'marker2'
        };
      })
    });
  };

  removeMarker2 = () => {
    this.setState({
      annotations: this.state.annotations.filter(a => a.id !== 'marker2')
    });
  };

  render() {
    StatusBar.setHidden(false);
    console.log('line 24', this.props)
    return (
      <View style={mapStyle.container}>
        <View style={mapStyle.searchBar}>
          <Text onPress={ () => this.props.data.navigation.navigate('DrawerOpen')} >{ menuIcon }</Text>
          <TextInput
            style={mapStyle.searchInput}
            placeholder={'Search'}
            placeholderTextColor={'#919191'}
            onChangeText={(searchText) => this.setState({searchText})}
            value={this.state.searchText}
          />
          <Text
            onPress={() => this.onPressSearchButton()}
            title="Search"
          >
            { searchIcon }
          </Text>
        </View>
        <MapView
          ref={map => { this._map = map; }}
          style={mapStyle.map}
          initialCenterCoordinate={this.state.center}
          initialZoomLevel={this.state.zoom}
          initialDirection={0}
          rotateEnabled={true}
          scrollEnabled={true}
          zoomEnabled={true}
          showsUserLocation={true}
          styleURL={'mapbox://styles/sonrisa722611/cj7jmjbrw6o0s2ro0fu4agt50'}
          userTrackingMode={this.state.userTrackingMode}
          annotations={this.state.annotations}
          annotationsAreImmutable
          onChangeUserTrackingMode={this.onChangeUserTrackingMode}
          onRegionDidChange={this.onRegionDidChange}
          onRegionWillChange={this.onRegionWillChange}
          onOpenAnnotation={this.onOpenAnnotation}
          onRightAnnotationTapped={this.onRightAnnotationTapped}
          onUpdateUserLocation={this.onUpdateUserLocation}
          onLongPress={this.onLongPress}
          onTap={this.onTap}
          logoIsHidden={true}
          contentInset={[70,0,0,0]}
        />
        <View style={mapStyle.mapButtons}>
          <View style={mapStyle.buttonsLeft}>
            <View style={mapStyle.alert}>
              <Text onPress={ () => this.sendLocationToContacts()} >{ alertIcon }</Text>
            </View>
          </View>
          <View style={mapStyle.buttonsRight}>
            <TouchableHighlight style={mapStyle.currentLocation}>
              <Text onPress={ () => this.setState({ userTrackingMode: Mapbox.userTrackingMode.followWithHeading })} >{ locationIcon }</Text>
            </TouchableHighlight>
            <TouchableHighlight style={mapStyle.crimeView} >
              <View>
                {this.state.hideCrimes &&
                  <Text onPress={ () => this.onCrimesToggleClick()} >{ noViewIcon }</Text>
                }
                {!this.state.hideCrimes &&
                  <Text onPress={ () => this.onCrimesToggleClick()} >{ viewCrimes }</Text>
                }
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }

  _renderButtons() {
    return (
      <View>
        <Text onPress={() => this._map && this._map.setDirection(0)}>
          Set direction to 0
        </Text>
        <Text onPress={() => this._map && this._map.setZoomLevel(6)}>
          Zoom out to zoom level 6
        </Text>
        <Text onPress={() => this._map && this._map.setCenterCoordinate(48.8589, 2.3447)}>
          Go to Paris at current zoom level {parseInt(this.state.currentZoom)}
        </Text>
        <Text onPress={() => this._map && this._map.setCenterCoordinateZoomLevel(35.68829, 139.77492, 14)}>
          Go to Tokyo at fixed zoom level 14
        </Text>
        <Text onPress={() => this._map && this._map.easeTo({ pitch: 30 })}>
          Set pitch to 30 degrees
        </Text>
        <Text onPress={this.addNewMarkers}>
          Add new marker
        </Text>
        <Text onPress={this.updateMarker2}>
          Update marker2
        </Text>
        <Text onPress={() => this._map && this._map.selectAnnotation('marker1')}>
          Open marker1 popup
        </Text>
        <Text onPress={() => this._map && this._map.deselectAnnotation()}>
          Deselect annotation
        </Text>
        <Text onPress={this.removeMarker2}>
          Remove marker2 annotation
        </Text>
        <Text onPress={() => this.setState({ annotations: [] })}>
          Remove all annotations
        </Text>
        <Text onPress={() => this._map && this._map.setVisibleCoordinateBounds(40.712, -74.227, 40.774, -74.125, 100, 0, 0, 0)}>
          Set visible bounds to 40.7, -74.2, 40.7, -74.1
        </Text>
        <Text onPress={() => this.setState({ userTrackingMode: Mapbox.userTrackingMode.followWithHeading })}>
          Set userTrackingMode to followWithHeading
        </Text>
        <Text onPress={() => this._map && this._map.getCenterCoordinateZoomLevel((location)=> {
            console.log(location);
          })}>
          Get location
        </Text>
        <Text onPress={() => this._map && this._map.getDirection((direction)=> {
            console.log(direction);
          })}>
          Get direction
        </Text>
        <Text onPress={() => this._map && this._map.getBounds((bounds)=> {
            console.log(bounds);
          })}>
          Get bounds
        </Text>
        <Text onPress={() => {
            Mapbox.addOfflinePack({
              name: 'test',
              type: 'bbox',
              bounds: [0, 0, 0, 0],
              minZoomLevel: 0,
              maxZoomLevel: 0,
              metadata: { anyValue: 'you wish' },
              styleURL: Mapbox.mapStyles.dark
            }).then(() => {
              console.log('Offline pack added');
            }).catch(err => {
              console.log(err);
            });
        }}>
          Create offline pack
        </Text>
        <Text onPress={() => {
            Mapbox.getOfflinePacks()
              .then(packs => {
                console.log(packs);
              })
              .catch(err => {
                console.log(err);
              });
        }}>
          Get offline packs
        </Text>
        <Text onPress={() => {
            Mapbox.suspendOfflinePack('test')
              .then(info => {
                if (info.suspended) {
                  console.log('Suspended', info.suspended);
                } else {
                  console.log('No packs to suspend');
                }
              })
              .catch(err => {
                console.log(err);
              });
        }}>
          Pause/Suspend pack with name 'test'
        </Text>
        <Text onPress={() => {
            Mapbox.resumeOfflinePack('test')
              .then(info => {
                if (info.resumed) {
                  console.log('Resumed', info.resumed);
                } else {
                  console.log('No packs to resume');
                }
              })
              .catch(err => {
                console.log(err);
              });
        }}>
          Resume pack with name 'test'
        </Text>
        <Text onPress={() => {
            Mapbox.removeOfflinePack('test')
              .then(info => {
                if (info.deleted) {
                  console.log('Deleted', info.deleted);
                } else {
                  console.log('No packs to delete');
                }
              })
              .catch(err => {
                console.log(err);
              });
        }}>
          Remove pack with name 'test'
        </Text>
        <Text>User tracking mode is {this.state.userTrackingMode}</Text>
      </View>
    );
  }
}
