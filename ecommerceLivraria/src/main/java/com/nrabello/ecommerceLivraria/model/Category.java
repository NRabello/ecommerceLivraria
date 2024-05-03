package com.nrabello.ecommerceLivraria.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Categorias")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="cat_id")
    private Long id;
    @Column(name="cat_nome")
    private String name;

    @ManyToMany
    @JoinTable(name = "Livros_Categorias",
            joinColumns = @JoinColumn(name = "cat_id"),
            inverseJoinColumns = @JoinColumn(name = "liv_id"))
    @JsonIgnore
    private Set<Book> books = new HashSet<>();

    public Category() {
    }

    public Category(Long id, String name, Set<Book> books) {
        this.setId(id);
        this.setName(name);
        this.setBooks(books);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Book> getBooks() {
        return books;
    }

    public void setBooks(Set<Book> books) {
        this.books = books;
    }
}
