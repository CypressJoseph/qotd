/// <reference types="cypress" />

context('Given I am on the homepage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/qotd')
  })

  describe('When I click the button', () => {
      it('Then I see a quote', () => {
          cy.get('.the-quote-itself').should('not.exist')
          cy.get('.the-quote-button').should('exist')
          let giveMeThatQuote = cy.get('.the-quote-button')

          giveMeThatQuote.click()

          cy.get('.the-quote-itself').should('exist')
      })
  })
});
 