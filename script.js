
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

//save back to localstorage
localStorage.setItem("recipes" , JSON.stringify(recipes));

//show success message
showToast("✅ Recipe saved successfully!" , "success");

// Clear the form 
document.getElementById("recipeForm").reset ();

// Redirect to recipes page after 1.5 sec
setTimeout(() =>{
   window.location.href = "recipes.html" ;
}, 1500); 
}

// Display all  recipes on the recipes.html page

function displayRecipes() {
    // Get recipes from localStorage
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    //Get DOM elements
    const list = document.getElementById("recipeList");
    const emptyState = document.getElementById("emptyState");

    // Clear current content
    list.innerHTML ="";

    // Show/hide empty state
    if ( recipes.length ===0) {
        emptyState.classList.remove("hidden");
        list.style.display = "none";
    } else {
        emptyState.classList.add("hidden");
        list.style.display = "grid";

        // Create a card for each recipe
        recipes.forEach((recipe, index) => {
          const card = document.createElement("div");
          
          // Build the card HTML
          card.innerHTML = `
          ${recipe.imageUrl
             ?`<img scr="${recipe.imageUrl}" alt="${recipe.name}" class="recipe-image">`
             : `<div class="recipe-image">🍳</div>`
          }
          <div class="recipe-body">
            <h3 class="recipe-title">${recipe.name}</h3>
          
            <div class="recipe-meta">
                <span class="meta-badge">⏱️${recipe.time}mins</span>
                ${recipe.servings ? `<span class="meta-badge">🍽️ ${recipe.servings} servings</span>` : ''}
            </div>

            <div class="recipe-ingredients">
            <strong>Ingredients:</strong><br>
            ${recipe.ingredients.replace(/\n/g, '<br>')}
            </div>

            ${recipe.notes ? `<div class="recipe.notes">${recipe.notes}</div>` : ''}

            <div class="recipe-footer">
                <button class="btn-delete" onclick="deleteRecipe(${index})"> 🚮 Delete Recipe </button>
            </div>
          </div>


          `;

          list.appendChild(card);
        });
            
        }
    }
