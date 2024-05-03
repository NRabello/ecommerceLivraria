package com.nrabello.ecommerceLivraria.strategy.client;

import com.nrabello.ecommerceLivraria.database.ClientDao;
import com.nrabello.ecommerceLivraria.model.Client;
import com.nrabello.ecommerceLivraria.strategy.IStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class FindClientByIdStrategy implements IStrategy<Client> {

    @Autowired
    ClientDao clientDao;
    @Override
    public List<Client> process(Client model) {
        if(clientDao.findById(model.getId()).isPresent()){
            return clientDao.findById(model.getId()).stream().toList();
        }else{
            return new ArrayList<>();
        }
    }
}
