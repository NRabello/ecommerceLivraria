describe('home page', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('/');
    });

    it('Search for a book', () => {
        cy.get('#search').type('Para Sempre Seu');
        cy.get('#search').should('have.value', 'Para Sempre Seu');
    });

    it('Sort by price', () => {
        cy.get('#selectOptions').select('Menor preço');
        cy.get('#selectOptions').should('have.value', '2');
        cy.get('#selectOptions').select('Maior preço');
        cy.get('#selectOptions').should('have.value', '1');
    });

    it('Search for an empty term', () => {
        cy.get('#search').clear().type('{enter}');
        cy.get('.group').should('have.length', 20);
    });

    it('Navigate to product details', () => {
        cy.get('.group').first().click();
        cy.url().should('include', '/book/shop/'); 
    });
})