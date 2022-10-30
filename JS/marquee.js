
class Marquee{
  constructor(domElement){
  this.namdomElemente= domElement


  }

  async load(){
      async function NASDAQSymbolList() {
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
        // return error;
      }
    }
    async function stockPirce(symbol) {
      try {
        let url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quote-short/${symbol}`;
        const response = await fetch(url);
        const results = await response.json();
        return results;
      } catch (error) {
        // return error;
      }
      
    }
    try {
      
    const symbolList= await NASDAQSymbolList()
    const splicedSymbolList=  symbolList.splice(0,120);
    splicedSymbolList.forEach(async (item) => {
    const apiCompanysData= await stockPirce(item)
    const symbolListWithPrice = []
    symbolListWithPrice.push(apiCompanysData[0]);
    symbolListWithPrice.forEach(element => {
      try {
        

      let symbol = element.symbol
      let price = element.price
      this.namdomElemente.innerHTML +=(`
        <li class="line custom-line">
        <h6 class="line-symbol">${symbol}</h6>
        <h6 class="line-price">${price}</h6>
        </li>
       `
       )
      } catch (error) {
        //  console.log(error); 
      }
    });
  });
  } catch (error) {
    //  console.log(error); 
  }

  }
}




