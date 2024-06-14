"use client";
import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Order } from '@/models/Order';
import { useEffect, useState } from 'react';
import { OrderService } from '@/services/OrderService';
import { Select, MenuItem, FormControl, InputLabel, Checkbox, ListItemText, SelectChangeEvent } from '@mui/material';

type BookSalesData = {
    month: string;
    books: { [bookTitle: string]: number };
};

function getMonthsInRange(startDate: string, endDate: string): string[] {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const months = [];

    let current = new Date(start);
    while (current <= end) {
        months.push(`${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`);
        current.setMonth(current.getMonth() + 1);
    }

    return months;
}

function transformOrderData(orders: Order[], startDate: string, endDate: string): BookSalesData[] {
    const monthlyData: { [month: string]: { [bookTitle: string]: number } } = {};

    orders.forEach(order => {
        const orderedOn = new Date(order.orderedOn);
        const month = `${orderedOn.getFullYear()}-${String(orderedOn.getMonth() + 1).padStart(2, '0')}`;

        if (!monthlyData[month]) {
            monthlyData[month] = {};
        }

        order.orderItens.forEach(item => {
            if (!monthlyData[month][item.book.name]) {
                monthlyData[month][item.book.name] = 0;
            }
            monthlyData[month][item.book.name] += item.quantity;
        });
    });

    const allMonths = getMonthsInRange(startDate, endDate);
    const bookTitles = new Set<string>();
    orders.forEach(order => {
        order.orderItens.forEach(item => {
            bookTitles.add(item.book.name);
        });
    });

    const result: BookSalesData[] = allMonths.map(month => {
        const salesData = monthlyData[month] || {};
        const books = Array.from(bookTitles).reduce((acc, title) => {
            acc[title] = salesData[title] || 0;
            return acc;
        }, {} as { [bookTitle: string]: number });

        return { month, books };
    });

    return result;
}

export default function LineDataset() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [startDate, setStartDate] = useState<string>('2023-08');
    const [endDate, setEndDate] = useState<string>('2024-07');
    const [chartData, setChartData] = useState<BookSalesData[]>([]);
    const [bookTitles, setBookTitles] = useState<string[]>([]);
    const [selectedBooks, setSelectedBooks] = useState<string[]>([]);

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

        const transformedData = transformOrderData(filteredOrders, startDate, endDate);
        setChartData(transformedData);

        const titles = new Set<string>();
        transformedData.forEach(data => {
            Object.keys(data.books).forEach(key => {
                titles.add(key);
            });
        });
        const titlesArray = Array.from(titles);
        setBookTitles(titlesArray);
        setSelectedBooks(titlesArray.length > 0 ? [titlesArray[0]] : []);
    };

    useEffect(() => {
        handleFilter();
    }, [orders, startDate, endDate]);

    const handleBookSelectionChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
        setSelectedBooks(typeof value === 'string' ? value.split(',') : value);
    };

    return (
        <div className="bg-gray-200 min-h-screen">
            <div className="text-center">
                <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center mb-4 py-2">Dashboards</h2>
                <div className="flex justify-center mb-4">
                </div>
                <div className="flex justify-center">
                    <LineChart
                        xAxis={[
                            {
                                scaleType: 'band',
                                dataKey: 'month',
                                valueFormatter: (month, context) =>
                                    context.location === 'tick' ? `${month.substring(5)} \n ${month.substring(0, 4)}` : `${month} `,
                            },
                        ]}
                        yAxis={[{ dataKey: 'value' }]}
                        series={selectedBooks.map(title => ({
                            dataKey: title,
                            label: title,
                            showMark: true,
                            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                        }))}
                        dataset={chartData.map(data => ({
                            month: data.month,
                            ...data.books
                        }))}
                        width={900}
                        height={600}
                        slotProps={{
                            legend: {
                              direction: 'row',
                              position: { vertical: 'top', horizontal: 'right' },
                              padding: 0,
                            },
                          }}
                    />
                </div>
                <div className="flex justify-center flex-auto mb-2">
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
                </div>
                <FormControl className='w-full container' style={{ minWidth: 300, maxWidth: 820 }}>
                        <InputLabel id="select-books-label">Select Books</InputLabel>
                        <Select
                            labelId="select-books-label"
                            id="select-books"
                            multiple
                            value={selectedBooks}
                            onChange={handleBookSelectionChange}
                            renderValue={(selected) => (selected as string[]).join(', ')}
                        >
                            {bookTitles.map((title) => (
                                <MenuItem key={title} value={title}>
                                    <Checkbox checked={selectedBooks.indexOf(title) > -1} />
                                    <ListItemText primary={title} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
            </div>
        </div>
    );
}
