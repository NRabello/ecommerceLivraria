package com.nrabello.ecommerceLivraria.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Pedido_Cupons_Troca_Devolucao")
public class OrderTradeDevolutionCoupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ped_ctd_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ped_id")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "ctd_id")
    private TradeDevolutionCoupon tradeDevolutionCoupon;

    public OrderTradeDevolutionCoupon() {
    }

    public OrderTradeDevolutionCoupon(Long id, Order order, TradeDevolutionCoupon tradeDevolutionCoupon) {
        this.setId(id);
        this.setOrder(order);
        this.setTradeDevolutionCoupon(tradeDevolutionCoupon);
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

    public TradeDevolutionCoupon getTradeDevolutionCoupon() {
        return tradeDevolutionCoupon;
    }

    public void setTradeDevolutionCoupon(TradeDevolutionCoupon tradeDevolutionCoupon) {
        this.tradeDevolutionCoupon = tradeDevolutionCoupon;
    }
}