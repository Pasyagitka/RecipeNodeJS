const express = require('express');

const router = express.Router();
const path = require('path');

router.get('/', (req, res, next) => {
    const options = {
        root: path.join(path.resolve('.'), 'public', 'files'),
    };
    res.sendFile('file.txt', options, (err) => {
        if (err) {
            next(err);
        } else {
            next();
        }
    });
});

module.exports = router;
