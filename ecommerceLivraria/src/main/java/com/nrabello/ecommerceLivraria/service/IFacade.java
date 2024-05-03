package com.nrabello.ecommerceLivraria.service;

import java.util.List;

public interface IFacade<T>{
     void save(T t);
     T findById(Long id);
     List<T> findAll();
     List<T> find(String filter);
     void update(T t);
     void delete(T t);

}
