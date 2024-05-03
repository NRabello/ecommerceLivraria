package com.nrabello.ecommerceLivraria.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "Item_Pedido")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="itp_id")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="itp_liv_id", referencedColumnName = "liv_id")
    private Book book;

    @Column(name="itp_quantidade")
    private Integer quantity;

    @Column(name="itp_valor")
    private Double value;

    @ManyToOne
    @JoinColumn(name = "itp_ped_id", referencedColumnName = "ped_id")
    @JsonIgnore
    private Order order;

    public OrderItem(){

    }
    public OrderItem(Long id, Book book, Integer quantity, Double value, Order order) {
        this.setId(id);
        this.setBook(book);
        this.setQuantity(quantity);
        this.setValue(value);
        this.setOrder(order);
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

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }
}
