/// <reference types="cypress" />
describe('rocket homes location page', () => {
    beforeEach(() => {
        cy.eyesOpen({
            appName: 'Rocket Homes',
            browser: [
                // {width: 1440, height: 900, name: 'chrome'}
                {width: 1440, height: 900, name: 'ie11'}
                // {width: 1440, height: 900, name: 'safari'},
                // {width: 1440, height: 900, name: 'firefox'}
            ]
        })
    })
    
    afterEach(() => {
    cy.eyesClose()
    })

    it('location page visual testing', () => {
        cy.visit('/mi/troy',{retryOnNetworkFailure :true})
        cy.url().should('include', '/troy')
        cy.wait(5000)
        cy.get('#location-list-view>div>div>:nth-child(1) .height100 > [style="overflow-x: hidden;"] > .react-swipeable-view-container > [aria-hidden="false"] > .width100 > img').scrollIntoView()
        cy.wait(1000)
        cy.get('#location-list-view>div>div>:nth-child(3)').scrollIntoView()
        cy.wait(1000)
        cy.get('#location-list-view>div>div>:nth-child(6)').scrollIntoView()
        cy.wait(1000)
        cy.get('#location-list-view>div>div>:nth-child(9)').scrollIntoView()
        cy.wait(1000)
        cy.get('#location-list-view>div>div>:nth-child(12)').scrollIntoView()
        cy.wait(1000)
        cy.get('#location-list-view>div>div>:nth-child(15)').scrollIntoView()
        cy.wait(1000)
        cy.get('#location-list-view>div>div>:nth-child(18)').scrollIntoView()
        cy.wait(1000)
        cy.get('#location-list-view>div>div>:nth-child(21)').scrollIntoView()
        cy.wait(1000)
        cy.get('#location-list-view>div>div>:nth-child(23)').scrollIntoView()
        cy.wait(1000)
        cy.get('#location-list-view>div>div>:nth-child(25)').scrollIntoView()
        cy.wait(1000)
        cy.get('#location-trend-card-title').scrollIntoView()
        cy.wait(1000)
        cy.eyesCheckWindow()
    })
})