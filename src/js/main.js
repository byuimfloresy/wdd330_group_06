import { updateCartCount } from "./utils.mjs";

async function test(){
const resp = await fetch("https://catalog.data.gov/api/3/action/package_search",)
        if (resp.ok){
            console.log("success")
        } else{
            throw { name: "API Error", error: resp}
        }
        const data = await res.json()
        return data.Result
}
test()
updateCartCount();

function handleSearch() {
  const query = document.querySelector("#searchInput").value;
  if (query) {
    window.location.href = `/product_listing/index.html?category=tents&q=${encodeURIComponent(query)}`;
  }
}

const searchBtn = document.querySelector("#searchBtn");
  if (searchBtn) {
    searchBtn.addEventListener("click", handleSearch);
  }

  const searchInput = document.querySelector("#searchInput");
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    });
  }
