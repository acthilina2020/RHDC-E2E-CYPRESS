/// <reference types="cypress" />
// verifying buy page
describe('buy page test cases', () => {
    before(() => {
        cy.visit('/buy',{retryOnNetworkFailure :true})
    })

    it('Verifying buy page', () => {
        cy.url().should('include', '/buy')
        cy.get('#buy-page-hero-text').should('be.visible')
        cy.get('#buy-page-selling-section-cta').click()
        cy.url().should('include', '/sell')
    })
})