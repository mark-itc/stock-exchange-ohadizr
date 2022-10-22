import {companyData,companyStockHistory,NASDAQSymbolList,tenSearchResults} from './data.js'
const stockContainer = document.getElementById("stock-container");
const iFraemCardSrc=document.getElementById('companyIframe')
export  function spinnerOn() {
  document.getElementById("spinner").style.display = "contents"; 
 }

export  function spinnerOff() {
     document.getElementById("spinner").style.display = "none"; 
    }

   spinnerOff()
  class Stock {
    constructor(stockObject,apiCompanyData) {
      this.symbol = stockObject.symbol;
      this.name = stockObject.name;
      this.stockExchange = stockObject.stockExchange;
      this.changesPercentage = apiCompanyData.profile.changesPercentage;
      this.img = "https://fmpcloud.io/image-stock/"+stockObject.symbol+".png";
    }
    async cardIframeImportHTML(){
      iFraemCardSrc.style.display = "block"
      iFraemCardSrc.src = "http://127.0.0.1:5501//company.html?symbol="+this.symbol;
    }
    createStockCard() {
      const cardDiv = document.createElement("li");
      cardDiv.classList.add("card");
      cardDiv.classList.add("custom-card");

      const bodyDiv = document.createElement("div");
      bodyDiv.classList.add("card-body");

      const h6Symbol = document.createElement("h6");
      h6Symbol.classList.add("card-symbol-name");
      h6Symbol.innerHTML = "(" +this.symbol +")"
      
      const thisImg = document.createElement("img");
      thisImg.classList.add("card-icon");
      thisImg.src = this.img

      const h5Name = document.createElement("h5");
      h5Name.classList.add("card-name");
      h5Name.innerHTML = this.name;

      const h5ChangesPercentage = document.createElement("H5");
      if (this.changesPercentage >0) {
        h5ChangesPercentage.classList.add("card-icon-changesPercentage-green");
      }else{
        h5ChangesPercentage.classList.add("card-icon-changesPercentage-red");
      }
      h5ChangesPercentage.classList.add("card-icon-changesPercentage");
      h5ChangesPercentage.innerHTML ="(" +this.changesPercentage +")"

      bodyDiv.appendChild(thisImg);
      bodyDiv.appendChild(h5Name);
      bodyDiv.appendChild(h6Symbol);
      bodyDiv.appendChild(h5ChangesPercentage);
      cardDiv.appendChild(bodyDiv);
      
      cardDiv.addEventListener("click",() =>{

        // iFraemCardSrc.style.display = "none"
        this.cardIframeImportHTML()


      })
    
      return cardDiv ;
    }
    
}


export class GetStockData {
    constructor(e) {
      this.stockSearchPick = "";
      const searchForm = document.getElementById("search-form");
      

      searchForm.addEventListener("keyup", (e) => {
        e.preventDefault();
        stockContainer.style.display = "list-item"; 
        if ( document.getElementsByClassName("custom-card").length>0) {
          console.log("true");
          let card = document.getElementsByClassName("custom-card")
          while (card.length>0) {
            card[0].remove()
          }
        }
        this.runSearch();

        
      });
    }
  
       

    
    async runSearch(e) {

        spinnerOn()
      

        this.stockSearchPick = document.getElementById("search-input").value;
        const apiResults = await tenSearchResults(this.stockSearchPick );


        let stockObject = [];
          apiResults.forEach(async (item) => {
          const apiCompanyData= await companyData(item.symbol)
          const stock = new Stock(item,apiCompanyData);
          stockObject.push(stock);
          const card = stock.createStockCard();
          stockContainer.appendChild(card);

        });
        spinnerOff()
      }
  }


window.onload = async () => {
   let getStockData = new GetStockData();

  //  body.addEventListener("click", (e) => {
  //   stockContainer.style.display = "none"; 
  // })
}




// class SearchForm(){

// }


