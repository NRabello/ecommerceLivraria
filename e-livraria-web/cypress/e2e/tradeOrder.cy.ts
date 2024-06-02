describe('trade Order', () => {
    beforeEach(() => {
        cy.viewport(1280, 1024);
    });

    //colocar status como EM_PROCESSAMENTO

    it('refund order', () => {
        cy.window().then(win => {
            cy.stub(win, 'confirm').returns(true);
        });

        cy.visit("/admin/orders")

        cy.get("#select-status-2").select("APROVADA")
        cy.get("#salvar-2").click();
        cy.get("#status-2").contains("APROVADA")

        cy.get("#select-status-2").select("EM_TRANSPORTE")
        cy.get("#salvar-2").click();
        cy.get("#status-2").contains("EM_TRANSPORTE")

        cy.get("#select-status-2").select("ENTREGUE")
        cy.get("#salvar-2").click();
        cy.get("#status-2").contains("ENTREGUE")

        cy.visit('/client/orders');
        cy.wait(1000);


        cy.get('#btn-troca').click();

        cy.get('#product-checkbox-0').check();
        cy.get('#product-quantity-0').clear().type('{uparrow}');

        cy.get('#product-checkbox-1').check();

        cy.get('button').contains('Confirmar Troca').click();
        cy.wait(500)
        cy.get('#status-0').contains('EM_TROCA');

        cy.visit("/admin/orders")
        cy.get("#select-status-2").select("TROCA_AUTORIZADA")
        cy.get("#salvar-2").click();
        cy.get("#status-2").contains("TROCA_AUTORIZADA")

        cy.visit('/client/orders');
        cy.wait(1000);

        cy.window().then(win => {
            cy.stub(win, 'confirm').returns(true);
        });
        cy.get('#btn-enviar-itens').click();
        cy.wait(500)
        cy.get('#status-0').contains('ITENS_ENVIADOS_TROCA');

        cy.visit("/admin/orders")
        cy.get("#select-status-2").select("ITENS_RECEBIDOS_TROCA")
        cy.get("#salvar-2").click();
        cy.get("#status-2").contains("ITENS_RECEBIDOS_TROCA")

        cy.get("#select-status-2").select("TROCADO")
        cy.get("#salvar-2").click();
        cy.get("#status-2").contains("TROCADO")


    });
});