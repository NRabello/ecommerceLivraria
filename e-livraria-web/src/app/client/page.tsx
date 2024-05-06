"use client";

import { ClientService } from "@/services/ClientService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Client as ClientModel } from "@/models/Client";
import Image from "next/image";

export default function Client() {
  const router = useRouter();
  const clientService = new ClientService();
  const [clients, setClients] = useState<ClientModel[]>();
  const [activeTab, setActiveTab] = useState('cliente');
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientModel | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const openModal = (client: ClientModel) => {
    setSelectedClient(client);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedClient(null);
    setShowModal(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    clientService.findAll().then((response) => {
      setClients(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  const searchClients = async () => {
    if(!searchTerm) {
      await fetchData();
      return;
    }
    clientService.filter(searchTerm).then((response) => {
      setClients(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  const inactivateClient = (client: ClientModel) => {
    const confirmation = window.confirm("Deseja realmente inativar o cliente?");
    if (confirmation) {
      client.active = false;
      clientService.inactive(client)
        .then(() => {
          alert("Cliente inativado com sucesso");
          clientService.findAll().then((response) => {
            setClients(response.data);
          }).catch((error) => {
            console.log(error);
          });
        })
        .catch((error) => {
          alert(`Erro ao inativar cliente", ${error}`);
        });
    }
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-4 mr-8 mt-6">
        <div className="flex-1 mr-4">
          <input
            type="text"
            id="search"
            placeholder="Pesquise por nome, genero, cpf ou email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-11/12 px-3 py-1 border border-gray-300 rounded-md ml-8"
          />
          <button id="pesquisar" className="ml-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " onClick={() => searchClients()}>
            OK
          </button>
        </div>
        <button
          onClick={() => router.push("/client/create")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Novo Cliente
        </button>
      </div>

      <div className="overflow-x-auto ml-8 mr-8 mt-6 outline outline-1 outline-gray-500">
        <table className="min-w-full divide-y divide-gray-200 " id="table">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Genero
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CPF
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Telefone
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Alterar Senha
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Editar
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Inativar
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clients ? clients.map((client: ClientModel, index) => (
              <tr key={index} onClick={() => openModal(client)} className="cursor-pointer hover:bg-gray-100">
                <td id={`client-name-${index}`} className="px-6 py-4 whitespace-nowrap">{client.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.cpf}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.phone.number}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button id={`btn-changePassword-${index}`} className="flex ml-9" onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/client/changePassword/${client.id}`);
                  }}>
                    <Image
                      src={"/senha.png"}
                      alt="senha.png"
                      width={24}
                      height={24} />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button id={`btn-edit-${index}`} className="flex ml-2" onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/client/update/${client.id}`);
                  }}>
                    <Image
                      src={"/editar.png"}
                      alt="editar.png"
                      width={24}
                      height={24} />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button id={`btn-inactive-${index}`} className="flex justify-center ml-4" onClick={(e) => { e.stopPropagation(); inactivateClient(client) }}>
                    <Image
                      src={"/excluir.png"}
                      alt="excluir.png"
                      width={24}
                      height={24} />
                  </button>
                </td>
              </tr>
            )) : <tr><td colSpan={8} className="text-center"></td></tr>
            }
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75" id="modal">
          <div className="bg-white min-h-80 w-max flex flex-col">
            <div className="mb-4">
              <button
                id="btn-cliente"
                className={`bg-blue-500 hover:bg-blue-700 w-20 text-white font-bold py-2 tab-btn ${activeTab === 'cliente' ? 'active' : ''}`}
                onClick={() => setActiveTab('cliente')}
              >
                Cliente
              </button>
              <button
                id='btn-enderecoCobranca'
                className={`bg-purple-500 hover:bg-purple-700 w-52 text-white font-bold py-2 tab-btn ${activeTab === 'enderecoEntrega' ? 'active' : ''}`}
                onClick={() => setActiveTab('enderecoCobranca')}
              >
                Endereços de Cobrança
              </button>
              <button
                id='btn-enderecoEntrega'
                className={`bg-yellow-500 hover:bg-yellow-700 w-48 text-white font-bold py-2 tab-btn ${activeTab === 'enderecoCobranca' ? 'active' : ''}`}
                onClick={() => setActiveTab('enderecoEntrega')}
              >
                Endereços de Entrega
              </button>
              <button
                id='btn-cartao'
                className={`bg-green-500 hover:bg-green-700 w-40 text-white font-bold py-2 tab-btn ${activeTab === 'cartao' ? 'active' : ''}`}
                onClick={() => setActiveTab('cartao')}
              >
                Cartão de Crédito
              </button>
            </div>
            <hr className="mb-4"></hr>
            {selectedClient && (
              <div>
                {activeTab === 'cliente' && (
                  <div className="mb-9">
                    <p><strong>Nome:</strong> {selectedClient.name}</p>
                    <p><strong>Gênero:</strong> {selectedClient.gender}</p>
                    <p><strong>Data de Nascimento:</strong> {selectedClient.dateBirth}</p>
                    <p><strong>CPF:</strong> {selectedClient.cpf}</p>
                    <p><strong> {selectedClient.phone.type}:</strong> {selectedClient.phone.ddd} {selectedClient.phone.number}</p>
                    <p><strong>Email:</strong> {selectedClient.email}</p>
                    <p><strong>Ranking:</strong> {selectedClient.ranking}</p>
                  </div>
                )}
                {activeTab === 'enderecoCobranca' && (
                  <div>
                    {selectedClient.chargeAddresses.map((address, index) => (
                      <div key={index} className="mb-4">
                        <p><strong>Endereço {index + 1}:</strong></p>
                        <p><strong>Nome:</strong> {address.nameAddrs}</p>
                        <p><strong>Número:</strong> {address.numberAddrs}</p>
                        <p><strong>CEP:</strong> {address.cep}</p>
                        <p><strong>Cidade:</strong> {address.city}</p>
                        <p><strong>Estado:</strong> {address.state}</p>
                        <p><strong>Pais:</strong> {address.country}</p>
                        <p><strong>Bairro</strong> {address.neighborhood}</p>
                        <p><strong>Tipo de Residência:</strong> {address.typeresidence}</p>
                        <p><strong>Tipo de Logradouro:</strong> {address.patioType}</p>
                        <p><strong>Logradouro:</strong> {address.publicArea}</p>
                        <p><strong>Observações:</strong> {address.observations}</p>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'enderecoEntrega' && (
                  <div>
                    {selectedClient.deliveryAddresses.map((address, index) => (
                      <div key={index} className="mb-4">
                        <p><strong>Endereço {index + 1}:</strong></p>
                        <p><strong>Nome:</strong> {address.nameAddrs}</p>
                        <p><strong>Número:</strong> {address.numberAddrs}</p>
                        <p><strong>CEP:</strong> {address.cep}</p>
                        <p><strong>Cidade:</strong> {address.city}</p>
                        <p><strong>Estado:</strong> {address.state}</p>
                        <p><strong>Pais:</strong> {address.country}</p>
                        <p><strong>Bairro</strong> {address.neighborhood}</p>
                        <p><strong>Tipo de Residência:</strong> {address.typeresidence}</p>
                        <p><strong>Tipo de Logradouro:</strong> {address.patioType}</p>
                        <p><strong>Logradouro:</strong> {address.publicArea}</p>
                        <p><strong>Observações:</strong> {address.observations}</p>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'cartao' && (
                  <div>
                    {selectedClient.creditCards.map((creditCard, index) => (
                      <div key={index} className="mb-4">
                        <p><strong>Cartão {index + 1}:</strong></p>
                        <p><strong>Número:</strong> {creditCard.number}</p>
                        <p><strong>Nome:</strong> {creditCard.nameCard}</p>
                        <p><strong>Bandeira:</strong> {creditCard.banner.name}</p>
                        <p><strong>Data de Expiração:</strong> {creditCard.expirationDate}</p>
                        <p><strong>Código de Segurança:</strong> {creditCard.securityCode}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            <button id="btn-fecharModal" onClick={closeModal} className="mx-auto bg-gray-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}