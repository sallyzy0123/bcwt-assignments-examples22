'use strict';
const apiUrl = 'https://api.tvmaze.com/search/shows?q=';
// get reference to DOM elements
const form = document.querySelector('#search-form');
const button = form.querySelector('button');
const input = form.querySelector('input');
const results = document.querySelector('#results');

button.addEventListener('click', (event) => {
    // do not submit the form to anywahere (no page refresh)
    event.preventDefault();
    // prevent the generic event listener at the bottom
    event.stopPropagation();
    const queryParam = input.value;
    getTVSeriesData(queryParam);
    if (input.value.length > 1) {
        getTVSeriesData(input.value);
    }
});

const renderResults = (data) => {
    // clear existing results before appending new ones
    results.innerHTML = '';
    // loop through all search results
    for (let i=0; i<data.length; i++) {
        const h3 = document.createElement('h3');
        h3.textContent = data[i].show.name;
        const img = document.createElement('img');
        img.src = data[i].show.image.medium;
        results.append(h3);
        results.append(img);
        // TODO: render more data from the results
    }
};

const getTVSeriesData = async (name) => {
    try {
        const response = await fetch(apiUrl + name);
        const data = await response.json();
        console.log('results: ', data);
        renderResults(data);
    } catch (error) {
        console.log('network failture: ', error);
    }

}

// generic event handling example
document.addEventListener('click', (event) => {
    console.log('mouth clicked somewhere on the page.', event)
})