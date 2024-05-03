package com.nrabello.ecommerceLivraria.strategy.book;

import com.nrabello.ecommerceLivraria.database.BookDao;
import com.nrabello.ecommerceLivraria.model.Book;
import com.nrabello.ecommerceLivraria.strategy.IStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class FindAllBookStrategy implements IStrategy<Book> {

    @Autowired
    BookDao bookDao;

    @Override
    public List<Book> process(Book model) {
        return bookDao.findAll();
    }
}
