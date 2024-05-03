package com.nrabello.ecommerceLivraria.database;

import com.nrabello.ecommerceLivraria.model.CreditCard;
import com.nrabello.ecommerceLivraria.repository.CreditCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CreditCardDao {

    @Autowired
    CreditCardRepository repository;

    public void save(CreditCard creditCard) {
        repository.save(creditCard);
    }

    public List<CreditCard> findAll() {
        return repository.findAll();
    }

    public Optional<CreditCard> findById(Long id) {
        return repository.findById(id);
    }

    public List<CreditCard> find(String filter) {
        return repository.findByNameCardOrNumberOrExpirationDateOrCardBanner_Name(filter);
    }

    public void update(CreditCard creditCard) {
        repository.save(creditCard);
    }

    public void delete(CreditCard creditCard) {
        repository.save(creditCard);
    }
}
