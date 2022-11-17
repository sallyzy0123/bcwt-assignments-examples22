'use strict';
// get reference to DOM elements
const apiUrl = 'https://api.tvmaze.com/search/shows?q=';
const form = document.querySelector('#search-form');
const button = form.querySelector('button');
const input = form.querySelector('input');
const results = document.querySelector('#results');

button.addEventListener('click', (event) => {
    // do not submit the form to anywahere (no page refresh)
    event.preventDefault();
    // prevent the generic event listener at the bottom
    event.stopPropagation();
    if (input.value.length > 1) {
        getTVSeriesData(input.value);
    }
});


const renderResults = (data) => {
    // clear existing results before appending new ones
    results.innerHTML = '';
    // loop through all search results
    for (let i=0; i<data.length; i++) {
        try {
            const h3 = document.createElement('h3');
            h3.textContent = data[i].show.name;
            
            const img = document.createElement('img');
            img.src = data[i].show.image ? data[i].show.image.medium : 'https://placekitten.com/200/300';

            const p1 = document.createElement('p');
            
            p1.textContent = data[i].show.officialSite ? 'Official site: ' + data[i].show.officialSite : 'No official site.';
            const p2 = document.createElement('p');
            p2.innerHTML = data[i].show.summary;
            const p3 = document.createElement('p');
    
            let text = "";
            for (let y = 0; y < data[i].show.genres.length; y++) {
    
                if (y < data[i].show.genres.length - 1) {
                    text = text + data[i].show.genres[y] + ' | ';
                } else {
                    text = text + data[i].show.genres[y];
                }
            }
            p3.textContent = 'Genre: ' + text;
    
            results.append(h3);
            results.append(img);
            results.append(p1);
            results.append(p2);
            results.append(p3);
        } catch (e) {
            console.dir(e);
        }
        
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
