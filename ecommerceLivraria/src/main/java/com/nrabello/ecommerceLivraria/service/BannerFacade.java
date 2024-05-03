package com.nrabello.ecommerceLivraria.service;

import com.nrabello.ecommerceLivraria.model.Banner;
import com.nrabello.ecommerceLivraria.strategy.banner.FindAllBannersStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BannerFacade implements IFacade<Banner> {

    @Autowired
    FindAllBannersStrategy findAllBannersStrategy;

    @Override
    public void save(Banner banner) {

    }

    @Override
    public Banner findById(Long id) {
        return null;
    }

    @Override
    public List<Banner> findAll() {
        return findAllBannersStrategy.process(new Banner());
    }

    @Override
    public List<Banner> find(String filter) {
        return null;
    }

    @Override
    public void update(Banner banner) {

    }

    @Override
    public void delete(Banner banner) {

    }
}
