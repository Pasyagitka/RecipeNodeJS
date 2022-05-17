
async function addCookbookRecord(id) {
    let response = await fetch(`/cookbooks/add/${id}`, { 
        method: 'POST',
        headers: { 
            'Authorization': `${localStorage.getItem('token')}`,
            'Content-Type': 'application/json', 
            'Accept': 'application/json',
    }, });
        
    if (response.status === 200) {
        alert('Saved to your cookbook');
    }
}

async function deleteCookbookRecord(id) {
    let response = await fetch(`/cookbooks/delete/${id}`, { 
        method: 'DELETE',
        headers: { 
            'Authorization': `${localStorage.getItem('token')}`,
            'Content-Type': 'application/json', 
            'Accept': 'application/json',
    }, });
        
    if (response.status === 200) {
        alert('Removed from your cookbook');
    }
}

async function getCookbooks() {
    let response = await fetch("/cookbooks", { 
    method: 'POST',
    headers: { 
        'Authorization': `${localStorage.getItem('token')}`,
        'Content-Type': 'application/json', 
        'Accept': 'application/json' 
    }, });
    
    
    let cookbookItemsCount = document.getElementById('cookbook-items-count');
    let recipesContainer = document.getElementById('cookbook-recipe-list');
    if (response.status === 200) {
        let resp = await response.json();
        let tr = '';
        let pdata = resp.cookbooks;
        pdata.forEach(function (value) {
            let r = recipe(value.recipe);
            tr += '<div style="display: flex;">' +
                    r + 
                    deleteButton(value.recipe.id) + 
                    '</div>';
        });
        recipesContainer.innerHTML = tr;
        cookbookItemsCount.innerHTML = pdata.length || 0;
    }
}


// function sendRequest(url, body, ok_callback, bad_callback) {
//     return fetch(url,
//     {
//         method: 'POST',
//         body: body,
//         headers: { 'Content-Type':'application/json' }
//     }).then(response =>
//         {
//             if(response.ok)
//             {
//                 response.json().then(data => { ok_callback(data); });
//             }
//             else
//             {
//                 response.json().then(data => { bad_callback(data); });
//             }
//         }).catch((err)=>{ bad_callback(err); });
// }