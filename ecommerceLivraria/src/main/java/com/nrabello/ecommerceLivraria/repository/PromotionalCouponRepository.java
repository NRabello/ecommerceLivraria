package com.nrabello.ecommerceLivraria.repository;

import com.nrabello.ecommerceLivraria.model.PromotionalCoupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PromotionalCouponRepository extends JpaRepository<PromotionalCoupon, Long>{

    @Query("SELECT p FROM PromotionalCoupon p WHERE p.name = :filter")
    List<PromotionalCoupon> findByName(String filter);
}
