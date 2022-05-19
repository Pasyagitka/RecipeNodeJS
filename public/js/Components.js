function recipe(value) {
    let recipe_ingred = recipe_ingredients(value.recipe_ingredients);
    return (
        `
            <div class="recipe-item-wrapper  recipe-item-wrapper-row">
            <div class="recipe-item">
                <div class="recipe-item-header">
                    <p>by ${value.author.login}</p>
                    <div class="account-dropdown-partial" style="float:right; width: 20px;">
                        <button class="recipe-more-button account-dropdown-button" type="button">
                        </button>
                    <div class="account-dropdown-content">
                        <a href="javascript:addCookbookRecord(${value.id});">Save</a>
                        <a href="javascript:deleteCookbookRecord(${value.id});">Remove</a>
                    </div>
                    </div>
                </div>
                <a href="/recipes/get/${value.id}">
                    <div class="recipe-item-body">
                        <h2>${value.title}</h2>
                        <div class="recipe-item-short-details">
                            <img src="${value.images[0]?.uri}" alt="${value.images[0]?.description}">
                            <ul class="recipe-ingredients">
                                ${recipe_ingred}
                            </ul>
                        </div>
                    </div>
                </a>
                <div class="recipe-item-footer">
                    <div></div>
                    <div class="rounded-sign">${value.category.category}</div>
                    <div class="rounded-sign">${value.meal.meal}</div>
                    <div class="rounded-sign">${value.timeToCook}m</div>
                </div>
            </div>
            
        </div>
        `
    )
}

function recipe_ingredients(recipe_ingredients) {
    let t = '';
    recipe_ingredients.forEach(ingredient => {
        t += `<li>${ingredient.ingredient.name} ${ingredient.quantity} ${ingredient.ingredient.measurement}</li>`;
    });
    return t;
}

const deleteButton = function(id, authorId) {
    return (
        `
        <div class='delete-button-wrapper' style="width: 70px;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;">
            <a href='javascript:deleteAndUpdateRecipe(${id}, ${authorId});' onclick="return confirm('Are you sure you want to delete the recipe?');" style="text-decoration: none; color: inherit; font-weight: bold; font-size: 1.2em;">&times</a>
        </div>
        `
    )

const deleteButtonCookbook = function(id) {
    return (
        `
        <div class='delete-button-wrapper' style="width: 70px;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;">
            <a href='javascript:deleteAndUpdateCookbook(${id});' onclick="return confirm('Are you sure you want to delete the recipe?');" style="text-decoration: none; color: inherit; font-weight: bold; font-size: 1.2em;">&times</a>
        </div>
        `
    )
}

const approveButton = function(id) {
    return (
        `
        <div class='delete-button-wrapper' style="width: 70px;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;">
            <a href='javascript:approveRecipe(${id});' onclick="return confirm('Approve the recipe?');" style="text-decoration: none; color: inherit; font-weight: bold; font-size: 1.2em;">YES</a>
        </div>
        `
    )
}

const disapproveButton = function(id) {
    return (
        `
        <div class='delete-button-wrapper' style="width: 70px;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;">
            <a href='javascript:disapproveRecipe(${id});' onclick="return confirm('Disapprove the recipe?');" style="text-decoration: none; color: inherit; font-weight: bold; font-size: 1.2em;">NO</a>
        </div>
        `
    )
}

const updateButton = function(id) {
    return (
        `
        <div class='delete-button-wrapper' style="width: 70px;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;">
            <a href='javascript:editAndUpdate(${id});' 
                class='myBtn'
                style="text-decoration: none; color: inherit; font-weight: bold; font-size: 1.2em;"'">e</a>
        </div>
        `
    )
}

// function UpdateRecipeModal() {
//     return (
//     `
//         <article class="add-recipe-container">
//         <h1 class="add-recipe-header">Update your recipe</h1>
//         <div>
//             <form class="add-recipe-form" action="/userrecipes/add" method="post">
//                 <h1 style="font-size: 1em;">Title</h1>
//                 <input type='text' name='title' value='title' id="recipe-title" class="add-input-text" required/>
//                 <h1 style="font-size: 1em;">Image</h1>
//                 <input type="file" id="recipe-image" class="add-input-text"  placeholder="image uri"/>
//                 <div class="add-select-container">
//                     <select name="categoryId" id="recipe-category" class="add-input-select" required>
//                         {{#each categories}}
//                             <option value="{{id}}">{{category}}</option>
//                         {{/each}}
//                     </select>
//                     <select name="mealId" id="recipe-meal" class="add-input-select" required>
//                         {{#each meals}}
//                             <option value="{{id}}">{{meal}}</option>
//                         {{/each}}
//                     </select>
//                 </div>
//                 <div>
//                     <h1 style="font-size: 1em;">Select ingredients</h1>
//                     <div class="add-ingredients-table">
//                         {{#each ingredients}}
//                             <div class="add-ingredients-item">
//                                 <div>{{name}}</div>
//                                 <div>
//                                     <input type="number" class="add-input-text ingredients-input" name="{{id}}" style="height: 20px; margin: 0" min="0" value="0">
//                                 </div>
//                                 <div>
//                                     {{measurement}}
//                                 </div>
//                             </div>
//                         {{/each}}
//                     </div>
//                 </div>
//                 <input type='number' class="add-input-text" id="recipe-time" style="width: 150px;" name='timeToCook' required placeholder='time to cook (m)'/>
//                 <textarea class="instruction-input" type='text' id="recipe-instruction" name='instruction' required value='instruction'/></textarea><br/>
//                 <a class="big-green-button" href="javascript:(AddRecipe());">Confirm</a>
//             </form>
//         </div>
//         </article>
//     `
//     );
// }