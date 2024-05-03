package com.nrabello.ecommerceLivraria.service;

import com.nrabello.ecommerceLivraria.model.PromotionalCoupon;
import com.nrabello.ecommerceLivraria.strategy.promotionalCoupon.DeletePromotionalCouponStrategy;
import com.nrabello.ecommerceLivraria.strategy.promotionalCoupon.FilterPromotionalCouponStrategy;
import com.nrabello.ecommerceLivraria.strategy.promotionalCoupon.FindAllPromotionalCouponsStrategy;
import com.nrabello.ecommerceLivraria.strategy.promotionalCoupon.SavePromotionalCouponStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PromotionalCouponFacade implements IFacade<PromotionalCoupon>{
    @Autowired
    FindAllPromotionalCouponsStrategy findAllPromotionalCouponsStrategy;

    @Autowired
    SavePromotionalCouponStrategy savePromotionalCouponStrategy;

    @Autowired
    DeletePromotionalCouponStrategy deletePromotionalCouponStrategy;

    @Autowired
    FilterPromotionalCouponStrategy filterPromotionalCouponStrategy;

    @Override
    public void save(PromotionalCoupon promotionalCoupon) {
        savePromotionalCouponStrategy.process(promotionalCoupon);
    }

    @Override
    public PromotionalCoupon findById(Long id) {
        return null;
    }

    @Override
    public List<PromotionalCoupon> findAll() {
        return findAllPromotionalCouponsStrategy.process(new PromotionalCoupon());
    }

    @Override
    public List<PromotionalCoupon> find(String filter) {
        return filterPromotionalCouponStrategy.process(filter);
    }

    @Override
    public void update(PromotionalCoupon promotionalCoupon) {

    }

    @Override
    public void delete(PromotionalCoupon promotionalCoupon) {
        deletePromotionalCouponStrategy.process(promotionalCoupon);
    }
}
