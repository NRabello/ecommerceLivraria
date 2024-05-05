package com.nrabello.ecommerceLivraria.repository;

import com.nrabello.ecommerceLivraria.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("SELECT o FROM Order o WHERE o.client.id = :id AND o.status != 'CANCELADO' AND o.status != 'DEVOLVIDO'")
    List<Order> findAllByClient(Long id);
}
