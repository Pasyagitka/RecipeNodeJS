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

const commonButton = function(href, content = '&times', message = 'Are you sure you want to delete the recipe?') {
    return (
        `
        <div class='delete-button-wrapper' style="width: 70px;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;">
            <a href='javascript:${href}' onclick="return confirm('${message}');" style="text-decoration: none; color: inherit; font-weight: bold; font-size: 1.2em;">${content}</a>
        </div>
        `
    )
}

const deleteButton = function(id, authorId) {
    return commonButton(`DeleteUserRecipe(${id}, ${authorId})`);
}

const deleteButtonCookbook = function(id) {
    return commonButton(`deleteAndUpdateCookbook(${id})`);
}

const approveButton = function(id) {
    return commonButton(`approveRecipe(${id})`, 'YES', 'Approve the recipe?');
}

const disapproveButton = function(id) {
    return commonButton(`disapproveRecipe(${id})`, 'NO', 'Disapprove the recipe?');
}

const updateButton = function(id) {
    return commonButton(`editAndUpdate(${id})`, 'e', 'Update the recipe?');
}