package com.nrabello.ecommerceLivraria.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "Item_Troca_Devolucao")
public class RequestItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="itd_id")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="itd_liv_id", referencedColumnName = "liv_id")
    private Book book;

    @Column(name="itd_quantidade")
    private Integer quantity;

    @Column(name="itd_valor")
    private Double value;

    @ManyToOne
    @JoinColumn(name = "itd_std_id", referencedColumnName = "std_id")
    @JsonIgnore
    private RequestTradeDevolution requestTradeDevolution;

    public RequestItem(){

    }

    public RequestItem(Long id, Book book, Integer quantity, Double value, RequestTradeDevolution requestTradeDevolution) {
        this.setId(id);
        this.setBook(book);
        this.setQuantity(quantity);
        this.setValue(value);
        this.setRequestTradeDevolution(requestTradeDevolution);
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

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public RequestTradeDevolution getRequestTradeDevolution() {
        return requestTradeDevolution;
    }

    public void setRequestTradeDevolution(RequestTradeDevolution requestTradeDevolution) {
        this.requestTradeDevolution = requestTradeDevolution;
    }
}
