package com.nrabello.ecommerceLivraria.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Cupons_Promocionais")
public class PromotionalCoupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="cup_id")
    private Long id;

    @Column(name="cup_nome")
    private String name;

    @Column(name="cup_valor")
    private Double value;

//    @OneToMany()
//    @JsonIgnore
//    private Set<Order> orders = new HashSet<>();

    public PromotionalCoupon(){

    }
    public PromotionalCoupon(Long id, String name, Double value, Set<Order> orders) {
        this.setId(id);
        this.setName(name);
        this.setValue(value);
//        this.setOrders(orders);
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

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

//    public Set<Order> getOrders() {
//        return orders;
//    }
//
//    public void setOrders(Set<Order> orders) {
//        this.orders = orders;
//    }
}
