import * as yup from 'yup';

const loginSchema = yup.object({
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
});

export default loginSchema;
