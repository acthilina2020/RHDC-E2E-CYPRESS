/// <reference types="cypress" />
//click on save search button next to filters and verify the pop up for unauthenticated user
//click on save search button after fifth listing and verify the pop up unauthenticated user
context('unauthenticated user saved search test cases', () => {
    beforeEach(() => {
        cy.visit('/',{retryOnNetworkFailure :true})
        cy.typeahead('#homepage-searchbar','Troy','#react-autowhatever-1-section-0-item-0 > .p2')
        cy.url().should('include', '/mi/troy')
    })
  
    describe('save search buttons for unauthenticated user', () => {
        it('button next to filters for unauthenticated user', () => {
            cy.ssUnauthenticated('#location-filter-save-search')
        })

        it('button after fifth listing for unauthenticated user', () => {
            cy.ssUnauthenticated('.w-full > .btn')
        })
    })
})
  
