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
    return await fetch(`/cookbooks/delete/${id}`, { method: 'DELETE', requestHeaders, });
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
async function postLogin({email, password}) {
    return await fetch("/login", { method: 'POST', headers: requestHeaders, body: JSON.stringify({ email, password })});
}
async function postRegister({login, email, password}) {
    return await fetch("/register", { method: 'POST', headers: requestHeaders, body: JSON.stringify({ login, email, password })});
}


//recipes
async function getRecipesFilterSearch(qs) {
    return await fetch("/recipes?" + qs, { method: 'GET', headers: requestHeaders, });
}

async function getRecipesJSON(id) {
    return await fetch(`/recipes/getJSON/${id}`, { method: 'GET', headers: requestHeaders, });
}