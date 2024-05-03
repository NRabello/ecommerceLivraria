package com.nrabello.ecommerceLivraria.database;

import com.nrabello.ecommerceLivraria.model.Phone;
import com.nrabello.ecommerceLivraria.repository.PhoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PhoneDao {

    @Autowired
    PhoneRepository repository;

    public void save(Phone phone) {
        repository.save(phone);
    }

    public List<Phone> findAll() {
        return repository.findAll();
    }

    public Optional<Phone> findById(Long id) {
        return repository.findById(id);
    }

    public List<Phone> find(String filter) {
        return repository.findByTypeOrDddOrNumberOrClient_Name(filter);
    }

    public void update(Phone phone) {
        repository.save(phone);
    }

    public void delete(Phone phone) {
        repository.save(phone);
    }
}
