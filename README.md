# 🍳 SmartMeal Planner

A beautiful, responsive web application for planning meals, saving recipes, and tracking ingredients.

## Features

- **Recipe Management** - Add, view, and delete recipes
- **Ingredient Tracking** - Save ingredients for each recipe
- **Cooking Time** - Track preparation and cooking times
- **Notes & Instructions** - Add detailed cooking notes
- **Image Support** - Add images via URL
- **Data Persistence** - All recipes saved in localStorage
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Beautiful UI** - Modern, warm color scheme with smooth animations

## How to Use

### Add a Recipe:
1. Click "Add Recipe" in the navigation
2. Fill in the form:
   - **Recipe Name** (required)
   - **Ingredients** (required)
   - **Cooking Time** in minutes (required)
   - **Servings** (optional)
   - **Notes** (optional)
   - **Image URL** (optional)
3. Click "Save Recipe"

### View Recipes:
1. Click "My Recipes" in the navigation
2. Browse all your saved recipes
3. Click "Delete" to remove a recipe

### Home Page:
- See stats: total recipes and cooking time
- Quick links to add or view recipes
- Feature overview

## Design Highlights

- **Warm Color Scheme** - Orange/amber theme (perfect for food!)
- **Modern Cards** - Clean recipe cards with shadows and hover effects
- **Smooth Animations** - Buttons, cards, and toast notifications
- **Mobile-First** - Fully responsive across all devices
- **Toast Notifications** - Success/error messages
- **Empty States** - Friendly messages when no recipes exist

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Flexbox, Grid, animations, CSS variables
- **JavaScript (ES6)** - DOM manipulation, localStorage
- **Google Fonts** - Poppins font family

## Responsive Breakpoints

- **Mobile:** < 480px
- **Tablet:** 481px - 768px
- **Desktop:** > 768px

## Key Functions

### `addRecipe()`
Validates form inputs and saves recipe to localStorage

### `displayRecipes()`
Renders all saved recipes as cards

### `deleteRecipe(index)`
Removes a recipe from localStorage and refreshes display

### `showToast(message, type)`
Shows success/error notifications

### `updateHomeStats()`
Updates recipe count and total cooking time on home page

## localStorage Structure

Recipes are stored as an array of objects:
```javascript
[
  {
    "name": "Nyama Choma",
    "ingredients": "1 kg goat or beef ribs",
    "time": 30,
    "servings": 4,
    "notes": "Nyama Choma is Kenya’s national dish, often enjoyed socially with friends and family gatherings.",
    "imageUrl": "https://...",
  }
]

## Author

**Eugene Kimathi**

## License

MIT License - Free to use for personal and commercial projects

**Enjoy planning your meals! 🍽️**