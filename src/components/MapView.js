import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import data from '../assets/data';
import Markers from './VenueMarkers';

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: { lat: 52.52437, lng: 13.41053 },
      zoom: 12,
      venues: []
    };
    this.changeMarker = this.changeMarker.bind(this);
  }

  changeMarker = (latitude, longitude) => {
    console.log("changeMarker");
    console.log(latitude, longitude);
    this.setState({
      venues: [<Markers venues={data.venues} />]
    })
  };

  render() {
    const { currentLocation, zoom } = this.state;

    return (
      <Map center={currentLocation} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />

        {this.state.venues}
      </Map>
    );
  }
}

export default MapView;
