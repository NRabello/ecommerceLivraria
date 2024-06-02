"use client"
import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Order } from '@/models/Order';
import { useEffect, useState } from 'react';
import { OrderService } from '@/services/OrderService';
import { maxHeaderSize } from 'http';

type MonthlyData = {
    month: string;
    totalValue: number;
};

function transformOrderData(orders: Order[]): MonthlyData[] {
    const monthlyData: { [key: string]: number } = {};

    orders.forEach(order => {
        const orderedOn = new Date(order.orderedOn);
        const month = `${orderedOn.getFullYear()}-${String(orderedOn.getMonth() + 1).padStart(2, '0')}`;
        if (!monthlyData[month]) {
            monthlyData[month] = 0;
        }
        monthlyData[month] += order.totalValue;
    });

    // Ordenar os dados por mês
    const sortedMonthlyData = Object.entries(monthlyData).sort(([a], [b]) => (a > b ? 1 : -1));

    return sortedMonthlyData.map(([month, totalValue]) => ({ month, totalValue }));
}

export default function LineDataset() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [startDate, setStartDate] = useState<string>('2023-08');
    const [endDate, setEndDate] = useState<string>('2024-06');
    const [transformedData, setTransformedData] = useState<MonthlyData[]>([]);

    useEffect(() => {
        const orderService = new OrderService();
        orderService.findDash().then((response) => {
            setOrders(response.data);
        });
    }, []);

    const handleFilter = () => {
        const filteredOrders = orders.filter(order => {
            const orderedOn = new Date(order.orderedOn);
            return orderedOn >= new Date(startDate) && orderedOn <= new Date(endDate);
        });

        setTransformedData(transformOrderData(filteredOrders));
    };

    useEffect(() => {
        handleFilter();
      }, [orders, startDate, endDate]);

    const meses = transformedData.map(data => {
        const [ano, mes] = data.month.split('-');
        return mes;
    });
    console.log(meses)


    return (
        <div className="text-center">
            <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center mb-10 mt-2">Dashboards</h2>
            <div className='flex justify-center'>
                <LineChart
                    xAxis={[
                        {
                            scaleType: 'band',
                            dataKey: 'month',
                            valueFormatter: (month, context) =>
                                context.location === 'tick' ? `${month.substring(5)} \n ${month.substring(0, 4)}` : `${month} `,
                        },
                    ]}
                    yAxis={[{ dataKey: 'totalValue' }]}
                    series={[
                        {
                            dataKey: 'totalValue',
                            label: 'Valor de vendas por mês',
                            color: 'green',
                            showMark: true,
                        },
                    ]}
                    dataset={transformedData}
                    width={700}
                    height={400}
                />
            </div>
            <div className="flex justify-center flex-auto">
                <div className="flex items-center">
                    <label htmlFor="startDate" className="mr-2 text-sm font-medium">Início:</label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 mr-4"
                    />
                </div>
                <div className="flex items-center">
                    <label htmlFor="endDate" className="mr-2 text-sm font-medium">Fim:</label>
                    <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 mr-4"
                        disabled={!startDate}
                    />
                </div>
                {/* <button
                    onClick={handleFilter}
                    className="rounded-md bg-blue-500 text-white font-medium py-2 px-4 disabled:opacity-50 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    disabled={!startDate || !endDate}
                >
                    Filtrar
                </button> */}
            </div>
        </div>
    );   
}