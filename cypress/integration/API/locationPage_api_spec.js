// verify location page API
describe('location page API testing', () => {
    it('Location API tests', () => {
        cy.request('/api/v1/locations/listings?size=25&from=0&create_recent_search=true&location=troy&state=mi').then((response) => {
            expect(response.status).equal(200)
            expect(response.body).to.not.be.null
            // To Be ConTinued
        })
    })
})