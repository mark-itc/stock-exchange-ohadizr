import {companyData,companyStockHistory,NASDAQSymbolList,tenSearchResults,stockPirce} from './data.js'

export function hello() {
    console.log("hello");
  }

//   hello()

export class MarqueeLine{
    constructor(apiCompanyData){
        this.symbol=apiCompanyData.symbol
        this.price=apiCompanyData.price
    }
    createMarqueeLine() {
        const lineDiv = document.createElement("li");
        lineDiv.classList.add("line");
        lineDiv.classList.add("custom-line");
  
        const lineSymbol = document.createElement("h6");
        lineSymbol.classList.add("line-symbol");
        lineSymbol.innerHTML = this.symbol;

        const linePrice = document.createElement("h6");
        linePrice.classList.add("line-price");
        linePrice.innerHTML = this.price;

        lineDiv.appendChild(lineSymbol);
        lineDiv.appendChild(linePrice);
      
        return lineDiv ;
      }
      
}
let symbolList= await NASDAQSymbolList()
let splicedSymbolList=  symbolList.splice(0,120);
let symbolListWithPrice = []
let domIdmarqueeStock =document.getElementById("marquee")

splicedSymbolList.forEach(async (item) => {
    const apiCompanyData= await stockPirce(item)

    const marquee = new MarqueeLine(apiCompanyData[0]);
    symbolListWithPrice.push(marquee);
    const compnayLine=marquee.createMarqueeLine() 

    domIdmarqueeStock.appendChild(compnayLine)

   
  });





export class Marquee{
    constructor(){
    this.name= "name"
    }
}
//   module.exports = Marquee