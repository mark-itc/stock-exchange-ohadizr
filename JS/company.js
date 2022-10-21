import {companyData,companyStockHistory,NASDAQSymbolList,tenSearchResults} from './data.js'

const extractedSymbol = window.location.search.replace("?symbol=", "");
console.log(extractedSymbol);
const symbol = document.getElementById("symbol");
const companyOverView = document.getElementById("companyOverView");
const companyStockPrice = document.getElementById("companyStockPrice");
const companyStockDescription = document.getElementById(
  "companyStockDescription"
);
const canva = document.getElementById("canva");

class Company {
  constructor(profile, historical) {
    this.price = profile.price;
    this.changesPercentage = profile.changesPercentage;
    this.companyName = profile.companyName;
    this.exchange = profile.exchange;
    this.exchangeShortName = profile.exchangeShortName;
    this.industry = profile.industry;
    this.website = profile.website;
    this.description = profile.description;
    this.sector = profile.sector;
    this.country = profile.country;
    this.currency = profile.currency;
    this.image = profile.image;
    this.historical = historical;
    this.historical = historical;
    this.volume = historical[historical.length - 1].volume;
    this.lastClose = historical[historical.length - 1].close;
  }

  createCard() {
    companyOverView.innerHTML = `
        <img class="companyImg" src=${this.image} alt="companyIcon">
        <h4>${this.companyName}</h4>
        <h5>(${this.industry})</h5>
       
        `;
    companyStockPrice.innerHTML = `
        <h6>Stock price: ${this.price} (${this.changesPercentage})</h6>
        <h6>Previous Close: ${this.lastClose}</h6>
        <h6>Volume: ${this.volume}</h6>
   
        `;
    companyStockDescription.innerHTML = `
        <h6>${this.description} </h6>
        
        `;
  }
}

window.onload = async () => {
    const data = await companyData(extractedSymbol);
    const stockHistoryData = await companyStockHistory(extractedSymbol);
    const historicalClose = [];
    const historicalDate = [];


  const profile = data.profile;
  const historical = stockHistoryData.historical;

  const company = new Company(profile, historical);

  

//   let historicalCloseAverage = [];

for (const key in historical) {
 historicalDate.unshift(historical[key].date);
 historicalClose.unshift(historical[key].close);  
        
    
}

company.createCard();

  






// Canvas/Iframe
function canvaCreate() {
  const ctx = document.getElementById("myChart");
  let myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: historicalDate,
      datasets: [
        {
          label: "Stock closing",
          data: historicalClose,
          backgroundColor: ["rgba(54, 162, 235, 0.2)"],
          borderColor: ["rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
    //   scales: {
        // y: {
        //   beginAtZero: false,
        // },
    //   },
    },
  });


  const config = {
    type: "line",
    data,
    options: {
      plugins: {
        annotation: {
          annotations: {
            annotation,
          },
        },
      },
    },
  };
};
canvaCreate()


}