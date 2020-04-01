/// <reference types="cypress" />

context('Given I am on the homepage', () => {
  beforeEach(() => {
    cy.visit('') // go home
  })

  describe('When I click the button', () => {
      it('Then I see a quote', () => {
          cy.get('[data-test-id="quote"]').should('not.exist')
          let inspireMe = cy.get('#inspire-me')
          inspireMe.should('exist')
          inspireMe.click()
          cy.get('[data-test-id="quote"]').should('exist')
      })
  })
});
 