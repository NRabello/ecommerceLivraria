package com.nrabello.ecommerceLivraria.controller;

import com.nrabello.ecommerceLivraria.model.RequestTradeDevolution;
import com.nrabello.ecommerceLivraria.service.RequestTradeDevolutionFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

@RequestMapping(value = "/requestTradeDevolution")
@RestController
@Component
public class RequestTradeDevolutionController implements IController<RequestTradeDevolution>{

    @Autowired
    RequestTradeDevolutionFacade facade;

    @Override
    public ResponseEntity<?> findAll() {
        return null;
    }

    @Override
    public ResponseEntity<?> findById(Long id) {
        return null;
    }

    @Override
    @GetMapping(value = "/find")
    public ResponseEntity<?> find(String filter) {
        try {
            return new ResponseEntity<>(facade.find(filter),HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @PostMapping(value = "/save")
    public ResponseEntity<?> save(@RequestBody RequestTradeDevolution requestTradeDevolution) {
        try {
            facade.save(requestTradeDevolution);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<?> update(RequestTradeDevolution requestTradeDevolution) {
        return null;
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        return null;
    }
}
