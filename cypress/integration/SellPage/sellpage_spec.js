/// <reference types="cypress" />
// verifying sell page
describe('sell page test cases', () => {
    before(() => {
        cy.visit('/sell',{retryOnNetworkFailure :true})
    })

    it('Verifying sell page', () => {
        cy.url().should('include', '/sell')
        cy.get('#sell-page-hero-image-container').should('be.visible')
        cy.get('#sell-page-lead-form-form').should('be.visible')
        cy.get('#sell-page-contact-section-container-contact-us').should('be.visible')
    })
})