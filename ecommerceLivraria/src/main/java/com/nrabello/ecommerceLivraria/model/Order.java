package com.nrabello.ecommerceLivraria.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.*;

@Entity
@Table(name = "Pedidos")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ped_id")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="ped_cli_id", referencedColumnName = "cli_id")
    private Client client;

    @Column(name="ped_status")
    @Enumerated(EnumType.STRING)
    private EOrderStatus status;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "Pedido_CartaoCredito",
            joinColumns = @JoinColumn(name = "ped_id"),
            inverseJoinColumns = @JoinColumn(name = "car_id")
    )
    private Set<CreditCard> creditCards = new HashSet<>();

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<OrderItem> orderItens = new ArrayList<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "Pedido_Cupons_Troca_Devolucao",
            joinColumns = @JoinColumn(name = "ped_id"),
            inverseJoinColumns = @JoinColumn(name = "ctd_id")
    )
    private Set<TradeDevolutionCoupon> tradeDevolutionCoupons = new HashSet<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="ped_cup_id", referencedColumnName = "cup_id")
    private PromotionalCoupon promotionalCoupon;

    @Column(name="ped_valorTotal")
    private Double totalValue;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "ped_data", nullable = false, updatable = false)
    @CreationTimestamp
    private Date orderedOn;

    public Order() {
    }

    public Order(Long id, Client client, EOrderStatus status, Set<CreditCard> creditCards, List<OrderItem> orderItens, Set<TradeDevolutionCoupon> tradeDevolutionCoupons, PromotionalCoupon promotionalCoupon, Double totalValue, Date orderedOn) {
        this.id = id;
        this.client = client;
        this.status = status;
        this.creditCards = creditCards;
        this.orderItens = orderItens;
        this.tradeDevolutionCoupons = tradeDevolutionCoupons;
        this.promotionalCoupon = promotionalCoupon;
        this.totalValue = totalValue;
        this.orderedOn = orderedOn;
    }
    public List<OrderItem> getOrderItens() {
        return orderItens;
    }

    public void setOrderItens(List<OrderItem> orderItens) {
        this.orderItens = orderItens;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public EOrderStatus getStatus() {
        return status;
    }

    public void setStatus(EOrderStatus status) {
        this.status = status;
    }

    public Set<CreditCard> getCreditCards() {
        return creditCards;
    }

    public void setCreditCards(Set<CreditCard> creditCards) {
        this.creditCards = creditCards;
    }

    public Set<TradeDevolutionCoupon> getTradeDevolutionCoupons() {
        return tradeDevolutionCoupons;
    }

    public void setTradeDevolutionCoupons(Set<TradeDevolutionCoupon> tradeDevolutionCoupons) {
        this.tradeDevolutionCoupons = tradeDevolutionCoupons;
    }

    public Double getTotalValue() {
        return totalValue;
    }

    public void setTotalValue(Double totalValue) {
        this.totalValue = totalValue;
    }

    public Date getOrderedOn() {
        return orderedOn;
    }

    public void setOrderedOn(Date orderedOn) {
        this.orderedOn = orderedOn;
    }

    public PromotionalCoupon getPromotionalCoupon() {
        return promotionalCoupon;
    }

    public void setPromotionalCoupon(PromotionalCoupon promotionalCoupon) {
        this.promotionalCoupon = promotionalCoupon;
    }

}
