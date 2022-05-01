/// <reference types="cypress" />
describe('rocket homes dynamichome page', () => {
    beforeEach(() => {
        cy.eyesOpen({
            appName: 'Rocket Homes',
            browser: [
                //{width: 1440, height: 900, name: 'chrome'}
                {width: 1440, height: 900, name: 'ie11'}
                // {width: 1440, height: 900, name: 'safari'},
                // {width: 1440, height: 900, name: 'firefox'}
            ]
        })
    })
    
    afterEach(() => {
    cy.eyesClose()
    })

    it('dynamic home page visual testing', () => {
        cy.visit('/',{retryOnNetworkFailure :true})
        cy.signIn()
        cy.typeahead('#homepage-searchbar','troy','#react-autowhatever-1-section-0-item-0 > .p2')
        cy.url().should('include', '/troy')
        cy.go('back')
        cy.wait(3000)
        cy.get('.cards-carousel-slider').scrollIntoView()
        cy.wait(3000)
        cy.eyesCheckWindow({
            ignore: [{selector: '#homepage > section.container.mx-auto > section > section'}]
        })
    })
})