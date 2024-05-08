describe('Cancel Order', () => {
    beforeEach(() => {
        cy.viewport(1280, 1024);
        cy.visit('/client/orders');
        cy.wait(1000);
    });

    it('cancel order', () => {
        cy.window().then(win => {
            cy.stub(win, 'confirm').returns(true);
        });
        cy.get(`#id-pedido-45`).should('contain.text', `#45`);
        cy.get('#btn-cancelar').click();
        cy.get(`#id-pedido-45`).should('not.exist');

    });
});
