async function getAdminModerate(req, res, next) {
    try {
        res.render('adminmoderate', { title: 'Admin moderate'});
    } catch (e) {
        next(e);
    }
}

module.exports = {
    getAdminModerate,
}