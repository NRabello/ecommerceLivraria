import { Fragment, use, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { useCart } from '../hooks/UseCart'
import { useCheckout } from '@/hooks/useCheckout'

export default function Example() {
  const [open, setOpen] = useState(true)
  const { cart, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();
  const {checkout, addSeveralToCheckout, setCheckout } = useCheckout();

  const handleCheckoutClick = () => {
    setOpen(false);
    setCheckout(cart);
    router.push('/book/shop/checkout'); 
  };

  const goToBook = (id: number) => {
    setOpen(false);
    router.push(`/book/shop/${id}`);
  }
  
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div id="shopping-cart" className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Carrinho</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cart.map((product, index) => (
                              <li key={`product-${index}`} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.book.imageSrc}
                                    alt={product.book.imageAlt}
                                    className="h-full w-full object-fill object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-normal text-gray-900">
                                      <h3>
                                        <a onClick={() => { goToBook(product.book.id) }} className='cursor cursor-pointer'>{product.book.name}</a>
                                      </h3>
                                      <p className="ml-3">R$ {product.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                                    </div>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500">Qty
                                      <select
                                        id={`quantity-${index}`}
                                        className="mx-1 border border-gray-300 rounded-md"
                                        value={product.quantity}
                                        onChange={(e) => updateQuantity(product, parseInt(e.target.value))}
                                      >
                                        {[1, 2, 3, 4, 5].map(num => (
                                          <option key={num} value={num}>{num}</option>
                                        ))}
                                      </select>
                                    </p>

                                    <div className="flex">
                                      <button
                                        id={`btn-remove-from-cart-${index}`}
                                        type="button"
                                        onClick={() => removeFromCart(product)}
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p id="valor-subtotal">R$ {cart.reduce((acc, product) => acc + product.value * product.quantity, 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Frete e Taxas são calculados no checkout.</p>
                      <div className="mt-6">
                        <button
                          id="checkout-button"
                          onClick={handleCheckoutClick}
                          className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                          <button
                            id="btn-continuar-comprando"
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continuar comprando
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
