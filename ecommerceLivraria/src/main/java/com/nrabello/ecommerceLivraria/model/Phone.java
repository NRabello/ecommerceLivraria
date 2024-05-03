package com.nrabello.ecommerceLivraria.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name="Telefones")
public class Phone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="tel_id")
    private Long id;
    @Column(name="tel_tipo")
    private String type;
    @Column(name="tel_ddd")
    private String ddd;
    @Column(name="tel_numero")
    private String number;
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="tel_cli_id", referencedColumnName = "cli_id")
    @JsonIgnore
    private Client client;

    public Phone() {
    }

    public Phone(Long id, String type, String ddd, String number, Client client) {
        this.setId(id);
        this.setType(type);
        this.setDdd(ddd);
        this.setNumber(number);
        this.setClient(client);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDdd() {
        return ddd;
    }

    public void setDdd(String ddd) {
        this.ddd = ddd;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
}
