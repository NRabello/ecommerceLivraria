import { DeliveryAddress } from "../models/DeliveryAddress";
import { ETypeResidence } from "../models/ETypeResidence";

const addresses: DeliveryAddress[] = [
    new DeliveryAddress({
        id: 1,
        typeresidence: ETypeResidence.APARTMENT,
        patioType: "N/A",
        publicArea: "123 Elm Street",
        numberAddrs: "Apt 101",
        neighborhood: "Downtown",
        cep: "12345-678",
        city: "Cityville",
        state: "Stateville",
        country: "Countryland",
        observations: "Buzz the intercom for entry",
        nameAddrs: "My house"
    }),
    new DeliveryAddress({
        id: 2,
        typeresidence: ETypeResidence.HOUSE,
        patioType: "Backyard",
        publicArea: "456 Oak Avenue",
        numberAddrs: "Unit B",
        neighborhood: "Suburbia",
        cep: "98765-432",
        city: "Townsville",
        state: "Stateville",
        country: "Countryland",
        observations: "Leave package at the doorstep",
        nameAddrs: "My parents house"
    })
];

export default addresses;