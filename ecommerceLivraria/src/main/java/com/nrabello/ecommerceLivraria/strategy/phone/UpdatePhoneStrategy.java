package com.nrabello.ecommerceLivraria.strategy.phone;

import com.nrabello.ecommerceLivraria.database.PhoneDao;
import com.nrabello.ecommerceLivraria.model.Phone;
import com.nrabello.ecommerceLivraria.strategy.IStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UpdatePhoneStrategy implements IStrategy<Phone> {

    @Autowired
    PhoneDao phoneDao;

    @Override
    public List<Phone> process(Phone model) {
        if(phoneDao.findById(model.getId()).isPresent()){
            phoneDao.update(model);
        }else{
            throw new RuntimeException("Telefone não encontrado");
        }
        return new ArrayList<>();
    }
}
