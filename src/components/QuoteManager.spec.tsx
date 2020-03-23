import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from '../App';
import QuoteManager from './QuoteManager';
import { DailyQuotes } from '../services/DailyQuotes';
import axiosMock from 'axios'
jest.mock('axios')

test('quote-me-up button works', async () => {
    const url = 'https://quotes.rest/qod?language=en'
    const { getByText, getByRole } = render(<QuoteManager quoteService={
        new DailyQuotes(url)
    } />)

    // @ts-ignore
    axiosMock.get.mockResolvedValueOnce({
        data: {
            contents: {
                quotes: [{ quote: 'hello there', author: 'nohbdy' }]
            }
        }
    })
    let loadQuote = getByText('Inspire Me')
    fireEvent.click(loadQuote)
    const greetingTextNode = await waitForElement(() => getByRole('heading'))
    expect(axiosMock.get).toHaveBeenCalledTimes(1)
    expect(axiosMock.get).toHaveBeenCalledWith(url)
    expect(getByRole('heading')).toHaveTextContent('"hello there"-nohbdy')
    expect(loadQuote).not.toBeInTheDocument() //toHaveAttribute('disabled')
})