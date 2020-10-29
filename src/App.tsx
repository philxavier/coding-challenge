import "./App.css";

import { IRestaurant } from "./GeneralTypes";
import React from "react";
import Seach from "./components/Search/Search";
import Table from "./components/Table/Table";
import axios from "axios";

function App() {
  React.useEffect(() => {
    let fetchRestaurantData = async () => {
      let fetchedData = await axios.get(
        "https://code-challenge.spectrumtoolbox.com/api/restaurants",
        {
          headers: {
            Authorization: process.env.REACT_APP_APIKEY,
          },
        }
      );
      setRestaurantData(
        fetchedData.data.sort((a: IRestaurant, b: IRestaurant) => {
          return a.name > b.name ? 1 : -1;
        })
      );
    };

    fetchRestaurantData();
  }, []);

  const [restaurantData, setRestaurantData] = React.useState<any>([]);
  const [searchTerm, setSearchTerm] = React.useState<string | null>(null);

  return (
    <div className="App">
      {!restaurantData.length ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <h1>List of Restaurants</h1>
          <Seach setSearchTerm={setSearchTerm} />
          <Table searchTerm={searchTerm} restaurantData={restaurantData} />
        </>
      )}
    </div>
  );
}

export default App;
