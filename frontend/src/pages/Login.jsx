import AuthPageLayout from 'layouts/AuthPageLayout';
import LoginForm from 'features/auth/LoginForm';

function Login() {
  return (
    <AuthPageLayout>
      <LoginForm />
    </AuthPageLayout>
  );
}

export default Login;
