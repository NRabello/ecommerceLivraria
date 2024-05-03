package com.nrabello.ecommerceLivraria.strategy.Order;

import com.nrabello.ecommerceLivraria.database.OrderDao;
import com.nrabello.ecommerceLivraria.model.Order;
import com.nrabello.ecommerceLivraria.strategy.IStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
public class FindOrdersByClientStrategy implements IStrategy<Order> {

    @Autowired
    OrderDao dao;

    @Override
    public List<Order> process(Order model) {
        return dao.findAllByClient(model.getClient().getId());
    }
}
