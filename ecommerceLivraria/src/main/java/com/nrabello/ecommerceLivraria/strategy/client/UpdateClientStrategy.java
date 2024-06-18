package com.nrabello.ecommerceLivraria.strategy.client;

import com.nrabello.ecommerceLivraria.database.ClientDao;
import com.nrabello.ecommerceLivraria.model.ChargeAddress;
import com.nrabello.ecommerceLivraria.model.Client;
import com.nrabello.ecommerceLivraria.model.CreditCard;
import com.nrabello.ecommerceLivraria.model.DeliveryAddress;
import com.nrabello.ecommerceLivraria.strategy.IStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class UpdateClientStrategy implements IStrategy<Client> {

    @Autowired
    ClientDao dao;

    @Autowired
    private ValidateClientStrategy validateClientStrategy;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public List<Client> process(Client model) {

        if(dao.findById(model.getId()).isPresent()){
            model.getPhone().setClient(model);

            for(ChargeAddress chargeAddress: model.getChargeAddresses()){
                chargeAddress.setClient(model);
            }

            for (DeliveryAddress deliveryAddress: model.getDeliveryAddresses()){
                deliveryAddress.setClient(model);
            }

            for(CreditCard creditCard: model.getCreditCards()){
                creditCard.setClient(model);
            }

            if(model.getPassword().trim().equals("")){
                model.setPassword(dao.findById(model.getId()).get().getPassword());
            }

            Client validateClient = validateClientStrategy.process(model).get(0);


            dao.update(validateClient);


        }else{
            throw new RuntimeException("Cliente não encontrado");
        }
        return new ArrayList<>();
    }
}
