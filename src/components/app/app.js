import React, {Component} from 'react';

import './app.css';

import Header from '../header';
import ItemDetails, {Record} from "../item-details";
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry";
import Row from "../row";
import ItemList from "../item-list";

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
    const {getPerson, getStarship, getPersonImage, getStarshipImage, getAllPeople, getAllStarships} = this.swapiService;

    const personDetail = (
      <ItemDetails
        itemId={11}
        getData={getPerson}
        getImageUrl={getPersonImage}>
        <Record field="gender" label="Gender" />
        <Record field="eyeColor" label="Eye color" />
      </ItemDetails>
    );

    const starshipDetail = (
      <ItemDetails
        itemId={5}
        getData={getStarship}
        getImageUrl={getStarshipImage}>
        <Record field="model" label="Model" />
        <Record field="length" label="Length" />
        <Record field="costInCredits" label="Cost" />
      </ItemDetails>
    );

    const personList = (
      <ItemList
        getData={getAllPeople}>
        {({name}) => <span>{name}</span>}
      </ItemList>
    );

    const starshipList = (
      <ItemList
        getData={getAllStarships}>
        {({name}) => <span>{name}</span>}
      </ItemList>
    );

    return (
      <div className="container">
        <ErrorBoundry>
          <Header />

          <Row
            left={personList}
            right={personDetail}/>

          <Row
            left={starshipList}
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
