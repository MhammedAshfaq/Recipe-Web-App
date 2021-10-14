const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector(".container");

let searchQuary = '';
const APP_ID = '73f804de';
const APP_KEY = 'ab612cc5e4ffa5a4a4172781b70156eb';

searchForm.addEventListener('submit', (e) => {
    e.preventDefault() // current situation  (you just submit the form then ,that submit is not working) blocking this evet
    searchQuary = e.target.querySelector('input').value; //input value getting

    fechAPI();
})

async function fechAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuary}&app_id=${APP_ID}&app_key=${APP_KEY}&to=70`;
    const response = await fetch(baseURL);
    const data = await response.json();
    console.log(data);
    generateHTML(data.hits);
}

function generateHTML(dataResults) {
    container.classList.remove("initial")
    let genaretedHTML = '';
    dataResults.map(result => {
        genaretedHTML += `
        <div class="item">
            <img src="${result.recipe.image}" alt="">
            <div class="flex-cotainer">
                <h1 class="title" id="title">${result.recipe.label}</h1>
                <a class="view-btn" href="${result.recipe.url}" target="_blank">View recipe</a>
            </div>
             <p  class="item-data">Calories : ${result.recipe.calories.toFixed(2)}</p>
             <p  id="dietLabel" class="item-data">Diet Label : ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : "No Data Found" }</p>
             <p  class="item-data">Health Label : ${result.recipe.healthLabels}</p>

        </div> `
    });
    searchResultDiv.innerHTML = genaretedHTML; 

}
