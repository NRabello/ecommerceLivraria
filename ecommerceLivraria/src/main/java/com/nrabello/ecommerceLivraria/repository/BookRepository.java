package com.nrabello.ecommerceLivraria.repository;

import com.nrabello.ecommerceLivraria.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}