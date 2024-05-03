describe('Checkout Page', () => {
    beforeEach(() => {
        cy.viewport(1280, 1024);
        cy.visit('/book/shop/checkout');
        cy.wait(1000);
    })
  
    it('select address', () => {
      cy.get('#address-0').eq(0).click() 
      cy.get('.bg-gray-100.border-blue-500').should('exist')
    })
  
    it('select credit card', () => {
      cy.get('#creditCard-0').eq(0).click()
      cy.get('.bg-gray-100.border-blue-500').should('exist')
    })

    it('open, close and complete address modal', () => {
        cy.get('#address-modal').should('not.exist');
        cy.get('#btn-add-address').click();

        cy.get('#address-modal').should('exist');
    
        cy.get('#typeresidence').select('Casa');
        cy.get('#publicArea').type('Rua Teste');
        cy.get('#numberAddrs').type('123');
        cy.get('#neighborhood').type('Bairro Teste');
        cy.get('#cep').type('12345-678');
        cy.get('#city').type('Cidade Teste');
        cy.get('#state').type('Estado Teste');
        cy.get('#country').type('País Teste');

        cy.get('#btn-salvar-endereco').click();
    
        cy.get('#address-modal').should('not.exist');
    });

    it('dont complete address modal', () => {
        cy.get('#btn-add-address').click();
        cy.get('#btn-salvar-endereco').click();
    
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Por favor, preencha todos os campos obrigatórios.')
        })
    })

    it('open, close and complete credit card modal', () => {
        cy.get('#credit-card-modal').should('not.exist');
        cy.get('#btn-add-credit-card').click();
        
        cy.get('#credit-card-modal').should('exist');
        
        cy.get('#cardNumber').type('1234567890123456');
        cy.get('#cardName').type('Nome Teste');
        cy.get('#expirationDate').type('12/2023');
        cy.get('#securityCode').type('123');
        cy.get('#cardBanner').select('Visa');
        
        cy.get('#btn-salvar-cartao').click();
        
        cy.get('#credit-card-modal').should('not.exist');
    });

    it('dont complete credit card modal', () => {
        cy.get('#btn-add-credit-card').click();
        cy.get('#btn-salvar-cartao').click();
    
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Por favor, preencha todos os campos obrigatórios.')
        })
    })
  
    it('remove a product', () => {
        cy.get('#btn-remove-prooduct-1').click()
        cy.get('.flex.p-6').should('have.length', 1)
        cy.get('#valor-total').should('contain.text','R$ 63,00')
    })
  
    it('should apply coupon', () => {
       cy.get('#cupom').type('PRIMEIRA15')
       cy.get('#btn-aplicar-cupom').click()
       cy.get('#valor-total').should('contain.text','R$ 99,15')
    })

    it('change quantity', () => {
        cy.get('#quantity-0').select('2')
        cy.get('#valor-total').should('contain.text','R$ 162,00')
    })

    it('try purchase with no address', () => {
        cy.get('#btn-buy').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Selecione um endereço!')
        })
    })

    it('try purchase with no credit card', () => {
        cy.get('#address-0').eq(0).click()
        cy.get('#btn-buy').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Selecione um cartão de crédito!')
        })
    })
  
    it('confirm purchase', () => {
        cy.get('#address-0').eq(0).click()
        cy.get('#creditCard-0').eq(0).click()
  
        cy.get('#btn-buy').click()
  
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Compra realizada com sucesso!')
        })
        cy.url().should('include', '/client/orders')
     })

  })
  