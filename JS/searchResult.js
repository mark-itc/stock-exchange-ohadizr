const htmlContainerOfResults = `
<ul class="container custom-container" id="stock-container">

</ul>

`;

class Stock {
  constructor(stockObject, apiCompanyData) {
    this.symbol = stockObject.symbol;
    this.name = stockObject.name;
    this.stockExchange = stockObject.stockExchange;
    this.changesPercentage = apiCompanyData.profile.changesPercentage;
    this.img = `https://fmpcloud.io/image-stock/${stockObject.symbol}.png`;
    this.iFraemCardSrc = document.getElementById("companyIframe");
  }
  async cardIframeImportHTML() {
    this.iFraemCardSrc.style.display = "block";
    this.iFraemCardSrc.src = `
      http://127.0.0.1:5501//company.html?symbol=${this.symbol}`;
  }
  createStockCard() {
    const cardDiv = document.createElement("li");
    let precentageClass;
    if (this.changesPercentage > 0) {
      precentageClass = "card-icon-changesPercentage-green";
    } else {
      precentageClass = "card-icon-changesPercentage-red";
    }
    cardDiv.innerHTML = `
    <li class="card custom-card">
      <a class="card-body">
        <img class="card-icon" src="${this.img}">
          <h5 class="card-name">${this.name}</h5>
          <h6 class="card-symbol-name">${this.symbol}</h6>
          <h5 class="${precentageClass}">(${this.changesPercentage})</h5>
      </a>
    </li>     
    `;

    cardDiv.addEventListener("click", () => {
      this.cardIframeImportHTML();
    });

    return cardDiv;
  }
}

class SearchResult {
  constructor(domElement) {
    this.domElement = domElement;
    domElement.innerHTML = htmlContainerOfResults;
  }
  async companyData(symbol) {
    try {
      let url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;
      const response = await fetch(url);
      const results = await response.json();
      return results;
    } catch (error) {
      //  console.log(error);
    }
  }

  async tenSearchResults(search) {
    try {
      const url =
        "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=" +
        search +
        "&amp&limit=10&amp&exchange=NASDAQ,";
      const response = await fetch(url);
      const results = await response.json();
      return results;
    } catch (error) {
      //  console.log(error);
    }
  }

  async renderResult(companies) {
    companies = document.getElementById("search-input").value;
    const stockSearchPick = companies;
    const apiResults = await this.tenSearchResults(stockSearchPick);

    let stockObject = [];
    let card = [];
    apiResults.forEach(async (item) => {
      const apiCompanyData = await this.companyData(item.symbol);
      const stock = new Stock(item, apiCompanyData);
      stockObject.push(stock);
      const stockContainerTwo = document.getElementById("stock-container");
      const card = stock.createStockCard();
      stockContainerTwo.appendChild(card);
    });
  }
}
