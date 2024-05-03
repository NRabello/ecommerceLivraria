describe('Selected book Page', () => {
    beforeEach(() => {
        cy.viewport(1280, 1024)
        cy.visit('/book/shop/1')
        cy.wait(1000)
    })
  
    it('should update quantity', () => {
        cy.get('#quantity').select('5')
        cy.get('#quantity').should('have.value', '5')

        cy.get('#btn-addToCart').should('contain.text', 'Adicionar ao carrinho   R$ 240,00')
        cy.get('#btn-buyNow').should('contain.text', 'Comprar agora   R$ 240,00')
    });
    
    it('should calculate shipping', () => {
        cy.get('#cep').type('12345678')
        cy.get('#btn-calcularFrete').contains('Calcular').click()
        cy.get('#frete').contains('Chega em 5 dias úteis: R$ 15,00') 
    })

    it('should add product to cart', () => {
        cy.on('window:alert', (str) => {
          expect(str).to.equal('Produto adicionado ao carrinho')
        })
        cy.get('#btn-addToCart').contains('Adicionar ao carrinho').click()     
    })

    it('should buy product', () => {
        cy.get('#btn-buyNow').contains('Comprar agora').click()
        cy.url().should('include', '/book/shop/checkout')
    });
  })