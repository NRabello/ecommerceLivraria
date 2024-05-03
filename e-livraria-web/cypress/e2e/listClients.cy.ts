describe('Client Page', () => {
    beforeEach(() => {
        cy.viewport(1280, 1024);
        cy.visit('/client');
        cy.wait(1000);
    });

    it('Search for a client', () => {
        cy.get('#search').type('Nicolas');
        cy.get('#pesquisar').click();
        cy.get('table').contains('Nicolas').should('exist');
    });

    it('Show all Clients', () => {
        cy.get('#search').clear();
        cy.get('#pesquisar').click();
        cy.get('table').find('tbody').find('tr').should('have.length', 7);
    })

    it('Open, navigate and close modal', () => {
        cy.get('table').find('tbody').find('tr').first().click();
        cy.get('#modal').should('exist');

        //aba Cliente
        cy.contains(`Nome: Nicolas`).should('exist');
        cy.get('#modal').contains('Gênero: Masculino').should('exist');
        cy.get('#modal').contains('Data de Nascimento: 2025-03-22').should('exist');
        cy.get('#modal').contains('CPF: 12312312312').should('exist');
        cy.get('#modal').contains('celular: 11 40028922').should('exist');
        cy.get('#modal').contains('Email: nicolas@gmail.com').should('exist');
        cy.get('#modal').contains('Ranking: 1').should('exist');

        // Aba Endereços de Cobranca
        cy.get('#btn-enderecoCobranca').contains('Endereços de Cobrança').click();
        cy.get('#modal').contains('Endereço 1:').should('exist');
        cy.get('#modal').contains('Nome:').should('exist');
        cy.get('#modal').contains('Número:').should('exist');
        cy.get('#modal').contains('CEP:').should('exist');
        cy.get('#modal').contains('Cidade:').should('exist');
        cy.get('#modal').contains('Estado:').should('exist');
        cy.get('#modal').contains('Pais:').should('exist');
        cy.get('#modal').contains('Bairro').should('exist');
        cy.get('#modal').contains('Tipo de Residência:').should('exist');
        cy.get('#modal').contains('Tipo de Logradouro:').should('exist');
        cy.get('#modal').contains('Logradouro:').should('exist');
        cy.get('#modal').contains('Observações:').should('exist');

        // Aba Endereços de Entrega
        cy.get('#btn-enderecoEntrega').contains('Endereços de Entrega').click();
        cy.get('#modal').contains('Endereço 1:').should('exist');
        cy.get('#modal').contains('Nome:').should('exist');
        cy.get('#modal').contains('Número:').should('exist');
        cy.get('#modal').contains('CEP:').should('exist');
        cy.get('#modal').contains('Cidade:').should('exist');
        cy.get('#modal').contains('Estado:').should('exist');
        cy.get('#modal').contains('Pais:').should('exist');
        cy.get('#modal').contains('Bairro').should('exist');
        cy.get('#modal').contains('Tipo de Residência:').should('exist');
        cy.get('#modal').contains('Tipo de Logradouro:').should('exist');
        cy.get('#modal').contains('Logradouro:').should('exist');
        cy.get('#modal').contains('Observações:').should('exist');

        // Aba Cartão de Crédito
        cy.get('#btn-cartao').contains('Cartão de Crédito').click();
        cy.get('#modal').contains('Cartão 1:').should('exist');
        cy.get('#modal').contains('Número:').should('exist');
        cy.get('#modal').contains('Nome:').should('exist');
        cy.get('#modal').contains('Bandeira:').should('exist');
        cy.get('#modal').contains('Data de Expiração:').should('exist');
        cy.get('#modal').contains('Código de Segurança:').should('exist');

        cy.get("#btn-cliente").contains('Cliente').click();
        cy.get('#btn-fecharModal').contains('Fechar').click();
        cy.get('#modal').should('not.exist');
      });

      it('Inactive a Client', () => {

        cy.on('window:confirm', () => true);

        cy.get('#btn-inactive-6').click();
    
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Cliente inativado com sucesso');
        });
    
        cy.get('#table tbody tr').its('length').should('be.lessThan', 7);
      });

      it('Change password page', () => {
        cy.get('#btn-changePassword-0').click();
        cy.url().should('include', '/client/changePassword/2');
      });

      it('Edit client page', () => {
        cy.get('#btn-edit-0').click();
        cy.url().should('include', '/client/update/2');
      });
});