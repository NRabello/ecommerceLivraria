describe('Coupon Management', () => {
    beforeEach(() => {
        cy.viewport(1280, 1024);
        cy.visit('/admin/coupon');
        cy.wait(1000);
    });

    it('add and delete a coupon from the list', () => {
        cy.get('#coupon-name').type('NEWCOUPON');
        cy.get('#coupon-value').type('20');
    
        cy.get('#btn-adicionar-cupom').click();
    
        cy.get('#coupon-name-2').contains(`NEWCOUPON`);
        cy.get('#coupon-value-2').contains(`20`);

        cy.get('#coupon-name-2').should('exist');
        cy.get('#coupon-value-2').should('exist');

        cy.get('#btn-delete-coupon-2').click();

        cy.get('#coupon-name-2').should('not.exist');
        cy.get('#coupon-value-2').should('not.exist');
    });
  });