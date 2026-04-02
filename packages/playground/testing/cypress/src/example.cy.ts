describe('Cypress playground', () => {
  it('visits the app', () => {
    cy.visit('/')

    cy.contains('h1', 'Welcome')
  })

  it('checks a form interaction', () => {
    cy.visit('/form')

    cy.get('input[name="email"]').type('test@example.com')

    cy.get('button[type="submit"]').click()
  })
})
