package com.nrabello.ecommerceLivraria.strategy.banner;

import com.nrabello.ecommerceLivraria.database.BannerDao;
import com.nrabello.ecommerceLivraria.model.Banner;
import com.nrabello.ecommerceLivraria.strategy.IStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FindAllBannersStrategy implements IStrategy<Banner> {

    @Autowired
    BannerDao bannerDao;

    @Override
    public List<Banner> process(Banner model) {
        return bannerDao.findAll();
    }
}
