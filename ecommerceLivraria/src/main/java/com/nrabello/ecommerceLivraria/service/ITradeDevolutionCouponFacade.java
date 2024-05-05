package com.nrabello.ecommerceLivraria.service;

import com.nrabello.ecommerceLivraria.model.Order;
import com.nrabello.ecommerceLivraria.model.TradeDevolutionCoupon;

import java.util.List;

public interface ITradeDevolutionCouponFacade extends IFacade<TradeDevolutionCoupon> {
    List<TradeDevolutionCoupon> findTradeDevolutionCouponsByClient(Long id);

}
