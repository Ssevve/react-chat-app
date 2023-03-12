import '@testing-library/jest-dom';

// window.scrollTo mock
window.HTMLElement.prototype.scrollTo = jest.fn();

// window.matchMedia mock
window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // Deprecated
  removeListener: jest.fn(), // Deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});
