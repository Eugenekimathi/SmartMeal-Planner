/**
 * Add a new recipe to localStorage
 * Called by onclick in add.html
 */
function addRecipe() {
    // Get form values
    const name = document.getElementById("name").value.trim();
    const ingredients = document.getElementById("ingredients").value.trim();
    const time = document.getElementById("time").value;
    const servings = document.getElementById("servings")?.value || "";
    const notes = document.getElementById("notes").value.trim();
    const imageUrl = document.getElementById("imageUrl").value.trim();

    // Validate required fields
    if (!name || !ingredients || !time) {
        showToast("Please fill in all required fields (Name, Ingredients, Time)", "error");
        return;
    }

    // Validate time is a positive number
    if (time <= 0) {
        showToast("Cooking time must be greater than 0", "error");
        return;
    }

    // Create recipe object
    const recipe = {
        name,
        ingredients,
        time: parseInt(time),
        servings: servings ? parseInt(servings) : null,
        notes,
        imageUrl,
        dateAdded: new Date().toISOString()
    };

    // Get existing recipes from localStorage
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    // Add new recipe
    recipes.push(recipe);

    // Save back to localStorage
    localStorage.setItem("recipes", JSON.stringify(recipes));

    // Show success message
    showToast("✅ Recipe saved successfully!", "success");

    // Clear the form
    document.getElementById("recipeForm").reset();

    // Redirect to recipes page after 1.5 seconds
    setTimeout(() => {
        window.location.href = "recipes.html";
    }, 1500);
}

/**
 * Display all recipes on the recipes.html page
 */
function displayRecipes() {
    // Get recipes from localStorage
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    
    // Get DOM elements
    const list = document.getElementById("recipeList");
    const emptyState = document.getElementById("emptyState");

    // Clear current content
    list.innerHTML = "";

    // Show/hide empty state
    if (recipes.length === 0) {
        emptyState.classList.remove("hidden");
        list.style.display = "none";
    } else {
        emptyState.classList.add("hidden");
        list.style.display = "grid";

        // Create a card for each recipe
        recipes.forEach((recipe, index) => {
            const card = document.createElement("div");
            card.className = "recipe-card";

            // Build the card HTML
            card.innerHTML = `
                ${recipe.imageUrl 
                    ? `<img src="${recipe.imageUrl}" alt="${recipe.name}" class="recipe-image">` 
                    : `<div class="recipe-image">🍳</div>`
                }
                
                <div class="recipe-body">
                    <h3 class="recipe-title">${recipe.name}</h3>
                    
                    <div class="recipe-meta">
                        <span class="meta-badge">⏱️ ${recipe.time} mins</span>
                        ${recipe.servings ? `<span class="meta-badge">🍽️ ${recipe.servings} servings</span>` : ''}
                    </div>
                    
                    <div class="recipe-ingredients">
                        <strong>Ingredients:</strong><br>
                        ${recipe.ingredients.replace(/\n/g, '<br>')}
                    </div>
                    
                    ${recipe.notes ? `<div class="recipe-notes">${recipe.notes}</div>` : ''}
                    
                    <div class="recipe-footer">
                        <button class="btn-delete" onclick="deleteRecipe(${index})">
                            🗑️ Delete Recipe
                        </button>
                    </div>
                </div>
            `;

            list.appendChild(card);
        });
    }
}

/**
 * Delete a recipe by index
 * @param {number} index - Index of recipe to delete
 */
function deleteRecipe(index) {
    // Confirm deletion
    if (!confirm("Are you sure you want to delete this recipe?")) {
        return;
    }

    // Get recipes from localStorage
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    // Remove the recipe at the specified index
    recipes.splice(index, 1);

    // Save back to localStorage
    localStorage.setItem("recipes", JSON.stringify(recipes));

    // Show success message
    showToast("Recipe deleted successfully", "success");

    // Refresh the display
    displayRecipes();
}

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {string} type - Type of toast: 'success' or 'error'
 */
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    
    if (!toast) return; // Toast element doesn't exist on this page
    
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    
    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/**
 * Update stats on home page
 */
function updateHomeStats() {
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    
    // Update recipe count
    const recipeCountEl = document.getElementById("recipeCount");
    if (recipeCountEl) {
        recipeCountEl.textContent = recipes.length;
    }
    
    // Calculate total cooking time
    const totalTime = recipes.reduce((sum, recipe) => sum + (recipe.time || 0), 0);
    const totalTimeEl = document.getElementById("totalTime");
    if (totalTimeEl) {
        totalTimeEl.textContent = totalTime;
    }
}
   
