describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.visit('http://localhost:3000')
        const user = {
            username: 'tester',
            password: 'tester'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
    })

    it('Login form is shown when not logged in', function() {
        cy.contains('Login')
        cy.get('Blogs').should('not.exist')
    })

    it('Successful login with correct credentials', function() {
        cy.get('#username').type('tester')
        cy.get('#password').type('tester')
        cy.get('#loginButton').click()

        cy.contains('Logged in as tester')
    })

    it('Failed login with wrong credentials', function() {
        cy.get('#username').type('tester')
        cy.get('#password').type('not')
        cy.get('#loginButton').click()

        cy.contains('Login failed')
    })
})
