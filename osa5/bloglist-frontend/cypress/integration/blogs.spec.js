
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

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'tester', password: 'tester' })
        })
        it('User can create a new blog', function() {
            cy.contains('New Blog').click()
            cy.get('#title').type('a blog created by cypress')
            cy.get('#author').type('testboy')
            cy.get('#url').type('www.testingthis.com')
            cy.contains('Create').click()

            cy.contains('show more').click()
            cy.contains('a blog created by cypress')
            cy.contains('testboy')
            cy.contains('www.testingthis.com')
        })

        it('A blog can be liked', function() {
            //cy.createBlog({ title: 'this', author: 'tester', url: 'blabla.com' })
            cy.contains('New Blog').click()
            cy.get('#title').type('a blog created by cypress')
            cy.get('#author').type('testboy')
            cy.get('#url').type('www.testingthis.com')
            cy.contains('Create').click()
            cy.contains('show more').click()
            cy.contains('0 likes')
            cy.get('#likeButton').click()
            cy.contains('1 likes')
        })

        it('A blog can be deleted', function() {
            //cy.createBlog({ title: 'forDelete', author: 'tester', url: 'blabla.com' })
            cy.contains('New Blog').click()
            cy.get('#title').type('forDelete')
            cy.get('#author').type('testboy')
            cy.get('#url').type('www.testingthis.com')
            cy.contains('Create').click()
            cy.contains('show more').click()
            cy.contains('forDelete')
            cy.contains('delete').click()
            cy.get('forDelete').should('not.exist')
        })
    })
})
