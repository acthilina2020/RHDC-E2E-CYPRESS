/// <reference types="cypress" />
context('creating a new fav folder and deleting', () => {
    beforeEach(() => {
      cy.visit('/',{retryOnNetworkFailure :true})
      cy.signIn()
    })
  
    it('create a new fav folder from fave landing page and delete', () => {
        cy.get('#header-nav-link-faves').click()
        cy.createFaveFolder('.flex-wrap > :nth-child(2) > .block',
        '.ReactModal__Content > div > .inline-edit',
        '.ReactModal__Content > .inline-block'
        );
    })
  
    it('create a new fav folder from fave collection page and delete', () => {
      cy.typeahead('#homepage-searchbar','Troy','#react-autowhatever-1-section-0-item-0 > .p2'); 
      cy.get('#location-list-view>div>div>div>:nth-child(1)>.dBlock > [style="width: 313px;"] > .padding8 > .faves-button').first().click()
      cy.wait(1000)
      cy.reload()
      cy.get('#header-nav-faves').click()
      cy.reload()
      cy.wait(1000)
      cy.get('.p-32 > .border').click()
      cy.createFaveFolder('.hoverTransition > .height100',
      '.inline-edit',
      '.btn'
      )
      cy.get('.p-32 > .border').click()
      cy.get('.faves-button').click() //Removing the faved listing
      cy.wait(2000)
      cy.reload()
      cy.wait(2000)
      cy.get('[aria-hidden="false"] > .width100 > img').should('not.be.visible')
    })
})
  
  
  