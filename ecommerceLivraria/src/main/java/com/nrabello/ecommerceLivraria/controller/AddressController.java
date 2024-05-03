package com.nrabello.ecommerceLivraria.controller;

import com.nrabello.ecommerceLivraria.service.AddressFacade;
import com.nrabello.ecommerceLivraria.model.ChargeAddress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping(value = "/address")
@RestController
public class AddressController implements IController<ChargeAddress>{

    @Autowired
    AddressFacade facade;

    @GetMapping(value = "/findAll")
    public ResponseEntity<?> findAll() {
        try {
            return new ResponseEntity<>(facade.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/findById")
    public ResponseEntity<?> findById(@RequestParam Long id) {
        try {
            return new ResponseEntity<>(facade.findById(id), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "find")
    public ResponseEntity<?> find(@RequestBody String filter) {
        try {
            return new ResponseEntity<>(facade.find(filter),HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(value = "/save")
    public ResponseEntity<?> save(@RequestBody ChargeAddress address) {
        try {
            facade.save(address);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping(value = "/update")
    public ResponseEntity<?> update(@RequestBody ChargeAddress address) {
        try {
            facade.update(address);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(value = "delete")
    public ResponseEntity<?> delete(@RequestParam Long id) {
        try {
            ChargeAddress address = new ChargeAddress();
            address.setId(id);
            facade.delete(address);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
