describe('Orders Page', () => {
    beforeEach(() => {
        cy.viewport(1280, 1024);
        cy.visit('/client/orders');
        cy.wait(1000);
    });
  
    it('request product exchange', () => {
      cy.get('#btn-troca').click();
  
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Solicitação de troca realizada com sucesso!');
      });
  
      cy.get('#status-0').contains('em troca');
      cy.get('#status-1').contains('em troca');
    });
  
    it('request product return', () => {
      cy.get('#btn-devolucao').click();
  
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Solicitação de devolução realizada com sucesso!' + '\n' + 'Utilize o cupom: DEVOLUCAO para usar o valor da devolução em sua próxima compra!');
      });

      cy.get('#status-0').contains('em devolução');
      cy.get('#status-1').contains('em devolução');
    });

    it('verify total price', () => {
        cy.get('#total-price').should('contain.text','Preço Total: R$ 147,00');
    })
  });
  