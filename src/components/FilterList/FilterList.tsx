import "./style.css";

import { IRestaurant } from "../../GeneralTypes";
import React from "react";

interface IFilterListProps {
  typeOfFilter: string | null;
  selectedHeader: string;
  values: string[];
  setStateFilter: (filter: any) => void;
  setGenreFilter: (filter: any) => void;
}

export default function FilterList({
  selectedHeader,
  values,
  setGenreFilter,
  setStateFilter,
}: IFilterListProps) {
  const handleChange = (e: any) => {
    if (e.target.value === "Choose state") {
      setStateFilter(e.target.value);
    } else if (e.target.value.length === "Choose genre") {
    } else if (e.target.value.length > 2) {
      setGenreFilter(e.target.value);
    } else {
      setStateFilter(e.target.value);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: "0",
        right: "0",
      }}
    >
      <select
        onChange={(e) => {
          handleChange(e);
        }}
        name="cars"
        id="cars"
      >
        <option
          value={selectedHeader === "genre" ? "Choose genre" : "Choose state"}
        >
          {selectedHeader === "genre" ? "Choose genre" : "Choose state"}
        </option>
        {values.map((ele) => {
          return (
            <option datatype={"test"} key={ele} value={ele}>
              {ele}
            </option>
          );
        })}
      </select>
    </div>
  );
}
