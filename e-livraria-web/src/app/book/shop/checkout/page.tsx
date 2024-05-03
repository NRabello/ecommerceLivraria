'use client'
import { ChangeEvent, useEffect, useState } from 'react';
import { DeliveryAddress } from '@/models/DeliveryAddress';
import { CreditCard } from '@/models/CreditCard';
import { useRouter } from 'next/navigation';
import { ClientService } from '@/services/ClientService';
import { Client } from '@/models/Client';
import { BannerService } from '@/services/BannerService';
import { Banner } from '@/models/Banner';
import { ETypeResidence } from '@/models/ETypeResidence';
import { OrderItem } from '@/models/OrderItem';
import { useCheckout } from '@/hooks/useCheckout';
import { OrderService } from '@/services/OrderService';
import { PromotionalCouponService } from '@/services/PromotionalCouponService';
import { Order } from '@/models/Order';
import { PromotionalCoupon } from '@/models/PromotionalCoupon';


export default function Checkout() {
    const [isAddressModalOpen, setAddressModalOpen] = useState(false);
    const [isCreditCardModalOpen, setCreditCardModalOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<DeliveryAddress>();
    const [selectedCreditCard, setSelectedCreditCard] = useState<CreditCard>();
    const [newAddress, setNewAddress] = useState<DeliveryAddress>(new DeliveryAddress({}));
    const [newCard, setNewCard] = useState<CreditCard>(new CreditCard({}));
    const [CardBanners, setCardBanners] = useState<Banner[]>([]);
    const [keepAddressSaved, setKeepAddressSaved] = useState(false);
    const [keepCardSaved, setKeepCardSaved] = useState(false);
    const [cupomValue, setCupomValue] = useState('');
    const [promotionalCoupon, setPromotionalCoupon] = useState<PromotionalCoupon>(new PromotionalCoupon({}));
    const [client, setClient] = useState<Client>();
    const [total, setTotal] = useState(0);
    const { checkout, addOneToCheckout, addSeveralToCheckout ,removeFromCheckout, updateQuantity } = useCheckout();
    const promotionalCouponService = new PromotionalCouponService();
    const clientService = new ClientService();
    const bannerService = new BannerService();
    const orderService = new OrderService();
    const router = useRouter();

    useEffect(() => {
        clientService.findById(2).then((response) => {
            setClient(response.data);
        }).catch((error) => {
            console.log(error);
        });
        fetchBanners();
    }, []);

    useEffect(() => {
        clientService.findById(2).then((response) => {
            setClient(response.data);
        }).catch((error) => {
            console.log(error);
        });
        fetchBanners();
        fetchTotal();
    }, [checkout]);

    const fetchBanners = async () => {
        try {
            const response = await bannerService.findAll();
            const CardBanners = response.data;
            setCardBanners(CardBanners);
        } catch (error) {
            console.error('Error fetching banners:', error);
        }
    };

    const fetchTotal = () => {
        setTotal(subtotal + taxas)
    }

    const calculateSubtotal = () => {
        let subtotal: number = 0;

        checkout.forEach(product => {
            subtotal += product.value * (product.quantity ?? 1);
        });

        return subtotal;
    };

    const handleCupom = () => {
        promotionalCouponService.filter(cupomValue).then((response) => {
            if(response.data.length === 0){
                alert("Cupom inválido!")
            }
            const coupon: PromotionalCoupon = response.data[0];
            setPromotionalCoupon(coupon);
            setTotal(total - (total * coupon.value / 100));
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleAddressSelection = (address: DeliveryAddress) => {
        console.log(address);
        setSelectedAddress(address);
    };

    const handleCreditCardSelection = (card: CreditCard) => {
        console.log(card);
        setSelectedCreditCard(card);
    };

    const handleRemoveProduct = (product: OrderItem) => {
        removeFromCheckout(product);
    }

    const handleAddressChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        const updatedAddress = new DeliveryAddress({
            ...newAddress,
            [name]: value
        });

        setNewAddress(updatedAddress);
    }

    const handleCardChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        const updatedCard = new CreditCard({
            ...newCard,
            [name]: name === 'banner' ? CardBanners.find(banner => banner.name === value) : value
        });

        setNewCard(updatedCard);
    }

    const OpenAddressModal = () => {
        setKeepAddressSaved(false);
        setAddressModalOpen(true);
    };

    const CloseAddressModal = () => {
        setAddressModalOpen(false);
    };

    const OpenCreditCardModal = () => {
        setKeepCardSaved(false);
        setCreditCardModalOpen(true);
    };

    const CloseCreditCardModal = () => {
        setCreditCardModalOpen(false);
    };

    const validateAddress = (): Boolean => {
        const typeResidence = document.getElementById('typeresidence') as HTMLSelectElement;
        const publicArea = document.getElementById('publicArea') as HTMLInputElement;
        const numberAddrs = document.getElementById('numberAddrs') as HTMLInputElement;
        const neighborhood = document.getElementById('neighborhood') as HTMLInputElement;
        const cep = document.getElementById('cep') as HTMLInputElement;
        const city = document.getElementById('city') as HTMLInputElement;
        const state = document.getElementById('state') as HTMLInputElement;
        const country = document.getElementById('country') as HTMLInputElement;

        if (!typeResidence.value.trim() || !publicArea.value.trim() || !numberAddrs.value.trim() || !neighborhood.value.trim() || !cep.value.trim() || !city.value.trim() || !state.value.trim() || !country.value.trim()) {
            return false;
        }
        CloseAddressModal();
        return true;
    }

    const validateCreditCard = (): Boolean => {
        if (newCard.number === "" || newCard.nameCard === "" || newCard.expirationDate === "" || newCard.securityCode === "") {
            console.log(newCard);
            return false;
        }
        CloseCreditCardModal();
        return true;
    }

    const confirmarCompra = async () => {
        if (!selectedAddress) {
            alert('Selecione um endereço!');
            return;
        }
        if (!selectedCreditCard) {
            alert('Selecione um cartão de crédito!');
            return;
        }
        await orderService.save(new Order({
            client: client,
            //temporaryDeliveryAddress: selectedAddress,
            creditCards: [selectedCreditCard],
            orderItens: checkout,
            totalValue: total,
            promotionalCoupon: promotionalCoupon
        }));
        alert('Compra realizada com sucesso!');
        router.push('/client/orders')
    }

    const saveAddress = () => {
        if (!validateAddress()) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        if (client) {
            client.deliveryAddresses.push(newAddress);
            if (keepAddressSaved) {
                clientService.update(client).then((response) => {
                    console.log(response);
                    alert("Endereço salvo com sucesso!");
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }

    const saveCard = () => {
        if (!validateCreditCard()) {
            alert("Preencha todos os campos obrigatórios.")
            return;
        }
        if (client) {
            client.creditCards.push(newCard);

            console.log(client.creditCards);

            if (keepCardSaved) {
                clientService.update(client).then((response) => {
                    console.log(response);
                    alert("Cartão salvo com sucesso!");
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }

    const subtotal = calculateSubtotal();
    const taxas = 15;

    return (
        <div className='bg-gray-200 min-w-screen min-h-screen'>
            <div className="container mx-auto px-4 py-8 grid grid-cols-2 gap-8">
                <div>
                    <h1 className="text-2xl font-semibold mb-4">Informações do Cliente</h1>
                    <div className='border border-gray-300 rounded-md bg-white px-4 py-4'>
                        {/* Exibição dos endereços */}
                        <div className='overflow-x-auto'>
                            <h2 className="text-xl font-semibold mb-2">Endereços</h2>
                            <div className="flex space-x-4">
                                {client?.deliveryAddresses.map((address, index) => (
                                    <div id={`address-${index}`} key={index} className={`bg-gray-100 p-2 rounded-md w-48 ${selectedAddress && selectedAddress.id === address.id ? 'border border-blue-500' : ''}`} onClick={() => handleAddressSelection(address)}>
                                        <p className="font-semibold">{address.getNameAddrs}</p>
                                        <p>{address.country}</p>
                                        <p>{address.state}, {address.city}</p>
                                        <p>{address.cep}</p>
                                    </div>
                                ))}
                                <div className="bg-gray-100 p-2 rounded-md w-48 cursor-pointer flex justify-center items-center">
                                    <img
                                        id="btn-add-address"
                                        onClick={OpenAddressModal}
                                        src='/add.png'
                                        width={60}
                                        height={60}
                                    >
                                    </img>
                                </div>
                            </div>
                        </div>
                        {/* Exibição dos cartões de crédito */}
                        <div className='overflow-x-auto'>
                            <h2 className="text-xl font-semibold mb-2 mt-4">Cartões de Crédito</h2>
                            <div className="flex space-x-4">
                                {client?.creditCards.map((card, index) => (
                                    <div id={`creditCard-${index}`} key={index} className={`bg-gray-100 p-2 rounded-md w-48 ${selectedCreditCard && selectedCreditCard.id === card.id ? 'border border-blue-500' : ''}`} onClick={() => handleCreditCardSelection(card)}>
                                        <p className='font-semibold'>{card.nameCard}</p>
                                        <p>{card.number}</p>
                                        <p>{card.banner.name}</p>
                                        <p>{card.expirationDate}</p>
                                    </div>
                                ))}
                                <div className="bg-gray-100 p-2 rounded-md w-48 cursor-pointer flex justify-center items-center">
                                    <img
                                        id="btn-add-credit-card"
                                        onClick={OpenCreditCardModal}
                                        src='/add.png'
                                        width={60}
                                        height={60}
                                    >
                                    </img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h1 className="text-2xl font-semibold mb-4">Itens do Pedido</h1>
                    <div className="border border-gray-300 rounded-md bg-white">
                        <div className="flex flex-col space-y-4">
                            {checkout.map((product, index) => (
                                <div id={`product-${index}`} key={product.book.id} className="flex p-6 border-b-2 border-gray-200">
                                    <div className="h-28 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img
                                            src={product.book.imageSrc}
                                            alt={product.book.imageAlt}
                                            className="h-full w-full object-fill object-center"
                                        />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-normal text-gray-900">
                                                <h3>
                                                    <a onClick={() => { router.push(`/book/shop/${product.book.id}`) }}>{product.book.name}</a>
                                                </h3>
                                                <p className="ml-4">R$ {product.book.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <p className="text-gray-500">Qty
                                                <select
                                                    id={`quantity-${index}`}
                                                    className="mx-1 border border-gray-300 rounded-md"
                                                    value={product.quantity}
                                                    onChange={(e) => updateQuantity(product, parseInt(e.target.value))}
                                                >
                                                    {[1, 2, 3, 4, 5].map(num => (
                                                        <option key={num} value={num}>{num}</option>
                                                    ))}
                                                </select>
                                            </p>

                                            <div className="flex">
                                                <button
                                                    id={`btn-remove-prooduct-${index}`}
                                                    type="button"
                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                    onClick={() => handleRemoveProduct(product)}
                                                >
                                                    Remover
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4">
                            <div className="mt-4 ml-4 mb-4">
                                <input id="cupom" name="cupom" type="text" className="border rounded-md px-3 py-2" onChange={(e) => setCupomValue(e.target.value)} placeholder="Digite o cupom" />
                                <button id="btn-aplicar-cupom" className="bg-blue-500 text-white px-4 py-2 rounded mt-2 ml-80" onClick={handleCupom}>Aplicar Cupom</button>
                            </div>
                            <div className="flex justify-between text-base font-semibold text-gray-900 ml-4 mr-4">
                                <p>Subtotal</p>
                                <p>R$ {subtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                            </div>
                            <div className="flex justify-between text-base font-semibold text-gray-900 ml-4 mr-4">
                                <p>Taxas</p>
                                <p>R$ {taxas.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                            </div>
                            <div className="flex justify-between text-lg font-semibold text-gray-900 ml-4 mr-4 mb-4">
                                <p>Total</p>
                                <p id="valor-total">R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                            </div>
                            <hr className='mt-2' />
                            <div className='w-full mr-4 ml-7 mb-4'>
                                <button id="btn-buy" className="bg-green-500 text-white px-4 py-2 rounded mt-4 w-11/12" onClick={() => confirmarCompra()}>Confirmar Compra</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isAddressModalOpen && (
                <div id="address-modal" className="fixed inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
                    <div className="bg-white p-2 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg z-10 max-h-screen">
                        <h2 className="text-xl font-semibold mb-2 ml-2 mt-1">Novo Endereço</h2>
                        <form className="px-2 py-2">
                            <div className="mb-2">
                                <label htmlFor="typeresidence" className="block font-medium mb-1">Tipo de Residência</label>
                                <select
                                    id="typeresidence"
                                    name="typeresidence"
                                    className="border-gray-300 border rounded-md w-full p-2"
                                    onChange={(e) => handleAddressChange(e)}
                                >
                                    {Object.values(ETypeResidence).map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="patioType" className="block font-medium mb-1">Tipo de Endereço</label>
                                <input
                                    type="text"
                                    id="patioType"
                                    name="patioType"
                                    className="border-gray-300 border rounded-md w-full p-2"
                                    onChange={(e) => handleAddressChange(e)}
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="publicArea" className="block font-medium mb-1">Logradouro</label>
                                <input
                                    type="text"
                                    id="publicArea"
                                    name="publicArea"
                                    className="border-gray-300 border rounded-md w-full p-2"
                                    onChange={(e) => handleAddressChange(e)}
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="numberAddrs" className="block font-medium mb-1">Número</label>
                                <input
                                    type="text"
                                    id="numberAddrs"
                                    name="numberAddrs"
                                    className="border-gray-300 border rounded-md w-full p-2"
                                    onChange={(e) => handleAddressChange(e)}
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="neighborhood" className="block font-medium mb-1">Bairro</label>
                                <input
                                    type="text"
                                    id="neighborhood"
                                    name="neighborhood"
                                    className="border-gray-300 border rounded-md w-full p-2"
                                    onChange={(e) => handleAddressChange(e)}
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="cep" className="block font-medium mb-1">CEP</label>
                                <input
                                    type="text"
                                    id="cep"
                                    name="cep"
                                    className="border-gray-300 border rounded-md w-full p-2"
                                    onChange={(e) => handleAddressChange(e)}
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="city" className="block font-medium mb-1">Cidade</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    className="border-gray-300 border rounded-md w-full p-2"
                                    onChange={(e) => handleAddressChange(e)}
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="state" className="block font-medium mb-1">Estado</label>
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    className="border-gray-300 border rounded-md w-full p-2"
                                    onChange={(e) => handleAddressChange(e)}
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="country" className="block font-medium mb-1">País</label>
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    className="border-gray-300 border rounded-md w-full p-2"
                                    onChange={(e) => handleAddressChange(e)}
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="observations" className="block font-medium mb-1">Observações</label>
                                <input
                                    type='text'
                                    id="observations"
                                    name="observations"
                                    className="border-gray-300 border rounded-md w-full p-2"
                                    onChange={(e) => handleAddressChange(e)}
                                >

                                </input>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-center">
                                    <label htmlFor="keepAddressSavedCheckbox" className="font-medium">Manter endereço salvo no cadastro</label>
                                    <input
                                        type="checkbox"
                                        id="keepAddressSavedCheckbox"
                                        checked={keepAddressSaved}
                                        onChange={(e) => setKeepAddressSaved(e.target.checked)}
                                        className="mr-2 ml-2 mt-1"
                                    />
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className="px-4 py-2 mr-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 focus:outline-none"
                                        onClick={CloseAddressModal}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        id='btn-salvar-endereco'
                                        type="button"
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
                                        onClick={() => saveAddress()}
                                    >
                                        Adicionar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {isCreditCardModalOpen && (
                <div id="credit-card-modal" className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
                    <div className="bg-white p-6 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg z-10">
                        <h2 className="text-xl font-semibold mb-4">Novo Cartão de Crédito</h2>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="number" className="block font-medium mb-1">Número do Cartão</label>
                                <input
                                    type="text"
                                    id="number"
                                    name="number"
                                    className="border-gray-300 border rounded-md w-full p-2"
                                    onChange={(e) => handleCardChange(e)}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="nameCard" className="block font-medium mb-1">Nome no Cartão</label>
                                <input
                                    type="text"
                                    id="nameCard"
                                    name="nameCard"
                                    className="border-gray-300 border rounded-md w-full p-2"
                                    onChange={(e) => handleCardChange(e)}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="expirationDate" className="block font-medium mb-1">Data de Expiração</label>
                                <input
                                    type="text"
                                    id="expirationDate"
                                    name="expirationDate"
                                    className="border-gray-300 border rounded-md w-full p-2"
                                    onChange={(e) => handleCardChange(e)}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="securityCode" className="block font-medium mb-1">Código de Segurança</label>
                                <input
                                    type="text"
                                    id="securityCode"
                                    name="securityCode"
                                    className="border-gray-300 border rounded-md w-full p-2"
                                    onChange={(e) => handleCardChange(e)}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="banner" className="block font-medium mb-1">Bandeira do Cartão</label>
                                <select
                                    id="banner"
                                    name="banner"
                                    className="border-gray-300 border rounded-md w-full p-2"
                                    onChange={(e) => handleCardChange(e)}
                                >
                                    {CardBanners.map((CardBanner, CardBannerIndex) => (
                                        <option key={CardBannerIndex} value={CardBanner.name}>{CardBanner.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-center">
                                    <label htmlFor="keepCardSavedCheckbox" className="font-medium">Manter cartão salvo no cadastro</label>
                                    <input
                                        type="checkbox"
                                        id="keepCardSavedCheckbox"
                                        checked={keepCardSaved}
                                        onChange={(e) => setKeepCardSaved(e.target.checked)}
                                        className="mr-2 ml-2 mt-1"
                                    />
                                </div>

                                <div>
                                    <button
                                        type="button"
                                        className="px-4 py-2 mr-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 focus:outline-none"
                                        onClick={CloseCreditCardModal}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        id="btn-salvar-cartao"
                                        type="button"
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
                                        onClick={() => saveCard()}
                                    >
                                        Adicionar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

