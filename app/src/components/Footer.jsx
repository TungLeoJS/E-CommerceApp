import React from 'react';
import styled from 'styled-components';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import PinterestIcon from '@material-ui/icons/Pinterest';
import RoomIcon from '@material-ui/icons/Room';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';

const Container = styled.div`
  display: flex;
`;

const Left = styled.div`
  flex: 1;
  padding: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px; ;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const Logo = styled.h1``;

const Description = styled.div`
  margin: 20px 0;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 3px;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Title = styled.h1``;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;

export const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo> LAMA.</Logo>
        <Description>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, ab?
          Enim corrupti animi suscipit blanditiis nulla odit repellendus, cum at
          corporis tempora, laudantium earum perspiciatis, laboriosam
          necessitatibus error ipsam eligendi.
        </Description>
        <SocialContainer>
          <SocialIcon color='3B5999'>
            <FacebookIcon />
          </SocialIcon>
          <SocialIcon color='E4405F'>
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon color='55ACEE'>
            <TwitterIcon />
          </SocialIcon>
          <SocialIcon color='E60023'>
            <PinterestIcon />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title></Title>
        <ContactItem>
          <RoomIcon style={{ marginRight: '10px' }} />
          450 DBP, Binh Thanh District, Ho Chi Minh City
        </ContactItem>
        <ContactItem>
          <PhoneIcon style={{ marginRight: '10px' }} />
          +1 234 56 78
        </ContactItem>
        <ContactItem>
          <MailIcon style={{ marginRight: '10px' }} />
          contact@lama.dev
        </ContactItem>
        <Payment src='https://i.ibb.co/Qfvn4z6/payment.png' />
      </Right>
    </Container>
  );
};
