/// <reference types="cypress" />

import { rand, randCompanyName, randDomainName, randLine, randParagraph, randSentence, randUrl, randWord } from '@ngneat/falso';

var competitorName
var domain
var link
var description
var strengths
var weaknesses

//describe('Competitor', () => {
beforeEach(() => {
  console.log('sdsd');
  console.log(Cypress.env('local'))
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 7);
  cy.visit('/');
  //cy.getCookies().should('be.empty')
  cy.setCookie(
    'success_auth',
    'eyJpdiI6IitaU2JZSXNmYkdBR3FVV1hteFpYRnc9PSIsInZhbHVlIjoiMU1RcW9IOUw2VWxkbDkxMk5sb1lSYlpCVUc5bk41VmhqbnFJdnQvR0JlMENzdWJleW01ZVgyL2FPSUhaMmZQS0VMLy9xTVBjR2dWcms0VVp4WjUyQ2QvTWNaTE1BNFlNSWxXbkYxYWNzdkE9IiwibWFjIjoiMjc5MTA3OTA3YTM0MmI2Mjg2NWQxYzU1ZTIxOWVkZTk1YjYwZmJkODA4ZmY4OTM3YTIyZDFkMDM1MWFkZTJlOSIsInRhZyI6IiJ9',
    {
      domain: '.success.app',
      path: '/',
      expires: futureDate.toUTCString(),
    });
  cy.visit('/settings/competitors');
})


it('can add new competitor with only required field', () => {
  competitorName = randCompanyName()
  //cy.get('[data-test=new-todo]').type(`${newItem}{enter}`)

  cy.get('[data-test-element=btn-competitors-create]').click()
  cy.get('[data-test-element="input-competitors-name"]').type(`${competitorName}{enter}`)
  cy.get('[data-test-element="btn-competitors-save"]').click()
})

it('can add new competitor with all fields', () => {
  competitorName = randCompanyName()
  domain = randDomainName()
  link = randUrl()
  description = randSentence({ length: 1 })
  strengths = randSentence({ length: 1 })
  weaknesses = randSentence({ length: 1 })

  cy.get('[data-test-element="btn-competitors-create"]').click()
  cy.get('[data-test-element="input-competitors-name"]').type(`${competitorName}{enter}`)
  cy.get('[data-test-element="input-competitors-domain"]').type(`${domain}{enter}`)
  cy.get('[data-test-element="input-competitors-link"]').type(`${link}{enter}`)
  cy.get('[data-test-element="input-competitors-description"]').type(`${description}{enter}`)
  cy.get('[data-test-element="input-competitors-strengths"]').type(`${strengths}{enter}`)
  cy.get('[data-test-element="input-competitors-weaknesses"]').type(`${weaknesses}{enter}`)

  cy.get('[data-test-element="btn-competitors-save"]').click()
})

it('can update existing competitor', () => {

  competitorName = randCompanyName()
  domain = randDomainName()
  link = randUrl()
  description = randSentence({ length: 1 })
  strengths = randSentence({ length: 1 })
  weaknesses = randSentence({ length: 1 })

  cy.get('[data-test-element="btn-competitors-edit"]').first().click()
  cy.get('[data-test-element="input-competitors-name"]').type('{selectAll}{backspace}').type(`${competitorName}{enter}`)
  cy.get('[data-test-element="input-competitors-domain"]').clear().type(`${domain}{enter}`)
  cy.get('[data-test-element="input-competitors-link"]').clear().type(`${link}{enter}`)
  cy.get('[data-test-element="input-competitors-description"]').type(`${description}{enter}`)
  cy.get('[data-test-element="input-competitors-strengths"]').clear().type(`${strengths}{enter}`)
  cy.get('[data-test-element="input-competitors-weaknesses"]').clear().type(`${weaknesses}{enter}`)

  cy.get('[data-test-element="btn-competitors-save"]').click()
})

it('can delete competitor', () => {
  cy.get('[data-test-element="btn-competitors-delete"]').first().click()
  cy.get('[data-test-element="btn-competitors-delete"]').first().click()
})

it('should show required field error when try to create new competitor ', () => {
  cy.get('[data-test-element="btn-competitors-create"]').click()
  cy.get('[data-test-element="input-competitors-name"]').type(`{enter}`)
  cy.get('[data-test-element="btn-competitors-save"]').click()
  cy.get('[data-test-element="label-competitors-name-error"]')
    .should('contain', 'Required field. ')
})

it('should show competitor already exist when try to create new competitor ', () => {
  cy.get('[data-test-element="btn-competitors-create"]').click()
  cy.get('[data-test-element="input-competitors-name"]').type(`Salesforce{enter}`)
  cy.get('[data-test-element="btn-competitors-save"]').click()
  cy.get('[data-test-element="label-competitors-name-error"]')
    .should('contain', 'Competitor already exists.')
})

it.skip('should show maximum character limit on Name when try to create new competitor', () => {
  competitorName = randParagraph({ length: 1 })

  cy.get('[data-test-element="btn-competitors-create"]').click()
  cy.get('[data-test-element="input-competitors-name"]').type(`${competitorName}{enter}`)
  cy.get('[data-test-element="btn-competitors-save"]').click()
  cy.get('[data-test-element="label-competitors-name-error"]')
    .should('contain', 'Only maximum of 255 characters allowed')
})

it.skip('should show maximum character limit on Domain when try to create new competitor', () => {
  competitorName = randCompanyName()
  domain = randSentence()

  cy.get('[data-test-element="btn-competitors-create"]').click()
  cy.get('[data-test-element="input-competitors-name"]').type(`${competitorName}{enter}`)
  cy.get('[data-test-element="input-competitors-domain"]').type(`${domain}{enter}`)
  cy.get('[data-test-element="btn-competitors-save"]').click()
  cy.get('[data-test-element="label-competitors-domain-error"]')
    .should('contain', 'The domain format is invalid.')
})

