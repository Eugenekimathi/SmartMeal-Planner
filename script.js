
function addRecipe () {
  // Get form values
const name = document.getElementById("name") .value.trim();
const ingredients = document.getElementById("ingredients") .value.trim ();
const time =document.getElementById("time").value;
const servings =document.getElementById("servings").value || "";
const notes =document.getElementById("notes").value.trim();
const imageUrl =document.getElementById("imageUrl").value.trim();

// validation
if (!name || !ingredients || !time) {
    showToast("Please Fill in all required fields (Name, Ingredients, Time)", "error");
    return;
}

// time
if (time<=0) {
    showToast("cooking time must be greater than 0", "error");
    return;
}

// Recipe Object
const recipe = {
    name,
    ingredients,
    time:parseInt(time),
    servings:servings ? parseInt(servings) : null,
    notes,
    imageUrl,
    dateAdd: new Date().toISOString()
};

//Get existing recipes from localStorage
let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

// Add new recipe
recipes.push(recipe);
}