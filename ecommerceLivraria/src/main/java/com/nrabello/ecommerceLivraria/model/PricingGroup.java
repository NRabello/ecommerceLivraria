package com.nrabello.ecommerceLivraria.model;


import jakarta.persistence.*;

@Entity(name = "GrupoPrecificacao")
public class PricingGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="grp_id")
    private Long id;
    @Column(name="grp_name")
    private String name;
    @Column(name="grp_porcentagem")
    private Double discount;

    public PricingGroup() {
    }

    public PricingGroup(Long id, String name, Double discount) {
        this.setId(id);
        this.setName(name);
        this.setDiscount(discount);
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

    public Double getDiscount() {
        return discount;
    }

    public void setDiscount(Double discount) {
        this.discount = discount;
    }

}
