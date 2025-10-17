import { FC } from "react";

interface ProductViewProps {
  image: {
    url: string;
    alt: string;    
  },
  title: string;
  smallDescription: string;
  category: string;
}

export const ProductView: FC<ProductViewProps> = ({
  image, smallDescription, title, category
}) => {

  return <div className="text-center group">
    {/* <div className="overflow-hidden rounded-lg shadow-lg mb-4">
      { image && <img src={ image?.url } alt={ image?.alt } className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500" /> }
    </div> */}
    <h2> { category } </h2>
    <h3 className="text-xl font-bold font-heading text-brand-dark">{ title }</h3>
    <p className="text-gray-500">{ smallDescription } </p>
  </div>
                    


}