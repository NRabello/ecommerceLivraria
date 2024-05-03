package com.nrabello.ecommerceLivraria.strategy.client;

import com.nrabello.ecommerceLivraria.model.Client;
import com.nrabello.ecommerceLivraria.strategy.IStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
@Component
public class ValidateClientStrategy implements IStrategy<Client> {

    @Autowired
    private EncryptPasswordStrategy encryptPasswordStrategy;

    @Override
    public List<Client> process(Client model) {

        if(model.getName() == null){
            throw new IllegalArgumentException("O nome precisa ser fornecido");
        }

        if(model.getDateBirth() == null){
            throw new IllegalArgumentException("A data de nascimento deve ser fornecida");
        }

        if(model.getGender() == null){
            throw new IllegalArgumentException("Gênero não pode ser nulo");
        }

        if(model.getPassword() == null){
            throw new IllegalArgumentException("Senha não fornecida!");
        }

        if(model.getId()==0 || model.getPassword() != "") {
            encryptPasswordStrategy.process(model);
        }

        return Collections.singletonList(model);
    }
}
