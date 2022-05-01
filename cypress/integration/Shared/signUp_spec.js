/// <reference types="cypress" />
// verifying sign up as a new user
describe('verifying sign up as a new user', () => {
    it('sign up from home page and login as the new user', () => {
        cy.signup('/') 
    })
})