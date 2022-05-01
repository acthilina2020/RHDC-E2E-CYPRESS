/// <reference types="cypress" />
//creating a recent search for city,zip code,county,Neighborhood,school
//homes near address not listed and Unsupported location
//deleting recent searches
//creating saved search from each recent search
context('creating and deleting recent searches', () => {
    beforeEach(() => {
      cy.visit('/',{retryOnNetworkFailure :true})
      cy.signIn()
    })
  
    it('create a save search from recent search for city', () => {
        cy.typeahead('#homepage-searchbar','Troy','#react-autowhatever-1-section-0-item-0 > .p2')
        cy.clearRecentSearches()
        cy.typeahead('.react-autosuggest__input','Troy','#react-autowhatever-1-section-0-item-0 > .p2')
        cy.wait(2000)
        cy.verifyRecentSearches('Troy, MI')
    })

    it('create a save search from recent search for zip code', () => {
        cy.typeahead('#homepage-searchbar','48009','#react-autowhatever-1-section-0-item-0 > .p2')
        cy.clearRecentSearches()
        cy.typeahead('.react-autosuggest__input','48009','#react-autowhatever-1-section-0-item-0 > .p2')
        cy.wait(2000)
        cy.verifyRecentSearches('48009, MI')
    })

    it('create a save search from recent search for county', () => {
        cy.typeahead('#homepage-searchbar','Wayne county','#react-autowhatever-1-section-0-item-0 > .p2')
        cy.clearRecentSearches()
        cy.typeahead('.react-autosuggest__input','Wayne county','#react-autowhatever-1-section-0-item-0 > .p2')
        cy.wait(2000)
        cy.verifyRecentSearches('Wayne County, MI')
    })

    it('create a save search from recent search for Neighborhood', () => {
        cy.typeahead('#homepage-searchbar','Indian Village','#react-autowhatever-1-section-0-item-0 > .p2')
        cy.clearRecentSearches()
        cy.typeahead('.react-autosuggest__input','Indian Village','#react-autowhatever-1-section-0-item-0 > .p2')
        cy.wait(2000)
        cy.verifyRecentSearches('Indian Village, MI')
    })

    it('create a save search from recent search for school', () => {
        cy.typeahead('#homepage-searchbar','Cody High School','#react-autowhatever-1-section-0-item-0 > .p2')
        cy.clearRecentSearches()
        cy.typeahead('.react-autosuggest__input','Cody High School','#react-autowhatever-1-section-0-item-0 > .p2')
        cy.wait(2000)
        cy.verifyRecentSearches('Cody High School, MI')
    })

    it('create a save search from recent search for homes near address not listed', () => {
        cy.typeahead('#homepage-searchbar','3795 Live Oak Blvd, Delray Beach, FL','#react-autowhatever-1-section-0-item-0 > .p2')
        cy.clearRecentSearches()
        cy.typeahead('.react-autosuggest__input','3795 Live Oak Blvd, Delray Beach, FL','#react-autowhatever-1-section-0-item-0 > .p2')
        cy.wait(2000)
        cy.verifyRecentSearches('Homes near 3795 Live Oak Blvd, Delray Beach, FL 33445')
    })

    it('create a save search from recent search for Unsupported location', () => {
        cy.typeahead('#homepage-searchbar','Dallas, TX','#react-autowhatever-1-section-0-item-0 > .p2')
        cy.clearRecentSearches()
        cy.typeahead('.react-autosuggest__input','Dallas, TX','#react-autowhatever-1-section-0-item-0 > .p2')
        cy.wait(2000)
        cy.verifyRecentSearches('Dallas, TX')
    })
})
  
  
  