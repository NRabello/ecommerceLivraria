package com.nrabello.ecommerceLivraria.database;

import com.nrabello.ecommerceLivraria.model.Order;
import com.nrabello.ecommerceLivraria.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDao {

    @Autowired
    OrderRepository repository;

    public void save(Order order) {
        repository.save(order);
    }

    public void delete(Order order) {
        repository.delete(order);
    }

    public void update(Order order) {
        repository.save(order);
    }

    public Order findById(Long id) {
        return repository.findById(id).get();
    }

    public List<Order> findAll() {
        return repository.findAll();
    }

    public List<Order> findAllByClient(Long id) {
        return repository.findAllByClient(id);
    }

    public List<Order> findAllDash() {
        return repository.findAllDash();
    }
}
