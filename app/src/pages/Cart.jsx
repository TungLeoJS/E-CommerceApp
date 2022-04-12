import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Announcement } from '../components/Announcement';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { mobile } from '../responsive';
import { useSelector } from 'react-redux';
import StripeCheckOut from 'react-stripe-checkout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({
    padding: '10px',
  })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === 'filled' && 'none'};
  background-color: ${(props) =>
    props.type === 'filled' ? 'black' : 'transparent'};
  color: ${(props) => props.type === 'filled' && 'white'};
`;

const TopTexts = styled.div`
  ${mobile({
    display: 'none',
  })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({
    flexDirection: 'column',
  })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({
    flexDirection: 'column',
  })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  ${mobile({
    margin: '5px 15px',
  })}
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({
    marginBottom: '20px',
  })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === 'total' && '500'};
  font-size: ${(props) => props.type === 'total' && '24px'};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const KEY = 'pk_test_51KeL9nEI9dY11rlBpHAk8mYKpMVvf7NfzDIZKbEwlE7jPUsJYU3rLo3bC3pa33iywySy2OExgbMdgo6LIQjFrUTj00DWyXnlO4'
// const BASE_URL = "http://localhost:5000/api/"
const BASE_URL = "https://ecommerce-api-server-1.herokuapp.com/api/"

export const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          BASE_URL,
          {
            tokenId: stripeToken.id,
            amount: cart.totalPrice*100,
          }
        );
        history('/success');
      } catch (err) {}
    };
    stripeToken && makeRequest();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stripeToken]);

  const onToken = (token) => {
    setStripeToken(token);
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type='filled'>CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart?.products
              ? cart.products.map((item) => (
                  <Product key={item._id}>
                    <ProductDetail>
                      <Image src={item.img} />
                      <Details>
                        <ProductName>
                          <b>Product:</b> {item.title}
                        </ProductName>
                        <ProductId>
                          <b>ID:</b> {item._id}
                        </ProductId>
                        <ProductColor color={item.color} />
                        <ProductSize>
                          <b>Size:</b> {item.size}
                        </ProductSize>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <AddIcon />
                        <ProductAmount>{item.quantity}</ProductAmount>
                        <RemoveIcon />
                      </ProductAmountContainer>
                      <ProductPrice>{item.price * item.quantity}</ProductPrice>
                    </PriceDetail>
                  </Product>
                ))
              : ''}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.totalPrice}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type='total'>
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.totalPrice}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckOut
              name='Lama Shop'
              image='https://avatars.githubusercontent.com/u/1486366?v=4'
              billingAddress
              shippingAddress
              description={`Your total is $${cart.totalPrice}`}
              amount={cart.totalPrice*100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckOut>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};
