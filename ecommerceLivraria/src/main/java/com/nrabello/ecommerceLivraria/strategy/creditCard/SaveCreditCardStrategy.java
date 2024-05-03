package com.nrabello.ecommerceLivraria.strategy.creditCard;

import com.nrabello.ecommerceLivraria.database.CreditCardDao;
import com.nrabello.ecommerceLivraria.model.CreditCard;
import com.nrabello.ecommerceLivraria.strategy.IStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class SaveCreditCardStrategy implements IStrategy<CreditCard>
{
    @Autowired
    CreditCardDao creditCardDao;

    @Override
    public List<CreditCard> process(CreditCard model) {
        creditCardDao.save(model);
        return new ArrayList<>();
    }
}
