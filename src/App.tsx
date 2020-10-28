import "./App.css";

import axios, { AxiosResponse } from "axios";

import { IRestaurant } from "./GeneralTypes";
import React from "react";
import Table from "./components/Table/Table";

function App() {
  React.useEffect(() => {
    let fetchRestaurantData = async () => {
      try {
        let restaurantData = await axios.get(
          "https://code-challenge.spectrumtoolbox.com/api/restaurants",
          {
            headers: {
              Authorization: process.env.REACT_APP_APIKEY,
            },
          }
        );
        console.log(restaurantData);
        return restaurantData;
      } catch (err) {
        console.log("request error", err);
      }
    };

    let fetchedRestaurants = fetchRestaurantData();
    setRestaurantData(fetchedRestaurants);
  }, []);

  const [restaurantData, setRestaurantData] = React.useState<any>([]);

  return (
    <div className="App">
      <Table restaurantData={restaurantData} />
    </div>
  );
}

export default App;
