import React, { Component } from 'react';
import MapView from './components/MapView';
import InputView from './components/InputView';
import './App.css';

class _App extends Component {
  constructor(props) {
    super(props);
    this.mapViewElement = React.createRef();
    this.state = {
      hoge: 'hogehoge'
    };
  }
  handleClick = (latitude, longitude) => {
    console.log("handleClick");
    this.mapViewElement.current.changeMarker(latitude, longitude);
  };

  render() {
    return (
      <div className="App">
        <InputView addMark={(latitude, longitude) => { this.handleClick(latitude, longitude); }} />
        <MapView ref={this.mapViewElement} />
      </div>
    );
  }
}
function App() {
  return (
    <div className="App">
      <_App />
    </div>
  );
}

export default App;
