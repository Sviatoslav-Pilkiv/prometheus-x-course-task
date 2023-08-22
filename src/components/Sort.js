import React from "react";
import { FaSearch } from "react-icons/fa";

export default function Sort(props) {
  const { price, changePrice, text, handleTextChange, handlePriceChange } =
    props;

  return (
    <div className="filter-book">
      <div className="filter-input">
        <input
          type="text"
          className="filter-name"
          value={text}
          onChange={handleTextChange}
          placeholder="Search by book name"
        />
        <div className="filter-search">
          <FaSearch className="search-icon" />
        </div>
      </div>
      <select
        className="filter-price"
        value={changePrice}
        onChange={handlePriceChange}
      >
        {price.map((item) => (
          <option value={item.key} key={item.key} className="price-value">
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}
