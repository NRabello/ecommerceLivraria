package com.nrabello.ecommerceLivraria.controller;

import com.nrabello.ecommerceLivraria.model.CreditCard;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping(value = "/creditCard")
@RestController
public class CreditCardController implements IController<CreditCard> {

    @GetMapping(value = "/findAll")
    public ResponseEntity<?> findAll() {
        try {
            return new ResponseEntity<>("Todos os cartões de Crédito", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/findById")
    public ResponseEntity<?> findById(@RequestParam Long id) {
        try {
            return new ResponseEntity<>("Cartões encontrados por Id", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "find")
    public ResponseEntity<?> find(@RequestBody String filter) {
        try {
            return new ResponseEntity<>("Cartões filtrados",HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(value = "/save")
    public ResponseEntity<?> save(@RequestBody CreditCard creditCard) {
        try {
            return new ResponseEntity<>(creditCard,HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping(value = "/update")
    public ResponseEntity<?> update(@RequestBody CreditCard creditCard) {
        try {
            return new ResponseEntity<>(creditCard,HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(value = "delete")
    public ResponseEntity<?> delete(@RequestParam Long id) {
        try {
            return new ResponseEntity<>("Cartão excluido",HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
