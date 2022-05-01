/// <reference types="cypress" />
// verifying location page with filters
describe('location page test cases with filters', () => {
    it('verify applying filters on location page to filter listings', () => {
        cy.visit('/mi/troy',{retryOnNetworkFailure :true})
        cy.url().should('include', '/mi/troy')
        cy.title().should('include', 'Troy, Michigan')
        cy.get('#location-filter-beds > .p2').should('be.visible')
        cy.get('#location-filter-beds-plus').dblclick() // add two beds
        cy.wait(1000)
        cy.get('#location-filter-baths-plus').dblclick() // add two baths
        cy.wait(1000)
        cy.get('#location-filter-home-size').click() // open Any size drop down
        cy.get(':nth-child(1) > :nth-child(1) > span.width100 > .dInlineBlock').select('600 SqFt')
        cy.get(':nth-child(3) > span.width100 > .dInlineBlock').select('5,000 SqFt')
        cy.get('#location-filter-home-size').click()// close the drop down
        cy.wait(1000)
        cy.get('#location-filter-home-type').click()// open all home types
        cy.get('[style="margin: -10px;"] > :nth-child(2) > .positionRelative').click() // House
        cy.get('button > .fontSemibold-h').click() // select all types
        cy.get('#location-filter-home-type').invoke('text').then((allHomeTypes) => {
            expect(allHomeTypes).to.contain('All Home Types')
        }) // verify all home types selected
        cy.get('#location-filter-home-type').click()// close all home types
        cy.wait(1000)
        cy.get('#location-filter-more').click() // open more filters
        cy.get('#location-filter-year-built-min').select('1970')
        cy.get('#location-filter-year-built-max').select('2020')
        cy.get('#location-filter-lot-size-min').select('2,000 SqFt') // min lot size
        cy.get('#location-filter-lot-size-max').select('3+ Acres') // max lot size
        cy.get('#location-filter-more').click() // close more filters
        cy.wait(4000)
    })

    it("Verify location page data with location page API", function() {
        cy.request(`/api/v1/locations/listings?location=troy&state=mi&max-home-size=5000&max-year-built=2020&min-bathroom-count=2&min-bedroom-count=2&min-home-size=600&min-lot-size=0.04592&min-year-built=1970&max-lot-size=3`)
        .then(response => {
            cy.writeFile("cypress/fixtures/locationFilters.json", response.body)
        })
        cy.fixture('locationFilters').then((locationFilters) => {
            expect(locationFilters.data[0].attributes.meta.web.title).to.exist
            //verify total number of homes 
            cy.get('#location-list-view-header > div > div.w-col-6').invoke('text').then((totalNumberOfHomes) => {
                const xValue = (locationFilters.data[0].attributes.meta.counts.listings)
                expect(totalNumberOfHomes).equal(xValue.toString() + ' homes for sale ') 
            })
            //verify the title
            cy.get('#location-list-view-header > h1').invoke('text').then((title) => {
                const apiTitle = (locationFilters.data[0].attributes.meta.parameters.shape.location)
                expect(title).equal(apiTitle + ', MI Real Estate') 
            })
            //verify the street address in first listing
            cy.get('#location-list-view>div>div>:nth-child(1) .height100>.dBlock > :nth-child(2) > .padding16 > .col-xs-8 > .p1').invoke('text').then((streetAddress) => {
                const listingID = (locationFilters.data[0].relationships.listings.data[0].id)
                const arr = (locationFilters.included)
                const listing = arr.filter(listing => {
                    return listing.id == listingID && listing.type == 'address'
                })
                expect(streetAddress).equal(listing[0].attributes.display_address)
            })
            //city name,state name, zip code in address in first listing
            cy.get('#location-list-view>div>div>:nth-child(1) .height100>.dBlock > :nth-child(2) > .padding16 > .col-xs-8>div:nth-child(2)').invoke('text').then((cityStateZip) => {
                const listingID = (locationFilters.data[0].relationships.listings.data[0].id)
                const arr = (locationFilters.included)
                const listing = arr.filter(listing => {
                    return listing.id == listingID && listing.type == 'address'
                })
                const apiCity = (listing[0].attributes.city)
                const apiState = (listing[0].attributes.state_code)
                const apiZip = (listing[0].attributes.zip_code)
                expect(cityStateZip).equal(apiCity + ", " + apiState + " " + apiZip)
            })
            //list price in first listing
            cy.get('#location-list-view>div>div>:nth-child(1) .height100>.dBlock > :nth-child(2)>div:nth-child(1)>div:nth-child(2)>div>div:nth-child(1)').invoke('text').then((listPrice) => {
                const newListPrice = parseInt(listPrice.replace(/[$,]/g, ''), 10)
                const listingID = (locationFilters.data[0].relationships.listings.data[0].id)
                const arr = (locationFilters.included)
                const listing = arr.filter(listing => {
                    return listing.id == listingID && listing.type == 'listing'
                })
                expect(newListPrice).equal(listing[0].attributes.list_price)
            })
            //mls number in first listing
            cy.get('#location-list-view>div>div>:nth-child(1) .height100>.dBlock > :nth-child(2)>div:nth-child(3)>div>span:nth-child(2)').invoke('text').then((mlsNumber) => {
                const listingID = (locationFilters.data[0].relationships.listings.data[0].id)
                const arr = (locationFilters.included)
                const listing = arr.filter(listing => {
                    return listing.id == listingID && listing.type == 'listing'
                })
                const apiMls = (listing[0].attributes.mls_number)
                expect(mlsNumber).equal('#' +apiMls.toString()) 
            })
            //beds and baths in first listing
            cy.get('#location-list-view>div>div>:nth-child(1) .height100>.dBlock > :nth-child(2)>div:nth-child(1)>div:nth-child(3)>div:nth-child(1)').invoke('text').then((bedsAndBaths) => {
                const listingID = (locationFilters.data[0].relationships.listings.data[0].id)
                const arr = (locationFilters.included)
                const listing = arr.filter(listing => {
                    return listing.id == listingID && listing.type == 'listing'
                })
                const apiBeds = ((listing[0].attributes.property.beds_total).toString())
                const apiBaths = ((listing[0].attributes.property.baths_full_and_partial).toString())
                expect(bedsAndBaths).equal((apiBeds+ ' Beds') + ' • ' + (apiBaths+ ' Baths'))
            })
            //SqFt in first listing
            cy.get('#location-list-view>div>div>:nth-child(1) .height100>.dBlock > :nth-child(2)>div:nth-child(2)>div:nth-child(2)>div>span').invoke('text').then((totalSqFt) => {
                const newTotalSqFt = parseInt(totalSqFt.replace(/[,/SqFt]/g, ''), 10)
                const listingID = (locationFilters.data[0].relationships.listings.data[0].id)
                const arr = (locationFilters.included)
                const listing = arr.filter(listing => {
                    return listing.id == listingID && listing.type == 'listing'
                })
                expect(newTotalSqFt).equal(listing[0].attributes.property.square_feet)
            })
            //price per SqFt in first listing
            cy.get('#location-list-view>div>div>:nth-child(1) .height100>.dBlock > :nth-child(2)>div:nth-child(1)>div:nth-child(3)>div:nth-child(2)>div').invoke('text').then((pricePerSqFt) => {
                const newPricePerSqFt = parseInt(pricePerSqFt.replace(/[$/SqFt]/g, ''), 10)
                const listingID = (locationFilters.data[0].relationships.listings.data[0].id)
                const arr = (locationFilters.included)
                const listing = arr.filter(listing => {
                    return listing.id == listingID && listing.type == 'listing'
                })
                expect(newPricePerSqFt).equal(listing[0].attributes.list_price_per_sqft)
            })
            //monthly cost in first listing
            cy.get('#location-list-view>div>div>:nth-child(1) .height100>.dBlock > :nth-child(2)>div:nth-child(1)>div:nth-child(2)>div>div:nth-child(2)').invoke('text').then((monthlyCost) => {
                const newMonthlyCost = parseInt(monthlyCost.replace(/[~$,/mo.*]/g, ''), 10)
                const listingID = (locationFilters.data[0].relationships.listings.data[0].id)
                const arr = (locationFilters.included)
                const listing = arr.filter(listing => {
                    return listing.id == listingID && listing.type == 'listing'
                })
                expect(newMonthlyCost).equal(listing[0].attributes.monthly_cost)
            })
            //listing office name in first listing
            cy.get('#location-list-view>div>div>:nth-child(1) .height100>.dBlock > :nth-child(2)>div:nth-child(3)>div>span:nth-child(3)').invoke('text').then((listingOfficeName) => {
                const listingID = (locationFilters.data[0].relationships.listings.data[0].id)
                const arr = (locationFilters.included)
                const listing = arr.filter(listing => {
                    return listing.id == listingID && listing.type == 'listing'
                })
                const apiStreetAddress = (listing[0].attributes.list_office_name)
                expect(listingOfficeName).equal("Listing Office:" + apiStreetAddress) 
            })
            // verify the mls disclaimer link at the bottom of the page
            cy.get('#location-list-view > div > div.location-mls-disclaimer.col-xs-12.bTop1.bBackground1.paddingY16 > div > div > p').invoke('text').then((mlsText) => {
                expect(mlsText).to.contain('Provided through IDX via MiRealSource, as the "Source MLS", courtesy of the Originating MLS shown on the property listing, as the Originating MLS.') 
            })
        })
    })
})