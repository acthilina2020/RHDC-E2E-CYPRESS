/// <reference types="cypress" />
describe('rocket homes listing page', () => {
    beforeEach(() => {
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

    it('listing page visual testing', () => {
        cy.visit('/mi/troy',{retryOnNetworkFailure :true})
        cy.url().should('include', '/troy')
        cy.get('#location-list-view>div>div>:nth-child(1) .height100 > [style="overflow-x: hidden;"] > .react-swipeable-view-container > [aria-hidden="false"] > .width100 > img').click({ force: true })
        cy.wait(2000)
        cy.get('#section-similar-active').scrollIntoView()
        cy.wait(3000)
        cy.eyesCheckWindow()
    })
})