it.skip('should show maximum character limit on Description when try to create new competitor', () => {
  competitorName = randCompanyName()
  description = randParagraph({ length: 20 })

  cy.get('[data-test-element="btn-competitors-create"]').click()
  cy.get('[data-test-element="input-competitors-name"]').type(`${competitorName}{enter}`)

  cy.get('[data-test-element="input-competitors-description"]').type(`${description} {enter}`)
  cy.get('[data-test-element="btn-competitors-save"]').click()
  cy.get('[data-test-element="label-partial-editor-box-description-error"]')
    .should('contain', '')
})

it.skip('should show maximum character limit on Strengths when try to create new competitor', () => {

  competitorName = randCompanyName()
  strengths = randSentence({ length: 10 })

  cy.get('[data-test-element="btn-competitors-create"]').click()
  cy.get('[data-test-element="input-competitors-name"]').type(`${competitorName}{enter}`)
  cy.get('[data-test-element="input-competitors-strengths"]').type(`${strengths}} {enter}`)
  cy.get('[data-test-element="label-competitors-strengths-error"]')
    .should('contain', 'Only maximum of 1000 characters allowed')
})

it.skip('should show maximum character limit on Weaknesses when try to create new competitor', () => {

  competitorName = randCompanyName()
  weaknesses = randSentence({ length: 10 })

  cy.get('[data-test-element="btn-competitors-create"]').click()
  cy.get('[data-test-element="input-competitors-name"]').type(`${competitorName}{enter}`)
  cy.get('[data-test-element="input-competitors-weaknesses"]').type(`${weaknesses}{enter}`)
  cy.get('[data-test-element="btn-competitors-save"]').click()
  cy.get('[data-test-element="label-competitors-weaknesses-error"]')
    .should('contain', 'Only maximum of 1000 characters allowed')
})

it('should show invalid Domain when try to create new competitor', () => {

  competitorName = randCompanyName()
  domain = randWord()

  cy.get('[data-test-element="btn-competitors-create"]').click()
  cy.get('[data-test-element="input-competitors-name"]').type(`${competitorName}{enter}`)
  cy.get('[data-test-element="input-competitors-domain"]').type(`${domain}{enter}`)
  cy.get('[data-test-element="btn-competitors-save"]').click()
  cy.get('[data-test-element="label-competitors-domain-error"]')
    .should('contain', 'The domain format is invalid.')
})

it('should show invalid link format error when trying to create new competitor with invalid link', () => {
  competitorName = randCompanyName()
  domain = randDomainName()
  link = randCompanyName()

  cy.get('[data-test-element="btn-competitors-create"]').click()
  cy.get('[data-test-element="input-competitors-name"]').type(`${competitorName}{enter}`)
  cy.get('[data-test-element="input-competitors-domain"]').type(`${domain}{enter}`)
  cy.get('[data-test-element="input-competitors-link"]').type(`${link}{enter}`)
  cy.get('[data-test-element="btn-competitors-save"]').should('be.disabled')
  cy.get(`[data-test-element="label-competitors-link-error"]`)
    .should('contain', 'The link format is invalid')
})

it('should show required field error when try to update existing competitor ', () => {
  cy.get('[data-test-element="btn-competitors-edit"]').first().click()
  cy.get('[data-test-element="input-competitors-name"]').type(`{selectAll}{backspace}`)
  cy.get('[data-test-element="btn-competitors-save"]').click()
  cy.get('[data-test-element="label-competitors-name-error"]')
    .should('contain', 'Required field. ')
})

it('should show competitor already exist when try to update existing competitor ', () => {
  cy.get('[data-test-element="btn-competitors-edit"]').first().click()
  cy.get('[data-test-element="input-competitors-name"]').type(`{selectAll}{backspace}`).type(`Salesforce{enter}`)
  cy.get('[data-test-element="btn-competitors-save"]').click()
  cy.get('[data-test-element="label-competitors-name-error"]')
    .should('contain', 'Competitor already exists')
})

it.skip('should show maximum character limit when try to update existing competitor', () => {
  competitorName = randParagraph({ length: 2 })
  domain = randSentence()
  link = randUrl({ length: 3 })
  description = randParagraph({ length: 20 })
  strengths = randSentence({ length: 10 })
  weaknesses = randSentence({ length: 10 })

  cy.get('[data-test-element="btn-competitors-edit"]').first().click()
  cy.get('[data-test-element="input-competitors-name"]').type(`${competitorName}{enter}`)
  cy.get('[data-test-element="input-competitors-domain"]').type(`${domain}{enter}`)
  // cy.get('[data-test-element="input-competitors-link"]').type(`${link}{enter}`)
  cy.get('[data-test-element="input-competitors-description"]').type(`${description} {enter}`)
  cy.get('[data-test-element="input-competitors-strengths"]').type(`${strengths}} {enter}`)
  cy.get('[data-test-element="input-competitors-weaknesses"]').type(`${weaknesses}{enter}`)
  cy.get('[data-test-element="btn-competitors-save"]').click()
  cy.get('[data-test-element="label-competitors-name-error"]')
    .should('contain', 'Only maximum of 255 characters allowed')
  cy.get('[data-test-element="label-competitors-domain-error"]')
    .should('contain', 'The domain format is invalid.')
  cy.get('[data-test-element="label-partial-editor-box-description-error"]')
    .should('contain', '500005')
  cy.get('[data-test-element="label-competitors-strengths-error"]')
    .should('contain', 'Only maximum of 1000 characters allowed')
  cy.get('[data-test-element="label-competitors-weaknesses-error"]')
    .should('contain', 'Only maximum of 1000 characters allowed')
})
//})