import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import Cart from '@/components/Cart';
import { useEcommerce } from '@/context/EcommerceContext';
import { sampleProducts } from '@/data/products';

const Index = () => {
  const { dispatch } = useEcommerce();

  useEffect(() => {
    // Load sample products
    dispatch({ type: 'SET_PRODUCTS', payload: sampleProducts });
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ProductGrid />
      <Cart />
    </div>
  );
};

export default Index;
