package com.nrabello.ecommerceLivraria.database;

import com.nrabello.ecommerceLivraria.model.ChargeAddress;
import com.nrabello.ecommerceLivraria.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddressDao {

    @Autowired
    AddressRepository repository;

    public void save(ChargeAddress address) {
        repository.save(address);
    }

    public List<ChargeAddress> findAll() {
        return repository.findAll();
    }

    public Optional<ChargeAddress> findById(Long id) {
        return repository.findById(id);
    }

    public List<ChargeAddress> find(String filter) {
        return repository.findByPatioTypeOrPublicAreaOrNumberAddrsOrNeighborhoodOrCEPOrCityOrStateOrCountry(filter);
    }

    public void update(ChargeAddress address) {
        repository.save(address);
    }

    public void delete(ChargeAddress address) {
        repository.save(address);
    }
}
