Cypress.Commands.add('signIn', () => {
  cy.get('#header-nav-sign-in').click({ force: true })
  cy.get('#username').type('xxxxxxxx')
  cy.get('#password').type('xxxxxxxx')
  cy.get('#sign-in-submit > button').click()
  cy.wait(2000)
})

Cypress.Commands.add('logout', () => {
  cy.get('#header-nav-account-toggle').click()
  cy.get('#header-nav-dropdown-logout').click()
  cy.get('#header-nav-sign-in').should('be.visible')
})

Cypress.Commands.add('typeahead', (searchbar,location,firstItem) => {
  cy.wait(2000)
  cy.get(searchbar).clear({force: true})
  cy.get(searchbar).type(location)
  cy.request('/api/v1/search-suggestions?input=' + location + '&type=all')
  .its('body')
  .then((val) => {
      if (val) {
        cy.request('/api/v1/search-suggestions?input=' + location + '&type=all')
        cy.get(searchbar).click()
        cy.get(firstItem).click({ force: true })
        cy.wait(2000)
        cy.reload()
        cy.wait(2000)
      }
  })
  if(location!='Dallas, TX') {
      cy.get('#location-list-view-header').should('be.visible')
  }
})
//faving to default folder and verify
Cypress.Commands.add('faving', (e_StreetName,e_MlsNumber,faveIcon,faveHeaderLink) => {
  cy.get(e_StreetName).first().invoke('text').then((expectedStreetName) => {
    cy.get(e_MlsNumber).first().invoke('text').then((expectedMlsNumber) => {
      cy.get(faveIcon).first().click() // fave the first listing
      cy.wait(3000)
      cy.get(faveHeaderLink).click({ force: true })
      cy.url().should('include', '/faves')
      cy.wait(2000)
      cy.get('.p-32 > .bg-background').invoke('text').then((numHomes) => {
          // this returns a string with the element's InnerHTML
          expect(numHomes).equal('1 Homes')
      })
      cy.get('#mls-disclaimer-section > .p4').should('be.visible') // verify mls disclaimer on fave landing page
      cy.get('.p-32 > .border').click()
      cy.wait(2000)
      cy.get('#collection-list-view-header > .col-xs-6').invoke('text').then((numFaves) => {
          // this returns a string with the element's InnerHTML
          expect(numFaves).equal('1 faved home')
      })
      cy.get('.col-xs-8 > .p1').invoke('text').should((actualStreetName) => {
        expect(expectedStreetName).to.contain(actualStreetName) // verify the listing address is the same
      })
      cy.get('.paddingB8 > .flex > :nth-child(2)').invoke('text').should((actualMlsNumber) => {
      expect(actualMlsNumber).to.contain(expectedMlsNumber) // verify listing mls number is the same
      })
      cy.get('#mls-disclaimer-section').should('be.visible') // verify mls disclaimer on fave collection page
      cy.get('.faves-button').click({ force: true }) //Removing the faved listing
      cy.wait(2000)
      cy.reload()
      cy.wait(2000)
      cy.get('[aria-hidden="false"] > .width100 > img').should('not.be.visible') // verify the faved listing is now removed
    })
  })
})

//Creating a custom fave folder
Cypress.Commands.add('createFaveFolder', (clickToCreate,clickInLine,createNewFolder) => {
  cy.get(clickToCreate).click()
  cy.get(clickInLine).type('cypressTest')
  cy.get(createNewFolder).click()
  cy.get('.card')
  .should(($p0) => {
    expect($p0).to.have.length(3)
  })
  cy.get('#my-faves-page > div > div:nth-child(1) > div > button').click({ force: true }) // deleting the fave folder
  cy.get('.bg-green').click({ force: true })
  cy.wait(3000)
  cy.reload()
  cy.get('.card')
  .should(($p0) => {
    expect($p0).to.have.length(2)
  })
})

//Verifying fave modal pop up for unauthenticated user
Cypress.Commands.add('faveUnauthenticatedUser', (faveIcon) => {
  cy.get(faveIcon).first().click({ force: true }) // try to fave the first listing
  cy.get('#signup-button').should('be.visible') //modal signup button
  cy.get('#signin-button').should('be.visible') //modal sign in button
})

