"use client"
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/UseCart'
import { BookService } from '@/services/BookService'
import { Book } from '@/models/Book'
import { OrderItem } from '@/models/OrderItem'
import { useCheckout } from '@/hooks/useCheckout'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Shop({ params }: { params: { id: number } }) {
  const [book, setBook] = useState<Book>()
  const [quantity, setQuantity] = useState(1)
  const [frete, setFrete] = useState(0)
  const [showFrete, setShowFrete] = useState(false);
  const [cep, setCep] = useState('')
  const router = useRouter()
  const bookService = new BookService();
  const { addToCart, updateQuantity } = useCart()
  const { setCheckout } = useCheckout()

  useEffect(() => {
    bookService.findById(params.id).then((response) => {
      setBook(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }, [params.id])

  const calcularFrete = () => {
    if (cep.length === 0) {
      alert('Digite um CEP válido')
      return
    }
    setFrete(15);
    setShowFrete(true);
    console.log(cep)
  }

  const handleQuantityChange = (value: number) => {
    if (value < 1) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  }

  const addToShoppingCart = () => {
    if (!book) return
    const orderItem = new OrderItem({
      book: book,
      quantity: quantity,
      value: book.price
    })
    addToCart(orderItem)
    alert('Livro adicionado ao carrinho')
    router.push('/')
  }

  const buyNow = () => {
    if (!book) return
    const orderItem = new OrderItem({
      book: book,
      quantity: quantity,
      value: book.price
    })
    setCheckout([orderItem])
    router.push('/book/shop/checkout')
  }

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Product info */}
        <div className="mx-auto max-w-4xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-fit lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-10 lg:pt-16">
          {/* Image */}
          <div className="lg:col-span-1 lg:border-r lg:border-gray-200 lg:pr-8 flex flex-col items-center">
            <div className="aspect-h-4 aspect-w-3 rounded-lg">
              <img
                className="h-96 w-96 object-fill object-center mt-4"
                src={book?.imageSrc}
                alt={book?.imageAlt}
              />
            </div>
          </div>
          {/* Text */}
          <div className="lg:col-span-1 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl w-full max-w-md ">{book?.name}</h1>
            <div className="mt-4 w-fit">
              <h3 className="sr-only">Descrição</h3>
              <p className="text-base text-gray-900 text-justify">{book?.synopsis}</p>
            </div>
          </div>

          {/* Options */}
          <div className="mt-4 lg:col-span-1 w-fit  py-2 px-2">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">R$ {book?.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>

            <form className="mt-10">
              {/* Quantidade */}
              <div className="mt-10">
                <p className="text-sm font-medium text-gray-900">QUANTIDADE</p>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                  className="mt-2 h-10 border-gray-800 border-2 border-opacity-25 rounded-md shadow-sm block sm:text-sm"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              {/* Frete */}
              <div className="mt-4">
                <h2 className="text-sm font-medium text-gray-900">FRETE</h2>
                <InputMask
                  mask="99999-999"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                >
                  <input
                    id="cep"
                    type="text"
                    placeholder="Digite seu CEP"
                    className="rounded-md border-gray-800 border-2 border-opacity-25"
                  />
                </InputMask>
                <button
                  id="btn-calcularFrete"
                  type='button'
                  className="ml-2 bg-transparent hover:bg-green-500 text-green-700 font-mono size-15 hover:text-white h-6 px-1 border border-green-500 hover:border-transparent rounded-lg"
                  onClick={() => calcularFrete()}
                >
                  Calcular
                </button>
                {showFrete && (
                  <p id="frete" className="mt-2 text-base text-gray-900">Chega em 5 dias úteis: R$ {frete.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                )}
              </div>

              {/* Botão de adicionar ao carrinho */}
              <button
                id="btn-addToCart"
                type="button"
                className="mt-6 flex w-80 items-center justify-center rounded-md border border-transparent bg-yellow-500 px-8 py-3 text-base font-medium text-white hover:bg-yellow-600"
                onClick={() => addToShoppingCart()}
              >
                Adicionar ao carrinho   R$ {((book?.price ?? 0) * (quantity ?? 0)).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </button>

              <button
                id="btn-buyNow"
                type="button"
                className="mt-4 flex w-80 items-center justify-center rounded-md border border-transparent bg-orange-500 px-8 py-3 text-base font-medium text-white hover:bg-orange-600"
                onClick={() => buyNow()}
              >
                Comprar agora   R$ {((book?.price ?? 0) * (quantity ?? 0) + (frete ?? 0)).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center">
          <table className="table-auto outline outline-gray-200 items-center">
            <thead>
              <tr>
                <th className="px-4 py-2">Autor</th>
                <th className="px-4 py-2">Categoria</th>
                <th className="px-4 py-2">Paginas</th>
                <th className="px-4 py-2">Editora</th>
                <th className="px-4 py-2">Ano</th>
                <th className="px-4 py-2">Edição</th>
                <th className="px-4 py-2">ISBN</th>
                <th className="px-4 py-2">Grupo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">{book?.author}</td>
                <td className="border px-4 py-2">
                  {book?.categories.map(category => category.name).join(", ")}
                </td>
                <td className="border px-4 py-2">{book?.pages}</td>
                <td className="border px-4 py-2">{book?.publishing_company}</td>
                <td className="border px-4 py-2">{book?.year}</td>
                <td className="border px-4 py-2">{book?.edition}</td>
                <td className="border px-4 py-2">{book?.isbn}</td>
                <td className="border px-4 py-2">{book?.pricingGroup.name}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}