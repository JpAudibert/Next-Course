import { useCallback, useEffect, useState } from "react";
import { Title } from "@/styles/pages/Home";
import api from '@/services/api';
import { GetServerSideProps } from "next";

interface IRecommendedProducts{
  id: string;
  title: string;
}

interface IHomeProps {
  recommendedProducts: IRecommendedProducts[];
}

export default function Home({ recommendedProducts }:IHomeProps) {
  const handleSum = useCallback(async () => {
    const math = (await import('../lib/math')).default;

    alert(math.sum(3,5));
  }, [])

  return (
    <div>
      <Title>Hello World</Title>
      <ul>
          {recommendedProducts.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>{recommendedProduct.title}</li>
            )
          })}
      </ul>

      <button onClick={handleSum}>Sum!</button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<IHomeProps> = async () => {
  const response = await api.get('recommended');
  const recommendedProducts = await response.data;

  return {
    props: {
      recommendedProducts
    }
  }
}
