'use strict';

// Variables
let clicksAllowed = 25;
let allProducts = [];

// DOM Windows
let imageContainer = document.getElementById('bus-images');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultsButton = document.getElementById('results-button');
const ctx = document.getElementById('results-chart').getContext('2d');
let chartWindow = document.getElementById('results-chart');

// Constructor
function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.numViews = 0;
  this.numCLicks = 0;
  this.src = `img/${name}.${fileExtension}`;
  allProducts.push(this);
}

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

// console.log(allProducts);

// Other Code

function randomIndexNum() {
  return Math.floor(Math.random() * allProducts.length);
}

// function renderProducts() {
//   let imagesArray = [];
//   imagesArray[0] = randomIndexNum();
//   imagesArray[1] = randomIndexNum();
//   imagesArray[2] = randomIndexNum();
//   // console.log(imagesArray);
//   while (imagesArray[1] === imagesArray[0]) {
//     imagesArray[1] = randomIndexNum();
//   }
//   while (imagesArray[2] === imagesArray[1] || imagesArray[2] === imagesArray[0]) {
//     imagesArray[2] = randomIndexNum();
//   }
//   imgOne.src = allProducts[imagesArray[0]].src;
//   imgOne.alt = allProducts[imagesArray[0]].name;
//   allProducts[imagesArray[0]].numViews++;
//   imgTwo.src = allProducts[imagesArray[1]].src;
//   imgTwo.alt = allProducts[imagesArray[1]].name;
//   allProducts[imagesArray[1]].numViews++;
//   imgThree.src = allProducts[imagesArray[2]].src;
//   imgThree.alt = allProducts[imagesArray[2]].name;
//   allProducts[imagesArray[2]].numViews++;
// }

let allItems = [];
// let counter = 1;
function renderContainerProducts() {
  let randomIndexes = [];
  // console.log('allItems', allItems);
  while (randomIndexes.length < 3) {
    let randoNum = randomIndexNum();
    if (!randomIndexes.includes(randoNum) && !allItems.includes(randoNum)) {
      randomIndexes.push(randoNum);
    }
  }
  // allItems.push(randomIndexes);
  allItems.splice(0, 3, ...randomIndexes);
  // console.table('randomIndexes', randomIndexes);
  let itemOne = randomIndexes.pop();
  let itemTwo = randomIndexes.pop();
  let itemThree = randomIndexes.pop();
  // console.log(itemOne, itemTwo, itemThree);
  imgOne.src = allProducts[itemOne].src;
  imgOne.alt = allProducts[itemOne].name;
  allProducts[itemOne].numViews++;
  imgTwo.src = allProducts[itemTwo].src;
  imgTwo.alt = allProducts[itemTwo].name;
  allProducts[itemTwo].numViews++;
  imgThree.src = allProducts[itemThree].src;
  imgThree.alt = allProducts[itemThree].name;
  allProducts[itemThree].numViews++;
}

renderContainerProducts();

function handleClick(event) {
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
  }
}

imageContainer.addEventListener('click', handleClick);
resultsButton.addEventListener('click', handleResultsButton);


function renderResultsChart() {
  let productName = [];
  let productViews = [];
  let productClicks = [];

  for(let i = 0; i < allProducts.length; i++){
    productName.push(allProducts[i].name);
    productViews.push(allProducts[i].numViews);
    productClicks.push(allProducts[i].numCLicks);
  }
  console.log(`Name = ${productName}, Views = ${productViews}, Clicks = ${productClicks}` );

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
