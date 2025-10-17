import { Product  } from "@/app/api/products"
import { FC } from "react"

interface ProductProps {
  product: Product
}

const Preco = ({preco}: {preco: number| string}) => {
  let produtoPreco = "";
  if (typeof(preco) === "string") {
    produtoPreco = preco.replace('.',',')
  } else if(typeof(preco) === "number") {
    produtoPreco = preco.toFixed(2).replace('.',',')
  }

  return <> { preco && `R$ ${ produtoPreco }` }</> 
}

export const ProductView: FC<ProductProps> = ({ product }) => {

  return <>
    <div className="product-details space-y-6 text-gray-700 py-2">
      <div className="product-card">
        
        <strong> { product.nome } </strong>

        { product.unidade && product.preco && 
          <p className="font-bold text-lg">{ product.unidade }: <Preco preco={product.preco} /></p>
        }

        { product.descricao && <p className="text-sm text-gray-500 mb-2">
          {product.descricao}
        </p>}

        { product.opcoes?.sabores?.length ?<p>
          <span className="font-semibold">Sabores: </span> 
            { product.opcoes?.sabores.join(', ') }
          </p>: <></>
        }

        { product.variacoes?.length ? <p>
          <span className="font-semibold">Variantes: </span> 
            <ul>
            { product.variacoes.map((v, i) => <li key={ i } className="py-2"> 
              <p className="font-bold"> { v.unidade }: <Preco preco={ v.preco } /> </p>
              <p className="pb-2">
                { v.descricao }
              </p>
              <hr />
            </li>) }
            </ul>
          </p>: <></>
        }


      </div>
    </div>
  </>

}