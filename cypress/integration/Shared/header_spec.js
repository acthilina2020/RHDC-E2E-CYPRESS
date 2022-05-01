/// <reference types="cypress" />
// verifying the header
describe('header test cases', () => {
    it('Verifying the header on home page', () => {
        cy.header('/') 
        cy.logout()
        cy.get('#header-nav-sign-up').click() // sign up button
        cy.get('#create-account-first-name').should('be.visible')
        cy.get('#create-account-submit').should('be.visible')
    })
})