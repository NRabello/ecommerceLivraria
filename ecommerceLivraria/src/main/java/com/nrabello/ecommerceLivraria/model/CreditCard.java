package com.nrabello.ecommerceLivraria.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="CartoesCredito")
public class CreditCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="car_id")
    private Long id;
    @Column(name="car_numero")
    private String number;
    @Column(name="car_nome")
    private String nameCard;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="car_ban_id", referencedColumnName = "ban_id")
    private Banner banner;
    @Column(name="car_data_venc")
    private String expirationDate;
    @Column(name="car_cvv")
    private String securityCode;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="car_cli_id" ,referencedColumnName = "cli_id")
    @JsonIgnore
    private Client client;

    public CreditCard() {
    }

    public CreditCard(Long id, String number, String nameCard, Banner banner, String expirationDate, String securityCode, Client client) {
        this.setId(id);
        this.setNumber(number);
        this.setNameCard(nameCard);
        this.setBanner(banner);
        this.setExpirationDate(expirationDate);
        this.setSecurityCode(securityCode);
        this.setClient(client);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getNameCard() {
        return nameCard;
    }

    public void setNameCard(String nameCard) {
        this.nameCard = nameCard;
    }

    public String getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(String expirationDate) {
        this.expirationDate = expirationDate;
    }

    public String getSecurityCode() {
        return securityCode;
    }

    public void setSecurityCode(String securityCode) {
        this.securityCode = securityCode;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Banner getBanner() {
        return banner;
    }

    public void setBanner(Banner banner) {
        this.banner = banner;
    }
}
