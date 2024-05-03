"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Client as ClientModel } from '@/models/Client';
import { ClientService } from '@/services/ClientService';

export default function ChangePassword({ params }: { params: { id: number } }) {
  const [password, setPassword] = useState('');
  const [client, setClient] = useState<ClientModel>();
  const [confirmPassword, setConfirmPassword] = useState('');
  const clientService = new ClientService();
  const router = useRouter();

  useEffect(() => {
    clientService.findById(params.id).then((response) => {
      setClient(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);


  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }
    if (!client) {
      alert("Cliente não encontrado")
      return;
    }
    if (!password || !confirmPassword) {
      alert("Preencha todos os campos")
      return;
    }
    client.password = confirmPassword;
    clientService.update(client).then(() => {
      alert("senha alterada com sucesso");
      router.push("/client");
    }).catch((error) => {
      if (error.response && error.response.status === 500 && error.response.data === "A Senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma letra minúscula e um caractere especial") {
        alert("A Senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma letra minúscula e um caractere especial");
      } else {
        alert("Erro ao criar cliente");
      }
    });
  }



  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Alterar Senha</h1>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700">Nova Senha:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full" />
      </div>
      <div className="mb-6">
        <label htmlFor="confirmPassword" className="block text-gray-700">Confirmar Nova Senha:</label>
        <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full" />
      </div>
      <div className="flex justify-between">
        <button id="btn-voltar"type="button" className=" hover:bg-gray-500 text-gray-500 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded-full" onClick={() => router.push("/client")}>Voltar</button>
        <button id="btn-salvar" onClick={handleSubmit} className=" hover:bg-gray-500 text-gray-500 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded-full">Salvar</button>
      </div>
    </div>
  );
}