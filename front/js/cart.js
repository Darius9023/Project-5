"use strict"


let productLocalStorage = JSON.parse(localStorage.getItem("productt"));
const positionEmptyCart = document.querySelector("#cart__items");

//Main tree from the page 
function getCart(){
if (productLocalStorage === null || productLocalStorage == 0) {
    const emptyCart = `<p>Your cart is empty!</p>`;
    positionEmptyCart.innerHTML = emptyCart;
} else {
for (let product in productLocalStorage){
   
    let productArticle = document.createElement("article");
    document.querySelector("#cart__items").appendChild(productArticle);
    productArticle.className = "cart__item";
    productArticle.setAttribute('data-id', productLocalStorage[product].idProduit);

    let productDivImg = document.createElement("div");
    productArticle.appendChild(productDivImg);
    productDivImg.className = "cart__item__img";

    let productImg = document.createElement("img");
    productDivImg.appendChild(productImg);
    productImg.src = productLocalStorage[product].imgProduit;
    productImg.alt = productLocalStorage[product].altImgProduit;

    let productItemContent = document.createElement("div");
    productArticle.appendChild(productItemContent);
    productItemContent.className = "cart__item__content";

    let cartItemContentTitlePrice = document.createElement("div");
    productItemContent.appendChild(cartItemContentTitlePrice);
    cartItemContentTitlePrice.className = "cart__item__content__titlePrice";

    let productItemName = document.createElement("h2");
    cartItemContentTitlePrice.appendChild(productItemName);
    productItemName.innerHTML = productLocalStorage[product].nomProduit;

    let productColor = document.createElement("p");
    productItemName.appendChild(productColor);
    productColor.innerHTML = productLocalStorage[product].couleurProduit;
    productColor.style.fontSize = "22px";

    let productPrice = document.createElement("p");
    cartItemContentTitlePrice.appendChild(productPrice);
    productPrice.innerHTML = productLocalStorage[product].prixProduit + "€";

    let cartItemContentSettings = document.createElement("div");
    productItemContent.appendChild(cartItemContentSettings);
    cartItemContentSettings.className = "cart__item__content__settings";

    let cartItemContentSettingsQUantity = document.createElement("div");
    cartItemContentSettings.appendChild(cartItemContentSettingsQUantity);
    cartItemContentSettingsQUantity.className = "cart__item__content__settings__quantity";

    let productQte = document.createElement("p");
    cartItemContentSettingsQUantity.appendChild(productQte);
    productQte.innerHTML = "Qté";

    let ProductQuantity = document.createElement("input");
    cartItemContentSettingsQUantity.appendChild(ProductQuantity);
    ProductQuantity.value = productLocalStorage[product].quantiteProduit;
    ProductQuantity.className = "itemQuantity";
    ProductQuantity.setAttribute("type", "number");
    ProductQuantity.setAttribute("min", "1");
    ProductQuantity.setAttribute("max", "100");
    ProductQuantity.setAttribute("name", "itemQuantity");

    

    let productItemContentSettingsDelete = document.createElement('div');
    cartItemContentSettings.appendChild(productItemContentSettingsDelete);
    productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

    let productDelete = document.createElement("p");
    productItemContentSettingsDelete.appendChild(productDelete);
    productDelete.className = "deleteItem";
    productDelete.innerHTML = "Delete";

        }
    }
}
getCart();
    
       
// Delete items from cart page function
const deleteProduct = () => {
    let btn_delete = document.getElementsByClassName("deleteItem");

    for (let a = 0; a < btn_delete.length; a++) {
        btn_delete[a].addEventListener('click', (event) => {
            event.preventDefault();

            let idDelete = productLocalStorage[a].idProduit;
            let colorDelete = productLocalStorage[a].couleurProduit;

            productLocalStorage = productLocalStorage.filter(el => el.idProduit !== idDelete || el.couleurProduit !== colorDelete);
            localStorage.setItem("productt", JSON.stringify(productLocalStorage));
            location.reload();
        })
    }

}
deleteProduct();


