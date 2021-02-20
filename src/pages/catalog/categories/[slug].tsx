import { GetStaticPaths, GetStaticProps } from 'next'
import {useRouter} from 'next/router'
import api from '../../../services/api'

interface IProducts{
  id: string;
  title: string;
}

interface ICategoryProps {
  products: IProducts[];
}


export default function Category({ products }: ICategoryProps){
  const router = useRouter()

  if(router.isFallback) {
    return <p>Carregando...</p>
  }

  return (
    <div>
      <h1>{router.query.slug}</h1>

      <ul>
        {products.map(product => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticPaths : GetStaticPaths = async () => {
  const response = await api.get(`categories`)
  const categories = await response.data

  const paths = categories.map(category => {
    return {
      params: { slug: category.id },
    }
  })

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<ICategoryProps> = async (context) => {
  const { slug } = context.params

  const response = await api.get(`products?category_id=${slug}`);
  const products = await response.data;

  return {
    props: {
      products
    },
    revalidate: 60,
  }
 }
