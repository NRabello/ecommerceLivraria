package com.nrabello.ecommerceLivraria.repository;

import com.nrabello.ecommerceLivraria.model.CreditCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CreditCardRepository extends JpaRepository<CreditCard, Long> {
    @Query("SELECT c FROM CreditCard c WHERE c.nameCard = :filter OR c.number = :filter OR c.expirationDate = :filter OR c.banner.name = :filter")
    List<CreditCard> findByNameCardOrNumberOrExpirationDateOrCardBanner_Name(@Param("filter") String filter);
}
