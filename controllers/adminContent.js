async function getAdminContent(req, res, next) {
    try {
        res.render('admincontent', { title: 'Admin content'});
    } catch (e) {
        next(e);
    }
}

module.exports = {
    getAdminContent,
}