//Basic save search
Cypress.Commands.add('basicSaveSearch', (saveSearchButton) => {
  cy.wait(1000)
  cy.get(saveSearchButton).click()
  cy.get('.inline-edit').invoke('val').then((popUpsearchName) => {
    //popUpsearchName.text() // get the text of the saved search on the pop up
    cy.get('.save-search__search-content > :nth-child(1) > .btn').click()
    cy.wait(3000)
    cy.reload()
    cy.get('#header-nav-searches').click()
    cy.url().should('include', 'rockethomes.com/searches')
    cy.reload()
    cy.wait(2000)
    cy.get('#my-searches-page > section.section-container-open > div.section-content-open.overflow-hidden > div > div > div > div>a').should('be.visible')
    cy.get('#my-searches-page > section.section-container-open > div.section-content-open.overflow-hidden > div > div > div > div > div>div>input').invoke('val').then((searchName) => {
      //searchName.text() // get the text of the search name
      expect(searchName).equal(popUpsearchName)
    })
  })
  // get the delete button
  cy.get('#my-searches-page > section.section-container-open > div.section-content-open.overflow-hidden > div > div > div > div > button').click({ force: true })
  cy.wait(1000)
  cy.get('.bg-green').click({ force: true })
  cy.wait(2000)
  cy.reload()
  // verify the saved search is deleted
  cy.get('#my-searches-page > section.section-container-open > div.section-content-open.overflow-hidden > div > div > div > div>a').should('not.be.visible')
})

//Advanced save search
Cypress.Commands.add('advanceSaveSearch', (frequency) => {
  cy.wait(2000)
  cy.get('#location-filter-save-search').click() // click on save search button
  cy.get(frequency).click() // click on given freq button
  cy.get(frequency).invoke('text').then((freqbtn) => {
      // get the text of the frequency button
    cy.get('.inline-edit').invoke('val').should('contain', 'Troy, MI') // default location name is Troy,MI
    cy.get('.save-search__search-content > :nth-child(1) > .btn').click() // click on the green button to save
    cy.wait(3000)
    cy.reload()
    cy.get('.paddingX8 > div > .width100 > .noWrap').should('have.text', 'Search Saved') // verify the search is saved
    cy.get('#header-nav-account-toggle').click() // click on the toggle
    cy.xpath('//a[@id="header-nav-dropdown-notification"]').click() // click on email notification
    cy.reload()
    cy.wait(1000)
    cy.get('.h5').should('have.text', 'Troy, MI') // verify location name of the save search on email notification page
    cy.get('.selected').invoke('text').then((notififreqInstant) => {
      // get the text of the frequency button that's selected on the notification page
      expect(notififreqInstant).equal(freqbtn) // verify the selected button's text is equal to the freq selected when the search was saved
    })
  })  
  cy.get('.notification-item > .alignMiddle').click() // click on the saved search link on notification page
  cy.get('.paddingX8 > div > .width100 > .noWrap').should('have.text', 'Search Saved') // verify the search is still saved
  cy.url().should('include', '/mi/troy')
  cy.get('#header-nav-searches').click() // go to my searches page
  cy.url().should('include', 'rockethomes.com/searches')
  cy.reload()
  cy.wait(2000)
  // verify the save search is visible 
  cy.get('#my-searches-page > section.section-container-open > div.section-content-open.overflow-hidden > div > div > div > div>a').should('be.visible')
  // default location name is Troy,MI
  cy.get('#my-searches-page > section.section-container-open > div.section-content-open.overflow-hidden > div > div > div > div > div>div>input').invoke('val').should('contain', 'Troy, MI') 
  cy.get('#my-searches-page > section.section-container-open > div.section-content-open.overflow-hidden > div > div > div > div > div>div>input').clear({force: true})
  // modify name
  cy.get('#my-searches-page > section.section-container-open > div.section-content-open.overflow-hidden > div > div > div > div > div>div>input').type('cypressUpdated') 
  cy.get('.h3').click() // click away to save the new name
  // verify the name is updated with the new name
  cy.get('#my-searches-page > section.section-container-open > div.section-content-open.overflow-hidden > div > div > div > div > div>div>input').invoke('val').should('contain', 'cypressUpdated') 
  // get the delete button
  cy.get('#my-searches-page > section.section-container-open > div.section-content-open.overflow-hidden > div > div > div > div > button').click({ force: true })
  cy.wait(1000)
  cy.get('.bg-green').click({ force: true })
  cy.wait(3000)
  cy.reload()
  // verify the saved search is deleted
  cy.get('#my-searches-page > section.section-container-open > div.section-content-open.overflow-hidden > div > div > div > div>a').should('not.be.visible')
})

