/// <reference types="cypress" />
context('listing page type-ahead', () => {
    beforeEach(() => {
      cy.visit('/mi/troy',{retryOnNetworkFailure :true})
      cy.get('#location-list-view>div>div>:nth-child(1) .height100 > [style="overflow-x: hidden;"] > .react-swipeable-view-container > [aria-hidden="false"] > .width100 > img').click()
    })

    it('Verifying type-ahead search for a city', () => {
        cy.typeahead('#auto-suggest-search-bar','Troy','#react-autowhatever-default-section-0-item-0 > .cursorPointer > :nth-child(1) > .width100');
        cy.url().should('include', '/troy')
    })

    it('Verifying type-ahead search for a zip code', () => {
        cy.typeahead('#auto-suggest-search-bar','48009','#react-autowhatever-default-section-0-item-0 > .cursorPointer > :nth-child(1) > .width100');
        cy.url().should('include', '/48009')
    })

    it('Verifying type-ahead search for a county', () => {
        cy.typeahead('#auto-suggest-search-bar','Wayne county','#react-autowhatever-default-section-0-item-0 > .cursorPointer > :nth-child(1) > .width100');
        cy.url().should('include', '/mi/wayne-county')
    })

    it('Verifying type-ahead search for a Neighborhood', () => {
        cy.typeahead('#auto-suggest-search-bar','Indian Village','#react-autowhatever-default-section-0-item-0 > .cursorPointer > :nth-child(1) > .width100');
        cy.url().should('include', '/mi/indian-village')
    })

    it('Verifying type-ahead search for a School', () => {
        cy.typeahead('#auto-suggest-search-bar','Cody High School','#react-autowhatever-default-section-0-item-0 > .cursorPointer > :nth-child(1) > .width100');
        cy.url().should('include', '/mi/cody-high-school')
    })

    it('Verifying type-ahead search for a homes near address not listed', () => {
        cy.typeahead('#auto-suggest-search-bar','3795 Live Oak Blvd, Delray Beach, FL','#react-autowhatever-default-section-0-item-0 > .cursorPointer > :nth-child(1) > .width100');
        cy.get('#map-container > div.mapboxgl-canvas-container.mapboxgl-interactive.mapboxgl-touch-drag-pan.mapboxgl-touch-zoom-rotate > div').should('be.visible')
    })

    it('Verifying type-ahead search for a Unsupported location', () => {
        cy.typeahead('#auto-suggest-search-bar','Dallas, TX','#react-autowhatever-default-section-0-item-0 > .cursorPointer > :nth-child(1) > .width100');
        cy.url().should('include', '/tx/dallas')
    })
})