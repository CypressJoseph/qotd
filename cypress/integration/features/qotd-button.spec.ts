/// <reference types="cypress" />

context('Given I am on the homepage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/qotd')
  })

  describe('When I click the button', () => {
      it('Then I see a quote', () => {
          cy.get('.Quote').should('not.exist')
          let inspireMe = cy.get('.LoadQuoteButton')
          inspireMe.should('exist')
          inspireMe.click()
          cy.get('.Quote').should('exist')
      })
  })
});
 