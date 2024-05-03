package com.nrabello.ecommerceLivraria.strategy.banner;

import com.nrabello.ecommerceLivraria.model.Banner;
import com.nrabello.ecommerceLivraria.strategy.IStrategy;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
public class ValidateBannerStrategy implements IStrategy<Banner> {
    @Override
    public List<Banner> process(Banner model) {
        model.getName();
        if(model.getName().equals("Elo")){
            model.setId(Long.valueOf(7));
        }
        if(model.getName().equals("MasterCard")){
            model.setId(Long.valueOf(6));
        }
        if(model.getName().equals("Visa")){
            model.setId(Long.valueOf(5));
        }
        else {
            throw new RuntimeException("Banner not found");
        }
        return Collections.singletonList(model);
    }
}
