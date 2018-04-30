import React, { Component } from 'react';
import logo from './logo.svg';
import NavBar from './components/NavBar';
import Setup from './components/Setup';
import History from './components/History';
import Timer from './components/Timer';
import { Route, Switch } from 'react-router-dom';
import { fetchAllHistory } from './store/history'
import store from './store'


class App extends Component {
  constructor(){
    super()
    this.state = store.getState();
  }

  componentDidMount(){
    store.dispatch(fetchAllHistory())
  }

  render() {
    return (
      <div className="App">
      <Switch>
          <Route exact path='/' component={NavBar} /> 
          <Route exact path='/setup' component={Setup} />
          <Route exact path='/history' component={History} />
          </Switch>  
      </div>
    );
  }
}

export default App;
