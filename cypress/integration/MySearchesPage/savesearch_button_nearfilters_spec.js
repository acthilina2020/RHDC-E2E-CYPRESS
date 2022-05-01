/// <reference types="cypress" />
//verify saved search with the button next to the filters
//verify for (city, zip code, county, Neighborhood, school, Homes near address not listed)
context('verify saved search with the button next to the filters for different location types', () => {
    beforeEach(() => {
        cy.visit('/',{retryOnNetworkFailure :true})
        cy.signIn()
    })
  
    describe('saved search with the button next to the filters', () => {
        it('saved search for a city', () => {
            cy.typeahead('#homepage-searchbar','Troy','#react-autowhatever-1-section-0-item-0 > .p2');
            cy.url().should('include', '/mi/troy')
            cy.basicSaveSearch('#location-filter-save-search');
        })

        it('saved search for a zip code', () => {
            cy.typeahead('#homepage-searchbar','48009','#react-autowhatever-1-section-0-item-0 > .p2');
            cy.url().should('include', '/mi/48009')
            cy.basicSaveSearch('#location-filter-save-search');
        })

        it('saved search for a county', () => {
            cy.typeahead('#homepage-searchbar','Wayne county','#react-autowhatever-1-section-0-item-0 > .p2');
            cy.url().should('include', '/mi/wayne-county')
            cy.basicSaveSearch('#location-filter-save-search');
        })

        it('saved search for a Neighborhood', () => {
            cy.typeahead('#homepage-searchbar','Indian Village','#react-autowhatever-1-section-0-item-0 > .p2');
            cy.url().should('include', '/mi/indian-village')
            cy.basicSaveSearch('#location-filter-save-search');
        })

        it('saved search for a school', () => {
            cy.typeahead('#homepage-searchbar','Cody High School','#react-autowhatever-1-section-0-item-0 > .p2');
            cy.url().should('include', '/mi/cody-high-school')
            cy.basicSaveSearch('#location-filter-save-search');
        })

        it('saved search for a homes near address not listed', () => {
            cy.typeahead('#homepage-searchbar','3795 Live Oak Blvd, Delray Beach, FL','#react-autowhatever-1-section-0-item-0 > .p2');
            cy.basicSaveSearch('#location-filter-save-search');
        })
    })
})
  
