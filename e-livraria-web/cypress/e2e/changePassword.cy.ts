describe('ChangePassword Page Tests', () => {
    beforeEach(() => {
        cy.viewport(1280, 1024);
        cy.visit('/client/changePassword/2');
        cy.wait(1000);
    });

    it('Empty fields', () => {
        cy.get('#btn-salvar').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Preencha todos os campos');
        });
    });

    it('Differents passwords', () => {
        cy.get('#password').type('Senha123@');
        cy.get('#confirmPassword').type('Senha321@');
        cy.get('#btn-salvar').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal('As senhas não coincidem');
        });
    });

    it('Weak password', () => {
        cy.get('#password').type('weak');
        cy.get('#confirmPassword').type('weak');
        cy.on('window:alert', (str) => {
            expect(str).to.equal('A Senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma letra minúscula e um caractere especial');
        });
        cy.get('#btn-salvar').click();
    });

    it('Should return to client page when clicking "Voltar"', () => {
        cy.get('#btn-voltar').contains('Voltar').click();
        cy.url().should('include', '/client');
    });

    it('Should successfully change password with valid inputs', () => {
        cy.intercept('PUT', '/client/*', {
            statusCode: 200,
        }).as('updatePassword');

        cy.get('#password').type('NewStrongPassword123@');
        cy.get('#confirmPassword').type('NewStrongPassword123@');
        cy.get('#btn-salvar').click();

        cy.wait('@updatePassword').then(() => {
            cy.on('window:alert', (str) => {
                expect(str).to.equal('senha alterada com sucesso');
            });
        });

        cy.url().should('include', '/client');
    });
});