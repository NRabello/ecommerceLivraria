"use client"
import React, { useEffect, useState } from 'react';
import { Order } from '@/models/Order';
import { OrderService } from '@/services/OrderService';
import { EOrderStatus } from '@/models/EOrderStatus';
import { useRouter } from 'next/navigation';

export default function OrdersPage() {
    const router = useRouter();
    const [orderStatus, setOrderStatus] = useState<EOrderStatus>();
    const [orders, setOrders] = useState<Order[]>([])
    const orderService = new OrderService();



    useEffect(() => {
        orderService.findByClient(2).then((response) => {
            setOrders(response.data);
        }).catch((error) => {
            alert('Erro ao buscar pedidos!: ' + error);
        });
    }, []);

    const CancelarCompra = async (order: Order) => {
        if (order.status === 'ENTREGUE') {
            alert('Pedido já entregue, não é possível cancelar!');
            return;
        }

        if (window.confirm('Tem certeza de que deseja cancelar o pedido?')) {
            try {
                setOrderStatus(EOrderStatus.CANCELADO);
                await orderService.save(order);
                alert('Pedido cancelado com sucesso!');
                router.push('/');
            } catch (error) {
                alert('Erro ao cancelar pedido!: ' + error);
            }
        }
    };

    const trocarProduto = (order: Order) => {
        if (order.status === 'entregue') {
            console.log(order.status)
            if (window.confirm('Tem certeza de que deseja cancelar o pedido?')) {
                alert('Solicitação de troca realizada com sucesso!' + '\n' + 'Utilize o cupom: TROCA para usar o valor da troca em sua próxima compra!');
                setOrderStatus(EOrderStatus.EM_TROCA);
            }
        } else {
            alert('Pedido ainda não entregue, não é possível trocar!');
        }
    }

    const devolverProduto = (order: Order) => {
        if (order.status === 'entregue') {
            alert('Solicitação de devolução realizada com sucesso!' + '\n' + 'Utilize o cupom: DEVOLUCAO para usar o valor da devolução em sua próxima compra!');
            setOrderStatus(EOrderStatus.EM_DEVOLUCAO);
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
                                <p className="font-semibold text-base leading-7 text-black">Id do Pedido: <span className="text-indigo-600 font-medium">#{order.id}</span></p>
                                <p className="font-semibold text-base leading-7 text-black mt-4">Data do Pagamento: <span className="text-gray-600 font-medium">{new Date(order.orderedOn).toLocaleDateString('pt-BR')}</span></p>
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
                                                    <div className="flex gap-3 lg:block">
                                                        <p className="font-medium text-sm leading-7 text-black">Preço</p>
                                                        <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">R$ {orderItem.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                                                    </div>
                                                </div>
                                                <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                                                    <div className="flex gap-3 lg:block">
                                                        <p className="font-medium text-sm leading-7 text-black">Status</p>
                                                        <p>Em Processamento</p>
                                                    </div>
                                                </div>
                                                <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                                                    <div className="flex gap-3 lg:block">
                                                        <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
                                                            Entrega prevista: <span className="text-emerald-500 font-medium">{new Date(new Date(order.orderedOn).getTime() + (15 * 24 * 60 * 60 * 1000)).toLocaleDateString('pt-BR')}</span>
                                                        </p>
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
                                <p className="font-medium text-lg text-gray-900 pl-6 py-3 max-lg:text-center">Pago com cartão final 8822</p>
                                <button
                                    id="btn-troca"
                                    className=' ml-48 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
                                    onClick={() => trocarProduto(order)}
                                >
                                    Troca
                                </button>
                                <button
                                    id="btn-devolucao"
                                    className='ml-10 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded'
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
        </section>
    );
};  