package com.nrabello.ecommerceLivraria.strategy.Order;

import com.nrabello.ecommerceLivraria.database.OrderDao;
import com.nrabello.ecommerceLivraria.model.Order;
import com.nrabello.ecommerceLivraria.model.OrderItem;
import com.nrabello.ecommerceLivraria.model.PaymentMethod;
import com.nrabello.ecommerceLivraria.strategy.IStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class SaveOrderStrategy implements IStrategy<Order> {

    @Autowired
    OrderDao orderDao;

    @Override
    public List<Order> process(Order model) {

        for (OrderItem orderItem : model.getOrderItens()){
            orderItem.setOrder(model);
        }

        for (PaymentMethod paymentMethod : model.getPaymentMethods()){
            paymentMethod.setOrder(model);
        }

        orderDao.save(model);
        return new ArrayList<>();
    }
}
