package com.nrabello.ecommerceLivraria.strategy.client;

import com.nrabello.ecommerceLivraria.database.ClientDao;
import com.nrabello.ecommerceLivraria.model.Client;
import com.nrabello.ecommerceLivraria.strategy.IStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Component
public class InactiveClientStrategy implements IStrategy<Client> {

    @Autowired
    ClientDao clientDao;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public List<Client> process(Client client) {
        if (clientDao.findById(client.getId()).isPresent()) {
            clientDao.inactive(client);
        } else {
            throw new RuntimeException("Cliente não encontrado");
        }
        return new ArrayList<>();
    }
}
