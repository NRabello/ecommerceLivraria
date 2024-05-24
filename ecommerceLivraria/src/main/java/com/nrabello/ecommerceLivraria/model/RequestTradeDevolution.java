package com.nrabello.ecommerceLivraria.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Solicitacoes_Troca_Devolucao")
public class RequestTradeDevolution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="std_id")
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="std_ped_id", referencedColumnName = "ped_id")
    private Order order;

    @OneToMany(mappedBy = "requestTradeDevolution", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<RequestItem> requestItens = new ArrayList<>();

    @Column(name="std_valor")
    private Double value;

    @Column(name="std_ativo")
    private Boolean active;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name = "std_data", nullable = false, updatable = false)
    private Date date;

    public RequestTradeDevolution() {
    }

    public RequestTradeDevolution(Long id, Order order, Boolean active, Date date, Double value, List<RequestItem> requestItens) {
        this.id = id;
        this.order = order;
        this.active = active;
        this.date = date;
        this.value = value;
        this.requestItens = requestItens;
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

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public List<RequestItem> getRequestItens() {
        return requestItens;
    }

    public void setRequestItens(List<RequestItem> requestItens) {
        this.requestItens = requestItens;
    }
}
