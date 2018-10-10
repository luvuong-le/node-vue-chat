const isAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.send({
      error: "Not Authenticated"
    });
  }
};

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    res.send({
      error: "Already Logged In"
    });
  } else {
    next();
  }
};

const createErrorObject = errors => {
  const errorObject = {};
  errors.forEach(error => {
    errorObject[error.param] = error.msg;
  });
  return errorObject;
};

const checkRegistrationFields = (req, res, next) => {
  req.check("email").isEmail();
  req
    .check("username")
    .isString()
    .isLength({ min: 5, max: 15 })
    .withMessage("Username must be between 5 and 15 characters");
  req
    .check("password")
    .isString()
    .isLength({ min: 5, max: 15 })
    .withMessage("Password must be between 5 and 15 characters");

  const errors = req.validationErrors();

  if (errors) {
    res.send({
      errors: createErrorObject(errors)
    });
  } else {
    next();
  }
};

module.exports = { isLoggedIn, isAuthenticated, checkRegistrationFields };
