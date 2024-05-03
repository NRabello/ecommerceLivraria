package com.nrabello.ecommerceLivraria.strategy.promotionalCoupon;

import com.nrabello.ecommerceLivraria.database.PromotionalCouponDao;
import com.nrabello.ecommerceLivraria.model.PromotionalCoupon;
import com.nrabello.ecommerceLivraria.strategy.IStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class FilterPromotionalCouponStrategy implements IStrategy {

    @Autowired
    PromotionalCouponDao dao;

    @Override
    public List<PromotionalCoupon> process(Object filter) {
        if (dao.find(filter.toString()).isEmpty()) {
            System.out.println(dao.find(filter.toString()));
            return new ArrayList<>();
        }else{
            return dao.find(filter.toString());
        }
    }
}
