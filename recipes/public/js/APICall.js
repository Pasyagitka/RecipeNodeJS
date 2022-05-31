
    async function addCookbookRecord(id) {
        let response = await postAddCookbookRecord(id);
        if (response.status === 200) {
            alert('Saved to your cookbook');
        }
        else await handleResponseErrors(response);
    }

    async function deleteCookbookRecord(id) {
        let response = await deleteDeleteCookbookRecord(id);
        if (response.status === 200) {
            alert('Removed from your cookbook');
        }
        else await handleResponseErrors(response);
    }

    async function getUsername() {
        let username;
        let response = await getGetUserName();
        if (response.status === 200) {
            username = (await response.json()).username;
        } else username = 'guest';
        return username;
    }