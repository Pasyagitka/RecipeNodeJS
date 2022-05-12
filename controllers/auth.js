const authService = require('../services/authService');
const recipeService = require('../services/recipesService');

const cookieConfig = {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
};

async function getLogin(req, res, next) {
    try {
        res.render('login', { title: 'Login', isNoHeaderPage: true  });
    } catch (e) {
        next(e);
    }
}

async function getRegister(req, res, next) {
    try {
        res.render('register', { title: 'Register', isNoHeaderPage: true  });
    } catch (e) {
        next(e);
    }
}

async function registration(req, res, next) {
    try {
        const { login, email, password } = req.body;
        const userData = await authService.registration(login, email, password);
        res.cookie('refreshToken', userData.refreshToken, cookieConfig);
        res.redirect('/login');
        //return res.json(userData);
    } catch (e) {
        next(e);
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const userData = await authService.login(email, password);
        let recipeList = await recipeService.findAll();
        //console.log(userData);
        //req.headers.authorization = 'Bearer ' + userData.accessToken;
        //console.log(req.headers);
        //console.log(r.split(' ')[1])
        //console.log('contoler', req.headers);
        res.cookie('refreshToken', userData.refreshToken, cookieConfig);
        res.redirect('/');
    } catch (e) {
        next(e);
    }
}

async function logout(req, res, next) {
    try {
        const { refreshToken } = req.cookies;
        const token = await authService.logout(refreshToken);
        res.clearCookie('refreshToken');
        res.redirect('/login');
    } catch (e) {
        next(e);
    }
}

async function activate(req, res, next) {
    try {
        const activationLink = req.params.link;
        await authService.activate(activationLink);
        return res.send('Success');
    } catch (e) {
        next(e);
    }
}

async function refresh(req, res, next) {
    try {
        const { refreshToken } = req.cookies;
        const userData = await authService.refresh(refreshToken);
        res.cookie('refreshToken', userData.refreshToken, cookieConfig);
        return res.json(userData);
    } catch (e) {
        next(e);
    }
}

async function sendResetPassword(req, res, next) {
    try {
        await authService.sendResetPassword(req.body.email);
        return res.send('Password reset link sent to your email account');
    } catch (e) {
        next(e);
    }
}

async function resetConfirm(req, res, next) {
    try {
        const { login } = req.params;
        const resetPasswordLink = req.params.link;
        const isReset = await authService.resetConfirm(login, resetPasswordLink);
        if (isReset) {
            return res.send('Success');
        }
        return res.send('Failure');
    } catch (e) {
        next(e);
    }
}

module.exports = {
    registration,
    login,
    logout,
    activate,
    refresh,
    sendResetPassword,
    resetConfirm,
    getLogin,
    getRegister,
};
