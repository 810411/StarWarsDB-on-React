import React, { Component } from 'react';

import './person-details.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";

export default class PersonDetails extends Component {
  swapiService = new SwapiService();

  state = {
    person: null,
    isLoading: false
  };

  componentDidMount() {
    this.updatePerson();
  };

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.setState({isLoading: true});

      this.updatePerson()
    }
  }

  updatePerson() {
    const {personId} = this.props;

    if (!personId) {
      return;
    }

    this.swapiService
      .getPerson(personId)
      .then(person => this.setState({
        person,
        isLoading: false
      }))
  };

  render() {
    if (!this.state.person) {
      return <span>Select person from a list</span>
    }

    const {id, name, gender, birthYear, eyeColor} = this.state.person;

    return this.state.isLoading ? <Spinner/> : (
      <div className="person-details card">
        <img className="person-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">{gender}</span>
              <span>male</span>
            </li>
            <li className="list-group-item">
              <span className="term">{birthYear}</span>
              <span>43</span>
            </li>
            <li className="list-group-item">
              <span className="term">{eyeColor}</span>
              <span>red</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
