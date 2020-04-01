/// <reference types="cypress" />

const fakeLocation = require("../../support/fakeLocation")

context('Given I am on the home page', () => {
    const france = fakeLocation(48, 2)
    beforeEach(() => {
        cy.server()
        cy.route(
            "**/.netlify/**/weather/forecast*",
            { summary: 'charming' }
        ).as('getWeather')
        cy.visit('', france)
        cy.get('body').trigger('keydown', { key: 'Enter', force: true })
    })
    describe('When I look at the home page', () => {
        it('Then I see the current weather conditions', () => {
            cy.wait('@getWeather').then(() => {
                cy.get("[data-test-id='weather']")
                    .should('exist')
                    .invoke('text')
                    .should('equal', "Forecast: charming.")
            })
        })
    })
})