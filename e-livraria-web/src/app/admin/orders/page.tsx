"use client"
import React, { useEffect, useState } from 'react';
import { Order } from '@/models/Order';
import { useRouter } from 'next/navigation';
import { OrderService } from '@/services/OrderService';
import { EOrderStatus } from '@/models/EOrderStatus';

export default function AdminOrdersPage() {
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]); // Supondo que order seja uma lista de pedidos
    const [selectedStatus, setSelectedStatus] = useState<EOrderStatus>();
    const orderService = new OrderService();

    const handleStatusChange = (orderId: number, newStatus: EOrderStatus) => {
        setSelectedStatus(newStatus);
    };

    useEffect(() => {
        orderService.findByClient(2).then((response) => {
            setOrders(response.data);
        }).catch((error) => {
            alert('Erro ao buscar pedidos!: ' + error);
        });
    }, []);

    const getStatusOptions = (status: EOrderStatus): EOrderStatus[] => {
        switch (status) {
            case EOrderStatus.EM_PROCESSAMENTO:
                return [EOrderStatus.APROVADA, EOrderStatus.REPROVADA];
            case EOrderStatus.EM_TROCA:
                return [EOrderStatus.TROCA_AUTORIZADA, EOrderStatus.TROCA_NEGADA];
            case EOrderStatus.EM_DEVOLUCAO:
                return [EOrderStatus.DEVOLVIDO];
            case EOrderStatus.TROCA_AUTORIZADA:
                return [EOrderStatus.TROCADO];
            case EOrderStatus.EM_TRANSPORTE:
                return [EOrderStatus.ENTREGUE];
            case EOrderStatus.APROVADA:
                return [EOrderStatus.EM_TRANSPORTE, EOrderStatus.CANCELADO];
            case EOrderStatus.REPROVADA:
                return [EOrderStatus.EM_PROCESSAMENTO];
            case EOrderStatus.TROCA_NEGADA:
                return [EOrderStatus.EM_TROCA];
            default:
                return [];
        }
    };

    const saveStatusChange = (orderId: number) => {
        if (!selectedStatus) {
            alert('Por favor, selecione um status válido antes de salvar.');
            return;
        }

        const updatedOrders = orders.map(order => {
            if (order.id === orderId) {
                return { ...order, status: selectedStatus };
            } else {
                return order;
            }
        });
        setOrders(updatedOrders);
        alert(`Status do pedido ${orderId} alterado para ${selectedStatus}.`);
    };

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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
