/// <reference types="cypress" />
// verifying the footer
describe('footer test cases', () => {
    before(() => {
        cy.visit('/',{retryOnNetworkFailure :true})
        cy.signIn()
    })

    it('Verifying the footer on home page signed in', () => {
        cy.footer('/') 
    })

    it('Verifying the footer on home page unauthenticated user', () => {
        cy.logout()
        cy.footer('/') 
    })
})