//Update save search with filters and save as a new search
Cypress.Commands.add('updateSaveSearch', () => {
  cy.get('#location-filter-save-search').click()
  cy.get('.save-search__search-content > :nth-child(1) > .btn').click() // click on the green button to save the search
  cy.wait(3000)
  cy.reload()
  cy.get('.paddingX8 > div > .width100 > .noWrap').should('have.text', 'Search Saved') // verify the search is saved
  cy.get('#location-filter-beds-plus').dblclick({ force: true }) // add two beds
  cy.wait(1000)
  cy.get('#location-filter-baths-plus').dblclick({ force: true }) // add two baths
  cy.wait(1000)
  cy.get('#location-filter-save-search').should('have.text', 'Save Search') // verifying the save search button changed to 'Save Search'
  cy.get('#location-filter-save-search').click()
  // get the text of the search name
  cy.get('.selected > .overflowHidden').invoke('text').then((inlineEdit) => {
    if(inlineEdit==='Troy, MI') {
      cy.get('.save-search__search-info > .btn').click() // click on the green button to save the search
      cy.wait(2000)
      cy.reload()
      cy.get('#header-nav-searches').click()
      cy.url().should('include', 'rockethomes.com/searches')
      cy.reload()
      cy.wait(2000)
      cy.get('#my-searches-page > section.section-container-open > div.section-content-open.overflow-hidden > div > div > div > div>a').should('be.visible')
      cy.get('#my-searches-page > section.section-container-open > div.section-content-open.overflow-hidden > div > div > div > div > div > div.flex-grow.text-center._bg-background.p4.w-auto.mx-auto').invoke('text').then((filtersname) => {
        // get the text of the filters
        expect(filtersname).to.contain('Troy, MI, 2+ beds, 2+ baths, Any Price, Any Size, All Home Type')
      })
      // get the delete button
      cy.get('#my-searches-page > section.section-container-open > div.section-content-open.overflow-hidden > div > div > div > div > button').click({ force: true })
      cy.wait(1000)
      cy.get('.bg-green').click({ force: true })
      cy.wait(3000)
      cy.reload()
      // verify the saved search is deleted
      cy.get('#my-searches-page > section.section-container-open > div.section-content-open.overflow-hidden > div > div > div > div>a').should('not.be.visible')
    } else {
      cy.get('.create > .overflowHidden').click() // click on create a new search link from the pop up
      cy.get('.inline-edit').clear({force: true})
      cy.get('.inline-edit').type('newSaveSearch') // update the name with a new name
      cy.get('.save-search__search-content > :nth-child(1) > .btn').click() // click on the green button to create as a new search
      cy.wait(3000)
      cy.reload()
      cy.get('#header-nav-searches').click()
      cy.url().should('include', 'rockethomes.com/searches')
      cy.reload()
      cy.wait(2000)
      //new search should be visible
      cy.get('#my-searches-page > section.section-container-open > div.section-content-open.overflow-hidden > div > div > div:nth-child(1) > div > div>div:nth-child(1)>input').should('be.visible')
      cy.get('#my-searches-page > section.section-container-open > div.section-content-open.overflow-hidden > div > div > div > div > div > div.flex-grow.text-center._bg-background.p4.w-auto.mx-auto').invoke('text').then((filtersname) => {
        // get the text of the filters of the new search
        expect(filtersname).to.contain('Detroit, MI, 2+ beds, 2+ baths, Any Price, Any Size, All Home Type')
      })
      // get the delete button for the new saved search
      cy.get('#my-searches-page > section.section-container-open > div.section-content-open.overflow-hidden > div > div > div > div > button').first().click({ force: true })
      cy.wait(1000)
      cy.get('.bg-green').click({ force: true })
      cy.wait(3000)
      cy.reload()
      // get the delete button for the old saved search
      cy.get('#my-searches-page > section.section-container-open > div.section-content-open.overflow-hidden > div > div > div > div > button').click({ force: true })
      cy.wait(1000)
      cy.get('.bg-green').click({ force: true })
      cy.wait(3000)
      cy.reload()
      // verify the saved search is deleted
      cy.get('#my-searches-page > section.section-container-open > div.section-content-open.overflow-hidden > div > div > div > div>a').should('not.be.visible')
    }
  })
})

