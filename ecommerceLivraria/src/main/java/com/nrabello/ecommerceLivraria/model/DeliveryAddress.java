package com.nrabello.ecommerceLivraria.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name="EnderecosEntrega")
public class DeliveryAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ede_id")
    private Long id;
    @Column(name="ede_tipo_residencia")
    @Enumerated(EnumType.STRING)
    private ETyperesidence typeresidence;
    @Column(name="ede_tipo_logradouro")
    private String patioType;
    @Column(name="ede_logradouro")
    private String publicArea;
    @Column(name="ede_numero")
    private String numberAddrs;
    @Column(name="ede_bairro")
    private String neighborhood;
    @Column(name="ede_cep")
    private String CEP;
    @Column(name="ede_cidade")
    private String city;
    @Column(name="ede_estado")
    private String state;
    @Column(name="ede_pais")
    private String country;
    @Column(name="ede_observacoes")
    private String observations;
    @Column(name = "ede_nome")
    private String nameAddrs;

    @ManyToOne
    @JoinColumn(name="ede_cli_id", referencedColumnName = "cli_id")
    @JsonIgnore
    private Client client;

    public DeliveryAddress() {
    }

    public DeliveryAddress(Long id, ETyperesidence typeresidence, String patioType, String publicArea, String numberAddrs, String neighborhood, String CEP, String city, String state, String country, String observations, Client client, String nameAddrs) {
        this.setId(id);
        this.setTyperesidence(typeresidence);
        this.setPatioType(patioType);
        this.setPublicArea(publicArea);
        this.setNumberAddrs(numberAddrs);
        this.setNeighborhood(neighborhood);
        this.setCEP(CEP);
        this.setCity(city);
        this.setState(state);
        this.setCountry(country);
        this.setObservations(observations);
        this.setClient(client);
        this.setNameAddrs(nameAddrs);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public ETyperesidence getTyperesidence() {
        return typeresidence;
    }

    public void setTyperesidence(ETyperesidence typeresidence) {
        this.typeresidence = typeresidence;
    }

    public String getPatioType() {
        return patioType;
    }

    public void setPatioType(String patioType) {
        this.patioType = patioType;
    }

    public String getPublicArea() {
        return publicArea;
    }

    public void setPublicArea(String publicArea) {
        this.publicArea = publicArea;
    }

    public String getNumberAddrs() {
        return numberAddrs;
    }

    public void setNumberAddrs(String numberAddrs) {
        this.numberAddrs = numberAddrs;
    }

    public String getNeighborhood() {
        return neighborhood;
    }

    public void setNeighborhood(String neighborhood) {
        this.neighborhood = neighborhood;
    }

    public String getCEP() {
        return CEP;
    }

    public void setCEP(String CEP) {
        this.CEP = CEP;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getObservations() {
        return observations;
    }

    public void setObservations(String observations) {
        this.observations = observations;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public String getNameAddrs() {
        return nameAddrs;
    }

    public void setNameAddrs(String nameAddrs) {
        this.nameAddrs = nameAddrs;
    }

}
