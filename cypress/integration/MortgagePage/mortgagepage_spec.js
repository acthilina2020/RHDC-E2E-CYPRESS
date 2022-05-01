/// <reference types="cypress" />
// verifying mortgage page
describe('mortgage page test cases', () => {
    before(() => {
        cy.visit('/mortgage',{retryOnNetworkFailure :true})
    })

    it('Verifying mortgage page', () => {
        cy.url().should('include', '/mortgage')
        cy.get('#mortgage__hero-card').should('be.visible')
        cy.get('.flex-shrink > .flex > .inline-block').should('have.attr', 'href')
        .then((hrefValue)=> {
        const getStartedToday = hrefValue
        expect(getStartedToday).equal('https://www.quickenloans.com/l/progpi?qlsource=RHM_RHMBttn2.RcktHmsMor')
        })
        cy.get('#mortgage-page > section.w-full.bg-cover.py-32.text-center.text-white > div > a').should('have.attr', 'href')
        .then((hrefValue)=> {
        const getApproved = hrefValue
        expect(getApproved).equal('https://www.quickenloans.com/l/progpi?qlsource=RHM_RHMBttn3.RcktHmsMor')
        })
    })
})