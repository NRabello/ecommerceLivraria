package com.nrabello.ecommerceLivraria.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "Livros_Categorias")
public class BookCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "liv_id")
    private Book book;

    @ManyToOne
    @JoinColumn(name = "cat_id")
    @JsonIgnore
    private Category category;

    public BookCategory() {
    }

    public BookCategory(Long id, Book book, Category category) {
        this.setId(id);
        this.setBook(book);
        this.setCategory(category);
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public Book getBook() {
        return book;
    }
    public void setBook(Book book) {
        this.book = book;
    }

    public Category getCategory() {
        return category;
    }
    public void setCategory(Category category) {
        this.category = category;
    }
}