package com.nrabello.ecommerceLivraria.strategy.phone;

import com.nrabello.ecommerceLivraria.database.ClientDao;
import com.nrabello.ecommerceLivraria.database.PhoneDao;
import com.nrabello.ecommerceLivraria.model.Phone;
import com.nrabello.ecommerceLivraria.strategy.IStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class SavePhoneStrategy implements IStrategy<Phone> {

    @Autowired
    PhoneDao phoneDao;

    @Autowired
    ClientDao clientDao;

    @Override
    public List<Phone> process(Phone model) {
        phoneDao.save(model);
        return new ArrayList<>();
    }
}
