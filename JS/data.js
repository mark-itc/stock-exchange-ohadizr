export async function tenSearchResults(search) {
  try {
    const url =
      "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=" +
      search +
      "&amp&limit=10&amp&exchange=NASDAQ,";
    const response = await fetch(url);
    const results = await response.json();
    return results;
  } catch (error) {
    return error;
  }
}

export async function companyData(symbol) {
  try {
    let url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;
    const response = await fetch(url);
    const results = await response.json();
    return results;
  } catch (error) {
    return error;
  }
}

export async function companyStockHistory(symbol) {
  try {
    let url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line;`;
    const response = await fetch(url);
    const results = await response.json();
    return results;
  } catch (error) {
    return error;
  }
}

export async function NASDAQSymbolList() {
  try {
    const url =
      "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=&exchange=NASDAQ,";
    const response = await fetch(url);
    const results = await response.json();
    const symbol=[]
    results.forEach(element => {
      symbol.push(element.symbol)
    });

    return symbol;
  } catch (error) {
    return error;
  }
}

export async function stockPirce(symbol) {
  try {
    let url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quote-short/${symbol}`;
    const response = await fetch(url);
    const results = await response.json();
    return results;
  } catch (error) {
    return error;
  }
}

