/// <reference types="cypress" />

context('Given I am on the homepage', () => {
  beforeEach(() => {
    cy.server()
    cy.route(
      "https://quotes.rest/qod/*",
      { contents: {quotes: [{
        quote: "A pitcher's got to be good and he's got to be lucky to get a no hit game",
        author: "Cy Young",
      }]}}
    ).as('getQuote')
    cy.visit('') // go home
    // cy.get('body').trigger('keydown', { key: 'Enter', force: true })
  })

  describe('When I click the button', () => {
      it('Then I see a quote', () => {
          cy.get('.Quote').should('not.exist')
          let inspireMe = cy.get('.LoadQuoteButton')
          inspireMe.should('exist')
          inspireMe.click()
          cy.wait("@getQuote").then(() => cy.get('.Quote').should('exist'))
      })
  })
});
 