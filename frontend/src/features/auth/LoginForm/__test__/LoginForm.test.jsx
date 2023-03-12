import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from 'utils/testUtils';

import LoginForm from '..';

test('renders a log in form', () => {
  renderWithProviders(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>,
  );
  expect(screen.getByRole('form', { name: /log in/i })).toBeInTheDocument();
});

test('renders a form title', () => {
  renderWithProviders(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>,
  );
  expect(screen.getByRole('heading', { name: /log in/i })).toBeInTheDocument();
});

test('renders a username input field', () => {
  renderWithProviders(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>,
  );
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
});

test('renders a password input field', () => {
  renderWithProviders(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>,
  );
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test('renders a "Log in" button', () => {
  renderWithProviders(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>,
  );
  expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
});

test('renders a divider', () => {
  renderWithProviders(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>,
  );
  expect(screen.getByTestId('divider')).toBeInTheDocument();
});

test('renders a footer text', () => {
  renderWithProviders(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>,
  );
  expect(screen.getByText(/need an account/i)).toBeInTheDocument();
});

test('renders a sign up page link', () => {
  renderWithProviders(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>,
  );
  expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument();
});
