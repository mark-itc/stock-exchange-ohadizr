import {companyData,companyStockHistory,NASDAQSymbolList,tenSearchResults} from './data.js'
// console.log("tenSearchResults",await tenSearchResults("aa"));
// console.log("companyData",await companyData("aapl"));
// console.log("companyStockHistory",await companyStockHistory("aapl"));
// console.log("NASDAQSymbolList",await NASDAQSymbolList());
// const loadingIcon = `

function spinnerOn() {
 document.getElementById("spinner").style.display = "contents"; 
}

function spinnerOff() {
    document.getElementById("spinner").style.display = "none"; 
   }
   spinnerOff()
class Stock {
    constructor(stockObject) {
      this.symbol = stockObject.symbol;
      this.name = stockObject.name;
      this.stockExchange = stockObject.stockExchange;
    }

    createStockCard() {

      const cardDiv = document.createElement("li");
      cardDiv.classList.add("card");
      cardDiv.classList.add("custom-card");

      const bodyDiv = document.createElement("div");
      bodyDiv.classList.add("card-body");
    
      const h5Name = document.createElement("h5");
      h5Name.classList.add("card-name");
      h5Name.innerHTML = this.name;

      const h5Icon = document.createElement("a");
      h5Icon.classList.add("card-icon-name");
      h5Icon.innerHTML = this.symbol + "-"
      
     

      bodyDiv.appendChild(h5Icon);
      bodyDiv.appendChild(h5Name);
      cardDiv.appendChild(bodyDiv);
      
      cardDiv.addEventListener("click",() =>{
        this.cardClick()
      })
    
      return cardDiv ;
    }
    
}


class GetStockData {
    constructor(e) {
      this.stockSearchPick = "";
      const searchForm = document.getElementById("search-form");
      
      searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.runSearch();

        
      });
    }
  
       

    
    async runSearch(e) {
        spinnerOn()
        this.stockSearchPick = document.getElementById("search-input").value;
        const apiResults = await tenSearchResults(this.stockSearchPick );
        console.log("apiResults",apiResults);
        const stockContainer = document.getElementById("stock-container");
        let stockObject = [];
          apiResults.forEach((item) => {
          const stock = new Stock(item);
          console.log("stock", stock);
          stockObject.push(stock);
          const card = stock.createStockCard();
          stockContainer.appendChild(card);

        });
        spinnerOff()
      }
  }




window.onload = async () => {
   let getStockData = new GetStockData();

      
}




