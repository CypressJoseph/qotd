/// <reference types="cypress" />

context('Given I am on the homepage', () => {
  beforeEach(() => {
    cy.server()
    cy.route(
      "**/qod*",
      { contents: {quotes: [{
        quote: "A pitcher's got to be good and he's got to be lucky to get a no hit game",
        author: "Cy Young",
      }]}}
    ).as('getQuote')
    cy.visit('') // go home
    cy.get('body').trigger('keydown', { key: 'Enter', force: true })
    // i think we need to stub the quote...
    cy
  })

  describe('When I click the button', () => {
      it.skip('Then I see a quote', () => {
          cy.get('.Quote').should('not.exist')
          let inspireMe = cy.get('.LoadQuoteButton')
          inspireMe.should('exist')
          inspireMe.click()
          cy.wait("@getQuote").then(() => cy.get('.Quote').should('exist'))
      })
  })
});
 