//Clearing recent searches section
Cypress.Commands.add('clearRecentSearches', () => {
  cy.get('#header-nav-searches').click()
  cy.get('.section-title-default > .flex > .text-green').click() // clear the recent searches
  cy.wait(2000)

  cy.get('#my-searches-page').then(($body) => {
    if ($body.find('section').length) {
      // input was found
      cy.get('.section-title-default > .flex > .text-green').click() // clear the recent searches
    }
    //do nothing
  })
})

//Verify recent searches section
Cypress.Commands.add('verifyRecentSearches', (LocationSearchName) => {
  cy.get('#header-nav-searches').click() // navigate to my searches page
  cy.wait(2000)
  cy.get('#my-searches-page > section > div.section-content-default.overflow-hidden > div > div > div > div > div').should('be.visible') // recent search visible
  //verify the recent search name match with the location name
  cy.get('#my-searches-page > section > div.section-content-default.overflow-hidden > div > div > div > div > div > h3 > a').invoke('text').should('contain', LocationSearchName)
  //click on save search button to save it
  cy.get('#my-searches-page > section.section-container-default > div.section-content-default.overflow-hidden > div > div > div > div > div > button').click({ force: true })
  cy.get('body > div.ReactModalPortal > div > div > div > div').should('be.visible') // verify the model pop up
  cy.get('body > div.ReactModalPortal > div > div > div > button').click({ force: true }) // click on the green button to save
  cy.wait(3000)
  //verify the save search is created
  cy.get('#my-searches-page > section.section-container-open > div.section-content-open.overflow-hidden > div > div > div > div>a').should('be.visible')
  cy.get('#my-searches-page > section.section-container-open > div.section-content-open.overflow-hidden > div > div > div > div > div>div>input').invoke('val').should('contain', LocationSearchName)
  // get the delete button and delete the save search created
  cy.get('#my-searches-page > section.section-container-open > div.section-content-open.overflow-hidden > div > div > div > div > button').click({ force: true })
  cy.wait(1000)
  cy.get('.bg-green').click({ force: true })
  cy.wait(3000)
  cy.reload()
  // verify the saved search is deleted
  cy.get('#my-searches-page > section.section-container-open > div.section-content-open.overflow-hidden > div > div > div > div>a').should('not.be.visible') 
})

//Save search button for unauthenticated user
Cypress.Commands.add('ssUnauthenticated', (ssbtn) => {
  cy.get(ssbtn).click({ force: true }) // click on the SS button next to the filters
  cy.get('#signup-button').should('be.visible') // verify the signup button
  cy.get('#signin-button').should('be.visible') // verify the signup button
})

