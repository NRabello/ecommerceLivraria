package com.nrabello.ecommerceLivraria.strategy.tradeDevolutionCoupon;


import com.nrabello.ecommerceLivraria.database.TradeDevolutionCouponDao;
import com.nrabello.ecommerceLivraria.model.TradeDevolutionCoupon;
import com.nrabello.ecommerceLivraria.strategy.IStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class SaveTradeDevolutionCouponStrategy implements IStrategy<TradeDevolutionCoupon> {

    @Autowired
    TradeDevolutionCouponDao tradeDevolutionCouponDao;

    @Override
    public List<TradeDevolutionCoupon> process(TradeDevolutionCoupon model) {
        model.setClient(model.getClient());
        tradeDevolutionCouponDao.save(model);
        return new ArrayList<>();
    }
}
