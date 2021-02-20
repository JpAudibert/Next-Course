import { useEffect, useState } from "react";
import { Title } from "../styles/pages/Home";
import api from '../services/api';
import { GetServerSideProps } from "next";

interface IRecommendedProducts{
  id: string;
  title: string;
}

interface IHomeProps {
  recommendedProducts: IRecommendedProducts[];
}

export default function Home({ recommendedProducts }:IHomeProps) {
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
