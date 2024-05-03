package com.nrabello.ecommerceLivraria.repository;

import com.nrabello.ecommerceLivraria.model.CreditCard;
import com.nrabello.ecommerceLivraria.model.Phone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PhoneRepository extends JpaRepository<Phone, Long> {
    @Query("SELECT p FROM Phone p WHERE p.type = :filter OR p.ddd = :filter OR p.number = :filter OR p.client.name = :filter")
    List<Phone> findByTypeOrDddOrNumberOrClient_Name(@Param("filter") String filter);
}
