import { useEffect, useState } from "react";
import { Title } from "../styles/pages/Home";
import api from '../services/api';

interface IRecommendedProducts{
  id: string;
  title: string;
}

export default function Home() {
  const [recommendedProducts, setRecommendedProducts] = useState<IRecommendedProducts[]>([]);

  useEffect(() => {
    async function loadRecommendedProducts() {
      const response = await api.get('recommended');

      setRecommendedProducts(response.data)
    }

    loadRecommendedProducts();
  }, [])

  return (
    <div>
      <Title>Hello World</Title>
      <ul>
          {recommendedProducts.map(recommendedProducts => {
            return (
              <li key={recommendedProducts.id}>{recommendedProducts.title}</li>
            )
          })}
      </ul>
    </div>
  )
}
