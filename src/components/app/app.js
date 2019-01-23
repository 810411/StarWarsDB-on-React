import React, {Component} from 'react';

import './app.css';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';
import ItemList from "../item-list";
import ItemDetails from "../item-details";
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry";
import Row from "../row";

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
    const {getPerson, getStarship, getPersonImage, getStarshipImage} = this.swapiService;

    const personDetail = (
      <ItemDetails
        itemId={11}
        getData={getPerson}
        getImageUrl={getPersonImage}/>
    );

    const starshipDetail = (
      <ItemDetails
        itemId={5}
        getData={getStarship}
        getImageUrl={getStarshipImage}/>
    );

    return (
      <div className="container">
        <ErrorBoundry>
          <Header />

          <Row
            left={personDetail}
            right={starshipDetail}/>

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
