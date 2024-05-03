describe('create client page', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('/client/create');
        cy.wait(1000);
    });

    it('Submit empty form', () => {
        cy.get('form').submit();
        cy.on('window:alert', (message) => {
            expect(message).to.equal('Preencha todos os campos obrigatórios (*)');
        }); 
    })

    it('Create a new client', () => {
        cy.get('#name').type('John Doe');
        cy.get('#type').type('Celular');
        cy.get('#gender').type('Masculino');
        cy.get('#ddd').type('11');
        cy.get('#dateBirth').type('1990-01-01');
        cy.get('#number').type('40028922');
        cy.get('#email').type('john.doe@example.com');
        cy.get('#cpf').type('12312312312');
        cy.get('#password').type('Senha@123');
        cy.get('#confirmPassword').type('Senha@123');

        cy.get(`#cPatioType-${0}`).type('Public');
        cy.get(`#cPublicArea-${0}`).type('Avenue 1 Orlando FL 32801');
        cy.get(`#cNumberAddrs-${0}`).type('123');  
        cy.get(`#cNeighborhood-${0}`).type('Downtown');
        cy.get(`#cCep-${0}`).type('32801');
        cy.get(`#cCity-${0}`).type('Orlando');
        cy.get(`#cState-${0}`).type('Florida');
        cy.get(`#cCountry-${0}`).type('USA');
        cy.get(`#cObservations-${0}`).type('Near the Disney World');
        cy.get(`#cNameAddrs-${0}`).type('My House');

        cy.get(`#dPatioType-${0}`).type('Public');
        cy.get(`#dPublicArea-${0}`).type('Avenue 2 Orlando FL 32801');
        cy.get(`#dNumberAddrs-${0}`).type('321');  
        cy.get(`#dNeighborhood-${0}`).type('Town Center');
        cy.get(`#dCep-${0}`).type('32801');
        cy.get(`#dCity-${0}`).type('Seattle');
        cy.get(`#dState-${0}`).type('Washington');
        cy.get(`#dCountry-${0}`).type('USA');
        cy.get(`#dNameAddrs-${0}`).type('My Girfriend House');

        cy.get(`#cardNumber-${0}`).type('1234567890123456');
        cy.get(`#cardBanner-${0}`).select('MasterCard');
        cy.get(`#expirationDate-${0}`).type('2025-01-01');
        cy.get(`#securityCode-${0}`).type('123');
        cy.get(`#cardName-${0}`).type('Giuseppe Camole');

        cy.on('window:alert', (message) => {
            expect(message).to.equal('Cliente criado com sucesso');
        });
        cy.get('form').submit();
    });

    it('Password Confirmation', () => {
        cy.get('#name').type('John Doe');
        cy.get('#type').type('Celular');
        cy.get('#gender').type('Masculino');
        cy.get('#ddd').type('11');
        cy.get('#dateBirth').type('1990-01-01');
        cy.get('#number').type('40028922');
        cy.get('#email').type('john.doe@example.com');
        cy.get('#cpf').type('12312312312');
        cy.get('#password').type('Senha@123');
        cy.get('#confirmPassword').type('Senha@321');

        cy.get(`#cPatioType-${0}`).type('Public');
        cy.get(`#cPublicArea-${0}`).type('Avenue 1 Orlando FL 32801');
        cy.get(`#cNumberAddrs-${0}`).type('123');  
        cy.get(`#cNeighborhood-${0}`).type('Downtown');
        cy.get(`#cCep-${0}`).type('32801');
        cy.get(`#cCity-${0}`).type('Orlando');
        cy.get(`#cState-${0}`).type('Florida');
        cy.get(`#cCountry-${0}`).type('USA');
        cy.get(`#cObservations-${0}`).type('Near the Disney World');
        cy.get(`#cNameAddrs-${0}`).type('My House');

        cy.get(`#dPatioType-${0}`).type('Public');
        cy.get(`#dPublicArea-${0}`).type('Avenue 2 Orlando FL 32801');
        cy.get(`#dNumberAddrs-${0}`).type('321');  
        cy.get(`#dNeighborhood-${0}`).type('Town Center');
        cy.get(`#dCep-${0}`).type('32801');
        cy.get(`#dCity-${0}`).type('Seattle');
        cy.get(`#dState-${0}`).type('Washington');
        cy.get(`#dCountry-${0}`).type('USA');
        cy.get(`#dNameAddrs-${0}`).type('My Girfriend House');

        cy.get(`#cardNumber-${0}`).type('1234567890123456');
        cy.get(`#cardBanner-${0}`).select('MasterCard');
        cy.get(`#expirationDate-${0}`).type('2025-01-01');
        cy.get(`#securityCode-${0}`).type('123');
        cy.get(`#cardName-${0}`).type('Giuseppe Camole');

        cy.on('window:alert', (message) => {
            expect(message).to.equal('As senhas não correspondem');
        });
        cy.get('form').submit();
    });

    it('Strong password', () => {
        cy.get('#name').type('John Doe');
        cy.get('#type').type('Celular');
        cy.get('#gender').type('Masculino');
        cy.get('#ddd').type('11');
        cy.get('#dateBirth').type('1990-01-01');
        cy.get('#number').type('40028922');
        cy.get('#email').type('john.doe@example.com');
        cy.get('#cpf').type('12312312312');
        cy.get('#password').type('nicolassss');
        cy.get('#confirmPassword').type('nicolassss');

        cy.get(`#cPatioType-${0}`).type('Public');
        cy.get(`#cPublicArea-${0}`).type('Avenue 1 Orlando FL 32801');
        cy.get(`#cNumberAddrs-${0}`).type('123');  
        cy.get(`#cNeighborhood-${0}`).type('Downtown');
        cy.get(`#cCep-${0}`).type('32801');
        cy.get(`#cCity-${0}`).type('Orlando');
        cy.get(`#cState-${0}`).type('Florida');
        cy.get(`#cCountry-${0}`).type('USA');
        cy.get(`#cObservations-${0}`).type('Near the Disney World');
        cy.get(`#cNameAddrs-${0}`).type('My House');

        cy.get(`#dPatioType-${0}`).type('Public');
        cy.get(`#dPublicArea-${0}`).type('Avenue 2 Orlando FL 32801');
        cy.get(`#dNumberAddrs-${0}`).type('321');  
        cy.get(`#dNeighborhood-${0}`).type('Town Center');
        cy.get(`#dCep-${0}`).type('32801');
        cy.get(`#dCity-${0}`).type('Seattle');
        cy.get(`#dState-${0}`).type('Washington');
        cy.get(`#dCountry-${0}`).type('USA');
        cy.get(`#dNameAddrs-${0}`).type('My Girfriend House');

        cy.get(`#cardNumber-${0}`).type('1234567890123456');
        cy.get(`#cardBanner-${0}`).select('MasterCard');
        cy.get(`#expirationDate-${0}`).type('2025-01-01');
        cy.get(`#securityCode-${0}`).type('123');
        cy.get(`#cardName-${0}`).type('Giuseppe Camole');

        cy.on('window:alert', (message) => {
            expect(message).to.equal('A Senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma letra minúscula e um caractere especial');
        });
        cy.get('form').submit();
    });

    it('Button voltar', () => {
        cy.get('#voltar').click();
        cy.url().should('eq', 'http://localhost:3000/client');
    });
});