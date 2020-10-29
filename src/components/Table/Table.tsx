import "./style.css";

import FilterList from "../FilterList/FilterList";
import { IRestaurant } from "../../GeneralTypes";
import React from "react";

interface IPropsTable {
  restaurantData: IRestaurant[];
}

const emojiMapper = (header: string) => {
  switch (header) {
    case "name":
      return <span>🍴</span>;
    case "city":
      return <span>🏙</span>;
    case "genre":
      return <span>🥘</span>;
    case "state":
      return <span>🗾</span>;
    case "telephone":
      return <span>📞</span>;
  }
};

const tableHeaders = ["name", "city", "genre", "state", "telephone"];

export default function Table({ restaurantData }: IPropsTable) {
  const getListOfStates = React.useCallback(() => {
    const states = restaurantData.map((ele) => {
      return ele.state;
    });
    return Array.from(new Set(states)).sort((a, b) => {
      return a > b ? 1 : -1;
    });
  }, [restaurantData]);

  const getListOfGenres = React.useCallback(() => {
    let listOfGenres: any[] = [];
    restaurantData.forEach((ele: any) => {
      let currentGenres = ele.genre.split(",");
      listOfGenres = listOfGenres.concat(currentGenres);
    });
    return Array.from(new Set(listOfGenres)).sort((a, b) => {
      return a > b ? 1 : -1;
    });
  }, [restaurantData]);

  const [genreFilter, setGenreFilter] = React.useState(null);
  const [stateFilter, setStateFilter] = React.useState(null);
  const [filteredData, setFilteredData] = React.useState(restaurantData);

  React.useEffect(() => {
    const filteredValues: any = filterValues(genreFilter, stateFilter);
    setFilteredData(filteredValues);
  }, [genreFilter, stateFilter]);

  const filterValues = (genreFilter: any, stateFilter: any) => {
    let restaurantDataCopy = restaurantData.slice();

    if (genreFilter) {
      restaurantDataCopy = restaurantDataCopy.filter((ele) => {
        if (genreFilter === "Choose genre") {
          return ele;
        } else {
          return ele.genre.split(",").includes(genreFilter);
        }
      });
    }

    if (stateFilter) {
      restaurantDataCopy = restaurantDataCopy.filter((ele: any) => {
        if (stateFilter === "Choose state") {
          return ele;
        } else {
          return ele.state === stateFilter;
        }
      });
    }

    return restaurantDataCopy;
  };

  return (
    <>
      <table className="restaurant-table">
        <tbody>
          <tr>
            {tableHeaders.map((ele: any) => {
              return (
                <th key={ele}>
                  <div
                    style={{
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <div style={{ padding: "32px" }}>
                      <span>{emojiMapper(ele)}</span>
                      <span style={{ marginLeft: "10px" }}>{ele}</span>
                    </div>
                    {ele === "state" || ele === "genre" ? (
                      <FilterList
                        typeOfFilter={
                          ele === "state" ? stateFilter : genreFilter
                        }
                        setGenreFilter={setGenreFilter}
                        setStateFilter={setStateFilter}
                        values={
                          ele === "state"
                            ? getListOfStates()
                            : getListOfGenres()
                        }
                        selectedHeader={ele}
                      />
                    ) : null}
                  </div>
                </th>
              );
            })}
          </tr>
          {filteredData.map((restaurantObj: any, ind: any) => {
            return (
              <tr key={ind}>
                {tableHeaders.map((ele, ind) => {
                  return <td key={ind}>{restaurantObj[ele]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
