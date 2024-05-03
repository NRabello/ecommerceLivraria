package com.nrabello.ecommerceLivraria.database;

import com.nrabello.ecommerceLivraria.model.Client;
import com.nrabello.ecommerceLivraria.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class ClientDao {

    @Autowired
    ClientRepository repository;

    public void save(Client client) {
        repository.save(client);
    }

    public List<Client> findAll() {
        return repository.findAllByAtivoIsTrue();
    }

    public Optional<Client> findById(Long id) {
        return repository.findById(id);
    }

    public List<Client> find(String filter) {
        return repository.findAllByNameContainingOrGenderContainingOrCpfContainingOrEmailContaining(filter);
    }

    public void update(Client client) {


        if(client.getPassword() == null || client.getPassword().isEmpty()){
            Client clientData = repository.findById(client.getId()).get();

            if(clientData != null) {
                System.out.println(clientData.getName());
                System.out.println(clientData.getEmail());
                System.out.println(clientData.getPassword());

                client.setPassword(clientData.getPassword());
                System.out.println("Caiu no If ");
            }
        }
        repository.save(client);
    }
    public void inactive(Client client) {
        repository.inactive(client.getId());
    }
}
