import React, {Component} from 'react';

import './people-page.css';

import ItemList from "../item-list";
import ItemDetails from "../item-details";
import ErrorIndicator from "../error-indicator";
import Row from '../row';
import SwapiService from "../../services/swapi-service";


class PeoplePage extends Component {
  swapiService = new SwapiService();

  state = {
    selectedPerson: 4
  };

  onPersonSelected = id => {
    this.setState({
      selectedPerson: id
    })
  };

  render() {
    if(this.state.hasError) {
      return <ErrorIndicator />
    }

    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}>
        {i => `${i.name} (${i.birthYear})`}
      </ItemList>
    );

    const personDetails = (
      <ItemDetails
        personId={this.state.selectedPerson}
      />
    );

    return (
      <Row left={itemList} right={personDetails} />
    )
  }
}

export default PeoplePage
