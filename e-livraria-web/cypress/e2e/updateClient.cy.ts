describe('Update cliente Page', () => {
    beforeEach(() => {
        cy.viewport(1280, 1024);
        cy.visit('/client');
        cy.get('#btn-edit-6').click();
        cy.wait(1000);
    })
  
    it('Update client', () => {
        cy.get('#name').clear().type('Teste Cliente Att');
        cy.get('#btn-save-att').click();
        cy.wait(500);
        cy.url().should('include', '/client');
        cy.get('#client-name-6').should('contain', 'Teste Cliente Att');
    });

    it('Update client with empty name', () => {
        cy.get('#name').clear();
        cy.get('#btn-save-att').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Por favor, preencha todos os campos obrigatórios.');
        })
    })

    it('Button voltar', () => {
        cy.get('#btn-edit-voltar').click();
        cy.url().should('include', '/client');
    });
})