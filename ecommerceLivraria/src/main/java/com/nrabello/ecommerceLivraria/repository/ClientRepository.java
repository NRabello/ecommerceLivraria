package com.nrabello.ecommerceLivraria.repository;

import com.nrabello.ecommerceLivraria.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClientRepository extends JpaRepository<Client, Long> {
    @Query("SELECT c FROM Client c WHERE c.name LIKE %:filter% OR c.gender like %:filter% OR c.cpf like %:filter% OR c.email like %:filter%")
    List<Client>  findAllByNameContainingOrGenderContainingOrCpfContainingOrEmailContaining(@Param("filter") String filter);
    @Query("SELECT c FROM Client c WHERE c.active = true")
    List<Client> findAllByAtivoIsTrue();
    @Modifying(clearAutomatically = true)
    @Query("UPDATE Client c SET c.active = false WHERE c.id = :id")
    void inactive(@Param("id") Long id);

}
