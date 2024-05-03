package com.nrabello.ecommerceLivraria.service;

import com.nrabello.ecommerceLivraria.model.CreditCard;
import com.nrabello.ecommerceLivraria.strategy.creditCard.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CreditCardFacade implements IFacade<CreditCard> {

    @Autowired
    SaveCreditCardStrategy saveCreditCardStrategy;

    @Autowired
    FindCreditCardByIdStrategy findCreditCardByIdStrategy;

    @Autowired
    FindAllCreditCardsStrategy findAllCreditCardsStrategy;

    @Autowired
    FilterCreditCardsStrategy filterCreditCardsStrategy;

    @Autowired
    UpdateCreditCardStrategy updateCreditCardStrategy;

    @Autowired
    DeleteCreditCardStrategy deleteCreditCardStrategy;

    @Override
    public void save(CreditCard creditCard) {
        saveCreditCardStrategy.process(creditCard);
    }

    @Override
    public CreditCard findById(Long id) {
        CreditCard creditCard = new CreditCard();
        creditCard.setId(id);
        return findCreditCardByIdStrategy.process(creditCard).get(0);
    }

    @Override
    public List<CreditCard> findAll() {
        return findAllCreditCardsStrategy.process(new CreditCard());
    }

    @Override
    public List<CreditCard> find(String filter) {
        return filterCreditCardsStrategy.process(filter);
    }

    @Override
    public void update(CreditCard creditCard) {
        updateCreditCardStrategy.process(creditCard);
    }

    @Override
    public void delete(CreditCard creditCard) {
        deleteCreditCardStrategy.process(creditCard);
    }
}
