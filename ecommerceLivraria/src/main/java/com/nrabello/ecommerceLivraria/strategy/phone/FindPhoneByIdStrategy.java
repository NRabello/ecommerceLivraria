package com.nrabello.ecommerceLivraria.strategy.phone;

import com.nrabello.ecommerceLivraria.model.Phone;
import com.nrabello.ecommerceLivraria.strategy.IStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.nrabello.ecommerceLivraria.database.PhoneDao;

import java.util.ArrayList;
import java.util.List;


@Component
public class FindPhoneByIdStrategy implements IStrategy<Phone> {

    @Autowired
    PhoneDao phoneDao;

    @Override
    public List<Phone> process(Phone model) {
        if(phoneDao.findById(model.getId()).isPresent()){
            return phoneDao.findById(model.getId()).stream().toList();
        }else{
            return new ArrayList<>();
        }
    }
}
