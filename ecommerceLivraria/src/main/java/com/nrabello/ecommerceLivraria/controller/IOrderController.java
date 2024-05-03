package com.nrabello.ecommerceLivraria.controller;

import com.nrabello.ecommerceLivraria.model.Order;
import org.springframework.http.ResponseEntity;

public interface IOrderController extends IController<Order>{
    ResponseEntity<?> findByClient(Long id);
}
