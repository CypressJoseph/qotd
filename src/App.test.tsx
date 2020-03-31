import React from 'react';
import App from './App';
import { render, fireEvent } from '@testing-library/react'
// jest.mock('axios');

import mockAxios from 'axios'
jest.mock('axios')

    // @ts-ignore
mockAxios.get.mockResolvedValue({
  data: {
    contents: {
      quotes: [{ quote: 'hello there', author: 'nohbdy' }]
    }
  }
})

// todo mock the weather
// import mockWeather from './services/Weather';
// jest.mock('./services/Weather')
// @ts-ignore
// mockWeather.lookOutside.mockResolvedValue({ summary: 'charming' })



const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn()
};

beforeEach(() => {
  // @ts-ignore
  global.navigator.geolocation = mockGeolocation;
  // waitForElement(".App-greeting")
})

describe('Given I visit the landing page', () => {
  describe('When I look at the greeting', () => {
    test('Then I see a welcoming message', () => {
      const { getByText } = render(<App />);
      const hello = getByText(/Good (morning|afternoon|evening)/i);
      expect(hello).toBeInTheDocument();
    })
  })
  describe('When I press enter', () => {
    test('Then I see the day of the week', () => {
      const { getByText } = render(<App />);
      fireEvent.keyDown(window, { key: 'Enter' })
      const dayReminder = getByText(/(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/i);
      expect(dayReminder).toBeInTheDocument();
    })
    test.skip('Then I see the weather', () => {
      const { getByText } = render(<App />);
      fireEvent.keyDown(window, { key: 'Enter' })
      const conditions = getByText(/Forecast:/i);
      expect(conditions).toBeInTheDocument();
    })
    test.todo('Then I can set an intention')
  })

  describe('When I look at the quotes', () => {
    test('The quote exists', () => {
      const { getByRole } = render(<App />);
      fireEvent.keyDown(window, { key: 'Enter' })
      const quoteBtn = getByRole('button');
      expect(quoteBtn).toBeInTheDocument();
    })
    test.todo('The next quote exists')
    test.todo('The previous quote exists')
  });
});