import "./style.css";

import React from "react";

interface IPropsSearch {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export default function Search({ searchTerm, setSearchTerm }: IPropsSearch) {
  const handleChange = (e: any) => {
    const newTerm = e.target.value;
    setSearchTerm(newTerm);
  };

  return (
    <div className="search-bar">
      <form action="">
        <label htmlFor="">
          <h3 style={{ display: "inline" }}>Search Restaurant</h3>
        </label>
        <input
          style={{ marginLeft: "10px", padding: "8px", fontSize: "14px" }}
          type="text"
          placeholder="What you in the mood for?"
          value={searchTerm}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <button className="btn-search">Fooood!</button>
      </form>
    </div>
  );
}
