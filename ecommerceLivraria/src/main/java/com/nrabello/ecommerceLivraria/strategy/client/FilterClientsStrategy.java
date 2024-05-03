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
public class FilterClientsStrategy implements IStrategy {

    @Autowired
    ClientDao clientDao;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public List<Client> process(Object filter) {
        if (clientDao.find(filter.toString()).isEmpty()) {
            return new ArrayList<>();
        }else{
            return clientDao.find(filter.toString());
        }
    }
}
