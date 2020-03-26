/// <reference types="cypress" />
context('Given I am on the homepage', () => {
  beforeEach(() => {
    cy.visit('') // go home
    cy.get('body').trigger('keydown', { key: 'Enter', force: true })
  })

  it('Then I see the day of the week', () => {
      let note = cy.get('[data-test-id="day-reminder"]')
      note.should('exist')
      note.invoke('text').should('match', /It is (Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)./)
  })
})
