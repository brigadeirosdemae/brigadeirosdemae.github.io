

export interface Variation {
  id: string;
  preco: number;
  unidade: string;
  descricao?: string;
}

export type Sabor = string;
export type Massa = string;

export interface Product {
  id: string;
  nome: string;
  preco?: number;
  unidade?: string;
  descricao?: string;
  imagem?: string;
  category?: Category;
  opcoes?: {
    sabores?: Sabor[],
    massa?: Massa[]
  };
  variacoes?: Variation[]
}

export interface Category {
  id: string;
  categoria: string;
  imagemCategoria: string;
  itens: Product[]
}

export interface ProductDatabase {
  produtosEncomenda: Category[];
}

export class ProductManager {

  static data: ProductDatabase | null = null;

  static async fetch() {
    let result = await fetch('https://script.google.com/macros/s/AKfycbxj4lw2jrdHGipwO1MhgRHs-vlQZX0MI9dhQk8myMhuVbt7pQU5uwAbVOEWRTFH-3oi/exec');

    if (result.status === 302) {
      result = await fetch(result.headers.get('Location') || '', { method: 'GET' });
    }

    this.data = await result.json() as ProductDatabase;
    return new ProductManager();
  }

  getCategories(): Category[] {
    if (!ProductManager.data) {
      throw new Error("Product data not loaded. Call fetch() first.");
    }
    return ProductManager.data.produtosEncomenda;
  }

  getAllProducts(): Product[] {
    if (!ProductManager.data) {
      throw new Error("Product data not loaded. Call fetch() first.");
    }

    const allProducts: Product[] = [];
    ProductManager.data.produtosEncomenda.forEach(category => {
      allProducts.push(...category.itens
      .filter(product => product.nome !== "Adicionais")
      .map(product => {
        product.category = category;
        return product
      }));
    });

    return allProducts;
  }

  getRandomProducts({ total = 3 }): Product[] {
    if (!ProductManager.data) {
      throw new Error("Product data not loaded. Call fetch() first.");
    }

    const allProducts = this.getAllProducts();

    const shuffled = allProducts.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, total);
  }
}

