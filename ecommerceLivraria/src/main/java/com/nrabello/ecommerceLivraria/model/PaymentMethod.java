package com.nrabello.ecommerceLivraria.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "Metodos_Pagamento")
public class PaymentMethod {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="mtp_id")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="mtp_car_id", referencedColumnName = "car_id")
    private CreditCard creditCard;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mtp_ped_id", referencedColumnName = "ped_id")
    @JsonIgnore
    private Order order;

    @Column(name="mtp_valor")
    private Double value;

    public PaymentMethod() {
    }
    public PaymentMethod(Long id, CreditCard creditCard, Order order, Double value) {
        this.id = id;
        this.creditCard = creditCard;
        this.order = order;
        this.value = value;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CreditCard getCreditCard() {
        return creditCard;
    }

    public void setCreditCard(CreditCard creditCard) {
        this.creditCard = creditCard;
    }

    public Order getOrder() {
        return order;
    }
    public void setOrder(Order order) {
        this.order = order;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }
}
