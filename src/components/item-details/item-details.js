import React, { Component } from 'react';

import './item-details.css';

import Spinner from "../spinner";

const Record = ({item, field, label}) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}: </span>
      <span>{item[field]}</span>
    </li>
  )
};

export {
  Record
};

export default class ItemDetails extends Component {

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

    const {name} = item;

    return this.state.isLoading ? <Spinner/> : (
      <div className="person-details card">
        <img className="person-image"
          src={image} alt=""/>

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {
              React.Children.map(this.props.children, child => {
                return React.cloneElement(child, {item});
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}
