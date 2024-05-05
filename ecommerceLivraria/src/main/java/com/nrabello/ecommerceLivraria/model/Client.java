package com.nrabello.ecommerceLivraria.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="Clientes")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="cli_id")
    private Long id;
    @Column(name="cli_nome")
    private String name;
    @Column(name="cli_genero")
    private String gender;
    @Column(name="cli_dataNasc")
    private String dateBirth;
    @Column(name="cli_cpf")
    private String cpf;
    @OneToOne(mappedBy = "client", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Phone phone;
    @Column(name="cli_email")
    private String email;
    @Column(name="cli_senha")
    private String password;
    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<ChargeAddress> chargeAddresses = new ArrayList<>();
    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<DeliveryAddress> deliveryAddresses = new ArrayList<>();
    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<CreditCard> creditCards = new ArrayList<>();
    @Column(name="cli_rank")
    private int ranking;
    @Column(name="cli_ativo")
    private boolean active;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnore
    private List<TradeDevolutionCoupon> tradeDevolutionCoupons = new ArrayList<>();

    public Client() {
    }

    public Client(Long id, String name, String gender, String dateBirth, String cpf, Phone phone, String email, String password, List<ChargeAddress> chargeAddresses, List<DeliveryAddress> deliveryAddresses,List<CreditCard> creditCards, int ranking, boolean active, List<TradeDevolutionCoupon> tradeDevolutionCoupons) {
        this.setId(id);
        this.setName(name);
        this.setGender(gender);
        this.setDateBirth(dateBirth);
        this.setCpf(cpf);
        this.setPhone(phone);
        this.setEmail(email);
        this.setPassword(password);
        this.setChargeAddresses(chargeAddresses);
        this.setDeliveryAddresses(deliveryAddresses);
        this.setCreditCards(creditCards);
        this.setRanking(ranking);
        this.setActive(active);
        this.setTradeDevolutionCoupons(tradeDevolutionCoupons);
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

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDateBirth() {
        return dateBirth;
    }

    public void setDateBirth(String dateBirth) {
        this.dateBirth = dateBirth;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public Phone getPhone() {
       return phone;
    }

    public void setPhone(Phone phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<ChargeAddress> getChargeAddresses() {
        return chargeAddresses;
    }

    public void setChargeAddresses(List<ChargeAddress> chargeAddresses) {
        this.chargeAddresses = chargeAddresses;
    }

    public List<DeliveryAddress> getDeliveryAddresses() {
        return deliveryAddresses;
    }

    public void setDeliveryAddresses(List<DeliveryAddress> deliveryAddresses) {
        this.deliveryAddresses = deliveryAddresses;
    }

    public List<CreditCard> getCreditCards() {
        return creditCards;
    }

    public void setCreditCards(List<CreditCard> creditCards) {
        this.creditCards = creditCards;
    }

    public int getRanking() {
        return ranking;
    }

    public void setRanking(int ranking) {
        this.ranking = ranking;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public boolean isActive() {
        return active;
    }

    public List<TradeDevolutionCoupon> getTradeDevolutionCoupons() {
        return tradeDevolutionCoupons;
    }

    public void setTradeDevolutionCoupons(List<TradeDevolutionCoupon> tradeDevolutionCoupons) {
        this.tradeDevolutionCoupons = tradeDevolutionCoupons;
    }
}
