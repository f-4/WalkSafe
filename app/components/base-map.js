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
      axios.get(`${HOST}:${PORT}/api/map/search`, {
        params: {
          address: this.state.searchText
        }
      })
        .then(res => {
          // Coordinates received are in reverse order
          const coordinates = res.data.center.reverse();
          const address = res.data.place_name.split(',');

          // Filter out search and directions annotation
          const filteredAnnotations = this.state.annotations.filter(annotation => {
            return annotation.id !== 'search' && annotation.id !== 'directions';
          });

          // Add marker on searched location
          this.setState({
            annotations: [...filteredAnnotations, {
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
          return annotation.title === 'Marked Unsafe' || annotation.id === 'search' || annotation.type === 'polyline'
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
      axios.get(`${HOST}:${PORT}/api/map/directions`, {
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
      axios.get(`${HOST}:${PORT}/api/map/crimes`, {params: {
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
            <TouchableHighlight style={mapStyle.crimeView}>
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
}
