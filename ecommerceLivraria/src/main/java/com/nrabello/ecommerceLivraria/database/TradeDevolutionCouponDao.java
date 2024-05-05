package com.nrabello.ecommerceLivraria.database;

import com.nrabello.ecommerceLivraria.model.PromotionalCoupon;
import com.nrabello.ecommerceLivraria.model.TradeDevolutionCoupon;
import com.nrabello.ecommerceLivraria.repository.PromotionalCouponRepository;
import com.nrabello.ecommerceLivraria.repository.TradeDevolutionCouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TradeDevolutionCouponDao {

    @Autowired
    TradeDevolutionCouponRepository repository;

    public void save(TradeDevolutionCoupon tradeDevolutionCoupon) {
        repository.save(tradeDevolutionCoupon);
    }

    public void delete(TradeDevolutionCoupon tradeDevolutionCoupon) {
        repository.delete(tradeDevolutionCoupon);
    }

    public void update(TradeDevolutionCoupon tradeDevolutionCoupon) {
        repository.save(tradeDevolutionCoupon);
    }

    public TradeDevolutionCoupon findById(Long id) {
        return repository.findById(id).get();
    }

    public List<TradeDevolutionCoupon> findAll() {
        return repository.findAll();
    }

    public List<TradeDevolutionCoupon> find(Long id) {
        return repository.findByClient(id);
    }
}
