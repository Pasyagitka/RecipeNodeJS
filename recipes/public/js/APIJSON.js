let requestHeaders = { 
    'Authorization': `${localStorage.getItem('token')}`,
    'Content-Type': 'application/json', 
    'Accept': 'application/json',
}

//cookbooks
async function postAddCookbookRecord(id) {
    return await fetch(`/cookbooks/add/${id}`, { method: 'POST', headers: requestHeaders, });
}

async function deleteDeleteCookbookRecord(id) {
    return await fetch(`/cookbooks/delete/${id}`, { method: 'DELETE', headers: requestHeaders, });
}

async function postGetCookbooks() {
    return await fetch("/cookbooks", { method: 'POST', headers: requestHeaders, });
}


//admin
async function getGetAdminModerate() {
    return await fetch("/admin/adminmoderate", { method: 'GET', headers: requestHeaders, });
}

async function getGetAdminContent() {
    return await fetch("/admin/admincontent", { method: 'GET', headers: requestHeaders, });
}

async function postGetModerateDataAdmin() {
    return await fetch("/admin/adminmoderate", {  method: 'POST', headers: requestHeaders,  });
}

async function putApproveRecipeAdmin(id) {
    return await fetch(`/admin/approve/${id}`, {  method: 'PUT', headers: requestHeaders, });
}

async function putDisapproveRecipeAdmin(id) {
    return await fetch(`/admin/disapprove/${id}`, { method: 'PUT', headers: requestHeaders, });
}

async function postGetRecipesDataAdmin() {
    return await fetch("/admin/adminrecipes", {  method: 'POST', headers: requestHeaders, });
}

//userrecipes
async function getGetUserRecipes() {
    return await fetch("/userrecipes", { method: 'GET',  headers: requestHeaders, });
}

async function postGetUserRecipes() {
    return await fetch("/userrecipes", { method: 'POST', headers: requestHeaders, });
}

async function postAddRecipe({title, categoryId, mealId, timeToCook, instruction, file, ingredients}) {
    return await fetch("/userrecipes/add", { method: 'POST', headers: requestHeaders,
        body: JSON.stringify({ title, categoryId, mealId,  timeToCook, instruction, file, ingredients}),
    });
}

async function putUpdateUserRecipe({ id, authorId, title, categoryId, mealId,  file, timeToCook, instruction, ingredients}) {
    return await fetch("/userrecipes/update", { method: 'PUT', headers: requestHeaders,
        body: JSON.stringify({ id, authorId, title, categoryId, mealId,  file, timeToCook, instruction, ingredients})   
    });
}

async function deleteDeleteUserRecipe({ id, authorId}) {
    return await fetch(`/userrecipes/delete/${id}`, { method: 'DELETE', headers: requestHeaders, body: JSON.stringify({ authorId }) });
}


//auth
async function getGetUserName() {
    return await fetch("/username", { method: 'GET', headers: requestHeaders,});
}

async function getGetUser() {
    return await fetch("/user", { method: 'GET', headers: requestHeaders,});
}

async function postLogin({email, password}) {
    return await fetch("/login", { method: 'POST', headers: requestHeaders, body: JSON.stringify({ email, password })});
}

async function getLogout() {
    return await fetch("/logout", { method: 'GET', headers: requestHeaders, });
}

async function postRegister({login, email, password}) {
    return await fetch("/register", { method: 'POST', headers: requestHeaders, body: JSON.stringify({ login, email, password })});
}

async function postChangePassword(newPassword) {
    return await fetch("/change-password", { method: 'POST', headers: requestHeaders, body: JSON.stringify({ newPassword })});
}

async function postRequestPasswordReset(email) {
    return await fetch("/reset-password", { method: 'POST', headers: requestHeaders, body: JSON.stringify({ email })});
}

//recipes
async function getRecipesFilterSearch(qs) {
    return await fetch("/recipes?" + qs, { method: 'GET', headers: requestHeaders, });
}

async function getRecipesJSON(id) {
    return await fetch(`/recipes/getJSON/${id}`, { method: 'GET', headers: requestHeaders, });
}

//meals
async function getGetMeal(id) {
    return await fetch(`/meals/${id}`, { method: 'GET',  headers: requestHeaders, });
}
async function getGetMeals() {
    return await fetch("/meals", { method: 'GET',  headers: requestHeaders, });
}
async function postAddMeal({ meal }) {
    return await fetch("/meals", { method: 'POST',  headers: requestHeaders,  body: JSON.stringify({ meal })});
}
async function putUpdateMeal({ id, meal }) {
    return await fetch("/meals", { method: 'PUT',  headers: requestHeaders,  body: JSON.stringify({ id, meal })});
}
async function deleteDeleteMeal(id) {
    return await fetch(`/meals/${id}`, { method: 'DELETE',  headers: requestHeaders, });
}

//categories
async function getGetCategory(id) {
    return await fetch(`/categories/${id}`, { method: 'GET',  headers: requestHeaders, });
}
async function getGetCategories() {
    return await fetch("/categories", { method: 'GET',  headers: requestHeaders, });
}
async function postAddCategory({ category }) {
    return await fetch("/categories", { method: 'POST',  headers: requestHeaders,  body: JSON.stringify({ category })});
}
async function putUpdateCategory({ id, category }) {
    return await fetch("/categories", { method: 'PUT',  headers: requestHeaders,  body: JSON.stringify({ id, category })});
}
async function deleteDeleteCategory(id) {
    return await fetch(`/categories/${id}`, { method: 'DELETE',  headers: requestHeaders, });
}

//ingredients
async function getGetIngredient(id) {
    return await fetch(`/ingredients/${id}`, { method: 'GET',  headers: requestHeaders, });
}
async function getGetIngredients() {
    return await fetch("/ingredients", { method: 'GET',  headers: requestHeaders, });
}
async function postAddIngredient({ name, measurement }) {
    return await fetch("/ingredients", { method: 'POST',  headers: requestHeaders,  body: JSON.stringify({ name, measurement })});
}
async function putUpdateIngredient({ id, name, measurement }) {
    return await fetch("/ingredients", { method: 'PUT',  headers: requestHeaders,  body: JSON.stringify({ id, name, measurement })});
}
async function deleteDeleteIngredient(id) {
    return await fetch(`/ingredients/${id}`, { method: 'DELETE',  headers: requestHeaders, });
}

async function handleResponseErrors(response) {
    if (response.status === 401) {  
        alert('Unauthorized: You need to login to perform this action!');
        document.location.assign('/login');
    }
    else if (response.status === 403) {
        alert('Forbidden: You don`t have rights to perform this action!');
    }
    else {
        alert(`Something went wrong (${response.status}): ${await response.json()}`);
    }
}