import React, {Component, Fragment} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import {
  PeoplePage,
  PlanetsPage,
  StarshipsPage,
  LoginPage,
  SecretPage
} from '../pages';
import {SwapiServiceProvider} from '../swapi-service-context';

import './app.css';

export default class App extends Component {

  state = {
    swapiService: new SwapiService(),
    isLoggedIn: false
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    })
  };

  onServiceChange = () => {
    this.setState(({swapiService}) => {
      const Service = swapiService instanceof SwapiService ?
        DummySwapiService : SwapiService;
      return {
        swapiService: new Service()
      };
    });
  };

  render() {
    const {isLoggedIn} = this.state;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <BrowserRouter>
            <div className="stardb-app container">
              <Header/>
              <Switch>
                <Route path="/"
                       render={() =>
                         (<Fragment>
                           <h2 className="text-center">Welcome to StarWarsDB App</h2>
                           <RandomPlanet/>
                         </Fragment>)}
                       exact/>
                <Route path="/people/:id?" component={PeoplePage}/>
                <Route path="/planets/:id?" component={PlanetsPage}/>
                <Route path="/starships/:id?" component={StarshipsPage}/>
                <Route path="/login"
                       render={() =>
                         <LoginPage
                           isLoggedIn={isLoggedIn}
                           onLogin={this.onLogin}
                         />}/>
                <Route path="/secret"
                       render={() =>
                         <SecretPage
                           isLoggedIn={isLoggedIn}
                           onServiceChange={this.onServiceChange}
                         />}/>
                <Route render={() => <h2 className="text-center">404. Page not found</h2>}/>
              </Switch>
            </div>
          </BrowserRouter>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
