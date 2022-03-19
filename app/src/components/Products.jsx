import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ProductItem } from './ProductItem';
import { popularProducts } from '../data';
import axios from 'axios';
import { publicRequest } from '../requestMethod'; 

const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProduct] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          cat
            ? `/products?category=${cat}`
            : '/products'
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProduct(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProduct((prev) => [...prev].sort((a, b) => a.createdAt - b.createdAt))
    } else if (sort === 'asc') {
      setFilteredProduct((prev) => [...prev].sort((a, b) => a.price - b.price))
    } else if (sort === 'desc') {
      setFilteredProduct((prev) => [...prev].sort((a, b) => b.price - a.price))
    }
  }, [sort])

  return (
    <Container>
      {cat ? filteredProducts.map((item) => (
        <ProductItem item={item} key={item._id}></ProductItem>
      )) : products.slice(0,12).map((item) => (
        <ProductItem item={item} key={item._id}></ProductItem>
      ))}
    </Container>
  );
};
