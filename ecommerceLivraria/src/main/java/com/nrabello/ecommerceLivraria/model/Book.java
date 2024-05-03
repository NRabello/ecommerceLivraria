package com.nrabello.ecommerceLivraria.model;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Livros")
public class Book {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name="liv_id")
        private Long id;
        @Column(name="liv_nome")
        private String name;
        @Column(name="liv_autor")
        private String author;
        @Column(name="liv_preco")
        private String price;
        @Column(name="liv_imageSrc")
        private String imageSrc;
        @Column(name="liv_imageAlt")
        private String imageAlt;
        @Column(name="liv_sinopse")
        private String synopsis;
        @ManyToMany(mappedBy = "books", fetch = FetchType.EAGER)
        private Set<Category> categories = new HashSet<>();
        @Column(name="liv_ano")
        private String year;
        @Column(name="liv_editora")
        private String publishing_company;
        @Column(name="liv_edicao")
        private String edition;
        @Column(name="liv_isbn")
        private String isbn;
        @Column(name="liv_paginas")
        private Integer pages;
        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name="liv_grp_id", referencedColumnName = "grp_id")
        private PricingGroup pricingGroup;

        public Book() {
        }

        public Book(Long id, String name, String author, String price, String imageSrc, String imageAlt, String synopsis, Set<Category> categories, String year, String publishing_company, String edition, String isbn, Integer pages, PricingGroup pricingGroup) {
            this.setId(id);
            this.setName(name);
            this.setAuthor(author);
            this.setPrice(price);
            this.setImageSrc(imageSrc);
            this.setImageAlt(imageAlt);
            this.setSynopsis(synopsis);
            this.setCategories(categories);
            this.setYear(year);
            this.setPublishing_company(publishing_company);
            this.setEdition(edition);
            this.setIsbn(isbn);
            this.setPages(pages);
            this.setPricingGroup(pricingGroup);
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

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getImageSrc() {
        return imageSrc;
    }

    public void setImageSrc(String imageSrc) {
        this.imageSrc = imageSrc;
    }

    public String getImageAlt() {
        return imageAlt;
    }

    public void setImageAlt(String imageAlt) {
        this.imageAlt = imageAlt;
    }

    public String getSynopsis() {
        return synopsis;
    }

    public void setSynopsis(String synopsis) {
        this.synopsis = synopsis;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getPublishing_company() {
        return publishing_company;
    }

    public void setPublishing_company(String publishing_company) {
        this.publishing_company = publishing_company;
    }

    public String getEdition() {
        return edition;
    }

    public void setEdition(String edition) {
        this.edition = edition;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public Integer getPages() {
        return pages;
    }

    public void setPages(Integer pages) {
        this.pages = pages;
    }

    public PricingGroup getPricingGroup() {
        return pricingGroup;
    }

    public void setPricingGroup(PricingGroup pricingGroup) {
        this.pricingGroup = pricingGroup;
    }
}
