package com.nrabello.ecommerceLivraria.strategy.promotionalCoupon;

import com.nrabello.ecommerceLivraria.database.PromotionalCouponDao;
import com.nrabello.ecommerceLivraria.model.PromotionalCoupon;
import com.nrabello.ecommerceLivraria.strategy.IStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
public class FindAllPromotionalCouponsStrategy implements IStrategy<PromotionalCoupon> {

    @Autowired
    PromotionalCouponDao promotionalCouponDao;

    @Override
    public List<PromotionalCoupon> process(PromotionalCoupon model) {
        return promotionalCouponDao.findAll();
    }
}
