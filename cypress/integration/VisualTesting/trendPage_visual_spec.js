/// <reference types="cypress" />
describe('rocket homes trend page', () => {
    before(() => {
        cy.eyesOpen({
            appName: 'Rocket Homes',
            browser: [
                // {width: 1440, height: 900, name: 'chrome'},
                {width: 1440, height: 900, name: 'ie11'}
                // {width: 1440, height: 900, name: 'safari'},
                // {width: 1440, height: 900, name: 'firefox'}
            ]
        })
    })

    afterEach(() => {
    cy.eyesClose()
    })

    it('trend page visual testing', () => {
        cy.visit('/',{retryOnNetworkFailure :true})
        cy.signIn()
        cy.wait(1000)
        cy.typeahead('#homepage-searchbar','Troy','#react-autowhatever-1-section-0-item-0 > .p2')
        cy.get('.border > .w-col-5').click()
        cy.wait(3000)
        cy.get('#noteworthy-homes-card > div').scrollIntoView()
        cy.wait(2000)
        cy.get('#asking-vs-sold-card > div.flex-grow.w-full').scrollIntoView()
        cy.wait(2000)
        cy.get('#home-sale-times-card > div.flex-grow.w-full').scrollIntoView()
        cy.wait(2000)
        cy.get('#trends-whats-available-listings-carousel > div').scrollIntoView()
        cy.wait(2000)
        cy.eyesCheckWindow()
    })
})