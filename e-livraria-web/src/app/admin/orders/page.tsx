"use client"
import React, { useEffect, useState } from 'react';
import { Order } from '@/models/Order';
import { useRouter } from 'next/navigation';
import { OrderService } from '@/services/OrderService';
import { EOrderStatus } from '@/models/EOrderStatus';
import { TradeDevolutionCoupon } from '@/models/TradeDevolutionCoupon';
import { TradeDevolutionCouponService } from '@/services/TradeDevolutionCouponService';
import { RequestTradeDevolutionService } from '@/services/RequestTradeDevolutionService';
import { RequestTradeDevolution } from '@/models/RequestTradeDevolution';

export default function AdminOrdersPage() {
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [tradeRequest, setTradeRequest] = useState<RequestTradeDevolution | null>(null);
    const [modal, setModal] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<EOrderStatus>();
    const orderService = new OrderService();
    const tradeDevolutionCouponService = new TradeDevolutionCouponService();
    const requestTradeDevolutionService = new RequestTradeDevolutionService();

    const handleStatusChange = (orderId: number, newStatus: EOrderStatus) => {
        setSelectedStatus(newStatus);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        orderService.findAll().then((response) => {
            setOrders(response.data);
        }).catch((error) => {
            alert('Erro ao buscar pedidos!: ' + error);
        });
    };

    const getStatusOptions = (status: EOrderStatus): EOrderStatus[] => {
        switch (status) {
            case EOrderStatus.EM_PROCESSAMENTO:
                return [EOrderStatus.APROVADA, EOrderStatus.REPROVADA];
            case EOrderStatus.EM_TROCA:
                return [EOrderStatus.TROCA_AUTORIZADA, EOrderStatus.TROCA_NEGADA];
            case EOrderStatus.ITENS_ENVIADOS_TROCA:
                return [EOrderStatus.ITENS_RECEBIDOS_TROCA];
            case EOrderStatus.ITENS_RECEBIDOS_TROCA:
                return [EOrderStatus.TROCADO];
            case EOrderStatus.EM_DEVOLUCAO:
                return [EOrderStatus.DEVOLUCAO_AUTORIZADA, EOrderStatus.DEVOLUCAO_NEGADA];
            case EOrderStatus.ITENS_ENVIADOS_DEVOLUCAO:
                return [EOrderStatus.ITENS_RECEBIDOS_DEVOLUCAO];
            case EOrderStatus.ITENS_RECEBIDOS_DEVOLUCAO:
                return [EOrderStatus.DEVOLVIDO];
            case EOrderStatus.EM_TRANSPORTE:
                return [EOrderStatus.ENTREGUE];
            case EOrderStatus.APROVADA:
                return [EOrderStatus.EM_TRANSPORTE, EOrderStatus.CANCELADO];
            case EOrderStatus.REPROVADA:
                return [EOrderStatus.EM_PROCESSAMENTO];
            default:
                return [];
        }
    };

    const saveStatusChange = (orderId: number) => {
        if (!selectedStatus || selectedStatus === orders.find(order => order.id === orderId)?.status) {
            alert('Por favor, selecione um status válido antes de salvar.');
            return;
        }

        const updatedOrder = orders.find(order => order.id === orderId);
        if (!updatedOrder) {
            alert('Pedido não encontrado.');
            return;
        }

        updatedOrder.status = selectedStatus;

        orderService.save(updatedOrder).then(() => {
            alert(`Status do pedido ${orderId} alterado para ${selectedStatus}.`);
            if (updatedOrder.status === EOrderStatus.TROCADO) {
                generateTradeCoupon(orderId);
            } else if (updatedOrder.status === EOrderStatus.DEVOLVIDO) {
                generateDevolutionCoupon(orderId);
            }
            fetchOrders();
        }).catch(error => {
            alert(`Ocorreu um erro ao salvar o status do pedido ${orderId}`);
            fetchOrders();
            return;
        });
    };

    const generateTradeCoupon = async (orderId: Number) => {
        const updatedOrder = orders.find(order => order.id === orderId);
        if (!updatedOrder) {
            alert('Pedido não encontrado.');
            return;
        }

        if (selectedStatus === EOrderStatus.TROCADO) {
            requestTradeDevolutionService.findByOrder(orderId).then((response) => {
                const requestTrade: RequestTradeDevolution[] = response.data;
                const tradeCoupon: TradeDevolutionCoupon = new TradeDevolutionCoupon({
                    name: `TROCA${requestTrade[0].value}`,
                    value: requestTrade[0].value,
                    client: updatedOrder.client,
                    used: false
                });
                console.log(requestTrade);
                console.log(tradeCoupon);
                tradeDevolutionCouponService.save(tradeCoupon).then(() => {
                    alert(`Cupom de troca gerado com sucesso!`);
                }).catch(error => {
                    alert(`Ocorreu um erro ao gerar o cupom de Troca: ${error.message}`);
                    return;
                });
            }).catch(error => {
                alert(`Ocorreu um erro ao buscar a solicitação de troca: ${error.message}`);
                return;
            });
        }
    }

    const generateDevolutionCoupon = (orderId: number) => {
        const updatedOrder = orders.find(order => order.id === orderId);
        if (!updatedOrder) {
            alert('Pedido não encontrado.');
            return;
        }

        if (selectedStatus === EOrderStatus.DEVOLVIDO) {
            const devolutionCoupon: TradeDevolutionCoupon = new TradeDevolutionCoupon({
                name: `DEVOLUCAO${orders.find(order => order.id === orderId)?.totalValue}`,
                value: updatedOrder.totalValue,
                client: updatedOrder.client,
                used: false
            });
            console.log(updatedOrder.client)
            tradeDevolutionCouponService.save(devolutionCoupon).then(() => {
                alert(`Cupom de devolução gerado com sucesso!`);
            }).catch(error => {
                alert(`Ocorreu um erro ao gerar o cupom de devolução: ${error.message}`);
                return;
            });
        }
    };

    const openModal = (order: Order) => {
        if ([EOrderStatus.TROCA_AUTORIZADA, EOrderStatus.TROCA_NEGADA, EOrderStatus.ITENS_ENVIADOS_TROCA, EOrderStatus.ITENS_RECEBIDOS_TROCA, EOrderStatus.EM_TROCA].includes(order.status)) {
            requestTradeDevolutionService.findByOrder(order.id).then((response) => {
                setTradeRequest(response.data[0]);
                setModal(true);
            }).catch(error => {
                alert(`Erro ao buscar detalhes da solicitação de troca: ${error.message}`);
            });
        } else {
            setSelectedOrder(order);
            setModal(true);
        }
    }

    const closeModal = () => {
        setModal(false);
        setSelectedOrder(null);
        setTradeRequest(null);
    }
    return (
        <section className="py-10 relative">
            <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center mb-10">
                    Pedidos (Administrador)
                </h2>
                <div id="table" className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
                    {orders.map((order, index) => (
                        <div key={order.id} className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                            <div className="flex-1">
                                <p className="font-semibold text-base leading-7 text-black">Pedido: <span className="text-indigo-600 font-medium">#{order.id}</span></p>
                                <p id={`status-${index}`} className="font-semibold text-base leading-7 text-black mt-2">Status: <span className="text-gray-600 font-medium">{order.status}</span></p>
                                <p className="font-semibold text-base leading-7 text-black mt-2">Cliente: <span className="text-gray-600 font-medium">{order.client.name}</span></p>
                                <p className="font-semibold text-base leading-7 text-black mt-2">Valor Total: <span className="text-gray-600 font-medium">R$ {order.totalValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span></p>
                            </div>
                            <div className="flex items-center">
                                <select id={`select-status-${index}`} value={selectedStatus} onChange={e => handleStatusChange(order.id, e.target.value as EOrderStatus)} className="w-56 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200">
                                    <option value="">Selecionar</option>
                                    {getStatusOptions(order.status).map((option, opIndex) => (
                                        <option key={`${order.id}-${opIndex}`} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button id={`salvar-${index}`} onClick={() => saveStatusChange(order.id)} className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Salvar</button>
                            <button id={`detalhes-${index}`} onClick={() => openModal(order)} className="ml-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Detalhes</button>
                        </div>
                    ))}
                </div>
            </div>
            {modal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white min-h-80 w-max min-w-96 flex flex-col p-6 rounded-lg shadow-xl">
                        {tradeRequest ? (
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Detalhes da Solicitação de Troca</h2>
                                    <p className="mb-2"><strong>Cliente:</strong> {tradeRequest.order.client.name}</p>
                                    <p className="mb-2"><strong>Data Pedido:</strong> {new Date(tradeRequest.order.orderedOn).toLocaleDateString()}</p>
                                    <hr/>
                                <p className="mb-2"><strong>Data Solicitação:</strong> {new Date(tradeRequest.date).toLocaleDateString()}</p>
                                <p className="mb-2"><strong>Valor:</strong> R$ {tradeRequest.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                                <hr/>
                                <h3 className="text-xl font-semibold mt-4 mb-2">Itens:</h3>
                                {tradeRequest.requestItens.map(item => (
                                    <div key={item.id} className="mb-4">
                                        <p><strong>Livro:</strong> {item.book.name}</p>
                                        <p><strong>Quantidade:</strong> {item.quantity}</p>
                                        <p><strong>Valor:</strong> R$ {item.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            selectedOrder && (
                                <div>
                                    <h2 className="text-2xl font-bold mb-4 ">Detalhes do Pedido</h2>
                                    <p className="mb-2"><strong>Cliente:</strong> {selectedOrder.client.name}</p>
                                    <p className="mb-2"><strong>Data:</strong> {new Date(selectedOrder.orderedOn).toLocaleDateString()}</p>
                                    <p className="mb-2"><strong>Valor Total:</strong> R$ {selectedOrder.totalValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                                    <hr/>
                                    <h3 className="text-xl font-semibold mt-2 mb-2">Itens:</h3>
                                    {selectedOrder.orderItens.map(item => (
                                        <div key={item.id} className="mb-4">
                                            <p><strong>Livro:</strong> {item.book.name}</p>
                                            <p><strong>Quantidade:</strong> {item.quantity}</p>
                                            <p><strong>Valor:</strong> R$ {item.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                                        </div>
                                    ))}
                                    <hr/>
                                    <h3 className="text-xl font-semibold mt-4 mb-2">Métodos de Pagamento:</h3>
                                    {selectedOrder.paymentMethods.map(method => (
                                        <div key={method.id} className="mb-4">
                                            <p><strong>Cartão:</strong> {method.creditCard.number}</p>
                                            <p><strong>Valor:</strong> R$ {method.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                                        </div>
                                    ))}
                                    <hr/>
                                    {selectedOrder.promotionalCoupon && (
                                        <div>
                                            <h3 className="text-xl font-semibold mt-4 mb-2">Cupom Promocional:</h3>
                                            <p><strong>Nome:</strong> {selectedOrder.promotionalCoupon.name}</p>
                                            <p><strong>Valor:</strong> R$ {selectedOrder.promotionalCoupon.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                                        </div>
                                    )}
                                </div>
                            )
                        )}
                        <button onClick={closeModal} className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Fechar</button>
                    </div>
                </div>
            )}
        </section>
    );
};
