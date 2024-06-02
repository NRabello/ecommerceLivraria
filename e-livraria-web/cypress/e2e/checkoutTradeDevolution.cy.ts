describe('Testing the buy process', () => {
    beforeEach(() => {
        cy.viewport(1280, 1024);
    });

    it('Buy Process', () => {
        cy.visit('/book/shop/1');
        cy.wait(500);
        cy.get('#quantity').select('3');
        cy.get('#btn-addToCart').click();

        cy.visit('/book/shop/2');
        cy.wait(500);
        cy.get('#quantity').select('2');
        cy.get('#btn-addToCart').click();

        cy.visit('/book/shop/3');
        cy.wait(500);
        cy.get('#quantity').select('5');
        cy.get('#btn-addToCart').click();

        cy.visit('/');
        cy.get('#cart-button').click();
        cy.wait(1000);
        cy.get('#shopping-cart').should('be.visible');
        cy.get('#checkout-button').click();
        cy.url().should('include', '/book/shop/checkout');

        cy.get('#btn-add-address').click();
        cy.get('#address-modal').should('exist');
        cy.get('#typeresidence').select('House');
        cy.get('#patioType').type('Rua');
        cy.get('#publicArea').type('Rua Teste');
        cy.get('#numberAddrs').type('123');
        cy.get('#neighborhood').type('Bairro Teste');
        cy.get('#cep').type('12345-678');
        cy.get('#city').type('Cidade Teste');
        cy.get('#state').type('Estado Teste');
        cy.get('#country').type('País Teste');
        cy.get('#btn-salvar-endereco').click();
        cy.get('#address-modal').should('not.exist');

        cy.get('#address-1').eq(0).click();
        cy.get('#creditCard-0').click();
        cy.get('#creditCard-1').click();
        cy.get('#creditCard-2').click();

        cy.get('#cupom').type('TROCA150');
        cy.get('#btn-aplicar-cupom').click();
        cy.get('#valor-total').should('contain.text', 'R$ 250.50');

        cy.get('#cupom').type('PRIMEIRA15');
        cy.get('#btn-aplicar-cupom').click();
        cy.get('#valor-total').should('contain.text', 'R$ 212.93');

        cy.get('#btn-buy').click();
        cy.get('#payment-modal').should('be.visible');

        cy.get('#value-card-0').type('100');
        cy.get('#value-card-1').type('100');
        cy.get('#value-card-2').type('12.93');
        cy.get('#btn-fechar-modal-metodoPagamento').click();

        cy.visit("/client/orders");
        cy.wait(500);

    });
});
