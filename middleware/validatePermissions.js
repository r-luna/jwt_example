const { jwtVerify } = require('../handlers');

/*
 * "options" is an arry of strings matching on of the three available role types:
 * 1) admin, 2) editor, 3) reader
 *
 * If the role in the JWT matches one of the "options" then the user us allowed
 * access to the page via "next()".
 *
 * If options.length is 0 then the route is unrestricted.
 */
const validatePermissions = (options) => {
  return (req, res, next) => {
    if (options.length !== 0) {
      // can we get a jwt?
      const jwt = req.cookies.token;
      if (jwt === undefined) {
        res.render('unauthorized', { layout: 'default', message: 'JWT is missing.' });
        return;
      }

      // can the jwt be verified?
      const user = jwtVerify(jwt);
      if (!user || user.JsonWebTokenError) {
        res.render('unauthorized', { layout: 'default', message: user.JsonWebTokenError });
        return;
      }

      // is the user authorized for the given page?
      if (options.indexOf(user.role) === -1) {
        res.render(
          'unauthorized',
          {
            layout: 'default',
            message: 'Insufficient priviledges',
            usr: user.usr,
            role: user.role,
          },
        );
        return;
      }

      // else continue...
      res.locals.usr = user.usr;
      res.locals.role = user.role;
    }
    next();
  };
};

module.exports = validatePermissions;
