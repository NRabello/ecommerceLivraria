package com.nrabello.ecommerceLivraria.database;

import com.nrabello.ecommerceLivraria.model.Book;
import com.nrabello.ecommerceLivraria.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookDao {

    @Autowired
    BookRepository repository;

    public void save(Book book) {
        repository.save(book);
    }

    public void update(Book book) {
        repository.save(book);
    }

    public List<Book> findAll() {
        return repository.findAll();
    }

    public Optional<Book> findById(Long id) {
        return repository.findById(id);
    }

}
