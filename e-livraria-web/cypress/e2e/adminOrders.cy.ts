describe('Admin Orders Page', () => {
    beforeEach(() => {
        cy.viewport(1280, 1024)
        cy.visit('/admin/orders')
        cy.wait(1000)
    })

    it('Have 2 orders', () => {
        cy.get('#table').should('exist')
        cy.get('#table').children('.border-b').should('have.length', 2)
    })

      it('changing order status', () => {
          cy.get('#select-status-0').select('Troca Autorizada')
          cy.on('window:alert', (str) => {
              expect(str).to.equal('Status do pedido 10234987 alterado para Troca Autorizada.')
          })
          cy.get('#salvar-0').contains('Salvar').click()
          cy.get('#status-0').contains('Troca Autorizada')
      })
})