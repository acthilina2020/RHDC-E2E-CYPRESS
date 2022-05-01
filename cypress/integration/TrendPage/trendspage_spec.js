/// <reference types="cypress" />
// verifying trend page
describe('trend page test cases', () => {
    beforeEach(() => {
        cy.visit('/',{retryOnNetworkFailure :true})
        cy.signIn()
        cy.typeahead('#homepage-searchbar','Troy','#react-autowhatever-1-section-0-item-0 > .p2')
    })

    it('Verify navigating to trend page from listing page', () => {
        cy.get('#location-list-view>div>div>:nth-child(1) .height100 > [style="overflow-x: hidden;"] > .react-swipeable-view-container > [aria-hidden="false"] > .width100 > img').click()
        cy.wait(1000)
        cy.get('.mb-24 > .col-xs-12 > .col-sm-4').click()
        cy.url().should('include', '/real-estate-trends/mi/troy')
        cy.title().should('include', 'Troy, Michigan | Real Estate Market Trends')
    })

    it("Navigating to trend page from location page and verify trend page data", function() {
        cy.request(`/api/v1/locations?filter[web_name]=troy&filter[state_code]=mi&expand[parent_city]&expand[parent_county]&expand[monthly_listing_trends]&filter[monthly_listing_trends.bedrooms]=all&filter[monthly_listing_trends.property_type]=all&expand[monthly_listing_trends.highlights]&expand[monthly_listing_trends.insight]&expand[monthly_listing_trends.median_sold_price_listing_example]&expand[monthly_listing_trends.listing_examples]&expand[monthly_listing_trends.median_sold_price_listing_example]&expand[monthly_listing_trends.median_list_price_listing_example]&expand[monthly_listing_trends.spread_bedrooms]&expand[nearby_locations.monthly_listing_trends]&filter[nearby_locations.monthly_listing_trends.bedrooms]=all&filter[nearby_locations.monthly_listing_trends.property_type]=all`)
        .then(response => {
            cy.writeFile("cypress/fixtures/trend.json", response.body)
        })
        cy.fixture('trend').then((trend) => {
            expect(trend._meta.filter.state_code).to.exist
            cy.get('.border > .w-col-5').click()
            cy.wait(1000)
            //Assertions 
            cy.get('#trends-hero-location-name > .h2').should('be.visible') // Title 'Location Trend Report'
            cy.get('#trends-hero-report-type-toggle-buyer').should('be.visible') // Buyer's report tab
            cy.get('#trends-hero-report-type-toggle-seller').should('be.visible') // seller's report tab
            //market conditions gauge
            cy.get('.flex-shrink-0 > .absolute > img').should('have.attr', 'alt')
            .then(alttext => {
                expect(alttext).to.contain(trend.items[0].monthly_listing_trends.items[0].sold.market_conditions.description)
            })
            //key take away insight in housing market conditions
            cy.get('#market-conditions-card > .w-full> .card_sidebar-container > .card_sidebar-content > .p2').invoke('text').then((marketInsight) => {
                expect(marketInsight).equal(trend.items[0].monthly_listing_trends.items[0].sold.insights.market_conditions.plain_text) 
            })
            //verify median sold price
            cy.get('.flex-col > .h2').invoke('text').then((medianSoldPrice) => {
                const newMedianSoldPrice = parseInt(medianSoldPrice.replace(/[$,]/g, ''), 10)
                expect(newMedianSoldPrice).equal(Math.round(trend.items[0].monthly_listing_trends.items[0].trailing_year.sold.sold_price.median))
            })
            //verify median difference since last year
            cy.get('.mb-32 > .content-center > :nth-child(1)').invoke('text').then((diffSinceLastYear) => {
                const newDiffSinceLastYear = parseInt(diffSinceLastYear.replace(/[$,]/g, ''), 10)
                expect(newDiffSinceLastYear).equal(parseInt(trend.items[0].monthly_listing_trends.items[0].one_year_prior.trailing_year.sold.sold_price.median_current_diff))
            })
            //verify median percentage difference since last year
            cy.get('.font-normal').invoke('text').then((diffPercentageSinceLastYear) => {
                const newDiffPercentageSinceLastYear = parseFloat(diffPercentageSinceLastYear.replace(/[%]/g, '').replace(/[(]/g, '').replace(/[)]/g, ''), 10)
                const math = (trend.items[0].monthly_listing_trends.items[0].one_year_prior.trailing_year.sold.sold_price.median_current_diff_percentage)
                expect(newDiffPercentageSinceLastYear).equal(parseFloat((math * 100).toFixed(1), 10))
            })
            //key take away insight in median sold price section
            cy.get('#median-price-card > .w-full> .card_sidebar-container > .card_sidebar-content > .p2').invoke('text').then((medianSoldPriceInsight) => {
                expect(medianSoldPriceInsight).equal(trend.items[0].monthly_listing_trends.items[0].one_year_prior.trailing_year.sold.insights.sold_price.plain_text) 
            })
            // noteworthy homes sold section is displayed
            cy.get('#noteworthy-homes-card > .w-full').should('be.visible')
            // median sold price by bedroom count section
            cy.get('#median-price-by-beds-card > .px-16').should('be.visible')
            // median sold price compared to nearby cities
            cy.get('#median-price-by-nearby-locations-card > .px-16').should('be.visible')
            // Number of homes for sale section prev month number
            cy.get('#homes-for-sale-card > .px-16 > .mt-16 > .w-full > tbody > tr > :nth-child(1)').invoke('text').then((prevMonthNumber) => {
                const newPrevMonthNumber = parseInt(prevMonthNumber, 10)
                expect(newPrevMonthNumber).equal(Math.round(trend.items[0].monthly_listing_trends.items[0].one_month_prior.active.counts.total))
            })
            // Number of homes for sale section current month number
            cy.get('#homes-for-sale-card > .px-16 > .mt-16 > .w-full > tbody > tr > .bg-background').invoke('text').then((currMonthNumber) => {
                const newCurrMonthNumber = parseInt(currMonthNumber, 10)
                expect(newCurrMonthNumber).equal(Math.round(trend.items[0].monthly_listing_trends.items[0].active.counts.total))
            })
            // Number of homes for sale section current diff percentage
            cy.get('#homes-for-sale-card > .px-16 > .mt-16 > .w-full > tbody > tr > .whitespace-no-wrap').invoke('text').then((currDiffPercentage) => {
                const newCurrDiffPercentage = parseFloat(currDiffPercentage.replace(/[%]/g, ''), 10)
                const math = (trend.items[0].monthly_listing_trends.items[0].one_month_prior.active.counts.total_current_diff_percentage)
                expect(newCurrDiffPercentage).equal(parseFloat((math * 100).toFixed(1), 10))
            })
            // homes for sale by bedroom count section
            cy.get('#homes-for-sale-by-beds-card > .px-16').should('be.visible')
            // number of homes sold section prev month number
            cy.get('#homes-sold-card > .px-16 > .mt-16 > .w-full > tbody > tr > :nth-child(1)').invoke('text').then((prevMonthSoldNumber) => {
                const newPrevMonthSoldNumber = parseInt(prevMonthSoldNumber, 10)
                expect(newPrevMonthSoldNumber).equal(Math.round(trend.items[0].monthly_listing_trends.items[0].one_month_prior.sold.counts.total))
            })
            // number of homes sold section current month number
            cy.get('#homes-sold-card > .px-16 > .mt-16 > .w-full > tbody > tr > .bg-background').invoke('text').then((currMonthSoldNumber) => {
                const newCurrMonthSoldNumber = parseInt(currMonthSoldNumber, 10)
                expect(newCurrMonthSoldNumber).equal(Math.round(trend.items[0].monthly_listing_trends.items[0].sold.counts.total))
            })
            // Number of homes sold section current diff percentage
            cy.get('#homes-sold-card > .px-16 > .mt-16 > .w-full > tbody > tr > .text-green').invoke('text').then((currDiffSoldPercentage) => {
                const newCurrDiffSoldPercentage = parseFloat(currDiffSoldPercentage.replace(/[%]/g, ''), 10)
                const math = (trend.items[0].monthly_listing_trends.items[0].one_month_prior.sold.counts.total_current_diff_percentage)
                expect(newCurrDiffSoldPercentage).equal(parseFloat((math * 100).toFixed(1), 10))
            })
            // asking price vs.Sold price section under asking number
            cy.get('#asking-vs-sold-card > .w-full > .mt-16 > .-mt-8 > .pb-16 > .p2 > :nth-child(1)').invoke('text').then((underAskingNumber) => {
                const newUnderAskingNumber = parseInt(underAskingNumber, 10)
                expect(newUnderAskingNumber).equal(Math.round(trend.items[0].monthly_listing_trends.items[0].sold.asking.under_asking))
            })
            // asking price vs.Sold price section at asking number
            cy.get('#asking-vs-sold-card > .w-full > .mt-16 > .-mt-8 > :nth-child(2) > .p2 > :nth-child(1)').invoke('text').then((atAskingNumber) => {
                const newAtAskingNumber = parseInt(atAskingNumber, 10)
                expect(newAtAskingNumber).equal(Math.round(trend.items[0].monthly_listing_trends.items[0].sold.asking.at_asking))
            })
            // asking price vs.Sold price section over asking number
            cy.get('#asking-vs-sold-card > .w-full > .mt-16 > .-mt-8 > :nth-child(3) > .p2 > :nth-child(1)').invoke('text').then((overAskingNumber) => {
                const newOverAskingNumber = parseInt(overAskingNumber, 10)
                expect(newOverAskingNumber).equal(Math.round(trend.items[0].monthly_listing_trends.items[0].sold.asking.over_asking))
            })
            // asking price vs.Sold price section Most over asking & Most under asking listing cards 
            cy.get('#asking-vs-sold-card>div:nth-child(1)>div:nth-child(2)>div:nth-child(2)').should('be.visible')
            //key take away insight in asking price vs.Sold price section
            cy.get('#asking-vs-sold-card > .w-full > .card_sidebar-container > .card_sidebar-content > .p2').invoke('text').then((askingVsSoldInsight) => {
                expect(askingVsSoldInsight).equal(trend.items[0].monthly_listing_trends.items[0].sold.insights.asking.plain_text) 
            })
            // average sale time section prev year/same month number
            cy.get('#days-on-market-card > .px-16 > .mt-16 > .w-full > tbody > tr > :nth-child(1)').invoke('text').then((aveSalePrevYearNumber) => {
                const newAveSalePrevYearNumber = parseInt(aveSalePrevYearNumber.replace(/[Days]/g, ''), 10)
                expect(newAveSalePrevYearNumber).equal(Math.round(trend.items[0].monthly_listing_trends.items[0].one_year_prior.sold.days_on_market.avg))
            })
            // average sale time section current year/same month number
            cy.get('#days-on-market-card > .px-16 > .mt-16 > .w-full > tbody > tr > .bg-background').invoke('text').then((aveSaleCurrYearNumber) => {
                const newAveSaleCurrYearNumber = parseInt(aveSaleCurrYearNumber.replace(/[Days]/g, ''), 10)
                expect(newAveSaleCurrYearNumber).equal(Math.floor(trend.items[0].monthly_listing_trends.items[0].sold.days_on_market.avg))
            })
            // average sale time section current diff percentage
            cy.get('#days-on-market-card > .px-16 > .mt-16 > .w-full > tbody > tr > .whitespace-no-wrap').invoke('text').then((aveSalediffPercentage) => {
                const newAveSalediffPercentage = parseFloat(aveSalediffPercentage.replace(/[%]/g, ''), 10)
                const math = (trend.items[0].monthly_listing_trends.items[0].one_year_prior.sold.days_on_market.avg_current_diff_percentage)
                expect(newAveSalediffPercentage).equal(parseFloat((math * 100).toFixed(1), 10))
            })
            // breakdown of home sale times section under 30 days
            cy.get('#home-sale-times-card > .w-full > .mt-16 > .-mt-8 > .pb-16 > .p2 > :nth-child(1)').invoke('text').then((underThirtyDays) => {
                const newUnderThirtyDays = parseInt(underThirtyDays, 10)
                expect(newUnderThirtyDays).equal(Math.round(trend.items[0].monthly_listing_trends.items[0].sold.sale_times.under_30_days))
            })
            // breakdown of home sale times section in 30-90 days
            cy.get('#home-sale-times-card > .w-full > .mt-16 > .-mt-8 > :nth-child(2) > .p2 > :nth-child(1)').invoke('text').then((thirtyToNinetyDays) => {
                const newThirtyToNinetyDays = parseInt(thirtyToNinetyDays, 10)
                expect(newThirtyToNinetyDays).equal(Math.round(trend.items[0].monthly_listing_trends.items[0].sold.sale_times.between_30_and_90_days))
            })
            // breakdown of home sale times section over 90 days
            cy.get('#home-sale-times-card > .w-full > .mt-16 > .-mt-8 > :nth-child(3) > .p2 > :nth-child(1)').invoke('text').then((overNinetyDays) => {
                const newOverNinetyDays = parseInt(overNinetyDays, 10)
                expect(newOverNinetyDays).equal(Math.round(trend.items[0].monthly_listing_trends.items[0].sold.sale_times.over_90_days))
            })
            // breakdown of home sale times section fastest sale & slowest sale listing cards 
            cy.get('#home-sale-times-card>div:nth-child(1)>div:nth-child(2)>div:nth-child(2)').should('be.visible')
            // key take away insight in breakdown of home sale times section
            cy.get('#home-sale-times-card > .w-full > .card_sidebar-container > .card_sidebar-content > .p2').invoke('text').then((breakDownOfHomeSaleTimesInsight) => {
                expect(breakDownOfHomeSaleTimesInsight).equal(trend.items[0].monthly_listing_trends.items[0].sold.insights.sale_times.plain_text) 
            })
            // newest listings section is displayed
            cy.get('#trends-whats-available-listings-carousel > div').should('be.visible')
            // verify 'see all' button navigates to troy location page
            cy.get('#trends-whats-available-see-all-button').click()
            cy.url().should('include', '/mi/troy')
            // verify the title of the location page is Troy,MI
            cy.get('#location-list-view-header > h1 > strong').invoke('text').then((titleLocationName) => {
                expect(titleLocationName).equal('Troy, MI')
            })
            cy.go('back')
            // verify mls disclaimer is displayed
            cy.get('#trends-mls-disclaimers').should('be.visible')
            // verify mls disclaimer has text
            cy.get('#trends-mls-disclaimers').click()
            cy.get('.trends-mls-disclaimers-markdown > p').invoke('text').then((mlsTextTrendPage) => {
                expect(mlsTextTrendPage).to.contain('Provided through IDX via MiRealSource, as the "Source MLS", courtesy of the Originating MLS shown on the property listing, as the Originating MLS') 
            })
            // trends contact section is visible
            cy.get('#trends-contact-section').should('be.visible')
            // trends lead form is visible
            cy.get('#trends-contact-section-lead-form').should('be.visible')
            // contact section disclaimer is visible
            cy.get('#contact-section-disclaimer').should('be.visible')
            // trends seo breadcrumb is visible
            cy.get('#trends-seo-breadrumb > ol').should('be.visible')
            // related trend reports section is visible
            cy.get('#trends-related-reports').should('be.visible')
        })
    })
})