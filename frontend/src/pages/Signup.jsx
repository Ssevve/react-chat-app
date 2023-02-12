import AuthPageLayout from 'layouts/AuthPageLayout';
import SignupForm from 'features/auth/SignupForm';

function Signup() {
  return (
    <AuthPageLayout>
      <SignupForm />
    </AuthPageLayout>
  );
}

export default Signup;
