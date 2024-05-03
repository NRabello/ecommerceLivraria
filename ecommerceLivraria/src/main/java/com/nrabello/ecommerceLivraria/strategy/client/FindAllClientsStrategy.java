package com.nrabello.ecommerceLivraria.strategy.client;

import com.nrabello.ecommerceLivraria.database.ClientDao;
import com.nrabello.ecommerceLivraria.model.Client;
import com.nrabello.ecommerceLivraria.strategy.IStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FindAllClientsStrategy implements IStrategy<Client> {

    @Autowired
    ClientDao clientDao;

    @Override
    public List<Client> process(Client model) {
        List<Client>clients = clientDao.findAll();

        for(Client client : clients){
            client.setPassword("");
        }

        return clients;
    }
}
