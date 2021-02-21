import { useCallback, useEffect, useState } from "react";
import { Title } from "@/styles/pages/Home";
import api from '@/services/api';
import { GetServerSideProps } from "next";
import SEO from "@/components/SEO";

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
      <SEO
        title="DevCommerce, your dev e-commerce!"
        description="DevCommerce, your dev e-commerce!"
        image="banner.png"
        shouldExcludeTitleSuffix
      />

      <section>
        <Title>Hello World</Title>
        <ul>
            {recommendedProducts.map(recommendedProduct => <li key={recommendedProduct.id}>{recommendedProduct.title}</li>)}
        </ul>

        <button onClick={handleSum}>Sum!</button>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<IHomeProps> = async () => {
  const response = await fetch(`http://localhost:3333/recommended`);
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts
    }
  }
}
