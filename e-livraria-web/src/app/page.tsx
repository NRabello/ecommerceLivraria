"use client"
import { useRouter } from "next/navigation";
import { BookService } from "@/services/BookService";
import { useEffect, useState } from "react";
import { Book } from "@/models/Book";
import { set } from "react-hook-form";

export default function Home() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("")
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const bookService = new BookService();


  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);

    const sortBooks = (selectedOption: string) => {
      const sortedProducts = [...books];
      if (selectedOption === "1") {
        sortedProducts.sort((a, b) => b.price - a.price);
      } else if (selectedOption === "2") {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (selectedOption === "0") {
        sortedProducts.sort(() => Math.random() - 0.5);
      }
      setBooks(sortedProducts);
    };
    sortBooks(e.target.value);
  }

  useEffect(() => {
    const filterProducts = () => {
      if(searchTerm === ""){
        return fetchData();
      }
      const filtered = books.filter(book => {
        const { name, categories, publishing_company } = book;
        const searchTermLowerCase = searchTerm.toLowerCase();
        return (
          name.toLowerCase().includes(searchTermLowerCase) ||
          categories.some(category =>
            category.name.toLowerCase().includes(searchTermLowerCase)
          ) ||
          publishing_company.toLowerCase().includes(searchTermLowerCase)
        );
      });
      setBooks(filtered);
    };
    filterProducts();
  }, [searchTerm]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    bookService.findAll().then((response) => {
      setBooks(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }


  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-12 lg:max-w-fit lg:px-8">
        <input
          type="text"
          id="search"
          placeholder="Pesquise por nome, categoria ou editora"
          className="w-9/12 px-3 py-1 border border-gray-300 rounded-md mb-4 mr-6 placeholder-black placeholder-opacity-80 outline outline-black outline-1"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        Ordenar por
        <select
          id="selectOptions"
          value={selectedOption}
          onChange={handleOptionChange}
          className="ml-2 outline outline-black outline-1 rounded-md"
        >
          <option value="0">Relevantes</option>
          <option value="1">Maior preço</option>
          <option value="2">Menor preço</option>
        </select>
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8">
          {books.map((product) => (
            <a key={product.id} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-80 w-full object-fill group-hover:opacity-75, cursor-pointer"
                  onClick={() => { router.push(`/book/shop/${product.id}`) }}
                />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-gray-800">{product.name} - {product.author}</h3>
              <p className="mt-1 text-lg font-extrabold text-gray-900">R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
