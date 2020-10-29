import "./style.css";

import FilterList from "../FilterList/FilterList";
import { IRestaurant } from "../../GeneralTypes";
import PaginationButtons from "../PaginationButtons/PaginationButtons";
import React from "react";
import { testSearchTerm } from "../HelperFuncs";

interface IPropsTable {
  restaurantData: IRestaurant[];
  searchTerm: string | null;
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

export default function Table({ restaurantData, searchTerm }: IPropsTable) {
  console.log("-----------", searchTerm);
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
  const [paginatedData, setPaginatedData] = React.useState([]);
  const [tablePaginationInd, setTablePaginationInd] = React.useState([0, 10]);
  const [numOfRestaurants, setNumOfRestaurants] = React.useState(
    restaurantData.length
  );

  React.useEffect(() => {
    let newData: any = filteredData.slice(
      tablePaginationInd[0],
      tablePaginationInd[1]
    );
    setPaginatedData(newData);
  }, [tablePaginationInd]);

  React.useEffect(() => {
    if (!genreFilter && !stateFilter && searchTerm === null) return;
    const filteredValues: any = filterValues(genreFilter, stateFilter);
    setFilteredData(filteredValues);
    setNumOfRestaurants(filteredValues.length);
    setTablePaginationInd([0, 10]);
  }, [genreFilter, stateFilter, searchTerm]);

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

    if (searchTerm) {
      debugger;
      restaurantDataCopy = restaurantDataCopy.filter((ele: any): void => {
        if (
          testSearchTerm(ele.name, searchTerm) ||
          testSearchTerm(ele.city, searchTerm) ||
          testSearchTerm(ele.genre, searchTerm, "genre")
        ) {
          return ele;
        } else {
          if (searchTerm === "") {
            return ele;
          }
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

          {paginatedData.map((restaurantObj: any, ind: any) => {
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
      {!filteredData.length ? (
        <h2>We couldn't find anything at this time =(</h2>
      ) : null}

      <PaginationButtons
        numOfRestaurants={numOfRestaurants}
        tablePaginationInd={tablePaginationInd}
        setTablePaginationInd={setTablePaginationInd}
      />
    </>
  );
}
