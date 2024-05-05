package com.nrabello.ecommerceLivraria.controller;

import com.nrabello.ecommerceLivraria.model.TradeDevolutionCoupon;
import org.springframework.http.ResponseEntity;

public interface ITradeDevolutionCouponController extends IController<TradeDevolutionCoupon>{
    ResponseEntity<?> findTradeDevolutionCouponsByClient(Long id);
}
