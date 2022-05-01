/// <reference types="cypress" />
//Openning home page and verify the title
context('static_homepage', () => {
    beforeEach(() => {
        cy.visit('/',{retryOnNetworkFailure :true})
    })
  
    it('cy.url() - Opening browser and navigating to Rocket Homes page', () => {
        cy.url().should('include', 'rockethomes.com')
        cy.get('#header-nav-sign-in').should('be.visible')
      })

    it('cy.title() - Verifying the home page title', () => {
        cy.title().should('include', 'Find Your Dream Home | Get a Real Estate Agent | Rocket Homes')
      })

    it('Verifying static homepage three green buttons', () => {
    cy.get('#homepage-marketing-links-buy > .inline-block').click()
    cy.get('#location-list-view-header').should('be.visible')
    cy.go('back')
    cy.get('#homepage-marketing-links-sell > .inline-block').click()
    cy.url().should('include', '/buy')
    cy.title().should('include', 'Buy with an Agent | Rocket Homes')
    cy.go('back')
    cy.get('#homepage-marketing-links-mortgage > .inline-block').should('have.attr', 'href').and('equal', 'https://www.quickenloans.com/l/progpi?qlsource=RHM_HomPgCTA.RcktHmsCom')
    })

    it('verifying trend section on static home page', () => {
        //click on the search trend reports button
        cy.get('#homepage-trend-report > .container > .pt-32 > .mb-48 > .inline-block').click()
        cy.url().should('include', '/real-estate-trends/mi/detroit')
        cy.get('#market-conditions-card-auth-wall-signup-button') // sign up for free on pop up displayed
        cy.go('back')
        // what are local market conditions box
        cy.get('#homepage-trend-report > .container > .pt-32 > .homepage-report__bottom > .justify-between > :nth-child(1) > .bg-white > a > picture > .block').click()
        cy.url().should('include', '/real-estate-trends/mi/detroit')
        cy.get('#market-conditions-card-auth-wall-signup-button') // sign up for free on pop up displayed
        cy.go('back')
        // how are home prices trending box
        cy.get('#homepage-trend-report > .container > .pt-32 > .homepage-report__bottom > .justify-between > :nth-child(2) > .bg-white > a > picture > .block').click()
        cy.url().should('include', '/real-estate-trends/mi/detroit')
        cy.get('#market-conditions-card-auth-wall-signup-button') // sign up for free on pop up displayed
        cy.go('back')
        // how fast are homes selling trending box
        cy.get('#homepage-trend-report > .container > .pt-32 > .homepage-report__bottom > .justify-between > :nth-child(3) > .bg-white > a > picture > .block').click()
        cy.url().should('include', '/real-estate-trends/mi/detroit')
        cy.get('#market-conditions-card-auth-wall-signup-button') // sign up for free on pop up displayed
        cy.go('back')
    })

    it('Verifying property report section on static home page', () => {
        // search your property report button
        cy.get('#homepage-property-report > .container > .pt-32 > .mb-48 > .inline-block').click()
        cy.url().should('include', '/how-much-is-my-home-worth')
        cy.get('#property-hub-search-container').should('be.visible')
        cy.go('back')
        // how much could you sell for box
        cy.get('#property-card-0 > .bg-white > a > picture > .block').click()
        cy.url().should('include', '/how-much-is-my-home-worth')
        cy.get('#property-hub-search-container').should('be.visible')
        cy.go('back')
        // what trends are happening nearby box
        cy.get('#property-card-1 > .bg-white > a > picture > .block').click()
        cy.url().should('include', '/how-much-is-my-home-worth')
        cy.get('#property-hub-search-container').should('be.visible')
        cy.go('back')
        // how fast are similar homes selling box
        cy.get('#property-card-2 > .bg-white > a > picture > .block').click()
        cy.url().should('include', '/how-much-is-my-home-worth')
        cy.get('#property-hub-search-container').should('be.visible')
        cy.go('back')
    })

    it('Verifying the lead form & the disclaimer is displayed', () => {
    cy.get('#homepage-contact-section > .flex').should('be.visible') // contact us section
    cy.get('#homepage-contact-section-contact-us').should('be.visible') // contact numbers
    cy.get('#contact-section-disclaimer').should('be.visible') // disclaimer is displayed
    })

    it('Verifying Top Real Estate - States', () => {
        cy.xpath('//a[@href="/michigan"][@class="w-full sm:w-col-6 lg:w-col-4 hover:text-green whitespace-no-wrap truncate p-4"]').click()
        cy.url().should('include', '/michigan')
    })

    it('Verifying Top Real Estate - Cities', () => {
    cy.get('[href="/il/chicago"]').click()
    cy.url().should('include', 'il/chicago')
    })
})
  