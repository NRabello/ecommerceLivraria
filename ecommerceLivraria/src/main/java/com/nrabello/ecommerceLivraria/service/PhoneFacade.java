package com.nrabello.ecommerceLivraria.service;

import com.nrabello.ecommerceLivraria.model.Phone;
import com.nrabello.ecommerceLivraria.strategy.phone.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PhoneFacade implements IFacade<Phone>{

    @Autowired
    SavePhoneStrategy savePhoneStrategy;

    @Autowired
    FindPhoneByIdStrategy findPhoneByIdStrategy;

    @Autowired
    FindAllPhoneStrategy findAllPhoneStrategy;

    @Autowired
    FilterPhoneStrategy filterPhoneStrategy;

    @Autowired
    UpdatePhoneStrategy updatePhoneStrategy;

    @Autowired
    DeletePhoneStrategy deletePhoneStrategy;

    @Override
    public void save(Phone phone) {
        savePhoneStrategy.process(phone);
    }

    @Override
    public Phone findById(Long id) {
        Phone phone = new Phone();
        phone.setId(id);
        return findPhoneByIdStrategy.process(phone).get(0);
    }

    @Override
    public List<Phone> findAll() {
        return findAllPhoneStrategy.process(new Phone());
    }

    @Override
    public List<Phone> find(String filter) {
        return filterPhoneStrategy.process(filter);
    }

    @Override
    public void update(Phone phone) {
        updatePhoneStrategy.process(phone);
    }

    @Override
    public void delete(Phone phone) {
        deletePhoneStrategy.process(phone);
    }
}
