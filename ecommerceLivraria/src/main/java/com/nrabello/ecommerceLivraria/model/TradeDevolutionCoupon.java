package com.nrabello.ecommerceLivraria.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Cupons_Troca_Devolucao")
public class TradeDevolutionCoupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ctd_id")
    private Long id;

    @Column(name="ctd_nome")
    private String name;

    @Column(name="ctd_valor")
    private Double value;

    @Column(name="ctd_usado")
    private Boolean used;

    @ManyToMany(mappedBy = "tradeDevolutionCoupons", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Order> orders = new HashSet<>();

    public TradeDevolutionCoupon(){

    }
    public TradeDevolutionCoupon(Long id, String name, Double value, Boolean used ,Set<Order> orders) {
        this.setId(id);
        this.setName(name);
        this.setValue(value);
        this.setUsed(used);
        this.setOrders(orders);
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

    public Boolean getUsed() {
        return used;
    }

    public void setUsed(Boolean used) {
        this.used = used;
    }

    public Set<Order> getOrders() {
        return orders;
    }
    public void setOrders(Set<Order> orders) {
        this.orders = orders;
    }
}
