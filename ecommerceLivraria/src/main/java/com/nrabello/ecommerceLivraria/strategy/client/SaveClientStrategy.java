package com.nrabello.ecommerceLivraria.strategy.client;

import com.nrabello.ecommerceLivraria.database.ClientDao;
import com.nrabello.ecommerceLivraria.model.ChargeAddress;
import com.nrabello.ecommerceLivraria.model.Client;
import com.nrabello.ecommerceLivraria.model.CreditCard;
import com.nrabello.ecommerceLivraria.model.DeliveryAddress;
import com.nrabello.ecommerceLivraria.strategy.IStrategy;
import com.nrabello.ecommerceLivraria.strategy.banner.ValidateBannerStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;


@Component
public class SaveClientStrategy implements IStrategy<Client> {

    @Autowired
    ClientDao clientDao;

    @Autowired
    ValidateClientStrategy validateClientStrategy;

    @Autowired
    ValidateBannerStrategy validateBannerStrategy;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public List<Client> process(Client client) {

            client.getPhone().setClient(client);

            for(ChargeAddress chargeAddress: client.getChargeAddresses()){
                chargeAddress.setClient(client);
            }

            for(DeliveryAddress deliveryAddress: client.getDeliveryAddresses()){
                deliveryAddress.setClient(client);
            }

            for(CreditCard creditCard: client.getCreditCards()){
                creditCard.setClient(client);
                creditCard.setBanner(creditCard.getBanner());
            }
            Client validateClient = validateClientStrategy.process(client).get(0);

            clientDao.save(validateClient);

        return new ArrayList<>();
    }
}
