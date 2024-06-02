package com.nrabello.ecommerceLivraria.service;

import com.nrabello.ecommerceLivraria.model.Client;
import com.nrabello.ecommerceLivraria.model.Order;
import com.nrabello.ecommerceLivraria.strategy.order.FindAllOrdersDashStrategy;
import com.nrabello.ecommerceLivraria.strategy.order.FindAllOrdersStrategy;
import com.nrabello.ecommerceLivraria.strategy.order.FindOrdersByClientStrategy;
import com.nrabello.ecommerceLivraria.strategy.order.SaveOrderStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
public class OrderFacade implements IOrderFacade{

    @Autowired
    SaveOrderStrategy saveOrderStrategy;

    @Autowired
    FindAllOrdersStrategy findAllOrdersStrategy;

    @Autowired
    FindOrdersByClientStrategy findOrdersByClientStrategy;

    @Autowired
    FindAllOrdersDashStrategy findAllOrdersDashStrategy;

    @Override
    public void save(Order order) {
        saveOrderStrategy.process(order);
    }

    @Override
    public Order findById(Long id) {
        return null;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Order> findAll() {
        return findAllOrdersStrategy.process(new Order());
    }

    @Override
    public List<Order> find(String filter) {
        return null;
    }

    @Override
    public void update(Order order) {
        saveOrderStrategy.process(order);
    }

    @Override
    public void delete(Order order) {

    }
    @Override
    public List<Order> findOrdersByClient(Long id) {
        Order order = new Order();
        Client client = new Client();
        client.setId(id);
        order.setClient(client);
        return findOrdersByClientStrategy.process(order);
    }

    @Override
    public List<Order> findOrdersDash() {
        return findAllOrdersDashStrategy.process(new Order());
    }
}
