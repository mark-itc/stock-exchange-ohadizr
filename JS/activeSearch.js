import {
  companyData,
  companyStockHistory,
  NASDAQSymbolList,
  tenSearchResults,
} from "./data.js";

let searchable = [];
let searchablePush = await NASDAQSymbolList();
searchablePush.forEach((key) => {
  searchable.push(key.symbol);
});
const searchInput = document.getElementById("search-input");
const searchWrapper = document.querySelector(".wrapper");
const resultsWrapper = document.querySelector(".results");
let basicInfoResult = []
let results = [];
function getResults(data){
   
}
searchInput.addEventListener("keyup", async () => {
let tenSerches=await tenSearchResults(searchInput.innerHTML)
basicInfoResult.push(tenSerches)

const xx = basicInfoResult.map((i) => {
	return i.symbol
});
console.log(basicInfoResult);
 console.log("xx");

 });   


async function renderSearchResults(results) {
  if (!results.length) {
    return searchWrapper.classList.remove("show");
  }

  await companyData(symbol);

  const activeSearchLi = document.getElementsByClassName("activeSearchLi");
  const content = results
    .map(async (item) => {
      let data = await companyData(item);
      console.log("testData", data);
      return `
          <li class="activeSearchLi">
          <img class="card-icon" src="https://fmpcloud.io/image-stock/${item}.png">
  
           ${item}
  
     
          </li>
          
          
          `;
    })
    .join("");

  searchWrapper.classList.add("show");
  resultsWrapper.innerHTML = `<ul>${content}</ul>`;
}
