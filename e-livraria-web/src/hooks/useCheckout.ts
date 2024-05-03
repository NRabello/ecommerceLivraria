import { useState, useEffect } from 'react';
import { OrderItem } from '@/models/OrderItem';

export const useCheckout = () => {
  const [checkout, setCheckout] = useState<OrderItem[]>([]);

  useEffect(() => {
    if (checkout != null && checkout.length !== 0)
      localStorage.setItem('checkout', JSON.stringify(checkout));
  }, [checkout]);

  useEffect(() => {
    const storedCheckout = localStorage.getItem('checkout');
    if (storedCheckout !== null && storedCheckout !== '[]') {
      setCheckout(JSON.parse(storedCheckout));
    }
  }, []);

  const addOneToCheckout = (orderItem: OrderItem) => {
    setCheckout([orderItem]);
    console.log(checkout)
  };

  const addSeveralToCheckout = (orderItens: OrderItem[]) => {
    setCheckout(orderItens);
    console.log(checkout)
  };

  const updateQuantity = (orderItem: OrderItem, quantity: number) => {
    const updatedCheckout = checkout.map(item => {
      if (item.book.id === orderItem.book.id) {
        return { ...item, quantity: quantity } as Partial<OrderItem>;
      }
      return item;
    });
    setCheckout(updatedCheckout as OrderItem[]);
  };

  const removeFromCheckout = (orderItemToRemove: OrderItem) => {
    setCheckout(prevCheckout => prevCheckout.filter(item => item !== orderItemToRemove));
  };

  return { checkout, setCheckout, addOneToCheckout, addSeveralToCheckout, removeFromCheckout, updateQuantity };
};
