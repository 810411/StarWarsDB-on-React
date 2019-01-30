import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";

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
import StarshipDetails from "../sw-components/starship-details";

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
              <Header onServiceChange={this.onServiceChange}/>
              <RandomPlanet/>

              <Switch>

                <Route path="/" render={() => <h2>Welcome to StarDB</h2>} exact/>
                <Route path="/people/:id?" component={PeoplePage}/>
                <Route path="/planets" component={PlanetsPage}/>
                <Route path="/starships" component={StarshipsPage} exact/>
                <Route path="/starships/:id" render={({match}) => <StarshipDetails itemId={match.params.id}/>}/>
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
