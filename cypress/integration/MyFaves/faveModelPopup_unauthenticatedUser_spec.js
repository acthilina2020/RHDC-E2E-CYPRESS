/// <reference types="cypress" />
//Openning home page and verify the title
context('verify fave modal popup for unauthenticated user', () => {
    beforeEach(() => {
        cy.visit('/mi/troy',{retryOnNetworkFailure :true})
        cy.url().should('include', '/troy')
    })
  
    it('fave modal popup for unauthenticated user on location page', () => {
        cy.faveUnauthenticatedUser('#location-list-view>div>div>div>:nth-child(1)>.dBlock > [style="width: 313px;"] > .padding8 > .faves-button')
    })

    it('fave modal popup for unauthenticated user on listing page', () => {
        //first line is pre-condition
        cy.get('#location-list-view>div>div>:nth-child(1) .height100 > [style="overflow-x: hidden;"] > .react-swipeable-view-container > [aria-hidden="false"] > .width100 > img').click()
        cy.faveUnauthenticatedUser('#listing-address-faves-button > button')
    })

    it('fave modal popup for unauthenticated user on trend page Newest Listings section', () => {
        cy.get('.border > .w-col-5').click()
        cy.get('#trends-whats-available-listings-carousel>div>a> [style="height:190px"] > .right-0.top-0 > .relative').first().click()
        cy.get('.pb-8 > #signup-button').should('be.visible')
        cy.get('b > #signin-button').should('be.visible')
    })
})
  
