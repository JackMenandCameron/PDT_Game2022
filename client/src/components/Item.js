import React from "react";

export default function Item({ row }) {
  return (
    <li className="item">
      <div className="item__avatar">
        <img
          className="item__avatar__img"
          alt={row.displayName}
        />
      </div>
      <span className="item__name">{row.displayName}</span>
      <span className="item__score">{row.score}</span>
    </li>
  );
}