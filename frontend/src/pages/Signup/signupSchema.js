import * as yup from 'yup';

const signupSchema = yup.object({
  username: yup
    .string()
    .matches(/^[a-zA-Z0-9]*$/, {
      message: 'No special characters allowed',
    })
    .required()
    .min(4)
    .max(15)
    .label('Username'),
  password: yup.string().required().min(8).label('Password'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
    .required()
    .label('Repeat password'),
});

export default signupSchema;
