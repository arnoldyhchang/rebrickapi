import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const divElement = screen.getByTestId('demo');
  expect(divElement).toBeInTheDocument();
});
