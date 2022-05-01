/// <reference types="cypress" />
// verifying property report page
describe('property report page test cases', () => {
    beforeEach(() => {
        cy.visit('/',{retryOnNetworkFailure :true})
        cy.signIn()
        cy.visit('/property-report?street_address=1310%20e%20giddens%20ave&city=tampa&state_code=fl',{retryOnNetworkFailure :true})
    })

    it("Verifying property report page", function() {
        cy.request(`/api/v1/property-valuations?filter[street_address]=1310 E Giddens Ave&filter[city]=tampa&filter[state_code]=fl&filter[zip]=33603&expand[monthly_listing_trends]&expand[similar_active_listings]&expand[similar_sold_listings]&expand[city_location]&expand[city_location.monthly_listing_trends]&filter[similar_sold_listings.min_sold_date]=2019-12-24T00:00:00.000Z`)
        .then(response => {
            cy.writeFile("cypress/fixtures/propertyReport.json", response.body)
        })
        cy.fixture('propertyReport').then((propertyReport) => {
            expect(propertyReport._meta.filter.state_code).to.exist
            //Assertions
            // verify the property report title 
            cy.get('#property-report-period').invoke('text').then((reportTitle) => {
                const foo = (propertyReport.items[0].monthly_listing_trends.items[0].start_date)
                const reportDate = Cypress.moment(foo).add(1, 'month').format('MMMM YYYY')
                expect(reportTitle).equal('Property Report - ' + reportDate) 
            })
            //street address
            cy.get('.relative > .h2').invoke('text').then((reportAddress) => {
                expect(reportAddress).equal(propertyReport._meta.filter.street_address) 
            })
            //verify the city
            cy.get('#property-report-hero-city').invoke('text').then((reportCity) => {

                const str = (propertyReport._meta.filter.city)
                const newCity = `${str[0].toUpperCase()}${str.slice(1)}`
                expect(reportCity).equal(newCity) 
            })
            //verify the state code
            cy.get('#property-report-hero-state-code').invoke('text').then((reportState) => {
                expect(reportState).equal((propertyReport._meta.filter.state_code).toUpperCase()) 
            })
            //verify the zip
            cy.get('#property-report-hero-zip').invoke('text').then((reportZip) => {
                expect(reportZip).equal(propertyReport._meta.filter.zip) 
            })
            //map area is displayed
            cy.get('#property-hero-target-map-position').should('be.visible')
            //home type
            cy.get('#property-report-basic-info-property-type > .p4').invoke('text').then((homeType) => {
                expect((homeType.toLowerCase()).replace(/ /g, '')).equal(propertyReport.items[0].property_type) 
            })

            //beds
            cy.get('#property-report-basic-info-beds > .p4').invoke('text').then((beds) => {
                expect(beds).equal((propertyReport.items[0].bedrooms) + ' Beds') 
            })
            //baths
            cy.get('#property-report-basic-info-baths > .p4').invoke('text').then((baths) => {
                expect(baths).equal((propertyReport.items[0].bathrooms) + ' Baths') 
            })
            //total SqFt
            cy.get('#property-report-basic-info-size > .p4').invoke('text').then((totalSqFt) => {
                const newTotalSqFt = parseInt(totalSqFt.replace(/[,/SqFt]/g, ''), 10)
                expect(newTotalSqFt).equal(propertyReport.items[0].square_feet)
            })
            // right rail lead form is displayed
            cy.get('#property-report-sticky-aside > .rounded-8').should('be.visible')
            cy.get('#property-report-aside-first-name-input').should('be.visible')
            cy.get('#property-report-aside-last-name-input').should('be.visible')
            cy.get('#property-report-aside-email-input').should('be.visible')
            cy.get('#property-report-aside-phone-input').should('be.visible')
            cy.get('#property-report-aside-submit').should('be.visible')
            // estimated home value
            cy.get('#home-valuation-estimated-home-value > .flex-col > .h2').invoke('text').then((listPrice) => {
                const newListPrice = parseInt(listPrice.replace(/[$,]/g, ''), 10)
                expect(newListPrice).equal(propertyReport.items[0].estimated_value)
            })
            // estimated time to sell
            cy.get('#home-valuation-estimated-time-to-sell > .flex-col > .h2').invoke('text').then((estimatedTimeToSell) => {
                const newEstimatedTimeToSell = parseInt(estimatedTimeToSell.replace(/[Days]/g, ''), 10)
                expect(newEstimatedTimeToSell).equal(Math.round(propertyReport.items[0].monthly_listing_trends.items[0].sold.days_on_market.avg))
            })
            // To Be Continued
        })
    })
})