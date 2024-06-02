package com.nrabello.ecommerceLivraria.service;

import com.nrabello.ecommerceLivraria.model.Order;

import java.util.List;

public interface IOrderFacade extends IFacade<Order>{
    List<Order> findOrdersByClient(Long id);

    List<Order> findOrdersDash();
}
