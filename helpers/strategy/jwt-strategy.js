const {Strategy, ExtractJwt} = require('passport-jwt');
const authService = require('../../services/authService');

const jwtStratigy = new Strategy({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await authService.findUserById(payload.id);
  
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (err) {
        done(err, false);
      }
    },
  );

passport.use(jwtStratigy);