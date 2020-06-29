import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Markers from './VenueMarkers';

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: { lat: 35.6862, lng: 139.7365 },
      zoom: 18,
      venue: null,
      arrayvar: []
    };
    this.changeMarker = this.changeMarker.bind(this);
  }

  changeMarker = (latitude, longitude) => {
    console.log(latitude, longitude);

    var newelement =
    {
      "description": "",
      "name": "",
      "geometry": [
        latitude,
        longitude
      ]
    };

    this.setState(prevState => ({
      arrayvar: [...prevState.arrayvar, newelement],
      currentLocation: { lat: latitude, lng: longitude }
    }));

    this.setState({
      venue: <Markers venues={this.state.arrayvar} />
    });
  };

  render() {
    const { currentLocation, zoom } = this.state;

    return (
      <Map center={currentLocation} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        {this.state.venue}
      </Map>
    );
  }
}

export default MapView;
