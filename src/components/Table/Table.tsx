import "./style.css";

import React from "react";

interface IPropsTable {
  restaurantData: any[];
}

const tableHeaders = [
  "name",
  "city",
  "genre",
  "id",
  "lat",
  "long",
  "state",
  "telephone",
];

export default function Table(props: IPropsTable) {
  return (
    <table>
      <tr>
        {tableHeaders.map((ele) => {
          return <th>{ele}</th>;
        })}
      </tr>
      <tr>
        <td>January</td>
        <td>$100</td>
      </tr>
      <tr>
        <td>February</td>
        <td>$80</td>
      </tr>
    </table>
  );
}
