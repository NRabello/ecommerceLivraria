package com.nrabello.ecommerceLivraria.strategy.requestTradeDevolution;

import com.nrabello.ecommerceLivraria.database.RequestTradeDevolutionDao;
import com.nrabello.ecommerceLivraria.model.RequestTradeDevolution;
import com.nrabello.ecommerceLivraria.strategy.IStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FindRequestByOrderStrategy implements IStrategy<RequestTradeDevolution> {

    @Autowired
    RequestTradeDevolutionDao requestTradeDevolutionDao;

    @Override
    public List<RequestTradeDevolution> process(RequestTradeDevolution model) {
        return requestTradeDevolutionDao.find(model.getOrder().getId());
    }
}
