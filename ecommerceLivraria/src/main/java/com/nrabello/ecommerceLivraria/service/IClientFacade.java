package com.nrabello.ecommerceLivraria.service;

import com.nrabello.ecommerceLivraria.model.Client;

public interface IClientFacade extends IFacade<Client>{
    void updatePassword (Client client);
}
