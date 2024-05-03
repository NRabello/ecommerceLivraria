package com.nrabello.ecommerceLivraria.strategy.book;

import com.nrabello.ecommerceLivraria.database.BookDao;
import com.nrabello.ecommerceLivraria.model.Book;
import com.nrabello.ecommerceLivraria.strategy.IStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class FindByIdBookStrategy implements IStrategy<Book> {

    @Autowired
    BookDao bookDao;

    @Override
    public List<Book> process(Book model) {
        if(bookDao.findById(model.getId()).isPresent()){
            return bookDao.findById(model.getId()).stream().toList();
        }else{
            return new ArrayList<>();
        }
    }
}
