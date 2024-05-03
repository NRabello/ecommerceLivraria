package com.nrabello.ecommerceLivraria.strategy.promotionalCoupon;

import com.nrabello.ecommerceLivraria.database.PromotionalCouponDao;
import com.nrabello.ecommerceLivraria.model.PromotionalCoupon;
import com.nrabello.ecommerceLivraria.strategy.IStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class SavePromotionalCouponStrategy implements IStrategy<PromotionalCoupon> {

    @Autowired
    PromotionalCouponDao dao;

    @Override
    public List<PromotionalCoupon> process(PromotionalCoupon model) {
        dao.save(model);
        return new ArrayList<>();
    }
}
