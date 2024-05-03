package com.nrabello.ecommerceLivraria.controller;

import com.nrabello.ecommerceLivraria.model.PromotionalCoupon;
import com.nrabello.ecommerceLivraria.service.PromotionalCouponFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping(value = "/promotionalCoupon")
@RestController
public class PromotionalCouponController implements IController<PromotionalCoupon>{

    @Autowired
    PromotionalCouponFacade facade;

    @Override
    @GetMapping(value = "/findAll")
    public ResponseEntity<?> findAll() {
        try {
            return new ResponseEntity<>(facade.findAll(), HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @GetMapping(value = "/findById")
    public ResponseEntity<?> findById(@RequestParam Long id) {
        return null;
    }

    @Override
    @GetMapping(value = "find")
    public ResponseEntity<?> find(@RequestParam String filter) {
        try {
            return new ResponseEntity<>(facade.find(filter), HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @PostMapping(value = "/save")
    public ResponseEntity<?> save(@RequestBody PromotionalCoupon promotionalCoupon) {
        try {
            facade.save(promotionalCoupon);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @PutMapping(value = "/update")
    public ResponseEntity<?> update(@RequestBody  PromotionalCoupon promotionalCoupon) {
        return null;
    }

    @Override
    @DeleteMapping(value = "delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            PromotionalCoupon promotionalCoupon = new PromotionalCoupon();
            promotionalCoupon.setId(id);
            facade.delete(promotionalCoupon);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
