export function testSearchTerm(
  searchCriteria: string,
  term: string,
  genre?: string
) {
  let termLowerCase = term
    .split("")
    .map((ele) => {
      return ele.toLowerCase();
    })
    .join("");
  let lowerCaseSearchCriteria;
  if (genre) {
    lowerCaseSearchCriteria = searchCriteria
      .split(",")
      .map((ele) => {
        return ele.toLowerCase();
      })
      .join(" ");
  } else {
    lowerCaseSearchCriteria = searchCriteria
      .split(",")
      .map((ele) => {
        return ele.toLowerCase();
      })
      .join(" ");
  }

  return lowerCaseSearchCriteria.includes(termLowerCase);
}
