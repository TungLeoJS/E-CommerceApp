import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Announcement } from '../components/Announcement';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { Newsletter } from '../components/Newsletter';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { mobile } from '../responsive';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { publicRequest } from '../requestMethod';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({
    padding: '10px',
    flexDirection: 'column',
  })}
`;

const ImgContainer = styled.div`
  flex: 1;
  background-color: #fafafa;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({
    height: '40%',
  })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
  background-color: #fafafa;
  ${mobile({
    padding: '0',
  })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.div`
  margin: 20px 0;
`;

const Price = styled.span`
  font-size: 40px;
  font-weight: 100;
`;

const FilterContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  ${mobile({
    width: '100%',
  })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  padding: 5px;
  margin-left: 10px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
  align-items: center;
  ${mobile({
    width: '100%',
  })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  align-items: center;
  justify-content: center;
  display: flex;
  margin: 0 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 1px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

export const ProductDetail = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (type) => {
    type === "dec" ? setQuantity(quantity > 1 ? quantity - 1 : 1) : setQuantity(quantity + 1);
  }

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/find/${id}`);
        if(res && res.data) {
          setProduct(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [id]);

  return (
    <Container>
      <Navbar></Navbar>
      <Announcement></Announcement>
      <Wrapper>
        <ImgContainer>
          <Image src={product.img}></Image>
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>
            {product.desc}
          </Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c) => <FilterColor color={c} key={c}/>)}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                {product.size?.map((s) => <FilterSizeOption key={s}>{s}</FilterSizeOption>)}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <RemoveIcon onClick={() => handleQuantity("dec")} style={{cursor: 'pointer'}}/>
              <Amount>{quantity}</Amount>
              <AddIcon onClick={() => handleQuantity("inc")} style={{cursor: 'pointer'}}>Add</AddIcon>
            </AmountContainer>
            <Button>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter></Newsletter>
      <Footer></Footer>
    </Container>
  );
};
