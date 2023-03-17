import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import renderWithProviders from 'utils/testUtils';

import SignupForm from '..';

test('renders a sign up form', () => {
  renderWithProviders(
    <BrowserRouter>
      <SignupForm />
    </BrowserRouter>
  );
  expect(screen.getByRole('form', { name: /sign up/i })).toBeInTheDocument();
});

test('renders a form title', () => {
  renderWithProviders(
    <BrowserRouter>
      <SignupForm />
    </BrowserRouter>
  );
  expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument();
});

test('renders a username input field', () => {
  renderWithProviders(
    <BrowserRouter>
      <SignupForm />
    </BrowserRouter>
  );
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
});

test('renders a password input field', () => {
  renderWithProviders(
    <BrowserRouter>
      <SignupForm />
    </BrowserRouter>
  );
  expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
});

test('renders a repeat password input field', () => {
  renderWithProviders(
    <BrowserRouter>
      <SignupForm />
    </BrowserRouter>
  );
  expect(screen.getByLabelText(/repeat password/i)).toBeInTheDocument();
});

test('renders a sign up button', () => {
  renderWithProviders(
    <BrowserRouter>
      <SignupForm />
    </BrowserRouter>
  );
  expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
});

test('renders a divider', () => {
  renderWithProviders(
    <BrowserRouter>
      <SignupForm />
    </BrowserRouter>
  );
  expect(screen.getByTestId('divider')).toBeInTheDocument();
});

test('renders a footer text', () => {
  renderWithProviders(
    <BrowserRouter>
      <SignupForm />
    </BrowserRouter>
  );
  expect(screen.getByText(/have an account/i)).toBeInTheDocument();
});

test('renders a log in page link', () => {
  renderWithProviders(
    <BrowserRouter>
      <SignupForm />
    </BrowserRouter>
  );
  expect(screen.getByRole('link', { name: /log in/i })).toBeInTheDocument();
});
