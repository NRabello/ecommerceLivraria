describe('Checkout Process', () => {
    beforeEach(() => {
        cy.viewport(1280, 1024);
        cy.visit('/book/shop/1');
        cy.get('#btn-addToCart').click();
        cy.wait(1000);
    });
  
    it('Open cart', () => {
        cy.get('#cart-button').click();
        cy.wait(500);
        cy.get('#shopping-cart').should('be.visible');
    })

    it('Go to Checkout', () => {
        cy.get('#cart-button').click();
        cy.get('#shopping-cart').should('be.visible');

        cy.get('#checkout-button').click();
        cy.url().should('include', '/book/shop/checkout');
    });

    it('Remove product from cart' , () => {
        cy.get('#cart-button').click();
        cy.get('#shopping-cart').should('be.visible');
        cy.wait(500);
        cy.get('#btn-remove-from-cart-0').click();
        cy.get('#shopping-cart').should('not.contain.text', 'Para Sempre Seu');
    })

    it('Update quantity of product in cart', () => {
        cy.get('#cart-button').click();
        cy.get('#shopping-cart').should('be.visible');

        cy.get('#quantity-0').select('2');
        cy.get('#quantity-0').should('have.value', '2');
        cy.get('#valor-subtotal').should('have.text', 'R$ 96,00');
    })

    it('Close cart', () => {
        cy.get('#cart-button').click();
        cy.get('#shopping-cart').should('be.visible');
        cy.wait(500);
        cy.get('#btn-continuar-comprando').click();
        cy.get('#shopping-cart').should('not.exist');
    })
  });