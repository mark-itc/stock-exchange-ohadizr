const htmlContainerOfSearch = `
<header id="originalIndexHeader" class="p-3 text-bg-dark">
<div class="container">
  <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
    <ul class="nav  d-flex flex-nowrap ">
      <li>
        <form class="d-flex" id="search-form" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="search-input"
            autocomplete="off">
          <div class="wrapper">
            <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </li>
      <li>
        <div class="text-center " id="spinner">
          <div class="spinner-border" role="status">
          </div>
        </div>
      </li>
    </ul>
  </header>
  <div id="results">
  <ul class="container custom-container" id="stock-container" style="display: list-item;"></ul>
  </div>
  <iframe id="companyIframe" src="" width="650px" height="400px"> </iframe>
`;
let companies = "";

class SearchForm {
  constructor(domElement, e) {
    this.domElement = domElement;
    this.domElement.innerHTML = htmlContainerOfSearch;
    this.stockContainer = document.getElementById("stock-container");
  }

  async onSearch(callback) {
    function spinnerOn() {
      document.getElementById("spinner").style.display = "contents";
    }

    function spinnerOff() {
      document.getElementById("spinner").style.display = "none";
    }
    spinnerOn();
    const searchForm = document.getElementById("search-form");

    searchForm.addEventListener("click", (e) => {
      e.preventDefault();

      if (document.getElementsByClassName("custom-card").length > 0) {
        let card = document.getElementsByClassName("custom-card");
        while (card.length > 0) {
          card[0].remove();
        }
      }
      callback;
      spinnerOff();
    });
  }
}
