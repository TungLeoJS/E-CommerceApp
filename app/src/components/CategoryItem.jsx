import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive'

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({
    height: '20vh'
  })}
`;

const Info = styled.div`
  display: flex;
  top: 0;
  bottom: 0;
  position: absolute;
  height: 100%;
  width: 100%;
  margin: auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
    color: white;
    margin-bottom: 20px;
`;

const Button = styled.button`
  cursor: pointer;
  background-color: white;
  color: gray;
  padding: 10px;
  border: none;
  font-weight: 600;
`;

export const CategoryItem = (props) => {
  const { item } = props;
  return (
    <Container key={item.id}>
      <Image src={item.img}></Image>
      <Info>
        <Title>{item.title}</Title>
        <Button>SHOP NOW</Button>
      </Info>
    </Container>
  );
};
