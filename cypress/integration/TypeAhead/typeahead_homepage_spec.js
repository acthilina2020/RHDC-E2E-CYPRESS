/// <reference types="cypress" />
context('home page type-ahead', () => {
    beforeEach(() => {
      cy.visit('/',{retryOnNetworkFailure :true})
      cy.url().should('include', 'rockethomes.com')
    })

    it('Verifying type-ahead search for a city', () => {
        cy.typeahead('#homepage-searchbar','Troy','#react-autowhatever-1-section-0-item-0 > .p2');
        cy.url().should('include', '/troy')
    })

    it('Verifying type-ahead search for a zip code', () => {
        cy.typeahead('#homepage-searchbar','48009','#react-autowhatever-1-section-0-item-0 > .p2');
        cy.url().should('include', '/48009')
    })

    it('Verifying type-ahead search for a county', () => {
        cy.typeahead('#homepage-searchbar','Wayne county','#react-autowhatever-1-section-0-item-0 > .p2');
        cy.url().should('include', '/mi/wayne-county')
    })

    it('Verifying type-ahead search for a Neighborhood', () => {
        cy.typeahead('#homepage-searchbar','Indian Village','#react-autowhatever-1-section-0-item-0 > .p2');
        cy.url().should('include', '/mi/indian-village')
    })

    it('Verifying type-ahead search for a School', () => {
        cy.typeahead('#homepage-searchbar','Cody High School','#react-autowhatever-1-section-0-item-0 > .p2');
        cy.url().should('include', '/mi/cody-high-school')
    })

    it('Verifying type-ahead search for a homes near address not listed', () => {
        cy.typeahead('#homepage-searchbar','3795 Live Oak Blvd, Delray Beach, FL','#react-autowhatever-1-section-0-item-0 > .p2');
        cy.get('#map-container > div.mapboxgl-canvas-container.mapboxgl-interactive.mapboxgl-touch-drag-pan.mapboxgl-touch-zoom-rotate > div').should('be.visible')
    })

    it('Verifying type-ahead search for a Unsupported location', () => {
        cy.typeahead('#homepage-searchbar','Dallas, TX','#react-autowhatever-1-section-0-item-0 > .p2');
        cy.url().should('include', '/tx/dallas')
    })
})