describe('Crypto App', function() {
    it('front page can be opened', function() {
      cy.visit('http://localhost:3000')
      cy.contains('Loading')
      cy.wait(6000)
      cy.contains('Begin your journey')

    })
  })