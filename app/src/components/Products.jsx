import React from 'react';
import styled from 'styled-components';
import { ProductItem } from './ProductItem';
import { popularProducts } from '../data';

const Container = styled.div`
    display: flex;
    padding: 20px;
    flex-wrap: wrap;
    justify-content: space-between;
`;

export const Products = () => {
  return (
    <Container>
      {popularProducts.map((item) => (
        <ProductItem item={item} key={item.id}></ProductItem>
      ))}
    </Container>
  );
};
