/// <reference types="cypress" />
// verify details of the listing page
describe("Verify listing page", function() {
    before(() => {
        cy.visit('/mi/troy?sort=list_price_high_to_low',{retryOnNetworkFailure :true})
    })

    it("Listing page data", function() {
        cy.get('#location-list-view > div > div.col-xs-12.width100 > div:nth-child(1)>div>a')
        .invoke('attr', 'href')
        .then((hrefValue) => {
            const listingId = hrefValue.replace('/homes/', '')
            cy.request(`/api/v1/listings/${listingId}`).then(response => {
                cy.writeFile("cypress/fixtures/listing.json", response.body)
            })
            cy.fixture('listing').then((listing) => {
                expect(listing.data[0].type).to.exist
                cy.get('#location-list-view>div>div>:nth-child(1) .height100 > [style="overflow-x: hidden;"] > .react-swipeable-view-container > [aria-hidden="false"] > .width100 > img').click({ force: true })
                cy.wait(1000);
                //listing address
                cy.get('#listing-address-street').invoke('text').then((address) => {
                    expect(address).equal(listing.included[0].attributes.display_address) 
                })
                //city name,state name, zip code in breadcrumb
                cy.get('#listing-address-city').invoke('text').then((breadcrumbCity) => {
                    cy.get('#listing-address-state-code').invoke('text').then((breadcrumbState) => {
                        cy.get('#listing-address-postal-code').invoke('text').then((breadcrumbZip) => {
                            expect(breadcrumbCity).equal(listing.included[0].attributes.city)
                            expect(breadcrumbState).equal(listing.included[0].attributes.state_code)
                            expect(breadcrumbZip).equal(listing.included[0].attributes.zip_code)
                        })
                    })
                })
                //listing price
                cy.get('#listing-price').invoke('text').then((listPrice) => {
                    const newListPrice = parseInt(listPrice.replace(/[$,]/g, ''), 10)
                    expect(newListPrice).equal(listing.data[0].attributes.list_price)
                })
                //beds
                cy.get('#listing-overview-beds').invoke('text').then((beds) => {
                    expect(beds).equal((listing.data[0].attributes.property.beds_total) + ' Beds') 
                })
                //baths
                cy.get('#listing-overview-baths').invoke('text').then((baths) => {
                    expect(baths).equal((listing.data[0].attributes.property.baths_full_and_partial) + ' Baths') 
                })
                //total SqFt
                cy.get('#listing-overview-home-size').invoke('text').then((totalSqFt) => {
                    const newTotalSqFt = parseInt(totalSqFt.replace(/[,/SqFt]/g, ''), 10)
                    expect(newTotalSqFt).equal(listing.data[0].attributes.property.square_feet)
                })
                //price per SqFt
                cy.get('#listing-overview-ppsqft').invoke('text').then((pricePerSqFt) => {
                    const newPricePerSqFt = parseInt(pricePerSqFt.replace(/[$/SqFt]/g, ''), 10)
                    expect(newPricePerSqFt).equal(listing.data[0].attributes.list_price_per_sqft)
                })
                //home type
                cy.get('#listing-overview-home-type').invoke('text').then((homeType) => {
                    expect((homeType.toLowerCase()).replace(/ /g, '')).equal(listing.data[0].attributes.property.type) 
                })
                //verify Schools Nearby displayed
                cy.get('#listing-overview-school-nearby').should('be.visible')
                //verify Trends section is displayed
                cy.get('#listing-trend-report > div.col-xs-12.mb-24.p-24.border.rounded-8.mt-24').should('be.visible')
                //home type in facts and features section
                cy.get('#listing-facts-home-type').invoke('text').then((homeTypeFF) => {
                    expect(homeTypeFF).equal(listing.data[0].attributes.property.type_description) 
                })
                //parking in facts and features section
                cy.get('#listing-facts-parking').invoke('text').then((parkingFF) => {
                    expect(parkingFF).equal(listing.data[0].attributes.property.features.garage) 
                })
                //year built in facts and features section
                cy.get('#listing-facts-year-built').invoke('text').then((yearBuiltFF) => {
                    const newYearBuiltFF = parseInt(yearBuiltFF, 10)
                    expect(newYearBuiltFF).equal(listing.data[0].attributes.property.year_built) 
                })
                //heat in facts and features section
                cy.get('#listing-facts-heating').invoke('text').then((heatFF) => {
                    expect(heatFF).equal(listing.data[0].attributes.property.features.heat) 
                })
                //cooling in facts and features section
                cy.get('#listing-facts-cooling').invoke('text').then((coolingFF) => {
                    expect(coolingFF).equal(listing.data[0].attributes.property.features.air_conditioning) 
                })
                //mls number in facts and features section
                cy.get('#listing-facts-mls').invoke('text').then((mlsNumberFF) => {
                    expect(mlsNumberFF).equal(listing.data[0].attributes.mls_number) 
                })
                //description
                cy.get('#listing-description').invoke('text').then((description) => {
                    expect(description).equal(listing.data[0].attributes.remarks) 
                })
                //verify interior features section is displayed
                cy.get('#listing-interior-section-list').should('be.visible')
                //verify exterior features section is displayed
                cy.get('#listing-exterior-section-list').should('be.visible')
                //verify utilities section is displayed
                cy.get('#listing-utilities-section-list').should('be.visible')
                //verify other section is displayed
                cy.get('#listing-other-section-list').should('be.visible')
                //verify mortgage calculator is displayed
                cy.get('#mortgage-calculator').should('be.visible')
                //verify mls disclaimer is displayed
                cy.get('.listing-description-gradient > .positionRelative').should('be.visible')
                //verify mls disclaimer has text
                cy.get('.listing-description-gradient > .positionRelative').click()
                cy.get('.listing__listing-mls > div > p').invoke('text').then((mlsText) => {
                    expect(mlsText).to.contain('Provided through IDX via MiRealSource, as the "Source MLS", courtesy of the Originating MLS shown on the property listing, as the Originating MLS.') 
                })
                //verify what's it like to live text is displayed
                cy.get('.listing-what-its-like > .font24').should('be.visible')
                //verify schools section is visible
                cy.get('#section-schools > .section').should('be.visible')
                //verify view on map button in schools section opens the map
                cy.get('[style="min-height:40px"] > .btn').click()
                cy.get('.mapboxgl-canvas').should('be.visible')
                //verify photos button shows photo in photo widget
                cy.get('.textRight > :nth-child(1) > .positionRelative').click()
                cy.get('[aria-hidden="false"] > .height100').should('be.visible')
                //verify map button opens map in photo widget
                cy.get('.textRight > :nth-child(2) > .positionRelative').click()
                cy.get('.mapboxgl-canvas').should('be.visible')
                //verify school button opens map view in photo widget
                cy.get('.textRight > :nth-child(4) > .positionRelative').click()
                cy.get('.mapboxgl-canvas').should('be.visible')
                //close the photo widget
                cy.get('[style="width: 42px; height: 42px; display: inline-block;"] > img').click()
                //verify neighbors section is displayed
                cy.get('#section-neighbors > .section').should('be.visible')
                //verify popular places nearby is displayed
                cy.get('#section-nearby > .section').should('be.visible')
                //verify the lead form section is displayed
                cy.get(':nth-child(8) > .clearBoth').should('be.visible')
                //verify lead form container is displayed
                cy.get('#listing-form-lead-form-container').should('be.visible')
                //verify seo text section
                cy.get('#section-seo-text > div > p').invoke('text').then((seoText) => {
                    expect(seoText).to.contain('This home is located') 
                })
                //verify view nearby cities section is displayed
                cy.get('#listing-seo-nearby-cities').should('be.visible')
                //verify interested in this home right rail is displayed
                cy.get('#right-rail > .col-xs-12').should('be.visible')
            })
        })
    })
})


