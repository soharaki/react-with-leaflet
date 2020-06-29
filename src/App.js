import React, { Component } from 'react';
import MapView from './components/MapView';
import InputView from './components/InputView';
import './App.css';

class _App extends Component {
  render(){    
    return (
      <div className="App">
        <InputView/>
        <MapView/>
    </div>
    );
  }
}
function App() {
  return (
    <div className="App">
      <_App/>
    </div>
  );
}

export default App;
