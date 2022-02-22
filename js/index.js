'use strict';

// Variables
let clicksAllowed = 10;
let allProducts = [];

// DOM Windows
let imageContainer = document.getElementById('bus-images');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultsButton = document.getElementById('results-button');
let resultsList = document.getElementById('results-list');

// Constructor
function Product(name, fileExtension = 'jpg'){
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
  return Math.floor(Math.random()*allProducts.length);
}

function renderProducts(){
  let imagesArray= [];
  imagesArray[0] = randomIndexNum();
  imagesArray[1] = randomIndexNum();
  imagesArray[2] = randomIndexNum();
  // console.log(imagesArray);
  while(imagesArray[1] === imagesArray[0]) {
    imagesArray[1] = randomIndexNum();
  }
  while(imagesArray[2] === imagesArray[1] || imagesArray[2] === imagesArray[0]) {
    imagesArray[2] = randomIndexNum();
  }
  imgOne.src = allProducts[imagesArray[0]].src;
  imgOne.alt = allProducts[imagesArray[0]].name;
  allProducts[imagesArray[0]].numViews++;
  imgTwo.src = allProducts[imagesArray[1]].src;
  imgTwo.alt = allProducts[imagesArray[1]].name;
  allProducts[imagesArray[1]].numViews++;
  imgThree.src = allProducts[imagesArray[2]].src;
  imgThree.alt = allProducts[imagesArray[2]].name;
  allProducts[imagesArray[2]].numViews++;
}

renderProducts();

function handleClick(event){
  clicksAllowed--;
  let productClicked = event.target.alt;

  for (let i = 0; i < allProducts.length; i++){
    if(productClicked === allProducts[i].name){
      allProducts[i].numCLicks++;
    }
  }
  renderProducts();
  if (clicksAllowed === 0) {
    imageContainer.removeEventListener('click', handleClick);
  }
}

// eslint-disable-next-line no-unused-vars
function handleResultsButton(event){
  if (clicksAllowed === 0){
    for(let i = 0; i < allProducts.length; i++){
      let li = document.createElement('li');
      li.textContent = `${allProducts[i].name} was viewed ${allProducts[i].numViews} times, and was clicked ${allProducts[i].numCLicks} times.`;
      resultsList.appendChild(li);
    }
  }
}

imageContainer.addEventListener('click', handleClick);
resultsButton.addEventListener('click', handleResultsButton);
