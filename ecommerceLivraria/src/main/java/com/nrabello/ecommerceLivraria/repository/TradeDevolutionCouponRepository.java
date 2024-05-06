package com.nrabello.ecommerceLivraria.repository;

import com.nrabello.ecommerceLivraria.model.TradeDevolutionCoupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TradeDevolutionCouponRepository extends JpaRepository<TradeDevolutionCoupon, Long>{
    @Query("SELECT t FROM TradeDevolutionCoupon t WHERE t.client.id = :id and t.used = false")
    List<TradeDevolutionCoupon> findByClient(Long id);
}
