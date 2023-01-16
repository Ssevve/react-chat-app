const yup = require('yup');

const signupSchema = yup.object({
  username: yup
    .string()
    .matches(/^[a-zA-Z0-9]*$/, {
      message: 'username can contain only alphanumeric characters',
    })
    .required()
    .min(4)
    .max(15),
  password: yup.string().required().min(8),
});

const validateSignup = async (req, res, next) => {
  try {
    await signupSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    return res.status(400).json(err.errors);
  }
};

module.exports = validateSignup;
