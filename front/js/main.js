'use strict';

//fetch api Data from server 

const productData = async () => {
  fetch('http://localhost:3000/api/products')
  .then(response => response.json(), error => alert(error))
  .then( product => {
    const articles = product;
    console.table(articles);
    for (let article in articles ){
          let productLink = document.createElement('a');
          document.querySelector('.items').appendChild(productLink);
          productLink.href = `product.html?id=${product[article]._id}`;

           let productArticle = document.createElement('article');
           productLink.appendChild(productArticle);
//add img and description
          let productImg = document.createElement('img');
          productArticle.appendChild(productImg);
          productImg.src = product[article].imageUrl;

          let productName = document.createElement('h3');
          productArticle.appendChild(productName);
          productName.innerHTML = product[article].name;

          let productDescription = document.createElement('p');
          productDescription.innerHTML = product[article].description;
          productArticle.appendChild(productDescription);
      
		}
	})
}
productData();