//verifying header
Cypress.Commands.add('header', (page) => {
  cy.visit(page)
  cy.signIn()
  cy.get('#header-nav-buy-toggle').click()
  cy.get('#header-nav-buy').click()// click on get an agent
  cy.url().should('include', '/buy')
  cy.get('#buy-page-lead-form-first-name-input').should('be.visible')
  cy.visit(page)
  cy.get('#header-nav-buy-toggle').click()
  cy.get('#header-nav-houses-for-sale').click()
  cy.url().should('include', '/houses-for-sale')
  cy.wait(3000)
  cy.get('#housesforsale-searchbar').should('be.visible')
  cy.visit(page)
  cy.get('#header-nav-sell-toggle').click()
  cy.get('#header-nav-sell').click() // click on sell with rockethomes link
  cy.url().should('include', '/sell')
  cy.get('#sell-page-lead-form-first-name-input').should('be.visible')
  cy.visit(page)
  cy.get('#header-nav-sell-toggle').click()
  cy.get('#header-nav-property-hub').click() // click on how-much-is-my-home-worth link
  cy.url().should('include', '/how-much-is-my-home-worth')
  cy.get('#property-hub-search-container').should('be.visible')
  cy.visit(page)
  cy.get('#header-nav-mortgage').click() // click on mortgage link
  cy.url().should('include', '/mortgage')
  cy.get('#mortgage__hero-card').should('be.visible')
  cy.visit(page)
  cy.get('#header-nav-link-faves').click() // click on my faves link
  cy.url().should('include', '/faves')
  cy.get('#my-faves-page').should('be.visible')
  cy.visit(page)
  cy.get('#header-nav-link-searches').click() //click on my searches link
  cy.url().should('include', '/searches')
  cy.get('#my-searches-page').should('be.visible')
  cy.visit(page)
  cy.get('#header-nav-account-toggle').click() // open on nav toggle
  cy.get('#header-nav-dropdown-notifications').click() // click on email notification link
  cy.url().should('include', '/notifications')
  cy.get('.paddingB48').should('be.visible')
  cy.visit(page)
  cy.get('#header-nav-account-toggle').click() // open on nav toggle
  cy.get('#header-nav-dropdown-change-username').click() // click on change username
  cy.url().should('include', '/change-username')
  cy.get('#currentUsername').should('be.visible')
  cy.visit(page)
  cy.get('#header-nav-account-toggle').click() // open on nav toggle
  cy.get('#header-nav-dropdown-change-password').click() // click on change password link
  cy.url().should('include', '/change-password')
  cy.get('#currentPassword').should('be.visible')
  cy.visit(page)
})

