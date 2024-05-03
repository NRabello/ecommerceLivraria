package com.nrabello.ecommerceLivraria.strategy;

import java.util.List;

public interface IStrategy<T> {
    List<T> process(T model);
}
