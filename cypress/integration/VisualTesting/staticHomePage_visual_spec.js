/// <reference types="cypress" />
describe('rocket homes home page', () => {
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

    it('static home page visual testing', () => {
        cy.visit('/',{retryOnNetworkFailure :true})
        cy.wait(4000)
        cy.eyesCheckWindow({
            ignore: [{selector: '#homepage > section.container.mx-auto > section > section'}]
        })
    })
})