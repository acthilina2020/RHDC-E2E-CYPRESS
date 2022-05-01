# Rockethomes End-to-end Testing
End to end testing for Rockethomes.com


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for end-to-end testing of Rockethomes.com. 


### Prerequisites

Cypress requires the following dependencies:
- macOS 10.9 and above (64-bit only)
- Or Windows 7 and above
- Node.js (https://nodejs.org/en/) >= v12
- VS Code
- Chrome browser


### Start running tests

To start running locally


#### 1. Clone the repo

```
$ git clone git@github.com:rockethomes/rhdc-e2e-testing.git
$ cd rhdc-e2e-testing
```

#### 2. Install dependencies

```
$ npm install
```


#### 3. Add below settings in `cypress.json` file 

 
Mailosaur API key should be included in the `env`
- "env": { "MAILOSAUR_API_KEY": "change_me" } }
- Open 'cypress.json' file and make sure the URL is correct
- Open cypress/support/commands.js file and make sure the email and the password in `sign in` custom command is correct


### Open cypress test runner

- `npx cypress open` in the terminal
- Above command will open the test runner
- On the test runner, select which test to run from each folder
- Or click on 'Run all specs' to run all tests


### Documents to read

Cypress installation
`(https://docs.cypress.io/guides/getting-started/installing-cypress.html#System-requirements)`

Chai assertions
`(https://docs.cypress.io/guides/references/assertions.html#Chai)`

Cypress best practices
`(https://docs.cypress.io/examples/examples/tutorials.html#Best-Practices)`

Using xpath with cypress
`(https://www.npmjs.com/package/cypress-xpath)`

Visual testing with Applitools/cypress
`(https://applitools.com/tutorials/cypress.html)`
`(https://www.npmjs.com/package/@applitools/eyes-cypress)`


### Structure

Cypress is based on Javascript and uses `Mocha` framework and `Chai` assertion library.
Cypress is used for end-to-end testing and also for unit testing


#### Visual testing

- `Applitools` is used for visual testing in this project
- `Applitools` require an account creation to obtain access to a visual testing dashboard to see test results


### Data Fetching for end-to-end tests- API

- `cypress/fixtures` folder is used to store payload from each API for end-to-end tests. 
- Payload from each API call update it's content each time the end-to-end test is run
- Four API fixture examples are included in `cypress/fixtures` folder


### Using locators with Cypress

- cssSelectors are commonly used with Cypress
- Cypress test runner also comes with an in-built feature to inspect and grab cssSelector of elements
- ID/Xpath can also be used
- Example for usage of ID : //a[@id="header-nav-dropdown-notification”]
Html tag type+ID





