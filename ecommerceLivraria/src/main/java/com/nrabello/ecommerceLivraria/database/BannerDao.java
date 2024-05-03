package com.nrabello.ecommerceLivraria.database;

import com.nrabello.ecommerceLivraria.model.Banner;
import com.nrabello.ecommerceLivraria.repository.BannerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class BannerDao {
    @Autowired
    BannerRepository bannerRepository;

    public List<Banner> findAll() {
        return bannerRepository.findAll();
    }
}
