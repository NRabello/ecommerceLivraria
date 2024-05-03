import { useState, useEffect } from 'react';
import { OrderItem } from '@/models/OrderItem';

export const useCart = () => {
  const [cart, setCart] = useState<OrderItem[]>([]);

  useEffect(() => {
    if (cart != null && cart.length !== 0)
      localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart !== null && storedCart !== '[]') {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (orderItem: OrderItem) => {
    const existingIndex = cart.findIndex(item => item.book.id === orderItem.book.id);
    if (existingIndex !== -1) {
      const updatedCart = cart.map((item, index) => {
        if (index === existingIndex) {
          if(item.quantity + orderItem.quantity > 5){
            return {...item, quantity: 5};
          }else{
            return { ...item, quantity: item.quantity + orderItem.quantity };
          }
        }
        return item;
      });
      setCart(updatedCart as OrderItem[]);
    } else {
      setCart(prevCart => [...prevCart, orderItem]);
    }
  };

  const updateQuantity = (orderItem: OrderItem, quantity: number) => {
    const updatedCart = cart.map(item => {
      if (item.book.id === orderItem.book.id) {
        return { ...item, quantity: quantity } as Partial<OrderItem>;
      }
      return item;
    });
    setCart(updatedCart as OrderItem[]);
  };
  const removeFromCart = (orderItemToRemove: OrderItem) => {
    setCart(prevCart => prevCart.filter(item => item !== orderItemToRemove));
  };

  return { cart, addToCart, removeFromCart, updateQuantity };
};