//verifying the footer
Cypress.Commands.add('footer', (page) => {
  cy.visit(page)
  cy.get('#footer-foc-links').should('be.visible')
  // rocket mortgage link
  cy.get('#footer-foc-links > .list-reset > :nth-child(1) > .text-secondary_dark').should('have.attr', 'href')
  .then((hrefValue)=> {
    const rocketMortgage = hrefValue
    expect(rocketMortgage).to.contain('rocketmortgage.com')
  })
  //rocket loans link
  cy.get('#footer-foc-links > .list-reset > :nth-child(2) > .text-secondary_dark').click()
  cy.url().should('include', '/www.rocketloans.com')
  cy.visit(page)
  //rocket homes link
  cy.get('#footer-foc-links > .list-reset > :nth-child(3) > .text-secondary_dark').should('have.attr', 'href')
  .then((hrefValue)=> {
    const rocketHomes = hrefValue
    expect(rocketHomes).equal('https://www.rockethomes.com/')
  })
  //rocket HQ link
  cy.get(':nth-child(4) > .text-secondary_dark').should('have.attr', 'href')
  .then((hrefValue)=> {
    const rocketHQ = hrefValue
    expect(rocketHQ).to.contain('rockethq.com')
  })
  // about us
  cy.get('#footer-rh-links > .list-reset > :nth-child(1) > .text-secondary_dark').click()
  cy.url().should('include', '/about-us')
  cy.get('#about-us-hero-image-container').should('be.visible')
  cy.visit(page)
  // press room link
  cy.get('#footer-rh-links > .list-reset > :nth-child(2) > .text-secondary_dark').click()
  cy.url().should('include', '/press-room')
  cy.get('.herocontainer_v2').should('be.visible')
  cy.visit(page)
  // contact us link
  cy.get('#footer-rh-links > .list-reset > :nth-child(3) > .text-secondary_dark').click()
  cy.url().should('include', '/contact-us')
  cy.get('#ContactUS').should('be.visible')
  cy.visit(page)
  // about our network link
  cy.get('#footer-partner-agent-links > .list-reset > :nth-child(1) > .text-secondary_dark').click()
  cy.url().should('include', '/about-our-network')
  cy.get('.herocontainer_v2').should('be.visible')
  cy.visit(page)
  // log in to client central link
  cy.get('#footer-partner-agent-links > .list-reset > :nth-child(2) > .text-secondary_dark').should('have.attr', 'href')
  .then((hrefValue)=> {
    const clientCentral = hrefValue
    expect(clientCentral).equal('https://clientcentral.inhouserealty.com/')
  })
  // blog link
  cy.get('#footer-explore-rh-links > .list-reset > :nth-child(1) > .text-secondary_dark').click()
  cy.url().should('eq', 'https://www.rockethomes.com/blog')
  cy.visit(page)
  // twitter link
  cy.get('#footer-explore-rh-links > ul > li.flex.mb-24.block > a:nth-child(1)').should('have.attr', 'href')
  .then((hrefValue)=> {
    const twitterLink = hrefValue
    expect(twitterLink).equal('https://twitter.com/rockethomes')
  })
  // facebook link
  cy.get('#footer-explore-rh-links > ul > li.flex.mb-24.block > a:nth-child(2)').should('have.attr', 'href')
  .then((hrefValue)=> {
    const facebookLink = hrefValue
    expect(facebookLink).equal('https://www.facebook.com/rockethomes')
  })
  //verify the sate links section is visible
  cy.get('#footer-supported-states-links').should('be.visible')
  // terms link
  cy.get('[href="/terms"]').click()
  cy.url().should('include', '/terms')
  cy.visit(page)
  // license numbers link
  cy.get('[href="/license-numbers"]').click()
  cy.url().should('include', '/license-numbers')
  cy.visit(page)
  // site feedback link
  cy.get('#footer-support-links > [href="/contact-us"]').click()
  cy.url().should('include', '/contact-us')
  cy.get('#ContactUS').should('be.visible')
  cy.visit(page)
  //help link
  cy.get('[href="/help"]').click()
  cy.url().should('include', '/help')
  cy.get('.herocontainer_v2').should('be.visible')
})

// verifying sign up
Cypress.Commands.add('signup', (page) => {
  cy.visit(page,{retryOnNetworkFailure :true})
  cy.get('#header-nav-sign-up').click()
  cy.get('#create-account-submit').should('be.visible')
  cy.get('#create-account-first-name').type('CypressFirst')
  cy.get('#create-account-last-name').type('CypressLastName')
  const randNo = Math.floor(Math.random() * 100) + 2 + "" + new Date().getTime() +  Math.floor(Math.random() * 100) + 2 + (Math.random().toString(36).replace(/[^a-zA-Z]+/g, '').substr(0, 5))
  const newEmail = (randNo + '.vnge9rdx@mailosaur.io')
  cy.get('#create-account-email').type(newEmail)
  cy.get('#create-account-password').type('Passw0rd')
  cy.get('#create-account-retype-password').type('Passw0rd')
  cy.get('#create-account-submit').click()
  //Mailosaure
  cy.mailosaurGetMessage('vnge9rdx', { subject: 'Verify Your Email Address', sentTo: newEmail })
  .then(email => {
      console.log(email)
      expect(email.subject).to.equal('Verify Your Email Address')
  })
  .then(email => {
      expect(email.attachments).to.have.lengthOf(0);
  })
  .then(email => {
      const verifyLink = Cypress.$(email.html.links).get()
      const verifyUrl = verifyLink[1].href
      cy.request(verifyUrl)
      cy.get('body').then(body$ => {
          let newWindow = open(verifyUrl)
          return new Promise(resolve => {
              setTimeout(x => {
                  newWindow.close()
                  resolve()
              }, 10000)
          })
      })
      cy.reload()
      cy.get('#header-nav-sign-in').click()
      cy.get('#username').type(newEmail)
      cy.get('#password').type('Passw0rd')
      cy.get('#sign-in-submit > button').click()
      cy.wait(4000)
      cy.get('#header-nav-account-toggle').should('be.visible')   
  })
})






