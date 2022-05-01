/// <reference types="cypress" />
context('faving to default folder and verify mls disclaimer on fave landing/collection pages', () => {
    beforeEach(() => {
      cy.visit('/',{retryOnNetworkFailure :true})
      cy.signIn();
      cy.typeahead('#homepage-searchbar','Troy','#react-autowhatever-1-section-0-item-0 > .p2')
      cy.url().should('include', '/troy')
      cy.get('#header-nav-faves').should('be.visible')
    })

    it('fave the first listing from dynamic homepage ', () => {
        cy.get('.app-header__logo-text').click() //pre-condition
        cy.url().should('include', 'rockethomes.com') //pre-condition
        cy.get('#header-nav-link-faves').should('be.visible') //pre-condition
        cy.faving('#homepage-homes-in-carousel > div>a>div:nth-child(1)>h4>span:nth-child(1)',
        '#homepage-homes-in-carousel > div>a> .pt-24 > .items-center > :nth-child(2)',
        '#homepage-homes-in-carousel > div>a>div:nth-child(1)>div',
        '#header-nav-link-faves');
    })

    it('fave the first listing from location page ', () => {
        cy.faving('#location-list-view>div>div>div>:nth-child(1)> .dBlock > :nth-child(2) > .padding16 > .col-xs-8 > .p1',
        '#location-list-view>div>div>div>:nth-child(1)> .dBlock > :nth-child(2) > .paddingB8 > .flex > :nth-child(2)',
        '#location-list-view>div>div>div>:nth-child(1)>.dBlock > [style="width: 313px;"] > .padding8 > .faves-button',
        '#header-nav-faves');
    })

    it('verify faving from a listing page', () => {
        //first line is pre-condition
        cy.get('#location-list-view>div>div>:nth-child(1) .height100 > [style="overflow-x: hidden;"] > .react-swipeable-view-container > [aria-hidden="false"] > .width100 > img').click()
        cy.wait(3000)
        cy.faving('#listing-address-street',
        '#listing-facts-mls',
        '#listing-address-faves-button > button',
        '#header-nav-faves');
    })
/*
    // This is to be revisited. similar homes section is not always available
    it('verify faving from a listing page similar homes section', () => {
        //first line is pre-condition
        cy.get('#location-list-view>div>div>:nth-child(1) .height100 > [style="overflow-x: hidden;"] > .react-swipeable-view-container > [aria-hidden="false"] > .width100 > img').click()
        cy.faving('#section-similar-active > div > div > div > div > div > div > div > div:nth-child(1) > div > div:nth-child(1)>a> [style="height: 190px;"] > .bottom-0 > .font-medium',
        '#section-similar-active > div > div > div > div > div > div > div > div:nth-child(1) > div > div:nth-child(1)>a> .pt-24 > .items-center > :nth-child(2)',
        '#section-similar-active > div > div > div > div > div > div > div > div:nth-child(1) > div > div:nth-child(1)>a> div:nth-child(1) > div > button',
        '#header-nav-faves');
    })
*/
    it('fave the first listing on trend page Newest Listings section ', () => {
        cy.get('.border > .w-col-5').click() //first line is pre-condition
        cy.faving('#trends-whats-available-listings-carousel>div>a> [style="height:190px"] > .p4 > .font-medium',
        '#trends-whats-available-listings-carousel>div>a> .pt-24 > .items-center > :nth-child(2)',
        '#trends-whats-available-listings-carousel>div>a> [style="height:190px"] > .right-0.top-0 > .relative',
        '#header-nav-link-faves');
    })
})