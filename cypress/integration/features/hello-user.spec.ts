/// <reference types="cypress" />

context('Given I am on the homepage', () => {
  beforeEach(() => {
    cy.visit('') // go home
    cy.get('body').trigger('keydown', { key: 'Enter', force: true })
  })

  describe('When I click my name', () => {
      it('Then I see a text field for my name', () => {
          cy.get('.Username').should('not.exist')
          let name = cy.get('.username-span')
          name.should('exist')
          name.click()
          cy.get('.Username').should('exist')
      })

      describe('And enter my name', () => {
          it('When I blur, then I see my name in the greeting', () => {
              let name = cy.get('.username-span')
              name.should('exist')
              name.click()
              cy.get('.Username').should('exist')
              cy.get('.Username').clear().type('david').blur()
              cy.get('.App-greeting').invoke('text').should('match',
                /Good (morning|afternoon|evening), David./
              )
          })
          it('When I press return, then I see my name in the greeting', () => {
              let name = cy.get('.username-span')
              name.should('exist')
              name.click()
              cy.get('.Username').should('exist')
              cy.get('.Username').clear().type('david{enter}')
              cy.get('.App-greeting').invoke('text').should('match',
                /Good (morning|afternoon|evening), David./
              )
          })
      })
  })
});
 