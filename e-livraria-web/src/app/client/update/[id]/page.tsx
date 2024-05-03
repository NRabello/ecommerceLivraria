"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Client as ClientModel } from '@/models/Client';
import { Phone as PhoneModel } from '@/models/Phone';
import { ChargeAddress as ChargeAddressModel } from '@/models/ChargeAddress';
import { DeliveryAddress as DeliveryAddressModel } from '@/models/DeliveryAddress';
import { CreditCard as CreditCardModel } from '@/models/CreditCard';
import { CardBanner } from '@/models/Banner';
import { useRouter } from 'next/navigation';
import { ClientService } from '@/services/ClientService';
import { BannerService } from '@/services/BannerService';
import { ETypeResidence } from '@/models/ETypeResidence';

export default function UpdateClient({ params }: { params: { id: number } }) {
    const [client, setClient] = useState<ClientModel>(new ClientModel({}));
    const [chargeAddress, setChargeAddress] = useState<ChargeAddressModel[]>([new ChargeAddressModel({})]);
    const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddressModel[]>([new DeliveryAddressModel({})]);
    const [CreditCard, setCreditCard] = useState<CreditCardModel[]>([new CreditCardModel({})]);
    const [CardBanners, setCardBanners] = useState<CardBanner[]>([]);

    const clientService = new ClientService();
    const router = useRouter();

    useEffect(() => {
        clientService.findById(params.id).then((response) => {
            setClient(response.data);
            setChargeAddress(response.data.chargeAddresses);
            setDeliveryAddress(response.data.deliveryAddresses);
            setCreditCard(response.data.creditCards);
            console.log('Resetou essa caceta')
        }).catch((error) => {
            console.log(error);
        });

        const fetchBanners = async () => {
            try {
                const bannerService = new BannerService();
                const response = await bannerService.findAll();
                const CardBanners = response.data;
                setCardBanners(CardBanners);
            } catch (error) {
                console.error('Error fetching banners:', error);
            }
        };

        fetchBanners();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setClient(prevState => {
            return new ClientModel({ ...prevState, [name]: value });
        });
    };

    const HandlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setClient(prevState => {
            return new ClientModel({
                ...prevState,
                phone: new PhoneModel({
                    ...prevState.phone,
                    [name]: value
                })
            });
        });
    }

    const validaForm = () => {
        if (
            client.name === '' ||
            client.gender === '' ||
            client.dateBirth === '' ||
            client.email === '' ||
            client.cpf === '' ||
            client.phone.ddd === '' ||
            client.phone.number === '' ||
            client.phone.type === ''
        ) {
            console.log("Por favor, preencha todos os campos obrigatórios.");
            console.log(client.name);
            console.log(client.gender);
            console.log(client.dateBirth);
            console.log(client.email);
            console.log(client.cpf);
            
            return false;
        }

        if(client.chargeAddresses.length === 0){
            console.log("Endereço de cobrança não fornecido.");
            return false;
        }

        if(client.deliveryAddresses.length === 0){
            console.log("Endereço de entrega não fornecido.");
            return false;
        }

        if(client.creditCards.length === 0){
            console.log("Cartão de crédito não fornecido.");
            return false;
        }

        if (client.chargeAddresses.length === 0 || client.deliveryAddresses.length === 0 || client.creditCards.length === 0) {
            // if (client.chargeAddresses.length === 0) {
            //     console.log("Endereço de cobrança não fornecido.");
            // }
            // if (client.deliveryAddresses.length === 0) {
            //     console.log("Endereço de entrega não fornecido.");
            // }
            // if (client.creditCards.length === 0) {
            //     console.log("Cartão de crédito não fornecido.");
            // }
            return false;
        }

        const isAddressValid = (address: ChargeAddressModel | DeliveryAddressModel) => {
            return address.patioType !== '' && address.publicArea !== '' && address.numberAddrs !== '' && address.neighborhood !== '' && address.cep !== '' && address.city !== '' && address.state !== '' && address.country !== '' && address.nameAddrs !== '';
        };
        
        const isAllAddressesValid = () => {
            return client.deliveryAddresses.every(isAddressValid) && client.chargeAddresses.every(isAddressValid);
        };
        
        if (!isAllAddressesValid()) {
            console.log("Por favor, preencha todos os campos dos endereços.");
            console.log(client.deliveryAddresses)
            console.log(client.chargeAddresses)
            return false;
        }

        const isCreditCardValid = (creditCard: CreditCardModel) => {
            return creditCard.number !== '' && creditCard.expirationDate !== '' && creditCard.cardBanner.name !== '' && creditCard.securityCode !== '' && creditCard.nameCard !== '';
        };

        const isAllCreditCardsValid = () => {
            return client.creditCards.every(isCreditCardValid);
        };

        if (!isAllCreditCardsValid()) {
            console.log("Por favor, preencha todos os campos dos cartões de crédito.");
            return false;
        }
        return true;
    };

    const handleChargeAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
        let { name, value } = e.target;       
        name = name.split('_')[0];

        const updatedChargeAddress = [...chargeAddress];
        updatedChargeAddress[index] = new ChargeAddressModel({
            ...updatedChargeAddress[index],
            [name]: value
        });
        setChargeAddress(updatedChargeAddress);
    };

    const handleDeliveryAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
        let { name, value } = e.target;        
        name = name.split('_')[0];

        const updatedDeliveryAddress = [...deliveryAddress];
        updatedDeliveryAddress[index] = new DeliveryAddressModel({
            ...updatedDeliveryAddress[index],
            [name]: value
        });
        setDeliveryAddress(updatedDeliveryAddress);
    };

    const handleCreditCardChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
        let { name, value } = event.target;
        name = name.split('_')[0];

        const updatedCreditCards = [...client.creditCards];
        updatedCreditCards[index] = new CreditCardModel({
            ...updatedCreditCards[index],
            [name]: value
        });
        setCreditCard(updatedCreditCards);
    };

    const addChargeAddress = () => {
        setChargeAddress(prevState => [...prevState, new ChargeAddressModel({})]);
    };

    const removeChargeAddress = (index: number) => {
        if(chargeAddress.length === 1){
            alert("Pelo menos um endereço de cobrança é obrigatório.");
            return;
        }
        setChargeAddress(prevState => prevState.filter((_, i) => i !== index));
    };

    const addDeliveryAddress = () => {
        setDeliveryAddress(prevState => [...prevState, new DeliveryAddressModel({})]);
    }

    const removeDeliveryAddress = (index: number) => {
        if(deliveryAddress.length === 1){
            alert("Pelo menos um endereço de entrega é obrigatório.");
            return;
        }
        setDeliveryAddress(prevState => prevState.filter((_, i) => i !== index));
    };

    const addCreditCard = () => {
        setCreditCard(prevState => [...prevState, new CreditCardModel({})]);
    };

    const removeCreditCard = (index: number) => {
        if(CreditCard.length === 1){
            alert("Pelo menos um cartão de crédito é obrigatório.");
            return;
        }
        setCreditCard(prevState => prevState.filter((_, i) => i !== index));
    };


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(deliveryAddress)
        client.chargeAddresses = chargeAddress;
        client.deliveryAddresses = deliveryAddress;
        client.creditCards = CreditCard;
        if(!validaForm()){
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }
        clientService.update(client).then(() => {
            alert("Cliente atualizado com sucesso");
            router.push("/client");
        }).catch(() => {
            alert("Erro ao criar cliente");
        });
    };

    return (
        <div>
            <div className="container mx-auto">
                <h1 className="text-3xl font-semibold mb-3 ml-1">Atualizar Cliente</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="ml-1 mb-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">NOME<span className="text-red-600">*</span></label>
                            <input type="text" id="name" name="name" value={client.name} onChange={handleChange} className="input outline outline-2 outline-gray-400" />
                        </div>
                        <div className="ml-1 mb-2">
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">TIPO DE TELEFONE<span className="text-red-600">*</span></label>
                            <input type="text" id="type" name="type" value={client.phone.type} onChange={HandlePhoneChange} className="input outline outline-2 outline-gray-400" />
                        </div>
                        <div className="ml-1 mb-2">
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">GÊNERO<span className="text-red-600">*</span></label>
                            <input type="text" id="gender" name="gender" value={client.gender} onChange={handleChange} className="input outline outline-2 outline-gray-400" />
                        </div>
                        <div className="ml-1 mb-2">
                            <label htmlFor="ddd" className="block text-sm font-medium text-gray-700">DDD<span className="text-red-600">*</span></label>
                            <input type="text" id="ddd" name="ddd" value={client.phone.ddd} onChange={HandlePhoneChange} className="input outline outline-2 outline-gray-400" />
                        </div>
                        <div className="ml-1 mb-2">
                            <label htmlFor="dateBirth" className="block text-sm font-medium text-gray-700">DATA DE NASCIMENTO<span className="text-red-600">*</span></label>
                            <input type="text" id="dateBirth" name="dateBirth" value={client.dateBirth} onChange={handleChange} className="input outline outline-2 outline-gray-400" />
                        </div>
                        <div className="ml-1 mb-2">
                            <label htmlFor="number" className="block text-sm font-medium text-gray-700">NÚMERO<span className="text-red-600">*</span></label>
                            <input type="text" id="number" name="number" value={client.phone.number} onChange={HandlePhoneChange} className="input outline outline-2 outline-gray-400" />
                        </div>
                        <div className="ml-1 mb-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">EMAIL<span className="text-red-600">*</span></label>
                            <input type="email" id="email" name="email" value={client.email} onChange={handleChange} className="input outline outline-2 outline-gray-400" />
                        </div>
                        <div className="ml-1 mb-2">
                            <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">CPF<span className="text-red-600">*</span></label>
                            <input type="text" id="cpf" name="cpf" value={client.cpf} onChange={handleChange} className="input outline outline-2 outline-gray-400" />
                        </div>
                    </div>
                    <hr className="h-px ml-1 mb-3 bg-gray-200 border-0 dark:bg-gray-700" />
                    <h1 className="text-3xl font-semibold mb-3 ml-1">Endereço(s) de Cobrança</h1>
                    {chargeAddress.map((addressItem, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="ml-1">
                                <label htmlFor={`typeresidence_${index}`} className="block text-sm font-medium text-gray-700">TIPO DE RESIDÊNCIA</label>
                                <select id={`typeresidence_${index}`} name={`typeresidence_${index}`} value={addressItem.typeresidence} onChange={(e) => handleChargeAddressChange(e, index)} className="input outline outline-2 outline-gray-400">
                                    {Object.values(ETypeResidence).map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='ml-1'>
                                <label htmlFor={`patioType_${index}`} className="block text-sm font-medium text-gray-700">TIPO DE LOGRADOURO<span className="text-red-600">*</span></label>
                                <input type="text" id={`patioType_${index}`} name={`patioType_${index}`} value={addressItem.patioType} onChange={(e) => handleChargeAddressChange(e, index)} className="input outline outline-2 outline-gray-400" />
                            </div>
                            <div className='ml-1'>
                                <label htmlFor={`publicArea_${index}`} className="block text-sm font-medium text-gray-700">LOGRADOURO<span className="text-red-600">*</span></label>
                                <input type="text" id={`publicArea_${index}`} name={`publicArea_${index}`} value={addressItem.publicArea} onChange={(e) => handleChargeAddressChange(e, index)} className="input outline outline-2 outline-gray-400" />
                            </div>
                            <div className='ml-1'>
                                <label htmlFor={`numberAddrs_${index}`} className="block text-sm font-medium text-gray-700">NÚMERO<span className="text-red-600">*</span></label>
                                <input type="text" id={`numberAddrs_${index}`} name={`numberAddrs_${index}`} value={addressItem.numberAddrs} onChange={(e) => handleChargeAddressChange(e, index)} className="input outline outline-2 outline-gray-400" />
                            </div>
                            <div className='ml-1'>
                                <label htmlFor={`neighborhood_${index}`} className="block text-sm font-medium text-gray-700">BAIRRO<span className="text-red-600">*</span></label>
                                <input type="text" id={`neighborhood_${index}`} name={`neighborhood_${index}`} value={addressItem.neighborhood} onChange={(e) => handleChargeAddressChange(e, index)} className="input outline outline-2 outline-gray-400" />
                            </div>
                            <div className='ml-1'>
                                <label htmlFor={`cep_${index}`} className="block text-sm font-medium text-gray-700">CEP<span className="text-red-600">*</span></label>
                                <input type="text" id={`cep_${index}`} name={`cep_${index}`} value={addressItem.cep} onChange={(e) => handleChargeAddressChange(e, index)} className="input outline outline-2 outline-gray-400" />
                            </div>
                            <div className='ml-1'>
                                <label htmlFor={`city_${index}`} className="block text-sm font-medium text-gray-700">CIDADE<span className="text-red-600">*</span></label>
                                <input type="text" id={`city_${index}`} name={`city_${index}`} value={addressItem.city} onChange={(e) => handleChargeAddressChange(e, index)} className="input outline outline-2 outline-gray-400" />
                            </div>
                            <div className='ml-1'>
                                <label htmlFor={`state_${index}`} className="block text-sm font-medium text-gray-700">ESTADO<span className="text-red-600">*</span></label>
                                <input type="text" id={`state_${index}`} name={`state_${index}`} value={addressItem.state} onChange={(e) => handleChargeAddressChange(e, index)} className="input outline outline-2 outline-gray-400" />
                            </div>
                            <div className='ml-1'>
                                <label htmlFor={`country_${index}`} className="block text-sm font-medium text-gray-700">PAÍS<span className="text-red-600">*</span></label>
                                <input type="text" id={`country_${index}`} name={`country_${index}`} value={addressItem.country} onChange={(e) => handleChargeAddressChange(e, index)} className="input outline outline-2 outline-gray-400" />
                            </div>
                            <div className='ml-1'>
                                <label htmlFor={`observations_${index}`} className="block text-sm font-medium text-gray-700">OBSERVAÇÕES</label>
                                <input type="text" id={`observations_${index}`} name={`observations_${index}`} value={addressItem.observations} onChange={(e) => handleChargeAddressChange(e, index)} className="input outline outline-2 outline-gray-400" />
                            </div>
                            <div className='ml-1 mb-2'>
                                <label htmlFor={`nameAddrs_${index}`} className="block text-sm font-medium text-gray-700">NOME DO ENDEREÇO<span className="text-red-600">*</span></label>
                                <input type="text" id={`nameAddrs_${index}`} name={`nameAddrs_${index}`} value={addressItem.nameAddrs} onChange={(e) => handleChargeAddressChange(e, index)} className="input outline outline-2 outline-gray-400" />
                            </div>
                            <button
                                type="button"
                                onClick={() => removeChargeAddress(index)}
                                className="hover:bg-red-600 text-gray-500 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded-full w-fit"
                            >
                                Remover
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addChargeAddress}
                        className="hover:bg-gray-500 text-gray-500 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded-full"
                    >
                        Adicionar Endereço
                    </button>
                    
                    <hr className="h-px ml-1 mb-3 bg-gray-200 border-0 dark:bg-gray-700" />
                    <h1 className="text-3xl font-semibold mb-3 ml-1">Endereço(s) de Entrega</h1>
                    {deliveryAddress.map((addressItem, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="ml-1">
                                <label htmlFor={`typeresidence_${index}`} className="block text-sm font-medium text-gray-700">TIPO DE RESIDÊNCIA</label>
                                <select id={`typeresidence_${index}`} name={`typeresidence_${index}`} value={addressItem.typeresidence} onChange={(e) => handleDeliveryAddressChange(e, index)} className="input outline outline-2 outline-gray-400">
                                    {Object.values(ETypeResidence).map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='ml-1'>
                                <label htmlFor={`patioType_${index}`} className="block text-sm font-medium text-gray-700">TIPO DE LOGRADOURO<span className="text-red-600">*</span></label>
                                <input type="text" id={`patioType_${index}`} name={`patioType_${index}`} value={addressItem.patioType} onChange={(e) => handleDeliveryAddressChange(e, index)} className="input outline outline-2 outline-gray-400" />
                            </div>
                            <div className='ml-1'>
                                <label htmlFor={`publicArea_${index}`} className="block text-sm font-medium text-gray-700">LOGRADOURO<span className="text-red-600">*</span></label>
                                <input type="text" id={`publicArea_${index}`} name={`publicArea_${index}`} value={addressItem.publicArea} onChange={(e) => handleDeliveryAddressChange(e, index)} className="input outline outline-2 outline-gray-400" />
                            </div>
                            <div className='ml-1'>
                                <label htmlFor={`numberAddrs_${index}`} className="block text-sm font-medium text-gray-700">NÚMERO<span className="text-red-600">*</span></label>
                                <input type="text" id={`numberAddrs_${index}`} name={`numberAddrs_${index}`} value={addressItem.numberAddrs} onChange={(e) => handleDeliveryAddressChange(e, index)} className="input outline outline-2 outline-gray-400" />
                            </div>
                            <div className='ml-1'>
                                <label htmlFor={`neighborhood_${index}`} className="block text-sm font-medium text-gray-700">BAIRRO<span className="text-red-600">*</span></label>
                                <input type="text" id={`neighborhood_${index}`} name={`neighborhood_${index}`} value={addressItem.neighborhood} onChange={(e) => handleDeliveryAddressChange(e, index)} className="input outline outline-2 outline-gray-400" />
                            </div>
                            <div className='ml-1'>
                                <label htmlFor={`cep_${index}`} className="block text-sm font-medium text-gray-700">CEP<span className="text-red-600">*</span></label>
                                <input type="text" id={`cep_${index}`} name={`cep_${index}`} value={addressItem.cep} onChange={(e) => handleDeliveryAddressChange(e, index)} className="input outline outline-2 outline-gray-400" />
                            </div>
                            <div className='ml-1'>
                                <label htmlFor={`city_${index}`} className="block text-sm font-medium text-gray-700">CIDADE<span className="text-red-600">*</span></label>
                                <input type="text" id={`city_${index}`} name={`city_${index}`} value={addressItem.city} onChange={(e) => handleDeliveryAddressChange(e, index)} className="input outline outline-2 outline-gray-400" />
                            </div>
                            <div className='ml-1'>
                                <label htmlFor={`state_${index}`} className="block text-sm font-medium text-gray-700">ESTADO<span className="text-red-600">*</span></label>
                                <input type="text" id={`state_${index}`} name={`state_${index}`} value={addressItem.state} onChange={(e) => handleDeliveryAddressChange(e, index)} className="input outline outline-2 outline-gray-400" />
                            </div>
                            <div className='ml-1'>
                                <label htmlFor={`country_${index}`} className="block text-sm font-medium text-gray-700">PAÍS<span className="text-red-600">*</span></label>
                                <input type="text" id={`country_${index}`} name={`country_${index}`} value={addressItem.country} onChange={(e) => handleDeliveryAddressChange(e, index)} className="input outline outline-2 outline-gray-400" />
                            </div>
                            <div className='ml-1'>
                                <label htmlFor={`observations_${index}`} className="block text-sm font-medium text-gray-700">OBSERVAÇÕES</label>
                                <input type="text" id={`observations_${index}`} name={`observations_${index}`} value={addressItem.observations} onChange={(e) => handleDeliveryAddressChange(e, index)} className="input outline outline-2 outline-gray-400" />
                            </div>
                            <div className='ml-1 mb-2'>
                                <label htmlFor={`nameAddrs_${index}`} className="block text-sm font-medium text-gray-700">NOME DO ENDEREÇO<span className="text-red-600">*</span></label>
                                <input type="text" id={`nameAddrs_${index}`} name={`nameAddrs_${index}`} value={addressItem.nameAddrs} onChange={(e) => handleDeliveryAddressChange(e, index)} className="input outline outline-2 outline-gray-400" />
                            </div>
                            <button
                                type="button"
                                onClick={() => removeDeliveryAddress(index)}
                                className="hover:bg-red-600 text-gray-500 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded-full w-fit"
                            >
                                Remover
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addDeliveryAddress}
                        className="hover:bg-gray-500 text-gray-500 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded-full"
                    >
                        Adicionar Endereço
                    </button>
                    
                    <hr className="h-px ml-1 mb-3 bg-gray-200 border-0 dark:bg-gray-700" />
                    <h1 className="text-3xl font-semibold mb-3 ml-1">Cartão(s)</h1>
                    {CreditCard.map((creditCard, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="ml-1">
                                <label htmlFor={`number_${index}`} className="block text-sm font-medium text-gray-700">Número do Cartão<span className="text-red-600">*</span></label>
                                <input type="text" id={`number_${index}`} name={`number_${index}`} value={creditCard.number} onChange={(e) => handleCreditCardChange(e, index)} className="input outline outline-2 outline-gray-400" />
                            </div>

                            <div className="ml-1">
                                <label htmlFor={`expirationDate_${index}`} className="block text-sm font-medium text-gray-700">Data de Expiração<span className="text-red-600">*</span></label>
                                <input type="text" id={`expirationDate_${index}`} name={`expirationDate_${index}`} value={creditCard.expirationDate} onChange={(e) => handleCreditCardChange(e, index)} className="input outline outline-2 outline-gray-400" />
                            </div>
                            <div className="ml-1">
                                <label htmlFor={`cardBanner_${index}`} className="block text-sm font-medium text-gray-700">Bandeira do Cartão<span className="text-red-600">*</span></label>
                                <select id={`cardBanner_${index}`} name={`cardBanner_${index}`} value={CreditCard[index].cardBanner.name} onChange={(e) => handleCreditCardChange(e, index)} className="input outline outline-2 outline-gray-400">
                                    {CardBanners.map((cardBanner, cardBannerIndex) => (
                                        <option key={cardBannerIndex} value={cardBanner.name}>{cardBanner.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="ml-1">
                                <label htmlFor={`securityCode_${index}`} className="block text-sm font-medium text-gray-700">Código de Segurança<span className="text-red-600">*</span></label>
                                <input type="text" id={`securityCode_${index}`} name={`securityCode_${index}`} value={creditCard.securityCode} onChange={(e) => handleCreditCardChange(e, index)} className="input outline outline-2 outline-gray-400" />
                            </div>
                            <div className="ml-1">
                                <label htmlFor={`nameCard_${index}`} className="block text-sm font-medium text-gray-700">Nome no Cartão<span className="text-red-600">*</span></label>
                                <input type="text" id={`nameCard_${index}`} name={`nameCard_${index}`} value={creditCard.nameCard} onChange={(e) => handleCreditCardChange(e, index)} className="input outline outline-2 outline-gray-400" />
                            </div>
                            <button
                                type="button"
                                onClick={() => removeCreditCard(index)}
                                className="hover:bg-red-600 text-gray-500 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded-full w-fit"
                            >
                                Remover
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addCreditCard}
                        className=" hover:bg-gray-500 text-gray-500 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded-full"
                    >
                        Adicionar Cartão de Crédito
                    </button>
                    <div className="flex justify-between">
                        <button id="btn-edit-voltar" type="button" className=" hover:bg-gray-500 text-gray-500 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded-full mb-2" onClick={() => router.push("/client")}>Voltar</button>
                        <button id="btn-save-att" type="submit" className=" hover:bg-gray-500 text-gray-500 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded-full mb-2">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

