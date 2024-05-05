package com.nrabello.ecommerceLivraria.service;

import com.nrabello.ecommerceLivraria.model.Client;
import com.nrabello.ecommerceLivraria.model.TradeDevolutionCoupon;
import com.nrabello.ecommerceLivraria.strategy.tradeDevolutionCoupon.FindTradeDevolutionCouponByClientStrategy;
import com.nrabello.ecommerceLivraria.strategy.tradeDevolutionCoupon.SaveTradeDevolutionCouponStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TradeDevolutionCouponFacade implements ITradeDevolutionCouponFacade{

    @Autowired
    SaveTradeDevolutionCouponStrategy saveTradeDevolutionCouponStrategy;

    @Autowired
    FindTradeDevolutionCouponByClientStrategy findTradeDevolutionCouponByClientStrategy;

    @Override
    public void save(TradeDevolutionCoupon tradeDevolutionCoupon) {
        saveTradeDevolutionCouponStrategy.process(tradeDevolutionCoupon);
    }

    @Override
    public TradeDevolutionCoupon findById(Long id) {
        return null;
    }

    @Override
    public List<TradeDevolutionCoupon> findAll() {
        return null;
    }

    @Override
    public List<TradeDevolutionCoupon> find(String filter) {
        return null;
    }

    @Override
    public void update(TradeDevolutionCoupon tradeDevolutionCoupon) {

    }

    @Override
    public void delete(TradeDevolutionCoupon tradeDevolutionCoupon) {

    }

    @Override
    public List<TradeDevolutionCoupon> findTradeDevolutionCouponsByClient(Long id) {
        Client client = new Client();
        client.setId(id);
        TradeDevolutionCoupon tradeDevolutionCoupon = new TradeDevolutionCoupon();
        tradeDevolutionCoupon.setClient(client);
        return findTradeDevolutionCouponByClientStrategy.process(tradeDevolutionCoupon);
    }
}
