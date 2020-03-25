import React, { Component } from 'react';
import './App.scss';
import Tournament from './components/tournament/tournament';
import { Provider } from 'react-redux';
import factory from './store';
import { PersistGate } from 'redux-persist/integration/react'

const {store,persistor}   = factory();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate  loading={null} persistor={persistor} >
          <Tournament/>
        </PersistGate>
      </Provider>
    );
  }

}

export default App;
