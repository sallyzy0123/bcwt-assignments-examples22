// Put code of task B here
'use strict'
const main = document.querySelector('main');

const createArticle = () => {
    const article = document.createElement('article');
    main.appendChild(article);
    const header = document.createElement('header');
    article.appendChild(header);
    const h2 = document.createElement('h2');
    h2.textContent = "Article header";
    header.appendChild(h2);

    const figure = document.createElement('figure');
    article.appendChild(figure);
    const img = document.createElement('img');
    img.src = 'http://placekitten.com/320/160';
    img.alt = 'title';
    figure.appendChild(img);
    const figcaption = document.createElement('figcaption');
    figcaption.innerHTML = 'Caption';
    figure.appendChild(figcaption);

    const p = document.createElement('p');
    p.innerHTML = 'Here is some text. Here is some text. Here is some text. Here is some text.';
    article.appendChild(p);
}

createArticle();

