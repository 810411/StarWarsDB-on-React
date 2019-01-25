import React, {Component} from 'react';

import './app.css';

import Header from '../header';
import ItemDetails, {Record} from "../item-details";
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry";
import Row from "../row";
import ItemList from "../item-list";
import {
  PersonList,
  PlanetList,
  StarshipList,
  PersonDetails,
  PlanetDetails,
  StarshipDetails
} from '../sw-components';

class App extends Component {
  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true
  };

  toggleRandomPlanet = () => {
    const changeShowRandomPlanet = !this.state.showRandomPlanet;
    this.setState({
      showRandomPlanet: changeShowRandomPlanet
    })
  };

  render() {

    return (
      <div className="container">
        <ErrorBoundry>
          <Header />
          <PersonDetails itemId={4}/>
          <PlanetDetails itemId={5}/>
          <StarshipDetails itemId={9}/>

          <PersonList/>
          <PlanetList/>
          <StarshipList/>

        </ErrorBoundry>

        {/*{this.state.showRandomPlanet && <RandomPlanet />}*/}

        {/*<button*/}
        {/*className="toggle-planet btn btn-warning btn-large"*/}
        {/*onClick={this.toggleRandomPlanet}>*/}
          {/*Toggle random planet*/}
        {/*</button>*/}

        {/*<PeoplePage />*/}

      </div>
    )
  }
}

export default App;
