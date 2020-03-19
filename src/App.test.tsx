import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test.skip('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('quote-me-up button exists', () => {
  const { getByText } = render(<App />);
  const quoteBtn = getByText(/give me a quote/i);
  expect(quoteBtn).toBeInTheDocument();
  // expect(quoteBtn) // is a button with this text
})

test.todo('pressing quote button gives me a quote')
