package com.nrabello.ecommerceLivraria.controller;

import com.nrabello.ecommerceLivraria.service.PhoneFacade;
import com.nrabello.ecommerceLivraria.model.Phone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping(value = "/phone")
@RestController
public class PhoneController implements IController<Phone> {

    @Autowired
    PhoneFacade facade;

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
            return new ResponseEntity<>("Telefones filtrados",HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(value = "/save")
    public ResponseEntity<?> save(@RequestBody Phone phone) {
        try {
            facade.save(phone);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping(value = "/update")
    public ResponseEntity<?> update(@RequestBody Phone phone) {
        try {
            facade.update(phone);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(value = "delete")
    public ResponseEntity<?> delete(@RequestParam Long id) {
        try {
            Phone phone = new Phone();
            phone.setId(id);
            facade.delete(phone);
            return new ResponseEntity<>("Telefone excluido",HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
