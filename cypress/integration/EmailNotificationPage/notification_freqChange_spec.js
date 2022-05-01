/// <reference types="cypress" />
//verify saved search on email notification page
//update the frequesncy and verify the changes
//verify Turn off all saved searches button
//then delete the saves search
context('verify email notification page', () => {
    beforeEach(() => {
        cy.visit('/',{retryOnNetworkFailure :true}) 
        cy.signIn()
        cy.typeahead('#homepage-searchbar','Troy','#react-autowhatever-1-section-0-item-0 > .p2')
        cy.url().should('include', '/mi/troy')
        // creating a saved search
        cy.get('#location-filter-save-search').click({ force: true }) // click on save search button
        cy.get('.toggle-options > :nth-child(1)').click()
        cy.get('.save-search__search-content > :nth-child(1) > .btn').click() // click on the green button to save
        cy.get('.paddingX8 > div > .width100 > .noWrap').should('have.text', 'Search Saved') // verify the search is saved
        cy.get('#header-nav-account-toggle').click() // click on the toggle
        cy.xpath('//a[@id="header-nav-dropdown-notification"]').click() // click on email notification
        cy.get('.h5').should('have.text', 'Troy, MI') // verify location name of the save search on email notification page
    })
  
    describe('email notification page test cases', () => {
        it('change the frequencies and verify', () => {
            cy.get('.selected').invoke('text').should('contain', 'Instant') // verify Instant is selected
            cy.get('.toggle-options > :nth-child(3)').click() // click on Never
            cy.wait(1000)
            cy.reload()
            cy.get('.selected').invoke('text').should('contain', 'Never')// verify Never is selected
            cy.get('.toggle-options > :nth-child(2)').click() // click on Daily
            cy.wait(1000)
            cy.reload()
            cy.get('.selected').invoke('text').should('contain', 'Daily')// verify Daily is selected
            cy.get('.btn').click() // click on Turn off all Saved Searches
            cy.wait(1000)
            cy.reload()
            cy.get('.selected').invoke('text').should('contain', 'Never')// verify Never is selected
            cy.get('#header-nav-searches').click({ force: true })
            cy.url().should('include', 'rockethomes.com/searches')
            // get the delete button
            cy.get('#my-searches-page > section.section-container-open > div.section-content-open.overflow-hidden > div > div > div > div > button').click({ force: true })
            cy.wait(1000)
            cy.get('.bg-green').click({ force: true })
            cy.wait(3000)
            cy.reload()
            // verify the saved search is deleted
            cy.get('#my-searches-page > section.section-container-open > div.section-content-open.overflow-hidden > div > div > div > div>a').should('not.be.visible')
        })
    })
})
  





