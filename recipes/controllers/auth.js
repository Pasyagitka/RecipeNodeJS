const authService = require('../services/authService');
const cookieConfig = require('../configs/cookieconfig.json');

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

async function getForgotPassword(req, res, next) {
    try {
        res.render('forgot-password', { title: 'Forgot password', isNoHeaderPage: true  });
    } catch (e) {
        next(e);
    }
}

async function getAccount(req, res, next) {
    try {
        res.render('account', { title: 'Account', username: res.user?.login });
    } catch (e) {
        next(e);
    }
}

async function getUsername(req, res, next) {
    try {
        let username = req.user ? req.user.login : 'Guest';
        return res.json({username});
    } catch (e) {
        next(e);
    }
}

async function getUser(req, res, next) {
    try {
        let {login, email, isGranted} = req.user;
        return res.json({login, email, isGranted});
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
    } catch (e) {
        next(e);
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const userData = await authService.login(email, password);
        res.cookie('refreshToken', userData.refreshToken, cookieConfig);
        res.json('Bearer ' + userData.accessToken);
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

async function changePassword(req, res, next) {
    try {
        let {login} = req.user;
        let {newPassword} = req.body;
        let result = await authService.changePassword(login, newPassword);
        let message = result? 'Your password has been changed' : 'Password has not been changed';
        res.json({message});
    } catch (e) {
        next(e);
    }
}

async function sendResetPassword(req, res, next) {
    try {
        await authService.sendResetPassword(req.body.email);
        let message = 'Password reset link sent to your email account'
        return res.json({message});
    } catch (e) {
        next(e);
    }
}

async function resetConfirm(req, res, next) {
    try {
        const { login } = req.params;
        const isReset = await authService.resetConfirm(login, req.params.link);
        let message = isReset ? 'Success' : 'Failure';
        return res.render('confirm', {message, isNoHeaderPage: true});
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
    changePassword,
    sendResetPassword,
    resetConfirm,
    getLogin,
    getRegister,
    getAccount,
    getUsername,
    getUser,
    getForgotPassword,
};
