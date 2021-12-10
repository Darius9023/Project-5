var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("_id");
console.log(idProduct);
let article = "";





function getArticle() {
    fetch("http://localhost:3000/api/products/" + _id)
    .then((res) => {return res.json();
    })
    .then(async function (resultatAPI) {
        article = await resultatAPI;
        console.table(article);
        if (article){
            
        }
    })
}

getArticle();
