package com.nrabello.ecommerceLivraria.strategy.phone;

import com.nrabello.ecommerceLivraria.database.PhoneDao;
import com.nrabello.ecommerceLivraria.strategy.IStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class FilterPhoneStrategy implements IStrategy {

    @Autowired
    PhoneDao phoneDao;

    @Override
    public List process(Object filter) {
        if (phoneDao.find(filter.toString()).isEmpty()) {
            return new ArrayList<>();
        }else{
            return phoneDao.find(filter.toString());
        }
    }
}

