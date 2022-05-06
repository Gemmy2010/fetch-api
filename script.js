'use strict'
 const cocktailDiv = document.getElementById('cocktail');

fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
.then((response) =>{
    if(response.ok){
        return response.json();
    }else{
        throw new Error("Response error");
    }
})
.then(data =>{
    console.log(data);
    displayCocktail(data)
})
.catch((error) => console.log("FETCH ERROR:", error));

const displayCocktail = function(data){
    const cocktail = data.drinks[0];
   
    const cocktailName = cocktail.strDrink;
    const heading = document.createElement("h1")
    heading.innerHTML = cocktailName;
    cocktailDiv.appendChild(heading)
    const cocktailImg = document.createElement("img");
    cocktailImg.src = cocktail.strDrinkThumb;
    cocktailDiv.appendChild(cocktailImg);
    document.body.style.backgroundImage = "url('" + cocktail.strDrinkThumb +"')";
    const cocktailIngredients = document.createElement("ul");
    cocktailDiv.appendChild(cocktailIngredients);


    const getIngredients = Object.keys(cocktail)
    .filter(function(ingredients){
        return ingredients.indexOf("strIngredients") ==0;
    })
    .reduce(function (ingredients, ingredient) {
      if (cocktail[ingredient] != null) {
        ingredients[ingredient] = cocktail[ingredient];
      }
      return ingredients;
    }, {});

    for (let key in getIngredients) {
    let value = getIngredients[key];
    listItem = document.createElement("li");
    listItem.innerHTML = value;
    cocktailIngredients.appendChild(listItem);
  }

}