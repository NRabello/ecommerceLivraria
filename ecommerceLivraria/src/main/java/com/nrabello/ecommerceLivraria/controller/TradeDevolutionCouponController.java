package com.nrabello.ecommerceLivraria.controller;

import com.nrabello.ecommerceLivraria.model.TradeDevolutionCoupon;
import com.nrabello.ecommerceLivraria.service.TradeDevolutionCouponFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

@RequestMapping(value = "/tradeDevolutionCoupon")
@RestController
@Component
public class TradeDevolutionCouponController implements ITradeDevolutionCouponController{

    @Autowired
    TradeDevolutionCouponFacade facade;

    @Override
    public ResponseEntity<?> findAll() {
        return null;
    }

    @Override
    public ResponseEntity<?> findById(Long id) {
        return null;
    }

    @Override
    public ResponseEntity<?> find(String filter) {
        return null;
    }

    @Override
    @PostMapping(value = "/save")
    public ResponseEntity<?> save(@RequestBody TradeDevolutionCoupon tradeDevolutionCoupon) {
        try {
            facade.save(tradeDevolutionCoupon);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<?> update(TradeDevolutionCoupon tradeDevolutionCoupon) {
        return null;
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        return null;
    }

    @Override
    @GetMapping(value = "/findByClient")
    public ResponseEntity<?> findTradeDevolutionCouponsByClient(@RequestParam Long id) {
        try {
            return new ResponseEntity<>(facade.findTradeDevolutionCouponsByClient(id), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
