const yup = require('yup');

const loginSchema = yup.object({
  username: yup
    .string()
    .matches(/^[a-zA-Z0-9]*$/, {
      message: 'username can contain only alphanumeric characters',
    })
    .required()
    .min(4)
    .max(15)
    .strict(),
  password: yup.string().required().min(8).strict(),
});

const validateLogin = async (req, res, next) => {
  try {
    await loginSchema.validate(req.body);
    return next();
  } catch (err) {
    return res.sendStatus(401);
  }
};

module.exports = validateLogin;
