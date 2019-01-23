import React from 'react';

import './item-list.css';
import {withData} from '../hoc-helpers'
import SwapiService from "../../services/swapi-service";


const ItemList = ({data, onItemSelected, children: renderLabel}) => {
  const items = data.map(item => {
    const {id} = item;
    const label = renderLabel(item);

    return (
      <li
        className="list-group-item"
        key={id}
        onClick={() => this.props.onItemSelected(id)}>
        {label}
      </li>
    )
  });

  return (
    <ul className="item-list list-group">
      {items}
    </ul>
  );
};

const {getAllPeople} = new SwapiService();

export default withData(ItemList, getAllPeople)
