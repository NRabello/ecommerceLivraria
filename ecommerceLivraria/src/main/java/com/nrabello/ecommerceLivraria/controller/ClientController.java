package com.nrabello.ecommerceLivraria.controller;

import com.nrabello.ecommerceLivraria.service.ClientFacade;
import com.nrabello.ecommerceLivraria.model.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;


@RequestMapping(value = "/client")
@RestController
@Component
public class ClientController implements IController<Client> {

    @Autowired
    ClientFacade facade;

    @GetMapping(value = "/findAll")
    public ResponseEntity<?> findAll() {
        try {
            return new ResponseEntity<>(facade.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
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
    public ResponseEntity<?> find(@RequestParam String filter) {
        try {
            return new ResponseEntity<>(facade.find(filter),HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(value = "/save")
    public ResponseEntity<?> save(@RequestBody Client client) {
        try {
            facade.save(client);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/update")
    public ResponseEntity<?> update(@RequestBody Client client) {
        try {
            facade.update(client);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(value = "inactive/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Client client = new Client();
        client.setId(id);
        try {
            facade.delete(client);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping(value = "updatePassword")
    public ResponseEntity<?> changePassword(@RequestBody Client client){
        try {
            facade.updatePassword(client);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
