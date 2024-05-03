"use client"
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Client as ClientModel } from '@/models/Client';
import { ClientService } from '@/services/ClientService';
import { BannerService } from '@/services/BannerService';
import { ChargeAddress as ChargeAddressModel } from '@/models/ChargeAddress';
import { DeliveryAddress as DeliveryAddressModel } from '@/models/DeliveryAddress';
import { useRouter } from "next/navigation";
import { Phone as PhoneModel } from '@/models/Phone';
import { ETypeResidence } from '@/models/ETypeResidence';
import { CreditCard as CreditCardModel } from '@/models/CreditCard';
import { Banner } from '@/models/Banner';

export default function CreateClient() {
    const clientService = new ClientService();
    const router = useRouter();
    const [client, setClient] = useState<ClientModel>(new ClientModel({}));
    const [chargeAddresses, setChargeAddresses] = useState<ChargeAddressModel[]>([new ChargeAddressModel({})]);
    const [deliveryAddresses, setDeliveryAddresses] = useState<DeliveryAddressModel[]>([new DeliveryAddressModel({})]);
    const [creditCards, setCreditCards] = useState<CreditCardModel[]>([new CreditCardModel({})]);
    const [CardBanners, setCardBanners] = useState<Banner[]>([]);
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const bannerService = new BannerService();

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await bannerService.findAll();
                const CardBanners = response.data;
                setCardBanners(CardBanners);
                console.log(CardBanners);
            } catch (error) {
                console.error('Error fetching banners:', error);
            }
        };

        fetchBanners();
    }, []);

    const validaForm = () => {
        if (client.name === '') {
            console.log("Nome não fornecido.");
            return false;
        }
        if (client.gender === '') {
            console.log("Gênero não fornecido.");
            return false;
        }
        if (client.dateBirth === '') {
            console.log("Data de nascimento não fornecida.");
            return false;
        }
        if (client.email === '') {
            console.log("E-mail não fornecido.");
            return false;
        }
        if (client.cpf === '') {
            console.log("CPF não fornecida.");
            return false;
        }
        if (client.password === '') {
            console.log("Senha não fornecida.");
            return false;
        }
        if (client.phone.ddd === '') {
            console.log("DDD do telefone não fornecido.");
            return false;
        }
        if (client.phone.number === '') {
            console.log("Número do telefone não fornecido.");
            return false;
        }
        if (client.phone.type === '') {
            console.log("Tipo de telefone não fornecido.");
            return false;
        }
        return true;
    };

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

    const handleChargeAddressChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
        const { name, value } = e.target;
        console.log(index);
        setChargeAddresses(prevState => {
            const updatedChargeAddresses = [...prevState];
            updatedChargeAddresses[index] = new ChargeAddressModel({
                ...prevState[index],
                [name]: value
            });
            return updatedChargeAddresses;
        });
    };

    const handleDeliveryAddressChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
        const { name, value } = e.target;
        setDeliveryAddresses(prevState => {
            const updatedDeliveryAddresses = [...prevState];
            updatedDeliveryAddresses[index] = new DeliveryAddressModel({
                ...prevState[index],
                [name]: value
            });
            return updatedDeliveryAddresses;
        });
    }

    const addChargeAddress = () => {
        setChargeAddresses(prevState => [...prevState, new ChargeAddressModel({})]);
    };

    const removeChargeAddress = (index: number) => {
        if(chargeAddresses.length === 1){
            alert("Pelo menos um endereço de cobrança é obrigatório.");
            return;
        }
        setChargeAddresses(prevState => prevState.filter((_, i) => i !== index));
    };

    const addDeliveryAddress = () => {
        setDeliveryAddresses(prevState => [...prevState, new DeliveryAddressModel({})]);
    };

    const removeDeliveryAddress = (index: number) => {
        if(deliveryAddresses.length === 1){
            alert("Pelo menos um endereço de entrega é obrigatório.");
            return;
        }
        setDeliveryAddresses(prevState => prevState.filter((_, i) => i !== index));
    };

    const handleCreditCardChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
        const { name, value } = e.target;
        setCreditCards(prevState => {
            const updatedCreditCards = [...prevState];
            updatedCreditCards[index] = new CreditCardModel({
                ...prevState[index],
                [name]: name === 'cardBanner' ? CardBanners.find(banner => banner.name === value) : value
            });
            return updatedCreditCards;
        });
    };

    const addCreditCard = () => {
        setCreditCards(prevState => [...prevState, new CreditCardModel({})]);
    };

    const removeCreditCard = (index: number) => {
        if(creditCards.length === 1){
            alert("Pelo menos um cartão de crédito é obrigatório.");
            return;
        }
        setCreditCards(prevState => prevState.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validaForm()) {
            alert("Preencha todos os campos obrigatórios (*)");
            return;
        }
        if (client.password !== confirmPassword) {
            alert("As senhas não correspondem");
            return;
        }
        client.chargeAddresses = chargeAddresses;
        client.deliveryAddresses = deliveryAddresses;
        client.creditCards = creditCards;
        clientService.save(client).then(() => {
            alert("Cliente criado com sucesso");
            router.push("/client");
        }).catch((error) => {
            if (error.response && error.response.status === 500 && error.response.data === "A Senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma letra minúscula e um caractere especial") {
                alert("A Senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma letra minúscula e um caractere especial");
            } else {
                alert("Erro ao criar cliente");
            }
        });
    };

    return (
        <div className="bg-gray-300 h-full">
            <div className="container mx-auto py-6">
                <h1 className="text-3xl font-semibold mb-3 ml-1">Dados Cadastrais</h1>
                <hr className="ml-1 h-px mb-3 bg-gray-200 border-0 dark:bg-gray-700" />
                <form onSubmit={handleSubmit} className="space-y-4 h-auto">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="ml-1 mb-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                NOME
                                <span className="text-red-600">*</span>
                            </label>
                            <input
                                placeholder="Ex: Nicolas Rabello"
                                type="text"
                                id="name"
                                name="name"
                                value={client.setName}
                                onChange={handleChange}
                                className="input outline outline-2 outline-gray-400"
                                maxLength={40}
                            />
                        </div>
                        <div className="ml-1 mb-2">
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                TIPO DE TELEFONE
                                <span className="text-red-600">*</span>
                            </label>
                            <input
                                placeholder="Ex: Celular"
                                type="text"
                                id="type"
                                name="type"
                                value={client.phone.type}
                                onChange={HandlePhoneChange}
                                className="input outline outline-2 outline-gray-400"
                                maxLength={15}
                            />
                        </div>
                        <div className="ml-1 mb-2">
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                                GÊNERO
                                <span className="text-red-600">*</span>
                            </label>
                            <input
                                placeholder="Ex: Masculino"
                                type="text"
                                id="gender"
                                name="gender"
                                value={client.gender}
                                onChange={handleChange}
                                className="input outline outline-2 outline-gray-400"
                                maxLength={20}
                            />
                        </div>
                        <div className="ml-1 mb-2">
                            <label htmlFor="ddd" className="block text-sm font-medium text-gray-700">
                                DDD
                                <span className="text-red-600">*</span>
                            </label>
                            <input
                                placeholder="Ex: 11"
                                type="text"
                                id="ddd"
                                name="ddd"
                                value={client.phone.ddd}
                                onChange={HandlePhoneChange}
                                className="input outline outline-2 outline-gray-400"
                                maxLength={2}
                            />
                        </div>
                        <div className="ml-1 mb-2">
                            <label htmlFor="dateBirth" className="block text-sm font-medium text-gray-700">
                                DATA DE NASCIMENTO
                                <span className="text-red-600">*</span>
                            </label>
                            <input
                                placeholder="Formato: yyyy-mm-dd"
                                type="text"
                                id="dateBirth"
                                name="dateBirth"
                                value={client.dateBirth}
                                onChange={handleChange}
                                className="input outline outline-2 outline-gray-400"
                                maxLength={10}
                            />
                        </div>
                        <div className="ml-1 mb-2">
                            <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                                NÚMERO
                                <span className="text-red-600">*</span>
                            </label>
                            <input
                                placeholder="Ex: 40028922"
                                type="text"
                                id="number"
                                name="number"
                                value={client.phone.number}
                                onChange={HandlePhoneChange}
                                className="input outline outline-2 outline-gray-400"
                                maxLength={14}
                            />
                        </div>
                        <div className="ml-1 mb-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                EMAIL
                                <span className="text-red-600">*</span>
                            </label>
                            <input
                                placeholder="Ex: nicolas@email.com"
                                type="email"
                                id="email"
                                name="email"
                                value={client.email}
                                onChange={handleChange}
                                className="input outline outline-2 outline-gray-400"
                                maxLength={60}
                            />
                        </div>
                        <div className="ml-1 mb-2">
                            <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
                                CPF
                                <span className="text-red-600">*</span>
                            </label>
                            <input
                                placeholder="Ex: 12312312312"
                                type="text"
                                id="cpf"
                                name="cpf"
                                value={client.cpf}
                                onChange={handleChange}
                                className="input outline outline-2 outline-gray-400"
                                maxLength={11}
                            />
                        </div>
                        <div className="ml-1 mb-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                SENHA
                                <span className="text-red-600">*</span>
                            </label>
                            <input
                                placeholder="Ex: Senha@123"
                                type="password"
                                id="password"
                                name="password"
                                value={client.password}
                                onChange={handleChange}
                                className="input outline outline-2 outline-gray-400"
                                maxLength={20}
                            />
                        </div>
                        <div className="ml-1 mb-2">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                CONFIRMAR SENHA
                                <span className="text-red-600">*</span>
                            </label>
                            <input
                                placeholder="Confirme a senha "
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="input outline outline-2 outline-gray-400"
                                maxLength={20}
                            />
                        </div>
                    </div>


                    <hr className="h-px ml-1 mb-3 bg-gray-200 border-0 dark:bg-gray-700" />
                    <h1 className="text-3xl font-semibold mb-3 ml-1">Endereço(s) de Cobrança</h1>
                    {chargeAddresses.map((address, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="ml-1">
                                <label
                                    htmlFor="typeresidence"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    TIPO DE RESIDÊNCIA
                                </label>
                                <select
                                    id={`cTyperesidence-${index}`}
                                    name="typeresidence"
                                    value={chargeAddresses[index].typeresidence}
                                    onChange={(e) => handleChargeAddressChange(e, index)}
                                    className="input outline outline-2 outline-gray-400"
                                >
                                    {Object.values(ETypeResidence).map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='ml-1'>
                                <label
                                    htmlFor="patioType"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    TIPO DE LOGRADOURO
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    placeholder="Ex: Rua"
                                    type="text"
                                    id={`cPatioType-${index}`}
                                    name="patioType"
                                    value={chargeAddresses[index].patioType}
                                    onChange={(e) => handleChargeAddressChange(e, index)}
                                    className="input outline outline-2 outline-gray-400"
                                />
                            </div>
                            <div className='ml-1'>
                                <label
                                    htmlFor="publicArea"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    LOGRADOURO
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    placeholder="Ex: Rua nicolas N° 58 Mogilar"
                                    type="text"
                                    id={`cPublicArea-${index}`}
                                    name="publicArea"
                                    value={chargeAddresses[index].publicArea}
                                    onChange={(e) => handleChargeAddressChange(e, index)}
                                    className="input outline outline-2 outline-gray-400"
                                />
                            </div>
                            <div className='ml-1'>
                                <label
                                    htmlFor="numberAddrs"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    NÚMERO
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    placeholder="Ex: 58"
                                    type="text"
                                    id={`cNumberAddrs-${index}`}
                                    name="numberAddrs"
                                    value={chargeAddresses[index].numberAddrs}
                                    onChange={(e) => handleChargeAddressChange(e, index)}
                                    className="input outline outline-2 outline-gray-400"
                                />
                            </div>
                            <div className='ml-1'>
                                <label
                                    htmlFor="neighborhood"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    BAIRRO
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    placeholder="Ex: Mogilar"
                                    type="text"
                                    id={`cNeighborhood-${index}`}
                                    name="neighborhood"
                                    value={chargeAddresses[index].neighborhood}
                                    onChange={(e) => handleChargeAddressChange(e, index)}
                                    className="input outline outline-2 outline-gray-400"
                                />
                            </div>
                            <div className='ml-1'>
                                <label
                                    htmlFor="cep"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    CEP
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    placeholder="Ex: 12345678"
                                    type="text"
                                    id={`cCep-${index}`}
                                    name="cep"
                                    value={chargeAddresses[index].cep}
                                    onChange={(e) => handleChargeAddressChange(e, index)}
                                    className="input outline outline-2 outline-gray-400"
                                />
                            </div>
                            <div className='ml-1'>
                                <label
                                    htmlFor="city"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    CIDADE
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    placeholder="Ex: Mogi das Cruzes"
                                    type="text"
                                    id={`cCity-${index}`}
                                    name="city"
                                    value={chargeAddresses[index].city}
                                    onChange={(e) => handleChargeAddressChange(e, index)}
                                    className="input outline outline-2 outline-gray-400"
                                />
                            </div>
                            <div className='ml-1'>
                                <label
                                    htmlFor="state"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    ESTADO
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    placeholder="Ex: São Paulo"
                                    type="text"
                                    id={`cState-${index}`}
                                    name="state"
                                    value={chargeAddresses[index].state}
                                    onChange={(e) => handleChargeAddressChange(e, index)}
                                    className="input outline outline-2 outline-gray-400"
                                />
                            </div>
                            <div className='ml-1'>
                                <label
                                    htmlFor="country"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    PAÍS
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    placeholder="Ex: Brasil"
                                    type="text"
                                    id={`cCountry-${index}`}
                                    name="country"
                                    value={chargeAddresses[index].country}
                                    onChange={(e) => handleChargeAddressChange(e, index)}
                                    className="input outline outline-2 outline-gray-400"
                                />
                            </div>
                            <div className='ml-1'>
                                <label
                                    htmlFor="observations"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    OBSERVAÇÕES
                                </label>
                                <input
                                    placeholder="Opcional"
                                    type="text"
                                    id={`cObservations-${index}`}
                                    name="observations"
                                    value={chargeAddresses[index].observations}
                                    onChange={(e) => handleChargeAddressChange(e, index)}
                                    className="input outline outline-2 outline-gray-400"
                                />
                            </div>
                            <div className='ml-1 mb-4'>
                                <label
                                    htmlFor="nameAddrs"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    NOME DO ENDEREÇO
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    placeholder="Ex: Casa da vó"
                                    type="text"
                                    id={`cNameAddrs-${index}`}
                                    name="nameAddrs"
                                    value={chargeAddresses[index].nameAddrs}
                                    onChange={(e) => handleChargeAddressChange(e, index)}
                                    className="input outline outline-2 outline-gray-400"
                                />
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

                    {deliveryAddresses.map((_, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="ml-1">
                                <label
                                    htmlFor="typeresidence"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    TIPO DE RESIDÊNCIA
                                </label>
                                <select
                                    id={`dTyperesidence-${index}`}
                                    name="typeresidence"
                                    value={deliveryAddresses[index].typeresidence}
                                    onChange={(e) => handleDeliveryAddressChange(e, index)}
                                    className="input outline outline-2 outline-gray-400"
                                >
                                    {Object.values(ETypeResidence).map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='ml-1'>
                                <label
                                    htmlFor="patioType"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    TIPO DE LOGRADOURO
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    placeholder="Ex: Rua"
                                    type="text"
                                    id={`dPatioType-${index}`}
                                    name="patioType"
                                    value={deliveryAddresses[index].patioType}
                                    onChange={(e) => handleDeliveryAddressChange(e, index)}
                                    className="input outline outline-2 outline-gray-400"
                                />
                            </div>
                            <div className='ml-1'>
                                <label
                                    htmlFor="publicArea"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    LOGRADOURO
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    placeholder="Ex: Rua nicolas N° 58 Mogilar"
                                    type="text"
                                    id={`dPublicArea-${index}`}
                                    name="publicArea"
                                    value={deliveryAddresses[index].publicArea}
                                    onChange={(e) => handleDeliveryAddressChange(e, index)}
                                    className="input outline outline-2 outline-gray-400"
                                />
                            </div>
                            <div className='ml-1'>
                                <label
                                    htmlFor="numberAddrs"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    NÚMERO
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    placeholder="Ex: 58"
                                    type="text"
                                    id={`dNumberAddrs-${index}`}
                                    name="numberAddrs"
                                    value={deliveryAddresses[index].numberAddrs}
                                    onChange={(e) => handleDeliveryAddressChange(e, index)}
                                    className="input outline outline-2 outline-gray-400"
                                />
                            </div>
                            <div className='ml-1'>
                                <label
                                    htmlFor="neighborhood"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    BAIRRO
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    placeholder="Ex: Mogilar"
                                    type="text"
                                    id={`dNeighborhood-${index}`}
                                    name="neighborhood"
                                    value={deliveryAddresses[index].neighborhood}
                                    onChange={(e) => handleDeliveryAddressChange(e, index)}
                                    className="input outline outline-2 outline-gray-400"
                                />
                            </div>
                            <div className='ml-1'>
                                <label
                                    htmlFor="cep"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    CEP
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    placeholder="Ex: 12345678"
                                    type="text"
                                    id={`dCep-${index}`}
                                    name="cep"
                                    value={deliveryAddresses[index].cep}
                                    onChange={(e) => handleDeliveryAddressChange(e, index)}
                                    className="input outline outline-2 outline-gray-400"
                                />
                            </div>
                            <div className='ml-1'>
                                <label
                                    htmlFor="city"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    CIDADE
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    placeholder="Ex: Mogi das Cruzes"
                                    type="text"
                                    id={`dCity-${index}`}
                                    name="city"
                                    value={deliveryAddresses[index].city}
                                    onChange={(e) => handleDeliveryAddressChange(e, index)}
                                    className="input outline outline-2 outline-gray-400"
                                />
                            </div>
                            <div className='ml-1'>
                                <label
                                    htmlFor="state"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    ESTADO
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    placeholder="Ex: São Paulo"
                                    type="text"
                                    id={`dState-${index}`}
                                    name="state"
                                    value={deliveryAddresses[index].state}
                                    onChange={(e) => handleDeliveryAddressChange(e, index)}
                                    className="input outline outline-2 outline-gray-400"
                                />
                            </div>
                            <div className='ml-1'>
                                <label
                                    htmlFor="country"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    PAÍS
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    placeholder="Ex: Brasil"
                                    type="text"
                                    id={`dCountry-${index}`}
                                    name="country"
                                    value={deliveryAddresses[index].country}
                                    onChange={(e) => handleDeliveryAddressChange(e, index)}
                                    className="input outline outline-2 outline-gray-400"
                                />
                            </div>
                            <div className='ml-1'>
                                <label
                                    htmlFor="observations"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    OBSERVAÇÕES
                                </label>
                                <input
                                    placeholder="Opcional"
                                    type="text"
                                    id={`dObservations-${index}`}
                                    name="observations"
                                    value={deliveryAddresses[index].observations}
                                    onChange={(e) => handleDeliveryAddressChange(e, index)}
                                    className="input outline outline-2 outline-gray-400"
                                />
                            </div>
                            <div className='ml-1 mb-4'>
                                <label
                                    htmlFor="nameAddrs"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    NOME DO ENDEREÇO
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    placeholder="Ex: Casa da vó"
                                    type="text"
                                    id={`dNameAddrs-${index}`}
                                    name="nameAddrs"
                                    value={deliveryAddresses[index].nameAddrs}
                                    onChange={(e) => handleDeliveryAddressChange(e, index)}
                                    className="input outline outline-2 outline-gray-400"
                                />
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
                    <h1 className="text-3xl font-semibold mb-3 ml-1">Cartão(s) de credito</h1>

                    {creditCards.map((_, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="ml-1">
                                <label 
                                    htmlFor={`cardNumber-${index}`} 
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Número do Cartão
                                    <span className="text-red-600">*</span>
                                </label>
                                <input 
                                    placeholder="Ex: 1234123412341234" 
                                    type="text" 
                                    id={`cardNumber-${index}`} 
                                    name="number" 
                                    value={creditCards[index].number} 
                                    onChange={(e) => handleCreditCardChange(e, index)} 
                                    className="input outline outline-2 outline-gray-400" 
                                />
                            </div>

                            <div className="ml-1">
                                <label 
                                    htmlFor={`expirationDate-${index}`} 
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Data de Expiração
                                    <span className="text-red-600">*</span>
                                </label>
                                <input 
                                    placeholder="Formato: yyyy-mm-dd" 
                                    type="text"
                                    id={`expirationDate-${index}`} 
                                    name="expirationDate" 
                                    value={creditCards[index].expirationDate} 
                                    onChange={(e) => handleCreditCardChange(e, index)}  
                                    className="input outline outline-2 outline-gray-400" 
                                />
                            </div>
                            <div className="ml-1">
                                <label 
                                    htmlFor={`cardBanner-${index}`} 
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Bandeira do Cartão
                                    <span className="text-red-600">*</span>
                                </label>
                                <select 
                                    id={`cardBanner-${index}`} 
                                    name="cardBanner" 
                                    value={creditCards[index].banner.name} 
                                    onChange={(e) => handleCreditCardChange(e, index)}  
                                    className="input outline outline-2 outline-gray-400"
                                >
                                    {CardBanners.map((CardBanner, CardBannerIndex) => (
                                        <option key={CardBannerIndex} value={CardBanner.name}>{CardBanner.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="ml-1">
                                <label 
                                    htmlFor={`securityCode-${index}`} 
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Código de Segurança
                                    <span className="text-red-600">*</span>
                                </label>
                                <input 
                                    placeholder="123" 
                                    type="text" 
                                    id={`securityCode-${index}`} 
                                    name="securityCode" 
                                    value={creditCards[index].securityCode} 
                                    onChange={(e) => handleCreditCardChange(e, index)} 
                                    className="input outline outline-2 outline-gray-400" />
                            </div>
                            <div className="ml-1">
                                <label 
                                    htmlFor={`cardName-${index}`} 
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Nome no Cartão
                                    <span className="text-red-600">*</span>
                                </label>
                                <input 
                                    placeholder="Ex: Nicolas R Prado" 
                                    type="text" 
                                    id={`cardName-${index}`} 
                                    name="nameCard" 
                                    value={creditCards[index].nameCard} 
                                    onChange={(e) => handleCreditCardChange(e, index)} 
                                    className="input outline outline-2 outline-gray-400" />
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
                    <hr className="h-px ml-1 mb-3 bg-gray-200 border-0 dark:bg-gray-700" />
                    <div className="flex justify-between">
                        <button type="button" id="voltar"className=" hover:bg-gray-500 text-gray-500 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded-full" onClick={() => router.push("/client")}>Voltar</button>
                        <button type="submit" className=" hover:bg-gray-500 text-gray-500 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded-full">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
