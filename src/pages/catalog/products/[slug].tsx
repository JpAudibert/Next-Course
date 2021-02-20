import {useRouter} from 'next/router'
import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';

const AddToCartModal = dynamic(
  () => import('../../../components/addToCartModal'),
  {loading: () => <p>Loading...</p>}
)

export default function Product(){
  const router = useRouter();
  const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false);

  const handleAddToCart = useCallback(() => {
    setIsAddToCartModalVisible(!isAddToCartModalVisible);
  }, []);

  return (
    <div>
      <h1>{router.query.slug}</h1>

      <button onClick={handleAddToCart}>Add To Cart</button>

      {isAddToCartModalVisible && <AddToCartModal />}
    </div>
  );
}
