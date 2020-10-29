import "./style.css";

import React from "react";

interface IPropsSearch {
  setSearchTerm: (value: string | null) => void;
}

export default function Search({ setSearchTerm }: IPropsSearch) {
  const handleChange = (e: any) => {
    const newTerm = e.target.value;
    if (newTerm === "") {
      debugger;

      setSearchTerm("");
    }
    setLocalSearchTerm(newTerm);
  };

  const [localSearchterm, setLocalSearchTerm] = React.useState("");

  const handleSearch = (e: any) => {
    e.preventDefault();
    setSearchTerm(localSearchterm);
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
          value={localSearchterm}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <button onClick={handleSearch} className="btn-search">
          Fooood!
        </button>
      </form>
    </div>
  );
}