//Total quantity and price function 
const getTotals = () => {

    let itemQtt = document.querySelectorAll(".itemQuantity");
    let itemLength = itemQtt.length;
    let totalQtt = 0;

    for (let i = 0; i < itemLength; i++) {
        totalQtt += itemQtt[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQtt;
    

    //Whole amount of price / combined
    let totalPrice = 0;

    for (let i = 0; i < itemLength; i++) {
        totalPrice += (itemQtt[i].value * productLocalStorage[i].prixProduit);
        
    }

    let productTotalPrice = document.getElementById("totalPrice");
    productTotalPrice.innerHTML = totalPrice;
    
}

getTotals();



    



     
  

modifyQtt();





//Change quantity in cart page

function modifyQtt() {
  let qttModif = document.querySelectorAll(".itemQuantity");
  let qttModifLength = qttModif.length;

  for (let k = 0; k < qttModifLength; k++){
      qttModif[k].addEventListener("change" , (event) => {
          event.preventDefault();
          
          let quantityModif = productLocalStorage[k].quantiteProduit;
          let qttModifValue = qttModif[k].value;
          console.log(qttModifValue);


          if(qttModifValue > 0 && qttModifValue <= 100 ){
          const resultFind = productLocalStorage.find((el)  => {
             console.log(el.qttModifValue) 
             console.log(quantityModif)
              return el.qttModifValue !== quantityModif 
                  
              })
          
          resultFind.quantiteProduit = qttModifValue;
          productLocalStorage[k].quantiteProduit = resultFind.quantiteProduit;

          localStorage.setItem("productt", JSON.stringify(productLocalStorage));
          
          
          
          location.reload();
            }

            else{
              alert("Please Enter a quantity between 1 and 100");
              qttModif[k].value = 0;
            }
          
      })
  }
}








//submit form, order minimum amount

function submitForm() {
  console.log(productLocalStorage);
    var reg_address = /[^A-Za-z0-9]+/;
    var reg_name_alpha_only = /^[a-zA-Z\s]*$/;
    var firstName = document.getElementById("firstName");
    if ((firstName.value.trim().length == 0)) 
    {
    document.getElementById('firstNameErrorMsg').innerText = "Please enter firstName";
    return false;
    } else {
      document.getElementById('firstNameErrorMsg').innerText = "";
    }
     if(!reg_name_alpha_only.test(firstName.value)){
      document.getElementById('firstNameErrorMsg').innerText = "FirstName is not valid. Must contain only letters";
      return false;
     }else{
      document.getElementById('firstNameErrorMsg').innerText = "";
     };

    var lastName = document.getElementById("lastName");
    if ((lastName.value.trim().length == 0)) 
    {
    document.getElementById('lastNameErrorMsg').innerText = "Please enter lastName";
    return false;
    } else {
      document.getElementById('lastNameErrorMsg').innerText = "";
    }
    if(!reg_name_alpha_only.test(lastName.value)){
      document.getElementById('lastNameErrorMsg').innerText = "LastName is not valid. Must contain only letters";
      return false;
     }else{
      document.getElementById('lastNameErrorMsg').innerText = "";
     };


    var address = document.getElementById("address");
    if ((address.value.trim().length == 0)) 
    {
    document.getElementById('addressErrorMsg').innerText = "Please enter address";
    return false;
    } else {
      document.getElementById('addressErrorMsg').innerText = "";
    }
    if(!reg_address.test(address.value)){
      document.getElementById('addressErrorMsg').innerText = "Address is not valid. Must contain only letters";
      return false;
     }else{
      document.getElementById('addressErrorMsg').innerText = "";
     };

    var city = document.getElementById("city");
    if ((city.value.trim().length == 0)) 
    {
    document.getElementById('cityErrorMsg').innerText = "Please enter city";
    return false;
    } else {
      document.getElementById('cityErrorMsg').innerText = "";
    }
    if(!reg_name_alpha_only.test(city.value)){
      document.getElementById('cityErrorMsg').innerText = "City is not valid. Must contain only letters";
      return false;
     }else{
      document.getElementById('cityErrorMsg').innerText = "";
     };
    var email = document.getElementById("email");
    if ((email.value.trim().length == 0)) 
    {
    document.getElementById('emailErrorMsg').innerText = "Please enter email";
    return false;
    } else {
      document.getElementById('emailErrorMsg').innerText = "";
    }
    var re = /\S+@\S+\.\S+/;
     if(!re.test(email.value)){
      document.getElementById('emailErrorMsg').innerText = "Please enter a valid email";
      return false;
     }else{
      document.getElementById('emailErrorMsg').innerText = "";
     };

const thisForm = document.getElementById('myForm');
const formData = new FormData(thisForm).entries();
const body = JSON.stringify(
  {'contact': Object.fromEntries(formData),
   'products': productLocalStorage.map(p => p.idProduit) // products =  the product array
  });
 console.log(body);


//  //Send Data to the backend ( api )
// Send Data to Confirmation Page
  const xhr = new XMLHttpRequest();
 xhr.open("POST", 'http://localhost:3000/api/products/order', true);
 xhr.setRequestHeader('Content-type', 'application/json');
 xhr.onload = function () {
     console.log(this.status)
     if (this.status === 201) { 
      var orderData = JSON.parse(this.responseText);
               console.log(orderData.orderId);
         localStorage.setItem("OrderId",orderData.orderId);

         location.href="/front/confirmation.html";
     }
     else {
      
     }
 }
 xhr.send(body);
     return false;
}