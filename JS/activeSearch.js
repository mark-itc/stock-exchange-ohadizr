import {
  companyData,
  companyStockHistory,
  NASDAQSymbolList,
  tenSearchResults,
} from "./data.js";

const symbolList = await NASDAQSymbolList();   
const searchList = []
for (let i = 0; i < symbolList.length; i++) {
    const company =  ((await companyStockHistory(symbolList[i])));
    const companydat= await companyData(symbolList[i])

    searchList.push(
        {
            "symbol": symbolList[i],
            // "changePercent":company.historical.pop().changePercent,
            "date":companydat.profile.companyName,
            "imgSrc": companydat.profile.image
        }
    );
    
    
}
console.log(searchList);



// let searchable= []
// let searchablePush = await getStocksSybolForSearch()
// searchablePush.forEach( key=> {
//   searchable.push(key.symbol)
// });
//   const searchInput = document.getElementById('search-input');
//   const searchWrapper = document.querySelector('.wrapper');
//   const resultsWrapper = document.querySelector('.results');
  
//   searchInput.addEventListener('keyup', async () => {
//     let results = [];
//     let input = searchInput.value;
//     if (input.length) {
//       results = searchable.filter((item) => {
//         return item.toLowerCase().includes(input.toLowerCase());
//       });
//     }
//    await renderSearchResults(results.slice(-10));

//   });

//   async function renderSearchResults(results) {
//     if (!results.length) {
//       return searchWrapper.classList.remove('show');
//     }


//      async function companyData(symbol) {
//       try {
//         let url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;
//         const response = await fetch(url);
//         const results = await response.json();
//         return results;
//       } catch (error) {
//         return error;
//       }
//     }
//     const activeSearchLi = document.getElementsByClassName("activeSearchLi")
//     const content = results.map(async (item) => {
//         // let data = await companyData(item)
//         // console.log("testData",data);
//         return `
//         <li class="activeSearchLi">
//         <img class="card-icon" src="https://fmpcloud.io/image-stock/${item}.png">

//          ${item}

   
//         </li>
        
        
//         `;
//       }).join('');
  
//     searchWrapper.classList.add('show');
//     resultsWrapper.innerHTML = `<ul>${content}</ul>`;
//   }

