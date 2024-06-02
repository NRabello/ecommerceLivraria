describe('refund Order', () => {
    beforeEach(() => {
        cy.viewport(1280, 1024);
    });

    //colocar status como ENTRegue

    it('refund order', () => {
        cy.window().then(win => {
            cy.stub(win, 'confirm').returns(true);
        });

        cy.visit('/client/orders');
        cy.wait(1000);

        cy.get('#btn-devolucao-0').click();
        cy.wait(500)

        cy.visit("/admin/orders")
        cy.get("#select-status-3").select("DEVOLVIDO")
        cy.get("#salvar-3").click();
        cy.get("#status-3").contains("DEVOLVIDO")

    });
});
