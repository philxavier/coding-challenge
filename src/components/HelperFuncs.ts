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
  debugger;

  return lowerCaseSearchCriteria.includes(termLowerCase);
}

// export function testSearchInCity(city: string, term: string) {
//   if (!/^[a-zA-Z0-9]+$/.test(term)) {
//   }
// }

// export function testSearchInGenre(genre: string, term: any) {
//   if (!/^[a-zA-Z0-9]+$/.test(term)) {
//   }
// }
