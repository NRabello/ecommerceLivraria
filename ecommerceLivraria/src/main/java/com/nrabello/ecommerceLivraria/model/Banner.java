package com.nrabello.ecommerceLivraria.model;

import jakarta.persistence.*;

@Entity
@Table(name="Bandeiras")
public class Banner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ban_id")
    private Long id;
    @Column(name="ban_nome")
    private String name;

    public Banner() {
    }

    public Banner(Long id, String name) {
        this.setId(id);
        this.setName(name);
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
}
