package com.nrabello.ecommerceLivraria.strategy.address;

import com.nrabello.ecommerceLivraria.database.AddressDao;
import com.nrabello.ecommerceLivraria.model.ChargeAddress;
import com.nrabello.ecommerceLivraria.strategy.IStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FindAddressByIdStrategy implements IStrategy<ChargeAddress> {

    @Autowired
    AddressDao addressDao;

    @Override
    public List<ChargeAddress> process(ChargeAddress model) {
        if (addressDao.findById(model.getId()).isPresent()) {
            return addressDao.findById(model.getId()).stream().toList();
        } else {
            throw new RuntimeException("Endereço não encontrado!");
        }
    }
}
