package com.nrabello.ecommerceLivraria.controller;

import com.nrabello.ecommerceLivraria.model.Order;
import com.nrabello.ecommerceLivraria.service.OrderFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

@RequestMapping(value = "/order")
@RestController
@Component
public class OrderController implements IOrderController {

    @Autowired
    OrderFacade facade;

    @Override
    @GetMapping(value = "/findAll")
    public ResponseEntity<?> findAll() {
        try {
            return new ResponseEntity<>(facade.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @GetMapping(value = "/findById")
    public ResponseEntity<?> findById(@RequestParam Long id) {
        try {
            return new ResponseEntity<>(facade.findById(id), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @GetMapping(value = "find")
    public ResponseEntity<?> find(@RequestParam String filter) {
        try {
            return new ResponseEntity<>(facade.find(filter),HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @PostMapping(value = "/save")
    public ResponseEntity<?> save(@RequestBody Order order) {
        try {
            facade.save(order);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @PutMapping(value = "/update")
    public ResponseEntity<?> update(@RequestBody Order order) {
        try {
            facade.update(order);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @DeleteMapping(value = "delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Order order = new Order();
        order.setId(id);
        try {
            facade.delete(order);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @GetMapping(value = "/findByClient")
    public ResponseEntity<?> findByClient(@RequestParam Long id) {
        try {
            return new ResponseEntity<>(facade.findOrdersByClient(id), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @GetMapping(value = "/findDash")
    public ResponseEntity<?> findDash() {
        try {
            return new ResponseEntity<>(facade.findOrdersDash(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
