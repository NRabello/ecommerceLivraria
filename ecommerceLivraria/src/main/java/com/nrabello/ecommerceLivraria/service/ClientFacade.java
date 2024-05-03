package com.nrabello.ecommerceLivraria.service;

import com.nrabello.ecommerceLivraria.model.Client;
import com.nrabello.ecommerceLivraria.strategy.client.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
public class ClientFacade implements IClientFacade{

    @Autowired
    SaveClientStrategy saveClientStrategy;

    @Autowired
    FindAllClientsStrategy findAllClientsStrategy;

    @Autowired
    FilterClientsStrategy filterClientsStrategy;

    @Autowired
    InactiveClientStrategy inactiveClientStrategy;

    @Autowired
    UpdatePasswordStrategy updatePasswordStrategy;

    @Autowired
    FindClientByIdStrategy findClientByIdStrategy;

    @Autowired
    UpdateClientStrategy updateClientStrategy;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void save(Client client) {
        saveClientStrategy.process(client);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Client findById(Long id) {
        Client client = new Client();
        client.setId(id);
        return findClientByIdStrategy.process(client).get(0);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public List<Client> findAll() {
        return findAllClientsStrategy.process(new Client());
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public List<Client> find(String filter) {
        return filterClientsStrategy.process(filter);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void update(Client client) {
        updateClientStrategy.process(client);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void delete(Client client) {
        inactiveClientStrategy.process(client);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updatePassword(Client client) {
        updatePasswordStrategy.process(client);
    }
}
