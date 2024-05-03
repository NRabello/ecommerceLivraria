package com.nrabello.ecommerceLivraria.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Pedido_CartaoCredito")
public class OrderCreditCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ped_car_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ped_id")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "car_id")
    private CreditCard creditCard;

    public OrderCreditCard() {
    }

    public OrderCreditCard(Long id, Order order, CreditCard creditCard) {
        this.setId(id);
        this.setOrder(order);
        this.setCreditCard(creditCard);
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public Order getOrder() {
        return order;
    }
    public void setOrder(Order order) {
        this.order = order;
    }

    public CreditCard getCreditCard() {
        return creditCard;
    }
    public void setCreditCard(CreditCard creditCard) {
        this.creditCard = creditCard;
    }
}
