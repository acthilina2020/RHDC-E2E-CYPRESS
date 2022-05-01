/// <reference types="cypress" />
//verify saved search for (instant, daily, never)
//verify saved search is created
//verify saved search appears on email notification page
//verify saved search link from notification page and verify it's landing on the correct page
//Modify the save search name and verify the change on my searches page
//verify deletion of saved search on my searches page
context('verify advanced saved search test cases', () => {
    beforeEach(() => {
        cy.visit('/',{retryOnNetworkFailure :true})
        cy.signIn()
        cy.typeahead('#homepage-searchbar','Troy','#react-autowhatever-1-section-0-item-0 > .p2')
        cy.url().should('include', '/mi/troy')
    })
  
    describe('advanced saved search test cases', () => {
        it('saved search for Instant', () => {
            cy.advanceSaveSearch('.toggle-options > :nth-child(1)')
        })

        it('saved search for Daily', () => {
            cy.advanceSaveSearch('.toggle-options > :nth-child(2)')
        })

        it('saved search for Never', () => {
            cy.advanceSaveSearch('.toggle-options > :nth-child(3)')
        })
    })
})
  
