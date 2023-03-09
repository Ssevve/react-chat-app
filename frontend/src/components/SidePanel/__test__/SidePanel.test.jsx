import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '__mocks__/matchMediaMock';
import { renderWithProviders } from 'utils/testUtils';

import SidePanel from '..';

test('renders the side panel if the "expanded prop" is passed in', () => {
  renderWithProviders(<SidePanel expanded />);
  expect(screen.getByTestId('sidePanel')).toBeInTheDocument();
});

test('does not render the side panel if the "expanded" prop is not passed in', () => {
  renderWithProviders(<SidePanel />);
  expect(screen.queryByTestId('sidePanel')).not.toBeInTheDocument();
});
