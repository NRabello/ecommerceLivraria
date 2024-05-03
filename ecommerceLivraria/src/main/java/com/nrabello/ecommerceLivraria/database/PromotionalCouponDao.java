package com.nrabello.ecommerceLivraria.database;

import com.nrabello.ecommerceLivraria.model.PromotionalCoupon;
import com.nrabello.ecommerceLivraria.repository.PromotionalCouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PromotionalCouponDao {

    @Autowired
    PromotionalCouponRepository repository;

    public void save(PromotionalCoupon promotionalCoupon) {
        repository.save(promotionalCoupon);
    }

    public void delete(PromotionalCoupon promotionalCoupon) {
        repository.delete(promotionalCoupon);
    }

    public void update(PromotionalCoupon promotionalCoupon) {
        repository.save(promotionalCoupon);
    }

    public PromotionalCoupon findById(Long id) {
        return repository.findById(id).get();
    }

    public List<PromotionalCoupon> findAll() {
        return repository.findAll();
    }

    public List<PromotionalCoupon> find(String filter) {
        return repository.findByName(filter);
    }

}
