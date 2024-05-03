package com.nrabello.ecommerceLivraria.service;

import com.nrabello.ecommerceLivraria.model.ChargeAddress;
import com.nrabello.ecommerceLivraria.strategy.address.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AddressFacade implements IFacade<ChargeAddress>{
    @Autowired
    SaveAddressStrategy saveAddressStrategy;

    @Autowired
    FindAddressByIdStrategy findAddressByIdStrategy;

    @Autowired
    FindAllAdressesStrategy findAllAdressesStrategy;

    @Autowired
    FilterAddressStrategy filterAddressStrategy;

    @Autowired
    UpdateAddressStrategy updateAddressStrategy;

    @Autowired
    DeleteAddressStrategy deleteAddressStrategy;

    @Override
    public void save(ChargeAddress address) {
        saveAddressStrategy.process(address);
    }

    @Override
    public ChargeAddress findById(Long id) {
        ChargeAddress address = new ChargeAddress();
        address.setId(id);
        return findAddressByIdStrategy.process(address).get(0);
    }

    @Override
    public List<ChargeAddress> findAll() {
        return findAllAdressesStrategy.process(new ChargeAddress());
    }

    @Override
    public List<ChargeAddress> find(String filter) {
        return filterAddressStrategy.process(filter);
    }

    @Override
    public void update(ChargeAddress address) {
        updateAddressStrategy.process(address);
    }

    @Override
    public void delete(ChargeAddress address) {
        deleteAddressStrategy.process(address);
    }

}
