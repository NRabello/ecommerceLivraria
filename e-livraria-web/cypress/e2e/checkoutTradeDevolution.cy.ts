describe('Testing trade and devolution Coupons', () => {
    beforeEach(() => {
        cy.viewport(1280, 1024);
    })

    it('Open cart', () => {
        cy.visit('/book/shop/1');
        cy.wait(500)
        cy.get('#quantity').select('3')
        cy.get('#btn-addToCart').click();

        cy.visit('/book/shop/2');
        cy.wait(500)
        cy.get('#quantity').select('3')
        cy.get('#btn-addToCart').click();


        cy.get('#cart-button').click();
        cy.wait(1000);
        cy.get('#shopping-cart').should('be.visible');

        cy.get('#checkout-button').click();
        cy.url().should('include', '/book/shop/checkout');

        cy.get('#address-0').eq(0).click()
        cy.get('#creditCard-0').click()
        cy.get('#creditCard-1').click()

        cy.get('#cupom').type('TROCA150')
        cy.get('#btn-aplicar-cupom').click()
        cy.get('#valor-total').should('contain.text','R$ 162.00')

        cy.get('#cupom').type('PRIMEIRA15')
        cy.get('#btn-aplicar-cupom').click()
        cy.get('#valor-total').should('contain.text','R$ 137.70')

        cy.get('#btn-remove-cupom').click()
        cy.get('#valor-total').should('contain.text','R$ 312.00')

        cy.get('#cupom').type('TROCA150')
        cy.get('#btn-aplicar-cupom').click()
        cy.get('#valor-total').should('contain.text','R$ 162.00')

        cy.get('#cupom').type('PRIMEIRA15')
        cy.get('#btn-aplicar-cupom').click()
        cy.get('#valor-total').should('contain.text','R$ 137.70')

        cy.get('#btn-buy').click()
        cy.get('#payment-modal').should('be.visible');

        cy.get('#value-card-0').type('100')
        cy.get('#value-card-1').type('37.70')
        cy.get('#btn-fechar-modal-metodoPagamento').click()
        
        cy.visit("/client/orders")
        cy.wait(500)
    })
})
