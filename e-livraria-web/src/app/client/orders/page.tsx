"use client"
import React, { useEffect, useState } from 'react';
import { Order } from '@/models/Order';
import { OrderService } from '@/services/OrderService';
import { EOrderStatus } from '@/models/EOrderStatus';
import { useRouter } from 'next/navigation';
import { OrderItem } from '@/models/OrderItem';
import { RequestTradeDevolution } from '@/models/RequestTradeDevolution';
import { PaymentMethod } from '@/models/PaymentMethod';
import { RequestTradeDevolutionService } from '@/services/RequestTradeDevolutionService';

export default function OrdersPage() {
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [selectedProducts, setSelectedProducts] = useState<OrderItem[]>([]);
    const [selectedQuantities, setSelectedQuantities] = useState<{ [key: number]: number }>({});
    const orderService = new OrderService();
    const requestTradeDevolutionService = new RequestTradeDevolutionService();


    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        orderService.findByClient(2).then((response) => {
            setOrders(response.data);
        }).catch((error) => {
            alert('Erro ao buscar pedidos!: ' + error);
        });
    };

    const CancelarCompra = async (order: Order) => {
        if (order.status !== EOrderStatus.EM_PROCESSAMENTO && order.status !== EOrderStatus.APROVADA && order.status !== EOrderStatus.EM_TRANSPORTE) {
            alert('Pedido já entregue, não é possível cancelar!');
            return;
        }

        if (window.confirm('Tem certeza de que deseja cancelar o pedido?')) {
            try {
                order.status = EOrderStatus.CANCELADO;
                await orderService.save(order);
                alert('Pedido cancelado com sucesso!');
                fetchOrders();
            } catch (error) {
                alert('Erro ao cancelar pedido!: ' + error);
            }
        }
    };

    const trocarProduto = (order: Order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    }

    const enviarItens = (order: Order) => {
        if (order.status === EOrderStatus.TROCA_AUTORIZADA) {
            if (window.confirm('Tem certeza de que deseja enviar itens para troca?')) {
                order.status = EOrderStatus.ITENS_ENVIADOS_TROCA;
                orderService.save(order).then(() => {
                    alert('Itens enviados com sucesso!');
                    fetchOrders();
                }).catch((error) => {
                    alert('Erro ao enviar itens!: ' + error);
                });
            }
        } else if (order.status === EOrderStatus.DEVOLUCAO_AUTORIZADA) {
            if (window.confirm('Tem certeza de que deseja enviar itens para devolução?')) {
                order.status = EOrderStatus.ITENS_ENVIADOS_DEVOLUCAO;
                orderService.save(order).then(() => {
                    alert('Itens enviados com sucesso!');
                    fetchOrders();
                }).catch((error) => {
                    alert('Erro ao enviar itens!: ' + error);
                });
            }
        } else {
            alert('Pedido não está apto para envio de itens!');
        }
    }

    const confirmarTroca = async () => {
        if (selectedOrder && selectedOrder.status === EOrderStatus.ENTREGUE) {
            if (window.confirm('Tem certeza de que deseja trocar o pedido?')) {
                    selectedOrder.status = EOrderStatus.EM_TROCA;
                    const newItens: OrderItem[] = selectedProducts.map(product => {
                        const quantity = selectedQuantities[product.id] || 1;
                        return new OrderItem({
                            id: product.id,
                            book: product.book,
                            quantity: quantity,
                            value: product.value
                        });
                    });
                    const requestValue = newItens.reduce((acc, item) => acc + item.value * item.quantity, 0);
                    const requestTradeDevolution = new RequestTradeDevolution({
                        order: selectedOrder,
                        active: true,
                        requestItens: newItens,
                        date: new Date(),
                        value: (requestValue - (requestValue * selectedOrder.promotionalCoupon.value / 100))
                    });
                    console.log(requestTradeDevolution);
                    await orderService.save(selectedOrder);
                    await requestTradeDevolutionService.save(requestTradeDevolution);
                    fetchOrders()
                    alert("Solicitação de troca realizada com sucesso!")
                    setIsModalOpen(false);
            } else {
                return;
            }
        } else {
            alert('Pedido ainda não entregue, não é possível trocar!');
        }
    }

    const toggleProductSelection = (product: OrderItem) => {
        setSelectedProducts(prevSelectedProducts => {
            if (prevSelectedProducts.some(item => item.id === product.id)) {
                setSelectedQuantities(prevQuantities => {
                    const { [product.id]: _, ...rest } = prevQuantities;
                    return rest;
                });
                return prevSelectedProducts.filter(item => item.id !== product.id);
            } else {
                setSelectedQuantities(prevQuantities => ({
                    ...prevQuantities,
                    [product.id]: 1
                }));
                return [...prevSelectedProducts, product];
            }
        });
    };

    const updateProductQuantity = (product: OrderItem, quantity: number) => {
        setSelectedQuantities(prevQuantities => ({
            ...prevQuantities,
            [product.id]: quantity
        }));
    };

    const devolverProduto = async (order: Order) => {
        if (order.status === EOrderStatus.ENTREGUE) {
            if (window.confirm('Tem certeza de que deseja devolver o pedido?')) {
                order.status = EOrderStatus.EM_DEVOLUCAO;
                await orderService.save(order);
                alert('Solicitação de devolução realizada com sucesso!');
                fetchOrders();
            } else {
                return;
            }
        } else {
            alert('Pedido ainda não entregue, não é possível devolver!');
        }
    }
    return (
        <section className="py-10 relative">
            <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center mb-10">
                    Pedidos
                </h2>
                {orders.map((order, orderIndex) => (
                    <div key={order.id} className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full mb-8">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                            <div className="data">
                                <p id={`id-pedido-${order.id}`} className="font-semibold text-base leading-7 text-black">Id do Pedido: <span className="text-indigo-600 font-medium">#{order.id}</span></p>
                                <p className="font-semibold text-base leading-7 text-black mt-4">Data do Pagamento: <span className="text-gray-600 font-medium">{new Date(order.orderedOn).toLocaleDateString('pt-BR')}</span></p>
                            </div>
                            <div className="flex gap-3 lg:block">
                                <p className="font-semibold text-base leading-7 text-black mt-4">Status: <span className="text-gray-600 font-medium">{order.status}</span></p>
                            </div>
                            <div>
                                <p className="font-semibold text-base leading-7 text-black">Cupons utilizados:</p>
                                {order.tradeDevolutionCoupons.map((cupom, index) => (
                                    <div key={index}>
                                        <p>{cupom.name}: R$ {cupom.value}</p>
                                    </div>
                                ))}
                                <p>
                                    {order.promotionalCoupon.name} : {order.promotionalCoupon.value}%
                                </p>
                            </div>
                        </div>
                        <div className="w-full px-3 min-[400px]:px-6">
                            {order.orderItens.map((orderItem, index) => (
                                <div key={orderItem.id} className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
                                    <div className="img-box max-lg:w-full">
                                        <img src={orderItem.book.imageSrc} alt={orderItem.book.imageAlt} className="aspect-square w-full lg:max-w-[140px]" />
                                    </div>
                                    <div className="flex flex-row items-center w-full ">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                                            <div className="flex items-center">
                                                <div className="">
                                                    <h2 className="font-semibold text-xl leading-8 text-black mb-3">
                                                        {orderItem.book.name}</h2>
                                                    <p className="font-normal text-lg leading-8 text-gray-500 mb-3 ">
                                                        By: {orderItem.book.author}</p>
                                                    <div className="flex items-center ">
                                                        <p className="font-medium text-base leading-7 text-black ">Qty: <span
                                                            className="text-gray-500">{orderItem.quantity}</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-5">
                                                <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                                                    <div className="flex gap-5 lg:block">
                                                        <p className="font-medium text-sm leading-7 text-black">Preço</p>
                                                        <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">R$ {orderItem.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                                                    </div>
                                                </div>
                                                <div></div>
                                                <div></div>
                                                <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                                                    <div className="flex gap-5 lg:block">
                                                        <p className="font-medium text-sm leading-7 text-black">Subtotal</p>
                                                        <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">R$ {(orderItem.value * orderItem.quantity).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
                            <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
                                <button
                                    id='btn-cancelar'
                                    className="flex outline-0 py-6 sm:pr-6  sm:border-r border-gray-200 whitespace-nowrap gap-2 items-center justify-center font-semibold group text-lg text-black bg-white transition-all duration-500 hover:text-indigo-600"
                                    onClick={() => CancelarCompra(order)}
                                >
                                    <svg className="stroke-black transition-all duration-500 group-hover:stroke-indigo-600" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                                        fill="none">
                                        <path d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5" stroke="" strokeWidth="1.6"
                                            strokeLinecap="round" />
                                    </svg>
                                    Cancelar Pedido
                                </button>
                                <div className="ml-4 py-2">
                                    <p className="font-semibold text-base leading-7 text-black">Pago com cartão(s) final:</p>
                                    {order.paymentMethods.map((method, index) => (
                                        <div key={index}>
                                            {method.creditCard.number.slice(-4)} : R$ {method.value}
                                        </div>
                                    ))}
                                </div>
                                {(order.status === EOrderStatus.TROCA_AUTORIZADA || order.status === EOrderStatus.DEVOLUCAO_AUTORIZADA) && (
                                    <button
                                        id="btn-enviar-itens"
                                        className='ml-32 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded'
                                        onClick={() => enviarItens(order)}
                                    >
                                        Enviar Itens
                                    </button>
                                )}
                                <button
                                    id="btn-troca"
                                    className='ml-28 mr-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
                                    onClick={() => trocarProduto(order)}
                                >
                                    Troca
                                </button>
                                <button
                                    id="btn-devolucao"
                                    className=' bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded'
                                    onClick={() => devolverProduto(order)}
                                >
                                    Devolução
                                </button>
                            </div>
                            <p id="total-price" className="font-semibold text-lg text-black py-6">Preço Total: <span className="text-indigo-600">R$ {order.totalValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span></p>
                        </div>
                    </div>
                ))}
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
                    <div className="bg-white p-6 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg z-10">
                        <h2 className="text-xl font-semibold mb-4">Selecionar Produtos para Troca</h2>
                        {selectedOrder && selectedOrder.orderItens.map((orderItem, index) => (
                            <div key={index} className="mb-4">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedProducts.includes(orderItem)}
                                        onChange={() => toggleProductSelection(orderItem)}
                                        className="mr-2"
                                    />
                                    <span>{orderItem.book.name} - {orderItem.book.author}</span>
                                    {selectedProducts.includes(orderItem) && (
                                        <input
                                            type="number"
                                            min="1"
                                            max={orderItem.quantity}
                                            value={selectedQuantities[orderItem.id] || 1}
                                            onChange={(e) => updateProductQuantity(orderItem, parseInt(e.target.value))}
                                            className="ml-4 p-1 border rounded"
                                        />
                                    )}
                                </label>
                            </div>
                        ))}
                        <div className="flex justify-between">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 mr-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 focus:outline-none">
                                Cancelar
                            </button>
                            <button onClick={() => confirmarTroca()} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none">
                                Confirmar Troca
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};  