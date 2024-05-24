package com.nrabello.ecommerceLivraria.service;

import com.nrabello.ecommerceLivraria.model.Order;
import com.nrabello.ecommerceLivraria.model.RequestTradeDevolution;
import com.nrabello.ecommerceLivraria.strategy.requestTradeDevolution.FindRequestByOrderStrategy;
import com.nrabello.ecommerceLivraria.strategy.requestTradeDevolution.SaveRequestTradeDevolutionStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RequestTradeDevolutionFacade implements IFacade<RequestTradeDevolution>{
    @Autowired
    SaveRequestTradeDevolutionStrategy saveRequestTradeDevolutionStrategy;

    @Autowired
    FindRequestByOrderStrategy findRequestByOrderStrategy;

    @Override
    public void save(RequestTradeDevolution requestTradeDevolution) {
        saveRequestTradeDevolutionStrategy.process(requestTradeDevolution);
    }

    @Override
    public RequestTradeDevolution findById(Long id) {
        return null;
    }

    @Override
    public List<RequestTradeDevolution> findAll() {
        return null;
    }

    @Override
    public List<RequestTradeDevolution> find(String filter) {
        RequestTradeDevolution requestTradeDevolution = new RequestTradeDevolution();
        Order order = new Order();
        order.setId(Long.parseLong(filter));
        requestTradeDevolution.setOrder(order);
        return findRequestByOrderStrategy.process(requestTradeDevolution);
    }

    @Override
    public void update(RequestTradeDevolution requestTradeDevolution) {

    }

    @Override
    public void delete(RequestTradeDevolution requestTradeDevolution) {

    }
}
