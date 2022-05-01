/// <reference types="cypress" />
//add filters to a saved search and save as existing search
//add filters to a saved search and save as a new search
context('save as existing save search or new save search', () => {
    beforeEach(() => {
        cy.visit('/',{retryOnNetworkFailure :true})
        cy.signIn()
    })
  
    describe('save as existing save search or new save search', () => {
        it('save as existing save search', () => {
            cy.typeahead('#homepage-searchbar','Troy','#react-autowhatever-1-section-0-item-0 > .p2')
            cy.url().should('include', '/mi/troy')
            cy.updateSaveSearch()
        })
        it('save as a new save search with a new name', () => {
            cy.typeahead('#homepage-searchbar','Detroit','#react-autowhatever-1-section-0-item-0 > .p2')
            cy.url().should('include', '/mi/detroit')
            cy.updateSaveSearch()
        })
    })
})
  
