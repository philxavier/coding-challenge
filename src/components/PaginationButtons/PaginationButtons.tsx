import "./style.css";

import React from "react";

interface IPropsPaginationButtons {
  setTablePaginationInd: (value: number[]) => void;
}

export default function PaginationButtons({
  setTablePaginationInd,
}: IPropsPaginationButtons) {
  return (
    <div className="btn-container">
      <div className="btn">Previous</div>
      <div className="btn">Next</div>
    </div>
  );
}
