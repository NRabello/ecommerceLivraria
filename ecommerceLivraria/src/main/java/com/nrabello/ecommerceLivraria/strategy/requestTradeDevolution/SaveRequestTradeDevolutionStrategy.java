package com.nrabello.ecommerceLivraria.strategy.requestTradeDevolution;

import com.nrabello.ecommerceLivraria.database.RequestTradeDevolutionDao;
import com.nrabello.ecommerceLivraria.model.OrderItem;
import com.nrabello.ecommerceLivraria.model.RequestItem;
import com.nrabello.ecommerceLivraria.model.RequestTradeDevolution;
import com.nrabello.ecommerceLivraria.strategy.IStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class SaveRequestTradeDevolutionStrategy implements IStrategy<RequestTradeDevolution> {

    @Autowired
    RequestTradeDevolutionDao requestTradeDevolutionDao;

    @Override
    public List<RequestTradeDevolution> process(RequestTradeDevolution model) {

        for (RequestItem requestItem : model.getRequestItens()){
            requestItem.setRequestTradeDevolution(model);
        }
        requestTradeDevolutionDao.save(model);
        return new ArrayList<>();
    }
}
