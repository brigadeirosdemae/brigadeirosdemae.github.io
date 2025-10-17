import { Category } from "@/app/api/products";
import "./style.css";
import { FC } from "react";
import { ProductView } from "./Product";

interface CategorySectionProps {
  category: Category
}

export const CategorySection: FC<CategorySectionProps> = ({
  category
}) => {

  return <section className="py-12">
    <div className="container mx-auto px-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-heading font-bold text-brand-dark mb-6">
          { category.categoria }
        </h2>

        { category.itens.map(product => <ProductView key={product.id} product={ product } /> )}        

      </div>
    </div>
  </section>
}

