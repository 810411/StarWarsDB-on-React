import React, {Component} from 'react';

import './app.css';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import SwapiService from "../../services/swapi-service";

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
      <div>
        <Header />
        {this.state.showRandomPlanet && <RandomPlanet />}

        <button
        className="toggle-planet btn btn-warning btn-large"
        onClick={this.toggleRandomPlanet}>
          Toggle random planet
        </button>

        <PeoplePage />

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllPlanets}
            />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson}/>
          </div>
        </div>

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllStarships}
            />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
