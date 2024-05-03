const orders = [{
    id: 10234987,
    client: {
        id: 1,
        name: 'Joe Doe',
    },
    datePayment: '2024-03-25',
    expectedDeliveryDate: '2024-04-01',
    products: [
        {
            id: 1,
            name: 'Para Sempre Seu',
            author: 'Abby Jimenez',
            price: 48.00,
            imageSrc: '../../bookImages/para-sempre-seu.png',
            imageAlt: 'Para Sempre Seu - Abby Jimenez',
            synopsis: 'A Dra. Briana Ortiz é uma mulher forte, mas está muito cansada. Ela acabou de se divorciar, seu irmão precisa de um transplante de rim... e sabe a promoção no trabalho que ela estava esperando? Pelo jeito, é o novato intrometido quem vai conseguir o cargo. Jacob Maddox sabe que já ganhou a antipatia de Briana. Por isso, decide se explicar de forma incomum: numa carta escrita com caneta-tinteiro e papel especial. Bem, parece que, no fim das contas, ele não é tão ruim assim. Briana começa a trocar cartas com Jacob e passa a conhecer melhor o médico caladão que prefere uma vida sossegada a grandes eventos sociais. De repente, eles estão almoçando juntos e debatendo as vantagens de se ganhar um pônei e percebem que têm muito em comum, desde o encanto pela natureza até o gosto por histórias bizarras de hospital. Quando Jacob decide dar a Briana o melhor presente imaginável, ela se pergunta como poderá resistir a esse simpático médico… especialmente quando ele pede um favor que ela não pode recusar.',
            category: "Romance",
            year: '2021',
            publishing_company: 'Editora Paralela',
            edition: '1ª',
            ISBN: '978-65-5565-556-8',
            pages: 384,
            group: 'Gold',
            quantity: 2
        },
        {
            id: 2,
            name: 'Onde Está Daisy Mason?',
            author: 'Cara Hunter',
            price: 51.00,
            imageSrc: '../../bookImages/onde-esta-daisy-mason.png',
            imageAlt: 'Onde Está Daisy Mason? - Cara Hunter',
            synopsis: 'Daisy Mason, uma garota de oito anos, desaparece de uma festa de família. A detetive DI Adam Fawley, com sua equipe, inicia uma investigação desesperada para encontrá-la antes que seja tarde demais. Segredos de família começam a emergir e cada suspeito parece ter algo a esconder. Adam logo percebe que Daisy poderia ser apenas a ponta do iceberg em um caso mais sinistro do que ele poderia imaginar.',
            category: "Suspense",
            year: '2019',
            publishing_company: 'Penguin Books',
            edition: '1ª',
            ISBN: '978-85-8444-125-2',
            pages: 368,
            group: 'Silver',
            quantity: 1
        },
    ],
    totalPrice: 147.00,
    status: 'Aguardando Troca'
},
{
    id: 10234989,
    client: {
        id: 2,
        name: 'Giusepe Camolle',
    },
    datePayment: '2024-08-15',
    expectedDeliveryDate: '2024-08-21',
    products: [
        {
            id: 3,
            name: 'Trono de Cristal',
            author: 'Sarah J. Maas',
            price: 27.90,
            imageSrc: '../../bookImages/trono-de-cristal.png',
            imageAlt: 'Trono de Cristal - Sarah J. Maas',
            synopsis: 'Num mundo sem magia, uma assassina é enviada para competir por sua liberdade. Celaena Sardothien é uma assassina lendária, mas depois de ser capturada, ela é enviada para uma competição brutal onde deve servir a um rei que vê suas habilidades como uma oportunidade e seu treinamento como uma luta pela sobrevivência. Se ela vencer suas competições, ela será concedida a liberdade depois de servir o império por três anos. Mas algo obscuro está acontecendo nos corredores do poder, e Celaena deve descobrir a verdade antes que seja tarde demais.',
            category: "Fantasia",
            year: '2012',
            publishing_company: 'Galera Record',
            edition: '1ª',
            ISBN: '978-85-01-10585-5',
            pages: 392,
            group: 'Gold',
            quantity: 1
        },
        {
            id: 4,
            name: 'O Silêncio dos Inocentes',
            author: 'Thomas Harris',
            price: 12.90,
            imageSrc: '../../bookImages/o-silencio-dos-inocentes.png',
            imageAlt: 'O Silêncio dos Inocentes - Thomas Harris',
            synopsis: 'O detetive do FBI, Will Graham, é convocado para ajudar a capturar um assassino em série conhecido como "Buffalo Bill". Para entender a mente do criminoso, Graham procura a ajuda do brilhante, porém perigoso, Dr. Hannibal Lecter, um psiquiatra encarcerado por crimes próprios. À medida que a investigação avança, Graham mergulha cada vez mais nas profundezas da mente humana, enfrentando seus próprios demônios enquanto tenta salvar vidas inocentes.',
            category: "Thriller",
            year: '1988',
            publishing_company: 'BestBolso',
            edition: '1ª',
            ISBN: '978-85-64874-18-7',
            pages: 320,
            group: 'Bronze',
            quantity: 2
        },
    ],
    totalPrice: 53.70,
    status: 'Aguardando Devolução'
}
];

export default orders;