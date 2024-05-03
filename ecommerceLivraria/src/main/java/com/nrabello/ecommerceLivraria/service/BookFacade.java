package com.nrabello.ecommerceLivraria.service;

import com.nrabello.ecommerceLivraria.model.Book;
import com.nrabello.ecommerceLivraria.strategy.book.FindAllBookStrategy;
import com.nrabello.ecommerceLivraria.strategy.book.FindByIdBookStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class BookFacade implements IFacade<Book>{

    @Autowired
    FindAllBookStrategy findAllBookStrategy;

    @Autowired
    FindByIdBookStrategy findByIdBookStrategy;

    @Override
    public void save(Book book) {

    }

    @Override
    public Book findById(Long id) {
        Book book = new Book();
        book.setId(id);
        return findByIdBookStrategy.process(book).get(0);
    }

    @Override
    public List<Book> findAll() {
        return findAllBookStrategy.process(new Book());
    }

    @Override
    public List<Book> find(String filter) {
        return null;
    }

    @Override
    public void update(Book book) {

    }

    @Override
    public void delete(Book book) {

    }
}
