'use client'

import { useEffect, useState } from "react";
import { CategorySection } from "../components/category/categorySection";
import { Category, ProductManager } from "../api/products";

export default function Page() {

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    ProductManager.fetch().then(pm => {
      setCategories(pm.getCategories());
    })
  }, [])

  return <main>
    <section className="container mx-auto px-6 pt-16 pb-12 text-center">
      <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark">Cardápio para Encomendas</h1>
      <p className="text-lg text-gray-500 mt-4">Ideal para festas, eventos e presentes especiais.</p>
    </section>

    {categories.map(category => <CategorySection key={category.id} category={category} />)}

    <section id="contato" className="py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-dark mb-4">Faça sua Encomenda</h2>
        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-10">Para festas, eventos ou para alegrar o seu dia. Entre em contato e faça seu pedido pelo WhatsApp!</p>
        <a href="https://api.whatsapp.com/send?phone=5511954987213&text=Ola,%20gostaria%20de%20saber%20sobre" target="_blank" className="bg-green-500 text-white font-bold py-4 px-10 rounded-full hover:bg-green-600 transition-all duration-300 flex items-center justify-center max-w-xs mx-auto transform hover:scale-105">
          <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.61 15.35 3.48 16.84L2 22L7.31 20.52C8.75 21.32 10.36 21.8 12.04 21.8H12.05C17.5 21.8 21.95 17.35 21.95 11.91C21.95 9.27 20.92 6.83 19.05 4.95C17.17 3.08 14.73 2 12.04 2ZM12.05 20.01C10.59 20.01 9.16 19.58 7.9 18.81L7.54 18.6L4.85 19.3L5.59 16.69L5.37 16.32C4.54 15 4.02 13.47 4.02 11.91C4.02 7.49 7.62 3.89 12.05 3.89C14.18 3.89 16.15 4.71 17.65 6.21C19.15 7.71 20.05 9.68 20.05 11.81C20.05 16.23 16.45 20.01 12.05 20.01ZM16.43 14.47C16.2 14.35 15.09 13.8 14.88 13.73C14.67 13.66 14.52 13.61 14.37 13.82C14.22 14.03 13.75 14.58 13.61 14.73C13.46 14.88 13.31 14.91 13.08 14.79C12.85 14.67 11.95 14.34 10.89 13.4C10.05 12.65 9.5 11.75 9.33 11.45C9.16 11.15 9.28 11.01 9.41 10.88C9.53 10.77 9.68 10.56 9.83 10.41C9.98 10.26 10.03 10.14 10.13 9.94C10.23 9.74 10.18 9.59 10.11 9.47C10.04 9.35 9.56 8.17 9.37 7.71C9.18 7.25 8.99 7.32 8.85 7.31C8.71 7.31 8.56 7.31 8.41 7.31C8.26 7.31 8.04 7.39 7.84 7.59C7.64 7.79 7.14 8.24 7.14 9.34C7.14 10.44 7.86 11.49 8 11.64C8.12 11.79 9.56 14.03 11.81 14.93C12.33 15.15 12.72 15.26 13.01 15.34C13.49 15.45 13.91 15.42 14.23 15.34C14.59 15.25 15.7 14.65 15.91 14.05C16.12 13.45 16.12 13 16.05 12.87C15.98 12.74 15.83 12.69 15.63 12.59" /></svg>
          Peça no WhatsApp
        </a>
      </div>
    </section>

  </main>

}