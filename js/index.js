'use strict';

// Variables
let clicksAllowed = 25;
let allProducts = [];
let imgNum = 3;

// DOM Windows
let imageContainer = document.getElementById('bus-images');
let imageClass = document.getElementsByClassName('images');
let resultsButton = document.getElementById('results-button');
const ctx = document.getElementById('results-chart').getContext('2d');
let chartWindow = document.getElementById('results-chart');
let imgForm = document.getElementById('imgNumForm');

// localStorage Retrieval
let savedProducts = localStorage.getItem('products');
let parsedData = JSON.parse(savedProducts);

// Constructor
function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.numViews = 0;
  this.numCLicks = 0;
  this.src = `img/${name}.${fileExtension}`;
  allProducts.push(this);
}
if (savedProducts) {
  allProducts = parsedData;
} else {
  new Product('bag');
  new Product('banana');
  new Product('bathroom');
  new Product('boots');
  new Product('breakfast');
  new Product('bubblegum');
  new Product('chair');
  new Product('cthulhu');
  new Product('dog-duck');
  new Product('dragon');
  new Product('pen');
  new Product('pet-sweep');
  new Product('scissors');
  new Product('shark');
  new Product('sweep', 'png');
  new Product('tauntaun');
  new Product('unicorn');
  new Product('water-can');
  new Product('wine-glass');
}

// Other Code

function randomIndexNum() {
  return Math.floor(Math.random() * allProducts.length);
}

// let allItems = [];
function renderContainerProducts() {
  let randomIndexes = [];
  while (randomIndexes.length < imgNum) {
    let randoNum = randomIndexNum();
    if (!randomIndexes.includes(randoNum)) {
      randomIndexes.push(randoNum);
    }
  }
  // allItems.splice(0, imgNum, ...randomIndexes);
  for (let i = 0; i < imgNum; i++) {
    let imgCounter = randomIndexes.pop();
    let img = document.createElement('img');
    img.classList.add('images');
    img.src = allProducts[imgCounter].src;
    img.alt = allProducts[imgCounter].name;
    allProducts[imgCounter].numViews++;
    imageContainer.appendChild(img);
  }
}

renderContainerProducts();

function handleClick(event) {
  for (let i = 0; i < imgNum; i++) {
    imageClass[0].parentNode.removeChild(imageClass[0]);
  }
  clicksAllowed--;
  let productClicked = event.target.alt;

  for (let i = 0; i < allProducts.length; i++) {
    if (productClicked === allProducts[i].name) {
      allProducts[i].numCLicks++;
    }
  }
  renderContainerProducts();
  if (clicksAllowed === 0) {
    imageContainer.removeEventListener('click', handleClick);
  }
}

// eslint-disable-next-line no-unused-vars
function handleResultsButton(event) {
  if (clicksAllowed === 0) {
    renderResultsChart();
    chartWindow.style.backgroundColor = '#81A851';
    let localStoredProducts = JSON.stringify(allProducts);
    localStorage.setItem('products', localStoredProducts);
  }
}

function handleSubmit(event) {
  if (imgNum > 0) {
    for (let i = 0; i < imgNum; i++) {
      imageClass[0].parentNode.removeChild(imageClass[0]);
    }
  }
  event.preventDefault();
  imgNum = +event.target.imgNum.value;
  renderContainerProducts();
}

imageContainer.addEventListener('click', handleClick);
resultsButton.addEventListener('click', handleResultsButton);
imgForm.addEventListener('submit', handleSubmit);


function renderResultsChart() {
  let productName = [];
  let productViews = [];
  let productClicks = [];

  for (let i = 0; i < allProducts.length; i++) {
    productName.push(allProducts[i].name);
    productViews.push(allProducts[i].numViews);
    productClicks.push(allProducts[i].numCLicks);
  }

  let chartObject = {
    type: 'bar',
    data: {
      labels: productName,
      datasets: [{
        label: '# of Views',
        data: productViews,
        backgroundColor: [
          'rgb(153,0,0)'
        ],
        borderColor: [
          '#c79222'
        ],
        borderWidth: 2
      },
      {
        label: '# of Clicks',
        data: productClicks,
        backgroundColor: [
          '#c79222'
        ],
        borderColor: [
          'rgb(153,0,0)'
        ],
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  // eslint-disable-next-line
  const myChart = new Chart(ctx, chartObject);
}
