package com.nrabello.ecommerceLivraria.strategy.phone;

import com.nrabello.ecommerceLivraria.model.Phone;
import com.nrabello.ecommerceLivraria.strategy.IStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.nrabello.ecommerceLivraria.database.PhoneDao;

import java.util.List;

@Component
public class FindAllPhoneStrategy implements IStrategy<Phone> {

    @Autowired
    PhoneDao phoneDao;

    @Override
    public List<Phone> process(Phone model) {
        return phoneDao.findAll();
    }
}
