package com.nrabello.ecommerceLivraria.strategy.creditCard;

import com.nrabello.ecommerceLivraria.database.CreditCardDao;
import com.nrabello.ecommerceLivraria.model.CreditCard;
import com.nrabello.ecommerceLivraria.strategy.IStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class FilterCreditCardsStrategy implements IStrategy {

    @Autowired
    CreditCardDao creditCardDao;

    @Override
    public List<CreditCard> process(Object filter) {
        if (creditCardDao.find(filter.toString()).isEmpty()) {
            return new ArrayList<>();
        }else{
            return creditCardDao.find(filter.toString());
        }
    }
}
