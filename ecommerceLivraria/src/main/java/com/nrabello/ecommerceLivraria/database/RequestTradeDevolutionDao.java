package com.nrabello.ecommerceLivraria.database;

import com.nrabello.ecommerceLivraria.model.RequestTradeDevolution;
import com.nrabello.ecommerceLivraria.repository.RequestTradeDevolutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestTradeDevolutionDao {

    @Autowired
    RequestTradeDevolutionRepository repository;

    public void save(RequestTradeDevolution requestTradeDevolution) {
        repository.save(requestTradeDevolution);
    }

    public List<RequestTradeDevolution> findAll() {
        return repository.findAll();
    }

    public void update(RequestTradeDevolution requestTradeDevolution) {
        repository.save(requestTradeDevolution);
    }

    public void delete(RequestTradeDevolution requestTradeDevolution) {
        repository.delete(requestTradeDevolution);
    }

    public RequestTradeDevolution findById(Long id) {
        return repository.findById(id).get();
    }

    public List<RequestTradeDevolution> find(Long id) {
        return repository.findByOrder(id);
    }
}
