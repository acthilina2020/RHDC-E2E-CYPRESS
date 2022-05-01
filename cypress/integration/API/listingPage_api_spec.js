/// <reference types="cypress" />
// verify listing page API
describe("Verify listing page API", function() {
    before(() => {
        cy.visit('/mi/troy?sort=list_price_high_to_low',{retryOnNetworkFailure :true})
    })

    it("Listing page API data[]", function() {
        cy.get('#location-list-view > div > div.col-xs-12.width100 > div:nth-child(1)>div>a')
        .invoke('attr', 'href')
        .then((hrefValue) => {
            const listingId = hrefValue.replace('/homes/', '')
            cy.request(`/api/v1/listings/${listingId}`).then(response => {
                expect(response.status).equal(200)
                expect(response.body).to.not.be.null
                expect(response.body.data).to.have.length(1)
                expect(response.body.data[0]).have.property('id')
                expect(response.body.data[0].attributes).have.property('list_price')
                expect(response.body.data[0].attributes.listing_status).equal('active')
                // To Be ConTinued
            })
        })
    })
})


