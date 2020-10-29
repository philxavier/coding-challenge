import "./style.css";

import React from "react";

export default function Search() {
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
        />
      </form>
    </div>
  );
}
