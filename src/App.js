import React, { Component } from 'react';
import MapView from './components/MapView';
import InputView from './components/InputView';
import './App.css';

class _App extends Component {
  constructor(props) {
    super(props);
    this.mapViewElement = React.createRef();
  }
  handleClick = (latitude, longitude) => {
    this.mapViewElement.current.changeMarker(latitude, longitude);
  };

  render() {
    return (
      <div class="App" uk-grid>
        <InputView addMark={(latitude, longitude) => { this.handleClick(latitude, longitude); }} />
        <MapView ref={this.mapViewElement} />
      </div>
    );
  }
}
function App() {
  return (
    <_App />
  );
}

export default App;
