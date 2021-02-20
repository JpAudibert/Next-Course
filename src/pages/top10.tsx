import { GetStaticProps } from "next"
import api from "../services/api";

interface IProduct {
  id: string;
  title: string;
}

interface ITop10Props {
  products: IProduct[];
}

export default function Top10({ products }: ITop10Props){
  return (
    <div>
      <h1>Hello World</h1>
      <ul>
          {products.map(product => {
            return (
              <li key={product.id}>{product.title}</li>
            )
          })}
      </ul>
    </div>
  )
}

export const getStaticProps: GetStaticProps<ITop10Props> = async(context) => {
  const response = await api.get('products');
  const products = await response.data;

  return {
    props: {
      products
    },
    revalidate: 5,
  }
}
