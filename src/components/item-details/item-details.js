import React, { Component } from 'react';

import './item-details.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";

export default class ItemDetails extends Component {
  swapiService = new SwapiService();

  state = {
    item: null,
    image: null,
    isLoading: false
  };

  componentDidMount() {
    this.updateItem();
  };

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.setState({isLoading: true});

      this.updateItem()
    }
  }

  updateItem() {
    const {itemId, getData, getImageUrl} = this.props;

    if (!itemId) {
      return;
    }

    getData(itemId)
      .then(item => this.setState({
        item,
        image: getImageUrl(item.id),
        isLoading: false
      }))
  };

  render() {
    const {item, image} = this.state;

    if (!item) {
      return <span>Select item from a list</span>
    }

    const {id, name, gender, birthYear, eyeColor} = item;

    return this.state.isLoading ? <Spinner/> : (
      <div className="person-details card">
        <img className="person-image"
          src={image} alt=""/>

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender: </span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth year: </span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye color: </span>
              <span>{eyeColor}</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
