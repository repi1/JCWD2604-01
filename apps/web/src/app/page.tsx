import Image from 'next/image';
import styles from './page.module.css';
import { ProductList } from '../components/ProductList';
import CarouselComponent from '@/components/CarouselComponent';
import CategorySlider from '@/components/CategorySlider';
import ProductCard from '@/components/ProductCard';
import ProductTab from '@/components/ProductTab';

export default function Home() {
  return (
    <main>
      <CarouselComponent />
      <CategorySlider />
      <ProductTab />
      <ProductList />
    </main>
  );
}
