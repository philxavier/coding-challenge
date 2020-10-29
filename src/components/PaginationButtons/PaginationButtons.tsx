import "./style.css";

import React from "react";

interface IPropsPaginationButtons {
  setTablePaginationInd: (value: number[]) => void;
  tablePaginationInd: number[];
  numOfRestaurants: number | null;
}

export default function PaginationButtons({
  setTablePaginationInd,
  tablePaginationInd,
  numOfRestaurants,
}: IPropsPaginationButtons) {
  const [buttonStatus, setButtonStatus] = React.useState({
    previous: false,
    next: true,
  });

  React.useEffect(() => {
    if (numOfRestaurants) {
      if (numOfRestaurants < 10) {
        setButtonStatus({ previous: false, next: false });
      } else if (tablePaginationInd[0] === 0) {
        setButtonStatus({
          previous: false,
          next: true,
        });
      } else if (tablePaginationInd[1] >= numOfRestaurants) {
        setButtonStatus({
          previous: true,
          next: false,
        });
      } else {
        setButtonStatus({ previous: true, next: true });
      }
    }
  }, [tablePaginationInd]);

  const handleIncreasePagination = () => {
    let newPagInd: any;
    debugger;
    if (numOfRestaurants) {
      if (tablePaginationInd[1] >= numOfRestaurants) return;
      newPagInd = [tablePaginationInd[0] + 10, tablePaginationInd[1] + 10];
      setTablePaginationInd(newPagInd);
    }
  };

  const handleDecreasePagination = () => {
    let newPagInd: any;
    if (numOfRestaurants) {
      if (tablePaginationInd[0] <= 0) return;
      newPagInd = [tablePaginationInd[0] - 10, tablePaginationInd[1] - 10];
      setTablePaginationInd(newPagInd);
    }
  };

  return (
    <div className="btn-container">
      <div
        className={buttonStatus.previous ? "btn" : "btn-inactive"}
        onClick={handleDecreasePagination}
      >
        Previous
      </div>
      <div
        className={buttonStatus.next ? "btn" : "btn-inactive"}
        onClick={handleIncreasePagination}
      >
        Next
      </div>
    </div>
  );
}
