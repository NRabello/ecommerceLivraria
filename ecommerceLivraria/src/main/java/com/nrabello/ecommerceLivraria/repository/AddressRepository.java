package com.nrabello.ecommerceLivraria.repository;

import com.nrabello.ecommerceLivraria.model.ChargeAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AddressRepository extends JpaRepository<ChargeAddress, Long> {
    @Query("SELECT a FROM ChargeAddress a WHERE a.patioType = :filter OR a.publicArea = :filter OR a.numberAddrs = :filter OR a.neighborhood = :filter OR a.CEP = :filter OR a.city = :filter OR a.state = :filter OR a.country = :filter")
    List<ChargeAddress> findByPatioTypeOrPublicAreaOrNumberAddrsOrNeighborhoodOrCEPOrCityOrStateOrCountry(@Param("filter") String filter);
}
