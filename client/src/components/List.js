import React from "react";
import Item from "./Item";



/**
 * The method that can be called to pass the data into a set list per item. 
 * Where an item is a row 
 * @param {*} param0 
 * @returns 
 */
export default function List({ data }) {
  return (
    <ul className="item-wrapper">
      {data.map(row => (
        <Item row={row} />
      ))}
    </ul>
  );
}
