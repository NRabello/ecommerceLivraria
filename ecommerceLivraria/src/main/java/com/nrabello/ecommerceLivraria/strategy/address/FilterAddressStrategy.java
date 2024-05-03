package com.nrabello.ecommerceLivraria.strategy.address;

import com.nrabello.ecommerceLivraria.database.AddressDao;
import com.nrabello.ecommerceLivraria.strategy.IStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class FilterAddressStrategy implements IStrategy {
    @Autowired
    AddressDao addressDao;
    @Override
    public List process(Object filter) {
        if (addressDao.find(filter.toString()).isEmpty()) {
            return new ArrayList<>();
        }else{
            return addressDao.find(filter.toString());
        }
    }
}
