package com.nrabello.ecommerceLivraria.repository;

import com.nrabello.ecommerceLivraria.model.RequestTradeDevolution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RequestTradeDevolutionRepository extends JpaRepository<RequestTradeDevolution, Long> {

    @Query("SELECT r FROM RequestTradeDevolution r WHERE r.order.id = :id AND r.active = true")
    List<RequestTradeDevolution> findByOrder(Long id);
}
